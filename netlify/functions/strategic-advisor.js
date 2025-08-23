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

// ---------- KBJ FAQ BANK (≈50) ----------
const LINK = {
  quote: `${SITE}/quote-and-apply`,
  audit: `${SITE}/free-audit`,
  solutions: `${SITE}/solutions`,
  contact: `${SITE}/contact`,
  articles: `${SITE}/articles`,
  founder: `${SITE}/founder-profile`,
};

const FAQS = [
  {q:"What is life insurance?", a:`A contract that pays your beneficiaries when you pass away. It protects income, debts, and goals. Start with a needs estimate, then compare quotes here: ${LINK.quote}.`},
  {q:"What is term life insurance?", a:`Coverage for a set period (e.g., 10–30 years). It’s the most affordable way to protect income during high‑need years. Get term quotes: ${LINK.quote}.`},
  {q:"What is whole life insurance?", a:`Permanent coverage that lasts your lifetime and builds cash value with guaranteed premiums. Good for lifelong needs or legacy goals. Learn options: ${LINK.solutions}.`},
  {q:"What is universal life insurance?", a:`Permanent coverage with flexible premiums and adjustable death benefit; cash value growth depends on interest/market (UL/IUL/VUL). Ask which type fits: ${LINK.contact}.`},
  {q:"Term vs whole life", a:`Term = cheap, temporary; Whole = lifetime + cash value. Many families start with term and add permanent later. We can price both: ${LINK.quote}.`},
  {q:"How much life insurance do I need?", a:`Common rule: 10–15× annual income, plus debts and college, minus savings. I’ll fine‑tune via a free audit: ${LINK.audit}.`},
  {q:"How long should my term be?", a:`Match your biggest time‑bound risks (young kids, mortgage years). Typical picks: 20–30 years. Let’s model your timeline: ${LINK.solutions}.`},
  {q:"What’s a rider?", a:`An add‑on benefit (e.g., child rider, waiver of premium, accidental, chronic/critical illness). We’ll price riders during quoting: ${LINK.quote}.`},
  {q:"What is accelerated death benefit?", a:`Lets you access part of the death benefit if diagnosed with a qualifying illness. Often included or optional. We’ll confirm on a quote: ${LINK.quote}.`},
  {q:"Return of premium term", a:`Higher premium term that refunds paid premiums if you outlive the term. Good for savers who want a forced refund. See if it pencils out: ${LINK.quote}.`},
  {q:"Convertible term", a:`Allows converting term to permanent without a new medical exam during the conversion period. Great future flexibility. We’ll track deadlines in your file.`},
  {q:"Laddering policies", a:`Use multiple smaller terms (e.g., 10/20/30) so coverage steps down as needs fall—often cheaper than one big policy. Want a ladder plan? ${LINK.solutions}.`},
  {q:"Who should be my beneficiary?", a:`Typically a spouse/partner or trust; name contingents; keep it updated after life events. I’ll sanity‑check during the audit: ${LINK.audit}.`},
  {q:"Can I change beneficiaries?", a:`Yes, if the designation is revocable. Update after marriage, birth, divorce, etc. We’ll help with forms: ${LINK.contact}.`},
  {q:"What is underwriting?", a:`The risk review—health, lifestyle, records—to assign a rate class. Ranges from simplified (few questions) to full exam. We’ll target the best path for you.`},
  {q:"Do I need a medical exam?", a:`Not always. Many carriers offer no‑exam or accelerated underwriting if you qualify. We’ll try for simplified first: ${LINK.quote}.`},
  {q:"What affects my premium?", a:`Age, health, build, tobacco, medications, family history, driving, hobbies, coverage amount/term. We’ll optimize class during quoting: ${LINK.quote}.`},
  {q:"Smoker vs non‑smoker rates", a:`Tobacco use increases premiums. Some carriers offer “smoker” and “chew/vape” categories differently. We’ll pick the best fit: ${LINK.quote}.`},
  {q:"Build chart / BMI impact", a:`Height/weight tables impact rate class. Some carriers are more lenient. We’ll shop the lenient ones for your build: ${LINK.quote}.`},
  {q:"Table ratings", a:`Extra risk charges above Standard due to health/history. We’ll see if another carrier can approve with a better class.`},
  {q:"MIB report", a:`A database carriers use to check prior applications and flags. We can still position your case for the best outcome.`},
  {q:"APS medical records", a:`Attending Physician Statement—carriers may request doctor records. It can add time but helps secure accurate pricing.`},
  {q:"Contestability period", a:`Usually first 2 years—insurer can review misstatements if a claim occurs. Be honest on the app; we’ll help you answer clearly.`},
  {q:"Suicide clause", a:`Typically excludes suicide in the first 2 years (varies by state). After that period, claims are generally payable per policy terms.`},
  {q:"Grace period", a:`Time after a missed premium to pay and keep coverage active (often ~30 days). Don’t let it lapse—set autopay.`},
  {q:"Policy lapse & reinstatement", a:`If a policy lapses, many carriers allow reinstatement (with interest/underwriting) within a window. Contact us ASAP: ${LINK.contact}.`},
  {q:"Can I replace an old policy?", a:`Yes, but do a **like‑for‑like** comparison first to avoid gaps or surrender charges. Start with a free audit: ${LINK.audit}.`},
  {q:"1035 exchange", a:`Tax‑free transfer of cash value from one policy/annuity to another. Useful when improving costs or benefits. Let’s see if it fits: ${LINK.contact}.`},
  {q:"Policy loans (whole life)", a:`You can borrow against cash value; unpaid loans reduce the death benefit. We’ll model impacts before borrowing.`},
  {q:"IUL vs Whole", a:`IUL credits interest linked to an index (with caps/floors); Whole has fixed guarantees/dividends. Choice depends on goals/risk. Book a quick call: ${LINK.contact}.`},
  {q:"VUL basics", a:`Variable UL invests in sub‑accounts; values fluctuate with markets. For experienced investors only. We’ll discuss suitability first.`},
  {q:"Guaranteed issue life", a:`No health questions; higher premiums, lower face amounts. For certain needs only. We’ll check if simpler options fit: ${LINK.solutions}.`},
  {q:"Simplified issue life", a:`Short app, no exam for many; quick decisions. Good for moderate amounts and clean to moderate health profiles.`},
  {q:"Final expense / burial insurance", a:`Small permanent policies ($5k–$30k) designed for funeral costs. Easy underwriting. Ask for quotes: ${LINK.quote}.`},
  {q:"Accidental death insurance", a:`Pays only for accidental death (no illness). Inexpensive supplement but not a substitute for life insurance.`},
  {q:"Group vs individual life", a:`Group (through work) is convenient but not portable; individual is yours and can be tailored. Often you need both. Get your personal quote: ${LINK.quote}.`},
  {q:"Coverage for stay‑at‑home parent", a:`Yes—consider the cost to replace childcare/home labor. Term life is usually ideal. We’ll size it correctly: ${LINK.solutions}.`},
  {q:"Divorce and life insurance", a:`Courts may require coverage to protect support obligations. We’ll review beneficiary language and ownership: ${LINK.contact}.`},
  {q:"Business life insurance", a:`Key person, buy‑sell, and executive bonus plans protect or fund business transitions. Let’s design the right structure: ${LINK.contact}.`},
  {q:"Can I get coverage with diabetes?", a:`Often yes. Control, A1C, meds, and complications drive the class. We’ll shop diabetic‑friendly carriers: ${LINK.quote}.`},
  {q:"Heart history—can I qualify?", a:`Possible after certain time frames and stability. Each carrier views cardiac history differently. We’ll position your case.`},
  {q:"Cancer history—options?", a:`Depends on type, stage, treatment date, and follow‑ups. Many survivors qualify after waiting periods. Let’s check: ${LINK.contact}.`},
  {q:"DUI and life insurance", a:`Recent DUIs can impact class or cause postponement. Time since incident matters. We’ll identify lenient carriers.`},
  {q:"Foreign travel risks", a:`Active/long‑stay travel to certain countries may affect approval. We’ll review your itinerary before applying.`},
  {q:"Ethos Life?", a:`Ethos is a modern instant‑decision platform we can use for certain profiles. If you want speed, start here: ${LINK.quote}.`},
  {q:"How fast can I get covered?", a:`Instant approval is possible with simplified platforms; traditional underwriting can take 2–6 weeks. We’ll choose the fastest path for your case.`},
  {q:"Can I pay annually?", a:`Yes—annual, semiannual, quarterly, or monthly (“modal”). Annual often saves a bit. We’ll show the difference in your quote: ${LINK.quote}.`},
  {q:"Will my premium increase?", a:`Level term stays fixed during the term. Permanent plans can be designed for level premiums; flexible UL premiums vary with funding/assumptions.`},
  {q:"What happens at the end of term?", a:`Coverage typically ends or renews at a higher rate. Convert before term end if you still need coverage. We’ll calendar your window.`},
  {q:"NJ‑specific considerations", a:`New Jersey follows standard contestability/suicide clause rules and consumer protections. We’ll handle forms & compliance for you.`},
  {q:"How do I start?", a:`Two easy paths: upload your current policy for a **Free Audit** → ${LINK.audit}, or jump straight to **Quote & Apply** → ${LINK.quote}.`},
  {q:"Does New Jersey have a free look period for life insurance?", a:`Yes. In New Jersey you get at least 10 days after delivery of a new life insurance policy to review and cancel for a full refund. Some carriers extend to 20–30 days. Always check your contract.`},
  {q:"What is the free look period?", a:`It’s a “cooling-off” window (in NJ minimum 10 days) where you can cancel your new policy and get a full premium refund. It protects buyers from rushing into a decision.`},
  {q:"Can I cancel my NJ policy during the free look?", a:`Yes. If you’re within the free look period, just notify the insurer in writing and return the policy. You’ll get your money back, no penalty.`},
  {q:"Are free look rights the same for annuities in NJ?", a:`Yes. NJ law gives at least 10 days (sometimes 20 for seniors) on annuities too, to review and cancel for a refund.`},
  {q:"What happens if I find a better policy during the free look?", a:`You can accept the new one and cancel the old one within its free look window to avoid paying for both. Just be sure the new coverage is approved first to prevent gaps.`},
  {q:"Does NJ regulate life insurance replacements?", a:`Yes. Replacements must follow disclosure rules and comparison forms. That’s why I offer a **Free Audit** before you switch: ${LINK.audit}.`},
  {q:"Are NJ life insurance policies protected if my insurer fails?", a:`Yes. The New Jersey Life & Health Insurance Guaranty Association backs policies up to certain limits (currently $300,000 in death benefits, $100,000 in cash value).`},
  {q:"Is there a free look for health insurance in NJ?", a:`Yes, most health policies in NJ have a 10-day free look as well, giving you time to review terms and cancel if it doesn’t meet your needs.`},
  {q:"Does NJ have contestability rules?", a:`Yes. Like most states, NJ has a 2-year contestability period where the insurer can review misstatements if a claim is filed. After that, claims are incontestable (except for fraud).`},
  {q:"Does NJ require grace periods?", a:`Yes. State law requires at least a 30-day grace period on individual life policies. You can still pay within that window without losing coverage.`},
  {q:"Do NJ life insurance policies cover suicide?", a:`Most policies have a 2-year suicide exclusion period (standard nationwide). NJ follows this; after that, death by suicide is covered.`},
  {q:"Can minors be insured in NJ?", a:`Yes. Parents/guardians can buy juvenile life insurance. NJ requires the face amount to be reasonable relative to the child’s age.`},
  {q:"Are accelerated death benefits available in NJ?", a:`Yes. Many NJ-approved policies include accelerated benefits for terminal illness or critical illness. Ask during your **Quote & Apply**: ${LINK.quote}.`},
  {q:"Does NJ allow viatical or life settlements?", a:`Yes, but settlements are regulated by the NJ Department of Banking & Insurance. Only licensed settlement providers can purchase policies.`},
];

// ---------- Tiny matcher (keyword overlap + partials) ----------
function bestFaqAnswer(userText) {
  if (!userText) return null;
  const t = userText.toLowerCase();
  let best = {score:0, a:null};
  for (const f of FAQS) {
    const q = f.q.toLowerCase();
    // simple scoring: shared words + substring match
    let score = 0;
    if (t.includes(q)) score += 4;
    const words = q.split(/[^a-z0-9]+/).filter(w => w.length>2);
    for (const w of words) if (t.includes(w)) score += 1;
    // boost for exact keyword families
    if (/(ethos|instant)/.test(t) && /(ethos|instant)/.test(q)) score += 2;
    if (/(term|whole|universal|i ?ul|v ?ul)/.test(t) && /(term|whole|universal|i ?ul|v ?ul)/.test(q)) score += 2;
    if (/(rider|convert|ladder|return of premium)/.test(t) && /(rider|convert|ladder|return of premium)/.test(q)) score += 2;
    if (score > best.score) best = {score, a: f.a};
  }
  return best.score >= 3 ? best.a : null; // threshold to avoid random hits
}

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
    const { history = [], user = "" } = JSON.parse(event.body || "{}");

    // 1) Try FAQ first
    const faq = bestFaqAnswer(user);
    if (faq) {
      return {
        statusCode: 200,
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ reply: faq })
      };
    }

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
