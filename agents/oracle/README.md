# ORACLE Agent (Policy Audit)

Flask service that receives a form upload, stores it in GCS, extracts PDF text, creates a Google Doc from a template, and emails a summary.

## Endpoints
- POST `/webhook/policy-audit` (multipart/form-data; file field `policy-file` or `file`)
- POST `/webhook/budget-tool` (simple form)

## Environment
- Python 3.11
- See `.env.sample` for required variables.
- Set `BP_PYTHON_VERSION=3.11.9` at build time (Cloud Run buildpacks).

## Deploy (Cloud Run)
1. Ensure a GCS bucket exists and the Cloud Run service account has Storage access.
2. Share the template Google Doc with the service account (read/copy).
3. Deploy from repo root (replace placeholders):
   ```bash
   gcloud run deploy oracle-agent \
     --source ./agents/oracle \
     --region us-east1 \
     --allow-unauthenticated \
     --set-build-env-vars=BP_PYTHON_VERSION=3.11.9 \
     --set-env-vars=ALLOWED_ORIGIN=https://www.kevinbrownjrinsurance.com,GCS_BUCKET_NAME=kbj-oracle-uploads,GCS_UPLOAD_PREFIX=uploads,AUDIT_TEMPLATE_ID=YOUR_TEMPLATE_DOC_ID,YOUR_EMAIL=Kevin@kevinbrownjrinsurance.com,GUNICORN_CMD_ARGS="--timeout 120 --graceful-timeout 120 --workers 1 --threads 8" \
     --set-secrets=SENDGRID_API_KEY=projects/YOUR_PROJECT/secrets/SENDGRID_API_KEY:latest \
     --memory=1Gi

Test (local curl)
curl -X POST \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "policy-file=@/path/to/sample.pdf;type=application/pdf" \
  https://YOUR-CLOUD-RUN-URL/webhook/policy-audit

Netlify Form

Use <form encType="multipart/form-data">

File input name: policy-file

First POST to Cloud Run with FormData, then submit to Netlify as usual.
