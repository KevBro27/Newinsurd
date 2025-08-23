import React, { useEffect, useRef, useState } from "react";
import TrustedCarriers from "../components/TrustedCarriers";

declare global {
  interface Window {
    Strife?: { init?: (opts: { target: string; key?: string }) => void };
  }
}

const QuoteAndApplyPage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newDescription =
      "Get instant, transparent life insurance quotes from A-rated carriers in New Jersey. Use our secure, powerful tool to analyze the market and apply in minutes.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", newDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", newDescription);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", newDescription);

    // 1) ensure a clean mount target
    const targetId = "container-id";
    if (mountRef.current) {
      mountRef.current.id = targetId;
      mountRef.current.innerHTML = ""; // clear placeholder before init
    }

    // 2) watch for the iframe, hide spinner once it appears
    const obs = new MutationObserver(() => {
      const hasIFrame = !!document.querySelector(`#${targetId} iframe`);
      if (hasIFrame) {
        setLoading(false);
        // give embedders a nudge to recompute size
        requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      }
    });
    if (mountRef.current) obs.observe(mountRef.current, { childList: true, subtree: true });

    // 3) load or re-init the script
    const existing = document.getElementById("strife") as HTMLScriptElement | null;
    const init = () => {
      // some vendors expose window.Strife.init; others auto-run via data-* attributes
      if (window.Strife?.init) {
        window.Strife.init({ target: `#${targetId}` });
      }
      // reflow nudge in case it measured a zero-sized parent first
      setTimeout(() => window.dispatchEvent(new Event("resize")), 250);
    };

    if (existing) {
      // re-init on SPA navigation
      init();
    } else {
      const script = document.createElement("script");
      script.id = "strife";
      script.src = "https://cdn.quoteandapply.io/widget.js";
      script.async = true;
      // data-* config (used by many embeds to find container/key)
      script.setAttribute("data-strife-key", "T-RdXnhcWNMxMkZr");
      script.setAttribute("data-strife-container-id", targetId);
      script.onload = () => init();
      script.onerror = () => setLoading(false);
      document.body.appendChild(script);
    }

    // failsafe: stop showing our spinner if nothing renders in 8s
    const timeout = setTimeout(() => setLoading(false), 8000);

    // cleanup
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
      // DO NOT remove the script on unmount—keep it global.
      // Just clear the container so a future visit re-renders cleanly.
      const container = document.getElementById(targetId);
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <section id="quoter" className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Instantly Compare Quotes from <span className="text-brand-gold">A‑Rated Carriers</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text mb-12">
            Use our secure, powerful tool to analyze the market and find the best rate for your New Jersey family.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <TrustedCarriers />
          </div>

          <div className="kbj-qa-shell max-w-4xl w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
            <header className="px-5 pt-5 pb-3 text-left">
              <h2 className="text-lg font-semibold text-brand-navy">Quote &amp; Apply</h2>
              <p className="text-sm text-gray-500">Fast, simple, and secure.</p>
            </header>

            {/* target mount */}
            <div className="kbj-qa-frame px-4 pb-6">
              {/* BackNine injects an iframe here */}
              <div ref={mountRef} />
              {/* overlay spinner (hidden once iframe appears) */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-brand-gold" />
                  <p className="mt-3 text-sm text-brand-navy font-medium">Loading secure quoter…</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuoteAndApplyPage;
