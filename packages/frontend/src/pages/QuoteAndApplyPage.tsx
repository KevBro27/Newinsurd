// src/pages/QuoteApply.tsx (or your component for /quote-and-apply)
import { useEffect, useRef, useState } from "react";

export default function QuoteApply() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Remove any previous instance (helps when navigating SPA routes)
    if (mountRef.current) mountRef.current.innerHTML = '<div id="kbj-backnine-target"></div>';

    // Inject BackNine script once per visit
    const s = document.createElement("script");
    // 👉 replace with the exact BackNine script src you were given
    s.src = "https://cdn.quoteandapply.io/widget.js";
    s.async = true;

    s.onload = () => {
      // If BackNine exposes an init, call it. Otherwise, the script usually auto-injects into the target.
      // @ts-ignore
      if (window.BackNine?.init) {
        // @ts-ignore
        window.BackNine.init({ target: "#kbj-backnine-target" });
      }
      // Force a resize shortly after mount (solves “spinner because zero-size at first paint”)
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      setReady(true);
    };

    s.onerror = () => setReady(true); // fail open so the page still renders

    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <main className="px-4 py-8">
      <div className="kbj-qa-shell max-w-5xl mx-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <header className="p-5 border-b">
          <h1 className="text-xl font-semibold">Quote &amp; Apply</h1>
          <p className="text-sm text-gray-500">Fast, simple, and secure.</p>
        </header>

        {!ready && (
          <div className="p-8 text-center text-gray-500">Loading secure quoter…</div>
        )}

        <div ref={mountRef} className="kbj-qa-frame p-4">
          {/* BackNine will inject an iframe inside this target */}
          <div id="kbj-backnine-target" />
        </div>
      </div>
    </main>
  );
}
