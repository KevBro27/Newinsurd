import os, requests
from .utils import with_retries

BASE_URL = "https://api.back9ins.com"  # placeholder; replace with real

@with_retries()
def get_backnine_quote(payload: dict) -> dict:
    """
    Minimal BackNine client stub. Reads BACKNINE_API_KEY from env.
    Expand/adjust endpoint and schema when integrating.
    """
    api_key = os.environ.get("BACKNINE_API_KEY")
    if not api_key:
        return {"error": "BACKNINE_API_KEY not set", "ok": False}
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    # Example placeholder endpoint; replace with real quoting path:
    url = f"{BASE_URL}/quotes"
    resp = requests.post(url, json=payload, headers=headers, timeout=60)
    if not resp.ok:
        return {"ok": False, "status": resp.status_code, "text": resp.text}
    return {"ok": True, "data": resp.json()}
