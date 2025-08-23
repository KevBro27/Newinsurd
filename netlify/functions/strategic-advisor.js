// netlify/functions/strategic-advisor.js
import fetch from "node-fetch";

const BASE  = process.env.LLM_API_BASE;
const KEY   = process.env.LLM_API_KEY;
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";
const SITE  = process.env.SITE_BASE_URL || "https://www.kevinbrownjrinsurance.com";

const SITE_CONTEXT = `
You are the "Strategic Advisor" for Kevin Brown Jr. Insurance.
Tone: confident, empathetic, slightly provocative. Tagline: "More Than a Policy. A Partnership."
Primary goal: guide visitors to the right next step with clear links, not long essays.

Routes:
- Quote & Apply: ${SITE}/quote-and-apply
- Free Policy Audit: ${SITE}/free-audit
- Solutions (Budget-First tool): ${SITE}/solutions
- Contact / Book: ${SITE}/contact
- Articles: ${SITE}/articles
- Founder Profile: ${SITE}/founder-profile

Rules: Identify intent {get_quote|audit_policy|budget_first|contact|learn}, give concise next steps + 1–2 links.
`;

function ruleFallback(user = "") {
  const u = (user || "").toLowerCase();
  if (u.includes("quote"))   return `I can get you started now: ${SITE}/quote-and-apply`;
  if (u.includes("audit")||u.includes("review"))
                            return `Upload your policy for a free audit: ${SITE}/free-audit`;
  if (u.includes("budget"))  return `Try the Budget‑First tool: ${SITE}/solutions`;
  if (u.includes("call")||u.includes("contact")||u.includes("schedule"))
                            return `Book a quick call here: ${SITE}/contact`;
  if (u.includes("ethos"))   return `Ethos is a modern life insurer we can quote. To compare options, start here: ${SITE}/quote-and-apply`;
  return `Here are quick paths: Free Audit → ${SITE}/free-audit · Budget‑First → ${SITE}/solutions · Get a Quote → ${SITE}/quote-and-apply · Talk to Kevin → ${SITE}/contact`;
}

async function llm(messages) {
  if (!BASE || !KEY) {
    console.warn("LLM disabled: missing BASE or KEY");
    return null;
  }
  const r = await fetch(`${BASE}/v1/chat/completions`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, temperature: 0.2, messages })
  });
  if (!r.ok) {
    const t = await r.text().catch(()=> "err");
    console.error("LLM HTTP error:", r.status, t);
    return null;
  }
  const j = await r.json().catch(e => (console.error("LLM JSON error:", e), null));
  return j?.choices?.[0]?.message?.content?.trim() || null;
}

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
    const { history = [], user = "" } = JSON.parse(event.body || "{}");

    // Attempt LLM; fall back gracefully if anything fails
    let reply = null;
    try {
      reply = await llm([{ role: "system", content: SITE_CONTEXT }, ...history, { role: "user", content: user }]);
    } catch (e) {
      console.error("LLM call threw:", e.message);
    }
    if (!reply) reply = ruleFallback(user);

    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reply }) };
  } catch (e) {
    console.error("strategic-advisor fatal:", e);
    // still give the user something useful
    const safe = ruleFallback();
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reply: safe }) };
  }
};
