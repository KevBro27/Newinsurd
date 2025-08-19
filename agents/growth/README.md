# Growth Agent

This agent is responsible for generating marketing insights by analyzing demographic data.

## Mission
1.  **Collect Data**: Fetches demographic data for top ZIP codes (stubbed for now).
2.  **Generate Personas**: Uses an LLM to create customer personas based on the data.
3.  **Generate Ad Copy**: Uses an LLM to generate targeted ad copy for the created personas.
4.  **Save Results**: Saves the generated personas and ad copy to a new Google Doc.
5.  **Notify**: Sends a summary email with a link to the results document.

## Endpoints
-   `POST /run`: Triggers the full agent workflow.
-   `GET /healthz`: A health check endpoint for Cloud Run.

## Deployment
This agent is designed to be deployed as a containerized service on Google Cloud Run. The deployment is automated via a GitHub Actions workflow.

To deploy manually or to set up the deployment workflow, you will need to:
1.  Ensure the Cloud Run service account has permissions to create Google Docs.
2.  Set up the required environment variables and secrets (e.g., `GCP_PROJECT`, `SENDGRID_API_KEY`, etc.) in the Cloud Run service configuration and GitHub repository secrets.
3.  The workflow is triggered by pushes to the `main` branch that include changes in the `agents/growth/` or `agents/shared/` directories.
