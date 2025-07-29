import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TrustedCarriers from '../components/TrustedCarriers';

// --- Icons ---
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="h-16 w-16 text-brand-gold mx-auto mb-4">{children}</div>
);

const ShieldIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
        </svg>
    </IconWrapper>
);

const OakTreeIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a9 9 0 019 9h-3.375M12 3.75a9 9 0 00-9 9H12m0-9v1.5M12 12.75a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 12.75v-1.5m0 0a3.375 3.375 0 00-3.375-3.375H12m0 0a3.375 3.375 0 013.375 3.375M9 12.75h3.375m0 0a3.375 3.375 0 013.375 3.375m-6.75 0a3.375 3.375 0 003.375 3.375m-3.375 0h-1.5m1.5 0v-1.5m0 0a3.375 3.375 0 00-3.375-3.375H9m6.75 0v-1.5m0 0a3.375 3.375 0 013.375 3.375m-3.375 0h1.5m-1.5 0v1.5m0 0a3.375 3.375 0 003.375 3.375m-3.375-3.375a3.375 3.375 0 01-3.375-3.375m6.75 0a3.375 3.375 0 00-3.375 3.375" />
        </svg>
    </IconWrapper>
);

const GiftBoxIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H7.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875L15.75 9h-7.5L12 4.875z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m-8.25-6.75h16.5" />
        </svg>
    </IconWrapper>
);

const GearsIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
    </IconWrapper>
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


// --- Card Data ---
const cardData = [
    {
        icon: <ShieldIcon />,
        title: "Term Life Insurance",
        tagline: "The Affordable Shield",
        definition: "Think of it like renting protection. It provides the maximum amount of coverage for the lowest cost, for a specific period of time (e.g., 20 or 30 years). It's simple and incredibly effective.",
        perfectFor: "New parents protecting a mortgage, families wanting to replace income on a budget, or covering any large, temporary financial responsibility."
    },
    {
        icon: <OakTreeIcon />,
        title: "Whole Life Insurance",
        tagline: "The Permanent Legacy",
        definition: "Think of it like owning your protection. It's permanent coverage that lasts your entire life, never expires, and includes a savings component (cash value) that grows over time, tax-deferred.",
        perfectFor: "Estate planning, leaving a guaranteed inheritance, or for individuals seeking lifelong coverage with a built-in financial asset."
    },
    {
        icon: <GiftBoxIcon />,
        title: "Final Expense",
        tagline: "The Final Gift of Love",
        definition: "A simplified type of whole life policy with a smaller death benefit, designed specifically to cover end-of-life costs like funeral expenses, medical bills, and small debts.",
        perfectFor: "Seniors and individuals who want to ensure their final expenses don't become a burden on their loved ones. Often features easy or no-questions-asked qualification."
    },
    {
        icon: <GearsIcon />,
        title: "Universal Life (IUL)",
        tagline: "The Flexible Asset",
        definition: "A flexible type of permanent insurance. Think of it like a financial Swiss Army knife. It offers lifelong protection but with adjustable premiums and a cash value component often tied to a stock market index, offering higher growth potential.",
        perfectFor: "Savvy investors looking to maximize tax-advantaged growth, high-net-worth individuals, or those wanting flexible premium options with their permanent coverage."
    }
];

// --- Main Component ---
const SolutionsPage: React.FC = () => {
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const budgetToolRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newDescription = "Explore your options. Learn the difference between Term, Whole, and Universal Life insurance with our interactive guides and find a plan that fits your budget.";
        
        document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);
    }, []);

    useEffect(() => {
        if (location.state?.scrollTo === '#budget-tool' && budgetToolRef.current) {
          setTimeout(() => {
            budgetToolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100); // Small delay to ensure page is rendered
        }
    }, [location.state]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveCardIndex(null);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);


    const handleCardClick = (index: number) => {
        // Toggle the active card. If the clicked card is already active, close it. Otherwise, open it.
        setActiveCardIndex(prevIndex => prevIndex === index ? null : index);
    };
    
    const handleCloseCard = () => {
        setActiveCardIndex(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
    };

    return (
        <>
            {activeCardIndex !== null && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 cursor-pointer transition-opacity duration-300 ease-in-out"
                    onClick={handleCloseCard}
                />
            )}
            <div className="bg-gray-50 py-16 md:py-24">
                <div className="container mx-auto px-6">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
                            The Right Tool for Your <span className="text-brand-gold">Legacy</span>
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
                            Different goals require different strategies. Explore the solutions we offer to find the right fit for your family's needs.
                        </p>
                    </div>

                    <div className="mb-16">
                       <TrustedCarriers />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {cardData.map((card, index) => {
                            const isActive = index === activeCardIndex;
                            return (
                                <div
                                    key={index}
                                    className={`w-full h-96 [perspective:1000px] group cursor-pointer ${isActive ? 'z-50' : ''}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div
                                        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out"
                                        style={{ transform: isActive ? 'scale(1.2) rotateY(180deg)' : 'rotateY(0deg)' }}
                                    >
                                        {/* Front Face */}
                                        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white border-2 border-brand-gold rounded-xl p-6 flex flex-col justify-center items-center text-center">
                                            {card.icon}
                                            <h2 className="text-2xl font-bold text-brand-navy">{card.title}</h2>
                                            <p className="text-brand-gold font-semibold mt-1">{card.tagline}</p>
                                            <div className="absolute bottom-4 text-xs text-gray-400">Click to learn more</div>
                                        </div>
                                        
                                        {/* Back Face */}
                                        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white border-2 border-brand-gold rounded-xl p-6 flex flex-col overflow-y-auto">
                                            <h3 className="text-xl font-bold text-brand-gold mb-3">What is it?</h3>
                                            <p className="text-sm text-brand-body-text mb-4 flex-grow">{card.definition}</p>
                                            <h4 className="text-lg font-bold text-brand-gold mb-2">Perfect For:</h4>
                                            <p className="text-sm text-brand-body-text">{card.perfectFor}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Budget Tool Section */}
                    <section id="budget-tool" ref={budgetToolRef} className="mt-24 scroll-mt-20">
                        <div className="text-center mb-12">
                             <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">
                                Ready to Start? A Smart Plan Begins with a <span className="text-brand-gold">Smart Budget.</span>
                            </h2>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
                               You don't need a huge budget to protect your family. Tell me what you're comfortable with, and I'll show you what's possible.
                            </p>
                        </div>
                         <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl border-2 border-brand-gold">
                            <h3 className="text-2xl font-bold text-center text-brand-navy mb-6">Generate My Possibility Report</h3>
                            <form 
                                name="budget-tool" 
                                method="POST" 
                                data-netlify="true" 
                                data-netlify-honeypot="bot-field" 
                                data-netlify-recaptcha="true" 
                                action="/#/thank-you"
                                onSubmit={handleSubmit}
                            >
                                <input type="hidden" name="form-name" value="budget-tool" />
                                <p className="hidden">
                                    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                                </p>
                                
                                <div className="mb-8 bg-amber-50 p-4 rounded-lg border-l-4 border-brand-gold">
                                    <div className="flex items-start">
                                        <InfoIcon />
                                        <div className="ml-3">
                                            <h4 className="text-base font-bold text-brand-navy">Note: Your Report is Custom-Built.</h4>
                                            <p className="mt-1 text-sm text-brand-body-text">
                                                After you submit your budget, I will personally analyze the market to find the best possible coverage amount for your specific situation. You will receive your 'Possibility Report' via email within 1-2 business hours. This manual step guarantees you get a realistic and valuable starting point.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="budget-name" className="block text-brand-body-text font-semibold mb-2">Full Name</label>
                                    <input type="text" id="budget-name" name="name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="budget-email" className="block text-brand-body-text font-semibold mb-2">Email Address</label>
                                    <input type="email" id="budget-email" name="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                                </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label htmlFor="age" className="block text-brand-body-text font-semibold mb-2">Your Age</label>
                                        <input type="number" id="age" name="age" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className="block text-brand-body-text font-semibold mb-2">Monthly Budget ($)</label>
                                        <input type="number" id="budget" name="budget" placeholder="e.g., 100" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                                    </div>
                                </div>
                                
                                <div data-netlify-recaptcha="true" className="mb-8"></div>

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
                                        'Show Me My Options'
                                    )}
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default SolutionsPage;