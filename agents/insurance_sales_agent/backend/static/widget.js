/* KBJ Insurance — AI Sales Agent Widget (no framework, no build)
   - Drop this file at /widget.js and reference with a <script> tag.
   - Set API_BASE to your Cloud Run Sales Agent base URL (no trailing slash).
*/
(function () {
  const API_BASE = "https://<your-sales-agent-service>.run.app"; // TODO: set me!
  const STORAGE_KEY = "kbj_sales_convo";
  const BRAND = { gold: "#FBBF24", navy: "#1F2937", body: "#4B5563" };

  // --- conversation id in localStorage ---
  let convoId = localStorage.getItem(STORAGE_KEY);
  if (!convoId) {
    convoId = Math.random().toString(36).slice(2, 10);
    localStorage.setItem(STORAGE_KEY, convoId);
  }

  // --- host container + shadow root ---
  const host = document.createElement("div");
  host.id = "kbj-agent-host";
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  // --- styles (scoped in shadow DOM) ---
  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    .kbj-btn { cursor: pointer; border: 0; }
    .kbj-bubble {
      position: fixed; right: 20px; bottom: 20px; z-index: 2147483646;
      background: ${BRAND.gold}; color: ${BRAND.navy}; font-weight: 700;
      border-radius: 9999px; padding: 12px 16px; box-shadow: 0 10px 20px rgba(0,0,0,.15);
    }
    .kbj-panel {
      position: fixed; right: 20px; bottom: 84px; z-index: 2147483646;
      width: 340px; max-height: 70vh; background: #fff; color: ${BRAND.body};
      border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 18px 35px rgba(0,0,0,.2);
      display: none; overflow: hidden; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
    }
    .kbj-header {
      background: #fff; color: ${BRAND.navy}; font-weight: 800; font-size: 14px;
      padding: 12px 14px; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between;
    }
    .kbj-close { background: transparent; font-size: 18px; color: ${BRAND.navy}; }
    .kbj-messages { padding: 12px; overflow-y: auto; max-height: 48vh; }
    .kbj-row { margin: 8px 0; display: flex; }
    .kbj-me { justify-content: flex-end; }
    .kbj-me .kbj-bubble-msg { background: rgba(251,191,36,.2); color: ${BRAND.navy}; }
    .kbj-bot .kbj-bubble-msg { background: #f3f4f6; }
    .kbj-bubble-msg {
      padding: 8px 10px; border-radius: 12px; max-width: 85%; line-height: 1.35; font-size: 13px; white-space: pre-wrap;
      box-shadow: 0 1px 0 rgba(0,0,0,.03);
    }
    .kbj-cta-wrap { padding: 0 12px 8px 12px; }
    .kbj-apply { width: 100%; background: ${BRAND.gold}; color: ${BRAND.navy}; font-weight: 800; padding: 10px 12px; border-radius: 10px; }
    .kbj-inputbar { border-top: 1px solid #f3f4f6; padding: 8px; display: flex; gap: 6px; }
    .kbj-input { flex: 1; border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px 10px; font-size: 13px; }
    .kbj-send { background: ${BRAND.gold}; color: ${BRAND.navy}; font-weight: 700; border-radius: 10px; padding: 8px 12px; }
    .kbj-footnote { padding: 8px 12px; font-size: 10px; color: #6b7280; border-top: 1px solid #f3f4f6; }
    .kbj-lead {
      display:none; padding: 12px; border-top: 1px dashed #e5e7eb; background: #fff;
    }
    .kbj-lead input {
      width: 100%; padding: 8px 10px; font-size: 13px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 8px;
    }
    .kbj-lead .kbj-lead-btn { width: 100%; background: ${BRAND.navy}; color: #fff; font-weight: 700; padding: 9px 12px; border-radius: 10px; }
    .kbj-bar-actions {
      display:flex; justify-content: space-between; align-items:center; gap:8px; padding: 0 12px 8px 12px;
    }
    .kbj-secondary { background: transparent; color: ${BRAND.navy}; font-weight: 700; text-decoration: underline; }
  `;
  shadow.appendChild(style);

  // --- DOM structure ---
  const bubble = document.createElement("button");
  bubble.className = "kbj-btn kbj-bubble";
  bubble.textContent = "KBJ Assistant";

  const panel = document.createElement("div");
  panel.className = "kbj-panel";

  const header = document.createElement("div");
  header.className = "kbj-header";
  header.innerHTML = `<span>KBJ Insurance Assistant</span>`;

  const close = document.createElement("button");
  close.className = "kbj-btn kbj-close";
  close.setAttribute("aria-label", "Close");
  close.textContent = "×";

  header.appendChild(close);

  const messages = document.createElement("div");
  messages.className = "kbj-messages";

  const ctaWrap = document.createElement("div");
  ctaWrap.className = "kbj-cta-wrap";

  const inputBar = document.createElement("div");
  inputBar.className = "kbj-inputbar";
  const input = document.createElement("input");
  input.className = "kbj-input";
  input.placeholder = "Ask about coverage, price, etc…";
  const sendBtn = document.createElement("button");
  sendBtn.className = "kbj-btn kbj-send";
  sendBtn.textContent = "Send";
  inputBar.appendChild(input);
  inputBar.appendChild(sendBtn);

  const footnote = document.createElement("div");
  footnote.className = "kbj-footnote";
  footnote.textContent = "Educational guidance only. For instant decision, use the Apply button.";

  // Fallback lead form
  const leadBox = document.createElement("div");
  leadBox.className = "kbj-lead";
  leadBox.innerHTML = `
    <div style="font-weight:800; color:${BRAND.navy}; margin-bottom:6px;">Prefer a callback?</div>
    <input type="text" placeholder="Full name" id="kbj-lead-name"/>
    <input type="email" placeholder="Email" id="kbj-lead-email"/>
    <input type="tel" placeholder="Phone" id="kbj-lead-phone"/>
    <button class="kbj-btn kbj-lead-btn" id="kbj-lead-submit">Request a callback</button>
    <div id="kbj-lead-msg" style="font-size:12px; color:#059669; margin-top:6px; display:none;">Thanks! We’ll reach out shortly.</div>
  `;

  // bar actions (show/hide lead form)
  const barActions = document.createElement("div");
  barActions.className = "kbj-bar-actions";
  const leadToggle = document.createElement("button");
  leadToggle.className = "kbj-btn kbj-secondary";
  leadToggle.textContent = "Prefer a callback?";
  barActions.appendChild(leadToggle);

  panel.appendChild(header);
  panel.appendChild(messages);
  panel.appendChild(ctaWrap);
  panel.appendChild(barActions);
  panel.appendChild(leadBox);
  panel.appendChild(inputBar);
  panel.appendChild(footnote);

  shadow.appendChild(bubble);
  shadow.appendChild(panel);

  // --- helpers ---
  function addMsg(role, text) {
    const row = document.createElement("div");
    row.className = "kbj-row " + (role === "me" ? "kbj-me" : "kbj-bot");
    const b = document.createElement("div");
    b.className = "kbj-bubble-msg";
    b.textContent = text;
    row.appendChild(b);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function setApply(url) {
    ctaWrap.innerHTML = "";
    if (!url) return;
    const btn = document.createElement("button");
    btn.className = "kbj-btn kbj-apply";
    btn.textContent = "Apply Now — Instant Decision";
    btn.onclick = () => window.open(url, "_blank", "noopener,noreferrer");
    ctaWrap.appendChild(btn);
  }

  async function postChat(userText) {
    addMsg("me", userText);
    try {
      const res = await fetch(API_BASE + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: convoId, message: userText })
      });
      const data = await res.json();
      addMsg("bot", data.reply || "…");
      // Apply URL priority (Ethos/BackNine) from backend
      if (data.next_actions && data.next_actions.apply_url) {
        setApply(data.next_actions.apply_url);
      } else {
        setApply(null);
      }
      // Let the site listen for updates if it wants
      try {
        window.dispatchEvent(new CustomEvent("kbj:lead_updated", { detail: data.lead || {} }));
      } catch(_) {}
    } catch (e) {
      addMsg("bot", "Sorry, I had trouble reaching our assistant. Please try again.");
    }
  }

  async function submitLead() {
    const name = shadow.getElementById("kbj-lead-name").value.trim();
    const email = shadow.getElementById("kbj-lead-email").value.trim();
    const phone = shadow.getElementById("kbj-lead-phone").value.trim();
    const msgEl = shadow.getElementById("kbj-lead-msg");
    if (!name || !email) {
      msgEl.style.display = "block";
      msgEl.style.color = "#DC2626";
      msgEl.textContent = "Please add at least your name and email.";
      return;
    }
    try {
      const res = await fetch(API_BASE + "/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: convoId, name, email, phone })
      });
      if (res.ok) {
        msgEl.style.display = "block";
        msgEl.style.color = "#059669";
        msgEl.textContent = "Thanks! We’ll reach out shortly.";
      } else {
        msgEl.style.display = "block";
        msgEl.style.color = "#DC2626";
        msgEl.textContent = "Hmm, couldn’t save that just now.";
      }
    } catch (e) {
      msgEl.style.display = "block";
      msgEl.style.color = "#DC2626";
      msgEl.textContent = "Network error. Please try again.";
    }
  }

  // --- wire up UI ---
  let open = false;
  function togglePanel(force) {
    open = typeof force === "boolean" ? force : !open;
    panel.style.display = open ? "block" : "none";
  }

  bubble.addEventListener("click", () => togglePanel(true));
  close.addEventListener("click", () => togglePanel(false));
  sendBtn.addEventListener("click", () => {
    const t = input.value.trim();
    if (!t) return;
    input.value = "";
    postChat(t);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const t = input.value.trim();
      if (!t) return;
      input.value = "";
      postChat(t);
    }
  });
  leadToggle.addEventListener("click", () => {
    leadBox.style.display = leadBox.style.display === "block" ? "none" : "block";
  });
  leadBox.querySelector("#kbj-lead-submit").addEventListener("click", submitLead);

  // --- initial greeting ---
  addMsg("bot", "Hi! I can explain options and send you to our instant-apply tool for a quick decision. What questions do you have?");
})();
