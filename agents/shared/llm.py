import os, requests

def draft_text(prompt: str, system: str | None = None) -> str:
    """
    Generate text using the configured provider.
    - If LLM_PROVIDER=ollama (default): call Ollama (local/private) using llama3.
    - If LLM_PROVIDER=vertex: TODO (stub) call Vertex AI text models.
    """
    provider = os.environ.get("LLM_PROVIDER", "ollama").lower()
    if provider == "vertex":
        # Stub to keep shared layer simple; implement when needed.
        return _vertex_stub(prompt, system)
    return _ollama(prompt, system)

def _ollama(prompt: str, system: str | None):
    host = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
    payload = {"model": "llama3", "prompt": f"{system+'\n' if system else ''}{prompt}", "stream": False}
    r = requests.post(f"{host}/api/generate", json=payload, timeout=120)
    r.raise_for_status()
    data = r.json()
    return data.get("response", "").strip()

def _vertex_stub(prompt: str, system: str | None):
    return f"[vertex-stub]\nSYSTEM:\n{system or ''}\nPROMPT:\n{prompt[:2000]}"
