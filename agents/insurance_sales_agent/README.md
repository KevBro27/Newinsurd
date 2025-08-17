# Insurance Sales AI Agent

This project contains a full-stack AI-powered sales agent designed to be embedded on a website. It educates visitors about life insurance, guides them toward instant-apply tools, and captures their information as a fallback lead.

The agent consists of two main parts:
1.  A **Python FastAPI backend** that handles all core logic, LLM interaction, and serves the widget.
2.  A **self-contained JavaScript widget** that is served by the backend and can be embedded on any website.

## Project Structure

-   `/backend`: Contains the Python FastAPI application.
    -   `/backend/static/widget.js`: The embeddable JavaScript widget.
-   `/.github/workflows/deploy-insurance-sales-agent.yaml`: The automated deployment workflow for Google Cloud Run.
-   `.env.example`: An example file for the required environment variables.

## Deployment to Google Cloud Run

This agent is designed to be deployed as a containerized service on Google Cloud Run. The deployment is automated via the included GitHub Actions workflow.

### 1. Set Up GitHub Secrets

For the deployment to work, you must add the following as "secrets" in your GitHub repository's settings (`Settings > Secrets and variables > Actions`):

-   `GCP_WORKLOAD_IDENTITY_PROVIDER`
-   `GCP_SERVICE_ACCOUNT`
-   `GCP_PROJECT`
-   `GCP_REGION`
-   `SENDGRID_API_KEY`
-   `OPENAI_API_KEY` (if using OpenAI)
-   `ETHOS_URL`
-   `BACKNINE_URL`
-   `EMAIL_RECEIVE`
-   `AI_MODEL` (e.g., `ollama` or `openai`)
-   `OLLAMA_HOST`

### 2. Triggering Deployment

The workflow is configured to run automatically on any push to the `main` branch that includes changes in the `agents/insurance_sales_agent/**` directory.

To deploy the agent, merge the feature branch containing the agent into `main`. The GitHub Action will then build the backend from the `Dockerfile` and deploy it to a Cloud Run service named `insurance-sales-agent`.

### 3. Embedding the Widget

Once deployed, the widget will be available at `https://[your-cloud-run-url]/static/widget.js`.

To use the widget, you must:
1.  **Edit `widget.js`**: Before deploying, change the `API_BASE` constant at the top of the `widget.js` file to your Cloud Run service URL.
2.  **Embed the snippet** in your website's HTML, pointing the `script.src` to your public widget URL.

```html
<!-- AI Insurance Sales Agent Widget -->
<script>
  (function() {
    const script = document.createElement("script");
    // Replace with your actual deployed widget URL
    script.src = "https://insurance-sales-agent-xxxx.run.app/static/widget.js";
    script.async = true;
    document.body.appendChild(script);
  })();
</script>
```
