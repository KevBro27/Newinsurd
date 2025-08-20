# Shared Library for Agents

Utilities reused across agents:
- `utils.py`: logging, retries, ids
- `gcp.py`: GCS upload/sign URL, Google Docs/Drive/Sheets clients
- `email.py`: SendGrid helper
- `llm.py`: single function to draft text via Ollama or Vertex AI
- `backnine.py`: BackNine API client (stub to start)

## Environment variables (read as needed)
- ALLOWED_ORIGIN
- GCS_BUCKET_NAME, GCS_UPLOAD_PREFIX
- SENDGRID_API_KEY, YOUR_EMAIL
- LLM_PROVIDER [ollama|vertex], OLLAMA_HOST (e.g. http://localhost:11434)
- GOOGLE_* default application credentials for Cloud Run
- BACKNINE_API_KEY (optional; used later)

These modules are importable as:
` from agents.shared import log, with_retries, new_request_id `
` from agents.shared import gcs_upload_and_sign, make_docs_client, make_drive_client, make_sheets_client `
` from agents.shared import send_email, draft_text, get_backnine_quote `

# Trivial change to trigger all workflows.
