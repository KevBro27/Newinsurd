import React, { useEffect } from "react";

/** Princeton Families — Landing Page (React/Tailwind, boxed layout) */
const PrincetonFamilies: React.FC = () => {
  useEffect(() => {
    const title = "Life Insurance for Princeton Families | KBJ Insurance";
    const desc =
      "Whole and term life insurance tailored for Princeton families. A‑rated carriers, custom coverage, and digital application with expert guidance.";
    document.title = title;
    const m = (name: string) => document.querySelector(`meta[name="${name}"]`);
    m("description")?.setAttribute("content", desc);
    (document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.setAttribute("content", title);
    (document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.setAttribute("content", desc);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <header className="bg-gradient-to-tr from-indigo-600 to-purple-700 text-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Protect Your Family’s <span className="text-[#FBBF24]">Legacy</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Tailored coverage for Princeton families — whole life, term, and advanced options with
            A‑rated carriers.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://apply.ethos.com/k/kevinbrown"
              className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-gray-100 shadow"
            >
              ⚡ Instant Decision
            </a>
            <a
              href="https://app.back9ins.com/apply/KevinBrown"
              className="px-6 py-3 rounded-xl bg-[#FBBF24] text-black font-semibold hover:opacity-90 shadow"
            >
              📊 Get Custom Quote
            </a>
          </div>
        </div>
      </header>

      {/* AUDIO MESSAGE (optional) */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] text-center">
              A Personal Message for Princeton Families
            </h2>
            <audio controls className="w-full mt-4 rounded">
              {/* replace with your audio url if you have one */}
              <source src="" type="audio/mpeg" />
            </audio>
            <p className="mt-4 text-slate-700 text-center">
              Preserve what you’ve built. Protect college plans, the mortgage, and generational
              wealth with a strategic policy design.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE SECTIONS */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold text-[#1F2937] text-center">Why Families Choose Us</h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Legacy planning", "Coordinate beneficiary designations and conversion options."],
              ["Cash value options", "Whole/IUL strategies for long‑term goals."],
              ["High face amounts", "$1M+ coverage available for qualified applicants."],
              ["Transparent comparisons", "Side‑by‑side carrier quotes and riders."],
              ["Doctor‑free options", "Accelerated/no‑exam where available."],
              ["Local + personal", "Work directly with Kevin. NJ expertise, national carriers."],
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
              ["1) Profile", "Share family goals, timeline, and budget."],
              ["2) Compare", "We shop carriers and rider configurations."],
              ["3) Activate", "Fast digital application and ongoing support."],
            ].map(([step, body]) => (
              <li key={step} className="rounded-2xl shadow-sm ring-1 ring-gray-100 bg-gray-50 p-6">
                <div className="font-semibold text-[#1F2937]">{step}</div>
                <p className="mt-2 text-slate-600">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-center">
            <a href="/free-audit" className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50">
              Already insured? Get a Free Policy Audit →
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
              ["How much coverage do we need?", "Common rule is 10–15× income plus debts/college minus savings. We’ll tailor it to your situation."],
              ["Can we add riders for kids?", "Yes—child riders are common and affordable. We’ll show options."],
              ["What if our needs change?", "Convertible term and policy ladders keep your plan flexible."],
              ["Will premiums ever increase?", "Level term premiums stay fixed for the term. We’ll design perm premiums to be predictable."],
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
            Insurance, Strategically.
          </h3>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/quote-and-apply" className="px-6 py-3 rounded-xl bg-[#FBBF24] text-black font-semibold hover:opacity-90">
              Get Quotes
            </a>
            <a href="/contact" className="px-6 py-3 rounded-xl bg-white text-[#1F2937] font-semibold hover:bg-gray-100">
              Talk to Kevin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrincetonFamilies;
