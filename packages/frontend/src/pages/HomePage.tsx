

import React, { useState, useEffect } from 'react';
import DiagnosticModal from '../components/DiagnosticModal';
import TrustedCarriers from '../components/TrustedCarriers';
import { CheckCircleIcon, UserGroupIcon, QuestionMarkCircleIcon } from '../components/icons/FeatureIcons';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const newDescription = "Get a strategic advantage for your family. KBJ Insurance offers a free, instant diagnostic for New Jersey residents to find better rates and stronger life insurance coverage.";
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://i.postimg.cc/65DzPsST/the-strategic-advantage.png')` }}
      >
        {/* The overlay div has been removed */}
        <div className="relative z-10 p-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand-gold tracking-tight leading-tight [text-shadow:0px_2px_5px_rgba(0,0,0,0.6)]">
            Give Your Family an Unfair Advantage
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white [text-shadow:0px_2px_5px_rgba(0,0,0,0.6)]">
            Stop guessing about your financial security. Our intelligent platform provides the clarity you need to protect what matters most. Built for New Jersey.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 px-10 py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
          >
            Find My Path Now
          </button>
        </div>
      </section>

      {/* Trusted Carrier Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-xl font-semibold text-brand-navy uppercase tracking-wider">
            Access to the Industry's Most Trusted Names
          </h2>
          <TrustedCarriers />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-2">Trusted by New Jersey Families</h2>
          <p className="text-brand-body-text mb-12">We are committed to providing exceptional service and value.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-brand-gold">
              <p className="text-lg italic text-brand-body-text">"The process was so simple. I finally have peace of mind knowing my family is covered."</p>
              <p className="mt-4 font-bold text-brand-navy">- Jessica M., <span className="text-brand-gold">Cherry Hill, NJ</span></p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-brand-gold">
              <p className="text-lg italic text-brand-body-text">"A truly modern approach. The policy audit found gaps I never would have noticed."</p>
              <p className="mt-4 font-bold text-brand-navy">- David R., <span className="text-brand-gold">Jersey City, NJ</span></p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-brand-gold">
              <p className="text-lg italic text-brand-body-text">"Finally, an insurance platform that doesn't feel like it's from the stone age. Highly recommend."</p>
              <p className="mt-4 font-bold text-brand-navy">- Sarah L., <span className="text-brand-gold">Montclair, NJ</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Advisor Section */}
      <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                  <img src="https://i.postimg.cc/NMwBgf0V/KBJInsurance-logo.jpg" alt="The official logo for KBJ Insurance." className="w-full max-w-xs mx-auto"/>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-brand-navy">More Than a Platform, a Partner</h2>
                  <p className="mt-4 text-lg text-brand-body-text">
                      We combine cutting-edge technology with real, human expertise. Our licensed advisors are dedicated to the New Jersey community, providing personalized guidance to ensure you're not just buying a policy—you're making a strategic investment in your family's future. We're here to translate complexity into confidence.
                  </p>
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-brand-gold">
              <h3 className="font-bold text-lg text-brand-navy">Why focus only on New Jersey?</h3>
              <p className="mt-2 text-brand-body-text">By concentrating on New Jersey, we have a deep understanding of the local market, regulations, and financial landscape. This allows us to provide more relevant and effective advice.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-brand-gold">
              <h3 className="font-bold text-lg text-brand-navy">Is the policy audit really free?</h3>
              <p className="mt-2 text-brand-body-text">Yes, 100% free with no obligation. Our goal is to provide value upfront. We believe that by demonstrating our expertise and identifying potential savings or coverage gaps, you'll see the benefit of working with us.</p>
            </div>
             <div className="bg-gray-50 p-6 rounded-lg border-2 border-brand-gold">
              <h3 className="font-bold text-lg text-brand-navy">How is this different from other insurance websites?</h3>
              <p className="mt-2 text-brand-body-text">We are a consultative platform, not just a quote engine. We start by understanding your unique situation—whether you have a policy or are starting fresh—and guide you to the right tool, saving you time and preventing confusion.</p>
            </div>
          </div>
        </div>
      </section>


      <DiagnosticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;