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
