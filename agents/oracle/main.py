import os
import uuid
from flask import Flask, request, jsonify
from shared.gcp import gcs_upload_and_sign, make_docs_client, make_drive_client
from shared.email import send_email

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


# ---- Helpers: Docs templating ----


def create_report_from_template(client_name: str, policy_snippet: str, file_url: str) -> str:
    """
    Copies a Google Docs template and replaces placeholders:
      {{CLIENT_NAME}}, {{POLICY_TEXT_SNIPPET}}, {{FILE_URL}}
    Returns: new Google Doc URL
    """
    template_id = os.environ["AUDIT_TEMPLATE_ID"]
    docs = make_docs_client()
    drive = make_drive_client()

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
        gcs_info = gcs_upload_and_sign(file_bytes, filename, content_type)
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
        email_to = os.environ.get("YOUR_EMAIL")
        send_email(
            subject=f"New Policy Audit: {client_name}",
            content=f"Client: {client_name} <{client_email}>\nFile: {signed_url}\nReport: {report_url}",
            to_email=email_to
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
