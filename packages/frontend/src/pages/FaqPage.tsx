import React, { useState } from 'react';
import { FAQS } from '../data/faqs.js';

const FaqItem = ({ faq, isOpen, onClick }) => {
    // The answer content might contain HTML (links), so we need to render it carefully.
    // The `linkify` function in the chatbot adds `<a>` tags. We should do the same here for consistency if needed,
    // but the data already contains the links in markdown-like format which we can assume are handled elsewhere or should be simple text.
    // For now, let's just render the text, and if links are needed, we can enhance this.
    // Re-reading the FAQ data, it uses template literals with LINK.quote etc. This will be an actual href.
    // So we need to use dangerouslySetInnerHTML.
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-amber-50 focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-brand-navy">{faq.q}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            {isOpen && (
                <div className="px-6 pb-4 text-brand-body-text prose" dangerouslySetInnerHTML={createMarkup(faq.a)} />
            )}
        </div>
    );
};

const FaqPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
                        Frequently Asked <span className="text-brand-gold">Questions</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
                        Find quick answers to common life insurance questions. For anything else, just ask our Strategic Advisor chatbot!
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                    {FAQS.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
