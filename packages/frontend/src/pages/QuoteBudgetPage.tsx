import React, { useState } from 'react';

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const QuoteBudgetPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Netlify handles the actual submission. We just need to set the state
        // to give the user visual feedback. We don't prevent default.
        setIsSubmitting(true);
    };

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
                        Find a Plan That Fits Your <span className="text-brand-gold">Budget.</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
                        Tell us a bit about yourself and your budget, and we'll find the best life insurance options for you.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl border-2 border-brand-gold">
                    <h2 className="text-3xl font-bold text-center text-brand-navy mb-6">Get Your Personalized Options</h2>
                    <form
                        name="budget"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                        action="/#/thank-you"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="form-name" value="budget" />
                        <p className="hidden">
                            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                        </p>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="mb-6">
                                <label htmlFor="first_name" className="block text-brand-body-text font-semibold mb-2">First Name</label>
                                <input type="text" id="first_name" name="first_name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="last_name" className="block text-brand-body-text font-semibold mb-2">Last Name</label>
                                <input type="text" id="last_name" name="last_name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-brand-body-text font-semibold mb-2">Email Address</label>
                            <input type="email" id="email" name="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-brand-body-text font-semibold mb-2">Phone</label>
                                <input type="tel" id="phone" name="phone" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="zip" className="block text-brand-body-text font-semibold mb-2">ZIP Code</label>
                                <input type="text" id="zip" name="zip" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="mb-6">
                                <label htmlFor="age" className="block text-brand-body-text font-semibold mb-2">Age</label>
                                <input type="number" id="age" name="age" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="monthly_budget" className="block text-brand-body-text font-semibold mb-2">Monthly Budget</label>
                                <input type="text" id="monthly_budget" name="monthly_budget" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="notes" className="block text-brand-body-text font-semibold mb-2">Anything else we should know?</label>
                            <textarea id="notes" name="notes" rows={4} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition"></textarea>
                        </div>

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
                                'See My Options'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuoteBudgetPage;
