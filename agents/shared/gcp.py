import os, uuid
from datetime import timedelta
from .utils import with_retries

@with_retries()
def gcs_upload_and_sign(file_bytes: bytes, filename: str, content_type: str, prefix_env: str = "GCS_UPLOAD_PREFIX") -> dict:
    """
    Upload bytes to GCS and return {gs_path, signed_url}. Signed URL valid 7 days.
    Requires env: GCS_BUCKET_NAME, optional GCS_UPLOAD_PREFIX.
    """
    from google.cloud import storage
    bucket_name = os.environ["GCS_BUCKET_NAME"]
    folder = os.environ.get(prefix_env, "uploads")
    storage_client = storage.Client()
    blob_name = f"{folder}/{uuid.uuid4()}_{filename or 'upload'}"
    blob = storage_client.bucket(bucket_name).blob(blob_name)
    blob.upload_from_string(file_bytes, content_type=content_type)
    url = blob.generate_signed_url(expiration=timedelta(days=7), method="GET")
    return {"gs_path": f"gs://{bucket_name}/{blob_name}", "signed_url": url}

def make_docs_client():
    import google.auth
    from googleapiclient.discovery import build
    scopes = ["https://www.googleapis.com/auth/documents"]
    creds, _ = google.auth.default(scopes=scopes)
    return build("docs", "v1", credentials=creds)

def make_drive_client():
    import google.auth
    from googleapiclient.discovery import build
    scopes = ["https://www.googleapis.com/auth/drive"]
    creds, _ = google.auth.default(scopes=scopes)
    return build("drive", "v3", credentials=creds)

def make_sheets_client():
    import google.auth
    from googleapiclient.discovery import build
    scopes = ["https://www.googleapis.com/auth/spreadsheets"]
    creds, _ = google.auth.default(scopes=scopes)
    return build("sheets", "v4", credentials=creds)
