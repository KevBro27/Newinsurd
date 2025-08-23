// netlify/functions/strategic-advisor.js
import fetch from "node-fetch";

const BASE = process.env.LLM_API_BASE;
const KEY  = process.env.LLM_API_KEY;
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";
const SITE  = process.env.SITE_BASE_URL || "https://www.kevinbrownjrinsurance.com";

/**
 * Minimal RAG: we inject a site "map" + CTAs the bot can use.
 * Pages per your platform design:
 *   /quote-and-apply  (BackNine embed)
 *   /free-audit       (policy upload)
 *   /solutions        (education + Budget-First tool)
 *   /contact          (Calendly link)
 *   /articles         (trust/education)
 *   /founder-profile  (story)
 * (Front-end stack: React/Vite + Tailwind + Netlify; forms handled by Netlify)
 */
const SITE_CONTEXT = `
You are the "Strategic Advisor" for Kevin Brown Jr. Insurance.
Tone: confident, empathetic, slightly provocative. Tagline: "More Than a Policy. A Partnership."
Primary goal: guide visitors to the right next step with clear links, not long essays.

Core routes:
- Quote & Apply: ${SITE}/quote-and-apply  (BackNine quoting)
- Free Policy Audit (upload current policy): ${SITE}/free-audit
- Solutions hub (education + Budget-First tool): ${SITE}/solutions
- Contact / Book a call: ${SITE}/contact
- Articles: ${SITE}/articles
- Founder Profile: ${SITE}/founder-profile

Behavioral rules:
- Always try to identify intent: {get_quote | audit_policy | budget_first | contact | learn}
- Offer concise next steps + a primary CTA link.
- If user asks for NJ specifics, lean into local expertise; otherwise be general but helpful.
- If unsure, ask one clarifying question, then provide an option to proceed anyway.
- Keep answers short (2–6 sentences) + present links clearly.
`;

async function chat(messages) {
  if (!BASE || !KEY) {
    // Fallback: rule-based hints without LLM
    const last = (messages[messages.length - 1]?.content || "").toLowerCase();
    let reply = "I can guide you to the right next step:\n";
    if (last.includes("quote")) reply += `• Start a quote: ${SITE}/quote-and-apply`;
    else if (last.includes("audit") || last.includes("review"))
      reply += `• Upload your policy for a free audit: ${SITE}/free-audit`;
    else if (last.includes("budget"))
      reply += `• Try the Budget-First tool here: ${SITE}/solutions`;
    else if (last.includes("call") || last.includes("contact"))
      reply += `• Book a time with Kevin: ${SITE}/contact`;
    else reply += `• Explore solutions: ${SITE}/solutions\n• Start with a free audit: ${SITE}/free-audit\n• Get a quote: ${SITE}/quote-and-apply`;
    return reply;
  }

  const body = {
    model: MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: SITE_CONTEXT },
      ...messages
    ]
  };

  const r = await fetch(`${BASE}/v1/chat/completions`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const t = await r.text().catch(()=> "err");
    throw new Error(`LLM error: ${r.status} ${t}`);
  }
  const j = await r.json();
  return j.choices?.[0]?.message?.content?.trim() || "Sorry—mind trying that again?";
}

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not allowed" };
    }
    const { history = [], user } = JSON.parse(event.body || "{}");
    const messages = [
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: user || "" }
    ].filter(Boolean);

    const answer = await chat(messages);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: answer })
    };
  } catch (e) {
    return { statusCode: 500, body: `error: ${e.message}` };
  }
};
