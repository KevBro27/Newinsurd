import React, { useState, useEffect } from 'react';

/** Cloud Run base URL (no trailing slash) */
const CLOUD_RUN_URL = "https://oracle-agent-282548823162.us-east1.run.app";

/** Optional: set a client-side max file size (in MB) to catch huge uploads early */
const MAX_FILE_MB = 25; // Cloud Run default request limit ~32MB; stay under that.

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const DecisionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-navy flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const FreeAuditPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const newDescription = "Think you might be overpaying for your life insurance? Use our free, confidential audit tool to get a no-risk analysis of your current policy.";
    document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // We will send to Cloud Run, then let Netlify submit normally.
    if (isSubmitting) return; // prevent double-submits
    setIsSubmitting(true);
    setSubmitError(null);

    const formEl = e.currentTarget;
    const fileInput = formEl.querySelector<HTMLInputElement>('#policy-file');
    const theFile = fileInput?.files?.[0];

    // Client-side checks (nice UX; backend still validates)
    if (!theFile) {
      setIsSubmitting(false);
      setSubmitError("Please attach your policy document before submitting.");
      return;
    }
    const sizeMb = theFile.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB) {
      setIsSubmitting(false);
      setSubmitError(`File is too large (${sizeMb.toFixed(1)} MB). Please upload a file under ${MAX_FILE_MB} MB.`);
      return;
    }

    const formData = new FormData(formEl);

    // 🔎 Temporary debug log – confirm the file is present in FormData
    // Remove this line later if you prefer.
    // You should see: ["policy-file", File], ["name", "..."], ["email", "..."]
    console.log([...formData.entries()]);

    try {
      const oracleRes = await fetch(`${CLOUD_RUN_URL}/webhook/policy-audit`, {
        method: "POST",
        body: formData, // includes name, email, and 'policy-file'
      });

      if (!oracleRes.ok) {
        console.error(`ORACLE error: ${oracleRes.status}`);
        setSubmitError("We had trouble submitting the file to our secure analyzer. Your info will still be logged.");
      }
    } catch (err) {
      console.error("ORACLE fetch failed:", err);
      setSubmitError("We had trouble submitting the file to our secure analyzer. Your info will still be logged.");
    } finally {
      // Always let Netlify do its normal submit (reCAPTCHA + submissions log + redirect)
      formEl.submit();
    }
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Let's Make Sure You Have the <span className="text-brand-gold">Best Plan.</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
            Your existing policy might have hidden gaps or costly inefficiencies. Our free, no-obligation audit gives you the clarity you deserve in three simple steps.
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-20 text-center">
          <div className="flex flex-col items-center">
            <UploadIcon />
            <h3 className="text-xl font-bold text-brand-navy mt-4">1. Upload Securely</h3>
            <p className="text-brand-body-text mt-2">Upload a copy of your current policy statement. Our platform is secure and your data is kept confidential.</p>
          </div>
          <div className="flex flex-col items-center">
            <ReportIcon />
            <h3 className="text-xl font-bold text-brand-navy mt-4">2. Get Your Report</h3>
            <p className="text-brand-body-text mt-2">Our experts analyze your policy against current market offerings, identifying potential savings and coverage improvements.</p>
          </div>
          <div className="flex flex-col items-center">
            <DecisionIcon />
            <h3 className="text-xl font-bold text-brand-navy mt-4">3. Make a Decision</h3>
            <p className="text-brand-body-text mt-2">We provide a clear, actionable report. The choice to switch or stay is always yours—no pressure, just honest advice.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl border-2 border-brand-gold">
          <h2 className="text-3xl font-bold text-center text-brand-navy mb-6">Get Your Free Audit Started</h2>

          <form
            name="policy-audit"
            method="POST"
            encType="multipart/form-data"              /* ✅ required for files */
            data-netlify="true"                        /* ✅ Netlify Forms tracking */
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
            action="/#/thank-you"                      /* ✅ Netlify redirect after submission */
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="policy-audit" />
            <p className="hidden">
              <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
            </p>

            <div className="mb-8 bg-amber-50 p-4 rounded-lg border-l-4 border-brand-gold">
              <div className="flex items-start">
                <InfoIcon />
                <div className="ml-3">
                  <h4 className="text-base font-bold text-brand-navy">Please Note: This is a Manual, Expert Review.</h4>
                  <p className="mt-1 text-sm text-brand-body-text">
                    Unlike automated calculators, your policy will be personally reviewed by me to find every possible advantage. Please allow up to 24 business hours to receive your completed, confidential audit report in your inbox. This ensures you get a real, strategic analysis, not a generic computer-generated guess.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="name" className="block text-brand-body-text font-semibold mb-2">Full Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-brand-body-text font-semibold mb-2">Email Address</label>
              <input type="email" id="email" name="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
            </div>

            <div className="mb-8">
              <label htmlFor="policy-file" className="block text-brand-body-text font-semibold mb-2">Upload Policy Document (PDF, JPG, PNG)</label>
              <input
                type="file"
                id="policy-file"
                name="policy-file"                      /* ✅ matches backend */
                accept="application/pdf,image/*"
                className="w-full text-sm text-brand-body-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-navy hover:file:bg-brand-gold-dark"
                required
              />
              <p className="mt-2 text-xs text-gray-500">Max file size ~{MAX_FILE_MB}MB. Supported: PDF, JPG, PNG.</p>
            </div>

            <div data-netlify-recaptcha="true" className="mb-8"></div>

            {submitError && (
              <p className="mb-4 text-sm text-red-600">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/20 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300 flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Processing...
                </>
              ) : (
                'Submit for My Free Analysis'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeAuditPage;
