import React, { useEffect } from 'react';
import TrustedCarriers from '../components/TrustedCarriers';

const QuoteAndApplyPage: React.FC = () => {
  useEffect(() => {
    const newDescription = "Get instant, transparent life insurance quotes from A-rated carriers in New Jersey. Use our secure, powerful tool to analyze the market and apply in minutes.";
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);

    // Check if the script is already on the page to avoid duplicates
    if (document.getElementById('strife')) {
        return;
    }
    
    const script = document.createElement('script');
    script.id = 'strife';
    script.src = 'https://cdn.quoteandapply.io/widget.js';
    script.setAttribute('data-strife-key', 'T-RdXnhcWNMxMkZr');
    script.setAttribute('data-strife-container-id', 'container-id');
    script.async = true;

    document.body.appendChild(script);

    // Cleanup function to run when the component unmounts
    return () => {
      const strifeScript = document.getElementById('strife');
      if (strifeScript) {
        document.body.removeChild(strifeScript);
      }
      const container = document.getElementById('container-id');
      if (container) {
          container.innerHTML = '';
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <section id="quoter" className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Instantly Compare Quotes from <span className="text-brand-gold">A-Rated Carriers</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text mb-12">
            Use our secure, powerful tool to analyze the market and find the best rate for your New Jersey family.
          </p>

          <div className="max-w-4xl mx-auto mb-12">
            <TrustedCarriers />
          </div>

          {/* --- THIS IS THE CORRECTED CONTAINER --- */}
          <div 
            id="container-id" 
            className="max-w-4xl w-full mx-auto bg-gray-50 p-4 rounded-xl border-2 border-brand-gold transition-all duration-300 flex justify-center items-center min-h-[600px]"
            style={{ 
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)'
            }}
          >
             {/* This placeholder content will be replaced by the Strife widget once it loads. */}
             <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-gold"></div>
                <p className="mt-4 text-brand-navy font-semibold">Loading secure quoter...</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuoteAndApplyPage;
