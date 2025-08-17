# Insurance Sales AI Agent

This project contains a full-stack AI-powered sales agent designed to be embedded on a website. It educates visitors about life insurance, guides them toward instant-apply tools, and captures their information as a fallback lead.

## Project Structure

-   `/backend`: Contains the Python FastAPI application that handles all core logic.
-   `/frontend`: Contains the React + Vite + Tailwind CSS project for the embeddable chat widget.
-   `docker-compose.yml`: Orchestrates the local development environment.
-   `.env.example`: An example file for the required environment variables.

## Core Features

### Backend
-   **FastAPI Server**: Provides a robust API for the frontend.
-   **Configurable LLM**: Can use Ollama (default) or OpenAI based on the `AI_MODEL` environment variable.
-   **Sales Funnel Logic**:
    1.  Prompts users to apply via an instant-decision tool (`ETHOS_URL`).
    2.  If the user declines, it offers a second tool (`BACKNINE_URL`).
    3.  If the user still declines or asks for a human, it captures their contact information.
-   **Endpoints**:
    -   `POST /chat`: Main conversational endpoint.
    -   `POST /lead`: Endpoint to capture user information and send an email notification.

### Frontend
-   **React Widget**: A modern, embeddable chat interface.
-   **Dynamic Buttons**: "Apply Now" buttons are dynamically shown based on the backend response.
-   **Lead Capture Form**: A simple form to collect user details when the fallback flow is triggered.

## Getting Started (Local Development)

This project is designed to be run easily using Docker and Docker Compose.

### Prerequisites
-   Docker installed and running on your machine.
-   An `.env` file created in this directory (`/agents/insurance_sales_agent/`).

### 1. Create Your Environment File

Copy the example environment file to a new `.env` file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in your actual values for:
-   `EMAIL_RECEIVE`
-   `AI_MODEL` (if you want to switch to `openai`)
-   `OLLAMA_HOST` (if your Ollama instance is not at the default location)
-   `OPENAI_API_KEY` (if using OpenAI)
-   `SENDGRID_API_KEY`

### 2. Run the Application

With Docker running, execute the following command from this directory (`/agents/insurance_sales_agent/`):

```bash
docker-compose up --build
```

This command will:
1.  Build the Docker images for both the `backend` and `frontend` services.
2.  Start both services.

You can now access:
-   **Frontend Widget**: `http://localhost:5173`
-   **Backend API Docs**: `http://localhost:8000/docs`

### 3. Embedding the Widget

To embed the widget on your main website in a development environment, you can use a script tag pointing to the Vite dev server's entry point.

```html
<div id="root"></div>
<script type="module" src="http://localhost:5173/src/main.tsx"></script>
```

For production, you would build the frontend into a static bundle and serve it.
