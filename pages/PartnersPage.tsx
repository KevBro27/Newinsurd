
import React from 'react';

// --- Icon Components ---
const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0M3 13.5a3 3 0 013-3h1.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-1.5a3 3 0 01-3-3v-4.5zM12 13.5a3 3 0 013-3h1.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-1.5a3 3 0 01-3-3v-4.5z" />
    </svg>
);

const GearsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-9.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h-2.25a2.25 2.25 0 00-2.25 2.25v.75c0 1.242 1.008 2.25 2.25 2.25H15m0-4.5h2.25a2.25 2.25 0 012.25 2.25v.75c0 1.242-1.008 2.25-2.25 2.25H15m-3-4.5V15" />
    </svg>
);


const PartnersPage: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Become a <span className="text-brand-gold">Strategic Partner</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
            Provide More Value to Your Clients. Create a New Revenue Stream.
          </p>
        </div>

        {/* Section 1: For Professionals */}
        <section className="max-w-4xl mx-auto mb-16 md:mb-20 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">For Financial Advisors, CPAs, and Realtors in New Jersey</h2>
          <p className="text-lg text-brand-body-text">
            Your clients trust you for expert advice. When they have questions about life insurance, you need a trusted resource who will provide a seamless, no-pressure experience that reflects well on your brand.
          </p>
        </section>
        
        {/* Section 2: The Offer */}
        <section className="max-w-4xl mx-auto mb-16 md:mb-20 bg-gray-50 p-8 rounded-xl border-2 border-brand-gold">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Core Offer: The Free Policy Audit</h2>
            <p className="text-lg text-brand-body-text">
              We offer a complimentary, no-risk policy audit for your clients. It's a powerful way for you to add value, identify financial gaps, and ensure they aren't overpaying—all at no cost to you or them.
            </p>
          </div>
        </section>

        {/* Section 3: Why Partner */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl font-bold text-center text-brand-navy mb-12">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
                <UserGroupIcon />
                <h3 className="text-xl font-bold text-brand-navy mt-4">Enhance Your Client Relationships</h3>
                <p className="text-brand-body-text mt-2">Provide a valuable, expert service that deepens client trust and loyalty.</p>
            </div>
            <div className="flex flex-col items-center">
                <GearsIcon />
                <h3 className="text-xl font-bold text-brand-navy mt-4">A Seamless, Professional Process</h3>
                <p className="text-brand-body-text mt-2">Our modern platform and consultative approach ensure a white-glove experience that makes you look good.</p>
            </div>
            <div className="flex flex-col items-center">
                <MoneyIcon />
                <h3 className="text-xl font-bold text-brand-navy mt-4">Generous Referral Commissions</h3>
                <p className="text-brand-body-text mt-2">Be rewarded for your trust. We offer a competitive referral structure for every policy that is secured.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Form */}
        <section className="max-w-2xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl border-2 border-brand-gold">
            <h2 className="text-3xl font-bold text-center text-brand-navy mb-6">Let's Start the Conversation</h2>
            <form name="partner-inquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" data-netlify-recaptcha="true" action="/#/thank-you">
              <input type="hidden" name="form-name" value="partner-inquiry" />
              <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </p>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-brand-body-text font-semibold mb-2">Full Name</label>
                <input type="text" id="name" name="name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-brand-body-text font-semibold mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
              </div>

              <div className="mb-6">
                <label htmlFor="profession" className="block text-brand-body-text font-semibold mb-2">Profession</label>
                <input type="text" id="profession" name="profession" placeholder="e.g., CPA, Realtor, Financial Advisor" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-brand-body-text font-semibold mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required></textarea>
              </div>

              <div data-netlify-recaptcha="true" className="mb-8"></div>

              <button type="submit" className="w-full py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/20 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300">
                Submit Inquiry
              </button>
            </form>
        </section>
      </div>
    </div>
  );
};

export default PartnersPage;
