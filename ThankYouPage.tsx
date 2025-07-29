
import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ThankYouPage: React.FC = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border-2 border-brand-gold text-center flex flex-col items-center">
            <CheckIcon />
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mt-6">
                Thank You. Your Request is Being <span className="text-brand-gold">Processed.</span>
            </h1>
            <h2 className="mt-2 text-xl text-brand-body-text font-semibold">This is where the strategic advantage begins.</h2>
            
            <div className="mt-6 max-w-2xl text-lg text-brand-body-text space-y-4">
              <p>
                I've successfully received your submission.
              </p>
              <p>
                Unlike instant, generic calculators, I am now personally reviewing the information you provided to build your custom report. This human-first approach ensures you get the most accurate and valuable insights.
              </p>
              <p>
                Please check your inbox within the next <strong>1-2 business hours</strong> for your completed 'Free Audit' or 'Possibility Report'.
              </p>
              <p>
                While you wait, feel free to explore some of the playbooks that drive my strategy.
              </p>
            </div>

            <Link
                to="/articles"
                className="mt-8 px-10 py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
            >
                Explore the Playbook
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
