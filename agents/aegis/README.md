# Aegis Agent

This agent is responsible for client retention and business intelligence.

## Mission
1.  **Read Client Data**: Reads a list of clients and their policy renewal dates from a Google Sheet.
2.  **Get Fresh Quotes**: For clients with upcoming renewals, it fetches new quotes from the BackNine API (currently stubbed).
3.  **Draft Retention Emails**: Uses an LLM to generate personalized retention emails to clients, highlighting new, potentially better options.
4.  **Update BI Dashboard**: Updates a separate tab in the Google Sheet with a summary of retention opportunities, actions taken, and status.
5.  **Daily Digest**: Sends a daily summary email to an administrator with a list of all actions taken.

## Endpoints
-   `POST /run`: Triggers the full agent workflow.
-   `GET /healthz`: A health check endpoint for Cloud Run.

## Deployment
This agent is deployed as a containerized service on Google Cloud Run. The deployment is automated via a GitHub Actions workflow. The workflow is triggered by pushes to the `main` branch that include changes in the `agents/aegis/` or `agents/shared/` directories.
