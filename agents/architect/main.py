import os
from flask import Flask, request, jsonify
from agents.shared import log, new_request_id, draft_text, send_email

app = Flask(__name__)

# ---- App limits & CORS ----
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024  # 1 MB
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "*")

@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return resp

# ---- Health Check ----
@app.route("/healthz", methods=["GET"])
def handle_healthz():
    return ("OK", 200)

# ---- Main Endpoint ----
@app.route("/generate", methods=["POST", "OPTIONS"])
def handle_generate():
    if request.method == "OPTIONS":
        return ("", 204)

    req_id = new_request_id()
    log("Architect agent run started.", request_id=req_id)

    try:
        # --- 1. Get Input Data (Stubbed) ---
        locations = _get_locations_stub()
        log(f"Processing {len(locations)} locations.", request_id=req_id)

        results = []
        for loc in locations:
            # --- 2. Generate Landing Page Content ---
            log(f"Generating content for {loc['name']}...", request_id=req_id)
            page_content = _generate_landing_page_content(loc, req_id)

            # --- 3. Commit to GitHub ---
            commit_info = _commit_to_github(page_content, loc, req_id)
            log(f"Committed content for {loc['name']} to branch {commit_info['branch']}", request_id=req_id)

            results.append(commit_info)

        # --- 4. Send Summary Email ---
        email_subject = f"Architect Agent Run Completed ({req_id})"
        email_content = "The architect agent has completed its run.\n\nGenerated pages:\n"
        for res in results:
            email_content += f"- Location: {res['location']}, Branch: {res['branch']}, URL: {res['commit_url']}\n"
        send_email(subject=email_subject, content=email_content)
        log("Sent summary email.", request_id=req_id)

        return jsonify({
            "status": "ok",
            "message": "Architect agent run completed.",
            "results": results
        }), 200

    except Exception as e:
        log(f"FATAL (architect-agent): {e}", request_id=req_id)
        return jsonify({"error": "Internal server error"}), 500

# ---- Helper Functions ----
def _get_locations_stub():
    """Returns a stubbed list of locations."""
    return [
        {"name": "New Jersey", "zip": "07302", "state_code": "NJ"},
        {"name": "New York", "zip": "10001", "state_code": "NY"},
    ]

def _generate_landing_page_content(location: dict, req_id: str) -> str:
    """Generates React component text for a landing page using the LLM."""
    log(f"Generating landing page content for {location['name']}...", request_id=req_id)

    system_prompt = "You are an expert web developer and copywriter. You will be given a location and asked to create the text content for a React landing page component for a life insurance website. The output should be only the text content, formatted cleanly."

    user_prompt = f"""
Create the content for a life insurance landing page targeted at residents of {location['name']} (ZIP code: {location['zip']}).

The content should include:
1.  A catchy, location-specific headline (e.g., "Life Insurance for the Garden State").
2.  A brief introductory paragraph (2-3 sentences).
3.  Three short sections, each with a heading and a paragraph, highlighting key benefits relevant to people in that area (e.g., family protection, financial security, legacy planning).
4.  A compelling call-to-action (e.g., "Get Your Free Quote Now").

Please format the output as a simple JSON object with keys: "headline", "intro", "sections" (an array of {{"heading": "...", "text": "..."}}), and "cta".
"""

    content = draft_text(prompt=user_prompt, system=system_prompt)
    return content

def _commit_to_github(content: str, location: dict, req_id: str) -> dict:
    """Commits the generated content to a new branch in the GitHub repo."""
    from github import Github

    token = os.environ["GITHUB_TOKEN"]
    repo_name = os.environ["GITHUB_REPOSITORY"] # e.g., "YOUR_USERNAME/newinsurd"

    g = Github(token)
    repo = g.get_repo(repo_name)

    state = location['state_code']
    zip_code = location['zip']

    branch_name = f"feature/landing-page-{state}-{zip_code}-{req_id[:6]}"
    file_path = f"packages/frontend/src/pages/landings/{state}/{zip_code}.tsx"

    # Create a basic React component structure around the LLM-generated content
    react_component = f"""
import React from 'react';
import {{
    Card,
    CardContent,
    CardHeader,
    CardTitle,
}} from "@/components/ui/card"; // Assuming a UI library like shadcn/ui

const landingPageData = {content};

const LandingPage_{state}_{zip_code}: React.FC = () => {{
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-4">{{landingPageData.headline}}</h1>
            <p className="text-lg text-center text-gray-600 mb-8">{{landingPageData.intro}}</p>
            <div className="grid md:grid-cols-3 gap-8">
                {{landingPageData.sections.map((section, index) => (
                    <Card key={{index}}>
                        <CardHeader>
                            <CardTitle>{{section.heading}}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{{section.text}}</p>
                        </CardContent>
                    </Card>
                ))}}
            </div>
            <div className="text-center mt-12">
                <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700">
                    {{landingPageData.cta}}
                </button>
            </div>
        </div>
    );
}};

export default LandingPage_{state}_{zip_code};
"""

    source_branch = repo.get_branch("main")
    repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=source_branch.commit.sha)

    commit_message = f"feat: Add landing page for {location['name']}"
    repo.create_file(file_path, commit_message, react_component, branch=branch_name)

    commit_url = f"https://github.com/{repo_name}/tree/{branch_name}"

    return {
        "location": location['name'],
        "branch": branch_name,
        "commit_url": commit_url,
        "file_path": file_path,
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=True)
