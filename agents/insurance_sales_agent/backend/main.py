import os
import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import openai

# --- Load Environment Variables ---
load_dotenv("../../.env") # Adjust path to .env file at the root of the agent

# --- FastAPI App Initialization ---
app = FastAPI(
    title="Insurance Sales Agent API",
    description="API for the AI-powered insurance sales agent.",
    version="1.0.0",
)

# --- CORS Configuration ---
# Allows the frontend widget to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your website's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Data Validation ---
class ChatRequest(BaseModel):
    message: str
    history: list[dict] # A list of previous messages in the format {"role": "user/assistant", "content": "..."}

class ChatResponse(BaseModel):
    role: str = "assistant"
    content: str
    apply_url: str | None = None # To dynamically send Ethos/BackNine links

class LeadRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None

# --- Environment-based LLM Configuration ---
AI_MODEL = os.environ.get("AI_MODEL", "ollama").lower()
OLLAMA_HOST = os.environ.get("OLLAMA_HOST")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
ETHOS_URL = os.environ.get("ETHOS_URL")
BACKNINE_URL = os.environ.get("BACKNINE_URL")
EMAIL_RECEIVE = os.environ.get("EMAIL_RECEIVE")
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")

# --- System Prompt for the LLM ---
SYSTEM_PROMPT = """
You are an expert AI assistant for an insurance agency. Your primary goal is to educate visitors about life insurance and guide them to an instant-apply tool. You must be friendly, concise, and helpful.

RULES:
1.  Always encourage the user to try the instant-apply tool as the fastest way to get a personalized quote.
2.  Provide simple, educational answers. Avoid long sales scripts.
3.  If the user asks about price, explain that it's personalized and the best way to find out is through the instant-apply tool. Do not guess prices.
4.  If the user explicitly refuses the tool and asks to speak to a human, trigger the lead capture flow.
5.  All your responses MUST end with the exact question: "Would you like me to open the instant-apply tool now so you can get an answer in minutes?"
"""

# --- Helper Functions ---
def get_llm_response(message: str, history: list[dict]) -> dict:
    """
    Gets a response from the configured LLM provider.
    Returns a dictionary with "content" and potential "apply_url".
    """
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history + [{"role": "user", "content": message}]

    # Simple intent detection
    lower_message = message.lower()
    apply_intent = any(kw in lower_message for kw in ["apply", "quote", "price", "cost", "how much"])
    decline_intent = any(kw in lower_message for kw in ["no", "not now", "later"])
    human_intent = any(kw in lower_message for kw in ["human", "person", "agent", "talk to someone"])

    if human_intent:
        return {"content": "I can definitely have someone reach out to you. What is your name, email, and phone number?", "apply_url": None}

    if apply_intent:
        # Check history to see if we've already offered a link
        already_offered_ethos = any(ETHOS_URL in h.get("content", "") for h in history if h.get("role") == "assistant")
        if not already_offered_ethos:
            return {"content": f"That's great! The quickest way to get a quote is with our instant-decision tool. It only takes a few minutes.", "apply_url": ETHOS_URL}
        else:
            return {"content": f"No problem. We also have another excellent tool you can try. It gives you access to even more carriers.", "apply_url": BACKNINE_URL}

    # Fallback to LLM for general questions
    if AI_MODEL == "openai":
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=messages,
            temperature=0.7,
        )
        content = completion.choices[0].message.content
    else: # Default to Ollama
        try:
            response = requests.post(
                f"{OLLAMA_HOST}/api/chat",
                json={"model": "llama3", "messages": messages, "stream": False},
                timeout=30,
            )
            response.raise_for_status()
            content = response.json()["message"]["content"]
        except requests.RequestException as e:
            print(f"Error connecting to Ollama: {e}")
            raise HTTPException(status_code=500, detail="Error connecting to the AI model.")

    return {"content": content, "apply_url": None}


def send_lead_email(lead: LeadRequest):
    """Sends the captured lead details via SendGrid."""
    if not SENDGRID_API_KEY or not EMAIL_RECEIVE:
        print("WARN: SENDGRID_API_KEY or EMAIL_RECEIVE not set. Skipping email.")
        return

    subject = f"New Website Lead: {lead.name}"
    body = f"A new lead has been captured from the website chatbot.\n\nName: {lead.name}\nEmail: {lead.email}\nPhone: {lead.phone or 'Not provided'}"

    message = Mail(
        from_email=EMAIL_RECEIVE,
        to_emails=EMAIL_RECEIVE,
        subject=subject,
        plain_text_content=body,
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
    except Exception as e:
        print(f"Error sending email via SendGrid: {e}")
        # Don't fail the request if email fails
        pass

# --- API Endpoints ---
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handles a new chat message from the user."""
    try:
        response_data = get_llm_response(request.message, request.history)
        return ChatResponse(**response_data)
    except Exception as e:
        print(f"Error in /chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred.")


@app.post("/lead")
async def capture_lead(request: LeadRequest):
    """Captures lead info and sends it via email."""
    try:
        send_lead_email(request)
        return {"status": "ok", "message": "Lead captured successfully."}
    except Exception as e:
        print(f"Error in /lead endpoint: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred.")

@app.get("/")
def read_root():
    return {"message": "Insurance Sales Agent API is running."}
