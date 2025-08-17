import os, time, uuid, functools, typing as t

def new_request_id() -> str:
    return uuid.uuid4().hex[:12]

def log(*args, request_id: str | None = None, **kwargs) -> None:
    """Simple, consistent logger with optional request_id."""
    prefix = f"[req:{request_id}] " if request_id else ""
    print(prefix + " ".join(str(a) for a in args), **kwargs)

def with_retries(tries: int = 3, delay: float = 0.8, backoff: float = 2.0, exceptions: tuple[type[BaseException], ...] = (Exception,)):
    """Retry decorator with exponential backoff."""
    def deco(fn):
        @functools.wraps(fn)
        def wrapper(*a, **kw):
            attempt, wait = 0, delay
            while True:
                try:
                    return fn(*a, **kw)
                except exceptions as e:
                    attempt += 1
                    if attempt >= tries:
                        raise
                    time.sleep(wait)
                    wait *= backoff
        return wrapper
    return deco
