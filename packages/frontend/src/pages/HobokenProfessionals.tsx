import React, { useEffect } from "react";

/** Hoboken Professionals — Landing Page (React/Tailwind, boxed layout) */
const HobokenProfessionals: React.FC = () => {
  useEffect(() => {
    const title = "Life Insurance for Hoboken Professionals | KBJ Insurance";
    const desc =
      "Instant, digital life insurance for Hoboken professionals. A‑rated carriers, fast quotes, and no-hassle application — done in minutes.";
    document.title = title;
    const m = (name: string) => document.querySelector(`meta[name="${name}"]`);
    m("description")?.setAttribute("content", desc);
    (document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.setAttribute("content", title);
    (document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.setAttribute("content", desc);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-tr from-indigo-600 to-purple-700 text-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Life Insurance for{" "}
            <span className="text-[#FBBF24]">Hoboken Professionals</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Skip paperwork and phone tag. Compare A‑rated carriers, apply online,
            and secure coverage in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.back9ins.com/apply/KevinBrown"
              className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-gray-100 shadow"
            >
              🚀 Get Quote & Apply
            </a>
            <a
              href="https://app.ethoslife.com/partner/cca97/q/goals"
              className="px-6 py-3 rounded-xl bg-[#FBBF24] text-black font-semibold hover:opacity-90 shadow"
            >
              ⏱ Instant Decision
            </a>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Serving Hoboken 07030 & Hudson County
          </p>
        </div>
      </section>

      {/* AUDIO BLURB (optional) */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] text-center">
              Why Hoboken Professionals Choose Us{" "}
              <span className="block text-sm font-normal text-slate-500">
                (30 seconds)
              </span>
            </h2>
            <audio controls className="w-full mt-4 rounded">
              {/* replace with your audio url if you have one */}
              <source src="" type="audio/mpeg" />
            </audio>
            <p className="mt-4 text-slate-700 text-center">
              Get transparent quotes, digital applications, and guidance from a
              strategic advisor — not a pushy salesperson.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold text-[#1F2937] text-center">
            Built for Busy Professionals
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Digital from start to finish", "Apply online. E‑sign. No office visits."],
              ["A‑rated carriers only", "We shop the market so you don’t overpay."],
              ["Fast decisions", "Accelerated/no‑exam options when you qualify."],
              ["Budget‑first planning", "Protect what matters without overspending."],
              ["Conversion flexibility", "Start term; convert later if your needs change."],
              ["Local expertise", "NJ‑focused advice with national carrier access."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6">
                <div className="text-lg font-semibold text-[#1F2937]">{title}</div>
                <p className="mt-2 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold text-[#1F2937] text-center">How It Works</h3>
          <ol className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              ["1) Compare", "Get instant quotes from top carriers."],
              ["2) Apply", "Digital app; many cases skip the exam."],
              ["3) Activate", "Get approved and sleep better tonight."],
            ].map(([step, body]) => (
              <li key={step} className="rounded-2xl shadow-sm ring-1 ring-gray-100 bg-gray-50 p-6">
                <div className="font-semibold text-[#1F2937]">{step}</div>
                <p className="mt-2 text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-center">
            <a href="/free-audit" className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              Or upload your current policy for a Free Audit →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold text-[#1F2937] text-center">FAQs</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {[
              ["Do I need a medical exam?", "Often no. Many carriers offer accelerated/no‑exam underwriting based on your profile."],
              ["Term vs Whole?", "Term is affordable, time‑bound protection. Whole lasts for life and builds cash value."],
              ["How fast can I be covered?", "Instant decisions are possible; traditional underwriting can take 2–6 weeks."],
              ["Can I change or convert later?", "Yes—many term policies allow conversion to permanent without a new exam."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6">
                <div className="font-semibold text-[#1F2937]">{q}</div>
                <p className="mt-2 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-16 bg-[#1F2937]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h3 className="text-3xl font-extrabold text-white">
            More Than a Policy. A Partnership.
          </h3>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/quote-and-apply" className="px-6 py-3 rounded-xl bg-[#FBBF24] text-black font-semibold hover:opacity-90">Get Quotes</a>
            <a href="/contact" className="px-6 py-3 rounded-xl bg-white text-[#1F2937] font-semibold hover:bg-gray-100">Talk to Kevin</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HobokenProfessionals;
