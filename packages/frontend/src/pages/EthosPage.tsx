

import React from 'react';

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const EthosPage: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Get Your Instant Decision: <span className="text-brand-gold">Life Insurance in Minutes</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
            For New Jersey residents who value speed and simplicity, we proudly partner with Ethos to offer a 100% digital experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column: Logo */}
          <div className="flex justify-center items-center bg-gray-50 p-8 rounded-lg border-2 border-brand-gold">
             <img 
                src="https://i.postimg.cc/856RTzsq/new-ethos-logo.png"
                alt="Ethos Logo" 
                className="w-48"
              />
          </div>
          {/* Right Column: Benefits */}
          <div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-brand-body-text text-lg">100% online application from start to finish.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-brand-body-text text-lg">Often no medical exam is required.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-brand-body-text text-lg">Get a final decision in minutes, not weeks.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="text-brand-body-text text-lg">Backed by A-rated, trusted carriers.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Testimonial Block */}
        <div className="text-center mb-20">
             <h2 className="text-3xl font-bold text-brand-navy mb-8">Why Clients Love the Ethos Process</h2>
             <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg border-2 border-brand-gold">
              <p className="text-lg italic text-brand-body-text">"I couldn't believe how fast and easy it was. I applied on my phone during my lunch break and had an approval before I went back to work. Amazing!"</p>
              <p className="mt-4 font-bold text-brand-navy">- Sarah K., an Ethos Client</p>
            </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
            <a
                href="https://app.ethoslife.com/partner/cca97/q/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 bg-brand-gold text-brand-navy font-bold text-xl rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
            >
                Start My Ethos Instant Application
            </a>
        </div>

      </div>
    </div>
  );
};

export default EthosPage;