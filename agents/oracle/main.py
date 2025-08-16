import os
import uuid
from datetime import timedelta
from flask import Flask, request, jsonify

app = Flask(__name__)

# ---- App limits & CORS ----
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024 * 1024  # 32 MB
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")

@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp


# ---- Helpers: GCS upload, Docs templating, Email ----
def upload_to_gcs_and_sign(file_bytes: bytes, filename: str, content_type: str) -> dict:
    from google.cloud import storage
    bucket_name = os.environ["GCS_BUCKET_NAME"]
    folder = os.environ.get("GCS_UPLOAD_PREFIX", "uploads")

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    safe_name = f"{uuid.uuid4()}_{filename or 'upload'}"
    blob_path = f"{folder}/{safe_name}"
    blob = bucket.blob(blob_path)

    blob.upload_from_string(file_bytes, content_type=content_type)
    # Signed URL valid 7 days
    url = blob.generate_signed_url(expiration=timedelta(days=7), method="GET")
    return {"gs_path": f"gs://{bucket_name}/{blob_path}", "signed_url": url}


def make_docs_clients():
    import google.auth
    from googleapiclient.discovery import build
    scopes = [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
    ]
    creds, _ = google.auth.default(scopes=scopes)
    docs = build("docs", "v1", credentials=creds)
    drive = build("drive", "v3", credentials=creds)
    return docs, drive


def create_report_from_template(client_name: str, policy_snippet: str, file_url: str) -> str:
    """
    Copies a Google Docs template and replaces placeholders:
      {{CLIENT_NAME}}, {{POLICY_TEXT_SNIPPET}}, {{FILE_URL}}
    Returns: new Google Doc URL
    """
    template_id = os.environ["AUDIT_TEMPLATE_ID"]
    docs, drive = make_docs_clients()

    title = f"Policy Audit — {client_name or 'Client'} — {uuid.uuid4().hex[:6]}"
    copied = drive.files().copy(fileId=template_id, body={"name": title}).execute()
    new_doc_id = copied["id"]

    requests_body = {
        "requests": [
            {
                "replaceAllText": {
                    "containsText": {"text": "{{CLIENT_NAME}}", "matchCase": True},
                    "replaceText": client_name or "Client",
                }
            },
            {
                "replaceAllText": {
                    "containsText": {"text": "{{POLICY_TEXT_SNIPPET}}", "matchCase": True},
                    "replaceText": (policy_snippet or "[No text extracted]").strip()[:4000],
                }
            },
            {
                "replaceAllText": {
                    "containsText": {"text": "{{FILE_URL}}", "matchCase": True},
                    "replaceText": file_url or "[no file url]",
                }
            },
        ]
    }
    docs.documents().batchUpdate(documentId=new_doc_id, body=requests_body).execute()
    return f"https://docs.google.com/document/d/{new_doc_id}/edit"


def send_email(subject: str, content: str):
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail
    sg_key = os.environ.get("SENDGRID_API_KEY")
    to_email = os.environ.get("YOUR_EMAIL")
    if not sg_key or not to_email:
        print("WARN: SENDGRID_API_KEY or YOUR_EMAIL not set; skipping email.")
        return
    msg = Mail(from_email=to_email, to_emails=to_email, subject=subject, plain_text_content=content)
    try:
        sg = SendGridAPIClient(sg_key)
        sg.send(msg)
    except Exception as e:
        print("SendGrid error:", e)


# ---- MAIN ENDPOINTS ----
@app.route("/webhook/policy-audit", methods=["POST", "OPTIONS"])
def handle_policy_audit():
    if request.method == "OPTIONS":
        return ("", 204)
    try:
        # Lazy import for faster cold starts
        import fitz  # PyMuPDF

        # Logging
        print("Content-Type:", request.headers.get("Content-Type"))
        print("Form keys:", list(request.form.keys()))
        print("File keys:", list(request.files.keys()))

        uploaded = request.files.get("policy-file") or request.files.get("file")
        client_name = (request.form.get("name") or "").strip()
        client_email = (request.form.get("email") or "").strip()

        if not uploaded:
            print("ERROR: No file part found (expected 'policy-file' or 'file').")
            return jsonify({"error": "No file uploaded"}), 400

        file_bytes = uploaded.read()
        filename = uploaded.filename or "upload"
        content_type = uploaded.mimetype or "application/octet-stream"
        size = len(file_bytes)
        print(f"Received '{filename}' ({content_type}), size={size} bytes for {client_name} <{client_email}>")

        # 1) Save original to GCS and get signed URL
        gcs_info = upload_to_gcs_and_sign(file_bytes, filename, content_type)
        signed_url = gcs_info["signed_url"]

        # 2) Extract text if PDF
        if content_type == "application/pdf" or filename.lower().endswith(".pdf"):
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            policy_text = "".join(p.get_text() for p in doc)
            doc.close()
        else:
            policy_text = "[Non-PDF uploaded — OCR can be added later]"

        snippet = (policy_text or "").strip()[:2000]

        # 3) Create Google Doc from template
        report_url = create_report_from_template(client_name, snippet, signed_url)

        # 4) Email results
        send_email(
            subject=f"New Policy Audit: {client_name}",
            content=f"Client: {client_name} <{client_email}>\nFile: {signed_url}\nReport: {report_url}",
        )

        return jsonify({
            "status": "ok",
            "message": "Audit received. Report drafted.",
            "client_name": client_name,
            "client_email": client_email,
            "file_url": signed_url,
            "report_url": report_url,
        }), 200

    except Exception as e:
        print("FATAL (policy-audit):", e)
        return jsonify({"error": "Internal server error"}), 500


@app.route("/webhook/budget-tool", methods=["POST", "OPTIONS"])
def handle_budget_tool():
    if request.method == "OPTIONS":
        return ("", 204)
    try:
        client_name = (request.form.get("name") or "").strip()
        budget = (request.form.get("budget") or "").strip()
        print(f"Budget tool from {client_name} | Budget: {budget}")
        return jsonify({"status": "ok"}), 200
    except Exception as e:
        print("FATAL (budget-tool):", e)
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
