import os
from .utils import with_retries

@with_retries()
def send_email(subject: str, content: str, to_email: str | None = None):
    """
    Send a plaintext email via SendGrid. Uses env: SENDGRID_API_KEY and YOUR_EMAIL (as from/to default).
    """
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail
    sg_key = os.environ.get("SENDGRID_API_KEY")
    default_to = os.environ.get("YOUR_EMAIL")
    if not sg_key or not (to_email or default_to):
        print("WARN: send_email missing SENDGRID_API_KEY or recipient; skipping.")
        return
    msg = Mail(
        from_email=(to_email or default_to),
        to_emails=(to_email or default_to),
        subject=subject,
        plain_text_content=content,
    )
    SendGridAPIClient(sg_key).send(msg)
