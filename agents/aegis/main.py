import os
from flask import Flask, jsonify
from shared import log, new_request_id, draft_text, send_email, get_backnine_quote, make_sheets_client

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
    log("Aegis agent run started.", request_id=req_id)

    try:
        # --- 1. Read Client Data from Google Sheets (Stubbed) ---
        clients = _read_client_data_stub(req_id)
        log(f"Found {len(clients)} clients with upcoming renewals.", request_id=req_id)

        processed_clients = []
        for client in clients:
            # --- 2. Fetch Fresh Quotes from BackNine API (Stubbed) ---
            log(f"Fetching new quotes for {client['name']}...", request_id=req_id)
            quote = get_backnine_quote({"client_id": client["id"]}) # Example payload

            # --- 3. Draft Personalized Retention Email using LLM ---
            log(f"Drafting retention email for {client['name']}...", request_id=req_id)
            email_body = _draft_retention_email(client, quote, req_id)

            processed_clients.append({**client, "new_quote": quote, "draft_email": email_body})

        # --- 4. Update BI Dashboard in Google Sheets (Stubbed) ---
        log(f"Updating BI dashboard with {len(processed_clients)} opportunities.", request_id=req_id)
        _update_bi_dashboard_stub(processed_clients, req_id)

        # --- 5. Send Daily Digest Email ---
        log("Sending daily digest email.", request_id=req_id)
        _send_daily_digest(processed_clients, req_id)

        return jsonify({
            "status": "ok",
            "message": "Aegis agent run completed.",
            "processed_clients": len(processed_clients)
        }), 200

    except Exception as e:
        log(f"FATAL (aegis-agent): {e}", request_id=req_id)
        return jsonify({"error": "Internal server error"}), 500

# ---- Helper Functions ----
def _read_client_data_stub(req_id: str) -> list[dict]:
    """
    (STUB) Reads client data from a Google Sheet.
    In a real implementation, this would use the Sheets API.
    """
    log("Reading client data from Google Sheets (stub)...", request_id=req_id)
    return [
        {"id": "C123", "name": "John Doe", "email": "john.doe@example.com", "renewal_date": "2025-09-01", "policy_type": "Term Life"},
        {"id": "C456", "name": "Jane Smith", "email": "jane.smith@example.com", "renewal_date": "2025-09-15", "policy_type": "Whole Life"},
    ]

def _draft_retention_email(client: dict, quote: dict, req_id: str) -> str:
    """Drafts a personalized retention email using the LLM."""
    log(f"Drafting email for {client['name']}...", request_id=req_id)
    system_prompt = "You are a helpful and proactive insurance agent assistant. Your goal is to write a personalized, friendly email to a client about their upcoming policy renewal."

    quote_details = f"a new quote with potential savings: {quote.get('data', 'see attached')}" if quote.get('ok') else "some new options we can discuss."

    user_prompt = f"""
Draft a personalized email to our client, {client['name']}, regarding their upcoming {client['policy_type']} policy renewal on {client['renewal_date']}.

The email should:
- Be friendly and personal.
- Mention the upcoming renewal.
- Proactively state that you've already looked into {quote_details}
- Suggest a brief call to discuss their options.
"""

    email_body = draft_text(prompt=user_prompt, system=system_prompt)
    return email_body

def _update_bi_dashboard_stub(clients: list[dict], req_id: str):
    """
    (STUB) Updates a BI dashboard tab in Google Sheets.
    In a real implementation, this would use the Sheets API to append rows.
    """
    log("Updating BI dashboard in Google Sheets (stub)...", request_id=req_id)
    for client in clients:
        log(f"  - Updating status for {client['name']}: Email drafted.", request_id=req_id)
    # This is a no-op for the stub.
    pass

def _send_daily_digest(clients: list[dict], req_id: str):
    """Sends a summary of the day's retention activities."""
    log("Sending daily digest email...", request_id=req_id)
    subject = f"Aegis Daily Digest - {len(clients)} Retention Opportunities"
    content = "The Aegis agent has completed its daily run.\n\nSummary of actions:\n"
    for client in clients:
        content += f"- Client: {client['name']} ({client['email']})\n"
        content += f"  - Renewal Date: {client['renewal_date']}\n"
        content += f"  - Action: Drafted personalized retention email.\n\n"

    send_email(subject=subject, content=content)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
