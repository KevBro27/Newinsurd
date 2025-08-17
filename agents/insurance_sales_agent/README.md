# Insurance Sales AI Agent

This project contains a full-stack AI-powered sales agent designed to be embedded on a website. It educates visitors about life insurance, guides them toward instant-apply tools, and captures their information as a fallback lead.

The agent consists of two main parts:
1.  A **Python FastAPI backend** that handles all core logic, LLM interaction, and serves the widget.
2.  A **self-contained JavaScript widget** that can be embedded on any website.

## Project Structure

-   `/backend`: Contains the Python FastAPI application.
    -   `/backend/static/widget.js`: The embeddable JavaScript widget.
-   `docker-compose.yml`: Orchestrates the local development environment.
-   `.env.example`: An example file for the required environment variables.

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
-   `AI_MODEL` (e.g., `ollama` or `openai`)
-   `OLLAMA_HOST` (if using `docker-compose`, the default `http://host.docker.internal:11434` should work for connecting to Ollama running on your host machine)
-   `OPENAI_API_KEY` (if using OpenAI)
-   `SENDGRID_API_KEY`

### 2. Run the Application

With Docker running, execute the following command from this directory (`/agents/insurance_sales_agent/`):

```bash
docker-compose up --build
```

This command will build and start the FastAPI backend service.

You can now access:
-   **Backend API Docs**: `http://localhost:8000/docs`
-   **The Widget JavaScript File**: `http://localhost:8000/static/widget.js`

### 3. Embedding the Widget

To use the widget, add the following snippet to your website's HTML, just before the closing `</body>` tag.

```html
<!-- AI Insurance Sales Agent Widget -->
<script>
  (function() {
    // IMPORTANT: In production, change this to your deployed agent's URL
    const WIDGET_URL = "http://localhost:8000/static/widget.js";
    const script = document.createElement("script");
    script.src = WIDGET_URL;
    script.async = true;
    document.body.appendChild(script);
  })();
</script>
```

You will also need to edit the `widget.js` file itself to set the `API_BASE` variable to point to your deployed backend URL.
