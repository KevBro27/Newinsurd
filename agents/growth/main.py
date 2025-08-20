import os
from flask import Flask, request, jsonify
from shared import log, new_request_id, draft_text, make_docs_client, make_drive_client, send_email

app = Flask(__name__)

# ---- App limits & CORS ----
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024  # 1 MB
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")

@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp

# ---- Health Check ----
@app.route("/healthz", methods=["GET"])
def handle_healthz():
    return ("OK", 200)

# ---- Main Endpoint ----
@app.route("/run", methods=["POST", "OPTIONS"])
def handle_run():
    if request.method == "OPTIONS":
        return ("", 204)

    req_id = new_request_id()
    log("Growth agent run started.", request_id=req_id)

    try:
        # --- 1. Get Demographic Data (Stubbed) ---
        demographic_data = _get_demographic_data_stub()
        log(f"Collected data for {len(demographic_data)} ZIPs.", request_id=req_id)

        # --- 2. Generate Personas and Ad Copy using LLM ---
        marketing_content = _generate_marketing_content(demographic_data, req_id)
        log("Generated personas and ad copy.", request_id=req_id)

        # --- 3. Save to Google Doc ---
        report_url = _create_report_doc(marketing_content, req_id)
        log(f"Saved report to Google Doc: {report_url}", request_id=req_id)

        # --- 4. Send Summary Email ---
        email_subject = f"Growth Agent Report Ready ({req_id})"
        email_content = f"The growth agent has completed its run.\n\nView the full report here:\n{report_url}"
        send_email(subject=email_subject, content=email_content)
        log("Sent summary email.", request_id=req_id)

        return jsonify({
            "status": "ok",
            "message": "Growth agent run completed.",
            "report_url": report_url,
        }), 200

    except Exception as e:
        log(f"FATAL (growth-agent): {e}", request_id=req_id)
        return jsonify({"error": "Internal server error"}), 500

# ---- Helper Functions ----
def _get_demographic_data_stub():
    """Returns a stubbed list of demographic data for top ZIP codes."""
    return [
        {"zip": "07302", "median_income": 150000, "avg_household_size": 2.1, "median_age": 34},
        {"zip": "07030", "median_income": 120000, "avg_household_size": 2.5, "median_age": 38},
        {"zip": "07307", "median_income": 90000, "avg_household_size": 3.1, "median_age": 42},
    ]

def _generate_marketing_content(data: list[dict], req_id: str) -> str:
    """Generates customer personas and ad copy using the LLM."""
    log("Generating marketing content...", request_id=req_id)

    system_prompt = "You are a marketing expert for a life insurance company. Your tone is professional, insightful, and data-driven."

    data_str = "\n".join([f"- {item}" for item in data])

    user_prompt = f"""
Based on the following demographic data for key ZIP codes:
{data_str}

1.  **Customer Personas:** Create 2-3 distinct customer personas that represent these demographics. For each persona, include a name, age, career, financial situation, and primary insurance need.

2.  **Ad Copy:** For each persona, write a short, compelling ad copy (2-3 sentences) that speaks directly to their needs and would be suitable for a Facebook or LinkedIn ad.
"""

    content = draft_text(prompt=user_prompt, system=system_prompt)
    return content

def _create_report_doc(content: str, req_id: str) -> str:
    """Creates a new Google Doc from a template and fills it with content."""
    log("Creating report document...", request_id=req_id)
    template_id = os.environ["GROWTH_AGENT_TEMPLATE_ID"]
    docs_client = make_docs_client()
    drive_client = make_drive_client()

    title = f"Growth Agent Report - {req_id}"
    copied_file = drive_client.files().copy(fileId=template_id, body={"name": title}).execute()
    doc_id = copied_file["id"]

    requests = [
        {
            "replaceAllText": {
                "containsText": {"text": "{{MARKETING_CONTENT}}", "matchCase": True},
                "replaceText": content,
            }
        }
    ]
    docs_client.documents().batchUpdate(documentId=doc_id, body={"requests": requests}).execute()

    doc_url = f"https://docs.google.com/document/d/{doc_id}/edit"
    return doc_url

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
