# Architect Agent

This agent is responsible for programmatically generating new, targeted landing pages and committing them to the repository.

## Mission
1.  **Input**: Takes a list of states or ZIP codes as input (stubbed for now).
2.  **Generate Content**: For each location, uses an LLM to generate landing page content (e.g., React component text).
3.  **Commit to GitHub**:
    *   Creates a new branch for the landing page.
    *   Commits the generated content as a new file in the frontend application's directory structure.
    *   (Future) Can be extended to automatically open a Pull Request.
4.  **Notify**: Sends a summary email upon completion.

## Endpoints
-   `POST /generate`: Triggers the full agent workflow.
-   `GET /healthz`: A health check endpoint for Cloud Run.

## GitHub Integration
This agent requires a GitHub Personal Access Token (PAT) with repository write permissions to be provided via the `GITHUB_TOKEN` environment variable. This token is used to authenticate with the GitHub API to create branches and commit files.

## Deployment
This agent is deployed as a containerized service on Google Cloud Run. The deployment is automated via a GitHub Actions workflow. The workflow is triggered by pushes to the `main` branch that include changes in the `agents/architect/` or `agents/shared/` directories.
