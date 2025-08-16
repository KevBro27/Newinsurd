
import React from 'react';
import { Link } from 'react-router-dom';

const Article13Ethos: React.FC = () => {
    return (
        <>
            <p>In the world of strategic disruption, speed is a weapon. For certain situations, waiting weeks for an underwriting decision is not just an inconvenience; it's a critical vulnerability. That's why I've chosen to partner with Ethos.</p>
            <p>Ethos isn't just another insurance company; they are a technology company that has rebuilt the application process from the ground up for one specific purpose: to give you a real, final decision in minutes.</p>
            
            <h3>Why I Chose Ethos as a Partner:</h3>
            <p>As a "Strategic Disruptor," I only partner with companies that share my philosophy of using technology to provide a superior client experience. Ethos aligns perfectly with this mission.</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
                <li><strong>The 100% Digital Experience:</strong> Their application is clean, simple, and can be completed on your phone from start to finish. No paperwork, no hassle.</li>
                <li><strong>Often No Medical Exam:</strong> Using powerful data and algorithms, Ethos can often approve applicants without the need for needles or doctor's visits, removing a huge friction point from the process.</li>
                <li><strong>The Power of an Instant "Yes" or "No":</strong> For many applicants, Ethos provides a final, underwritten decision in less than 15 minutes. This is unheard of in the traditional space and provides immediate peace of mind.</li>
            </ul>

            <h3>Who is this for?</h3>
            <p>Ethos is the perfect solution for clients who value speed and simplicity and are in generally good health. It's for the person who says, "I want to get this done, today."</p>

            <h3>Your Strategic Next Move:</h3>
            <p>If speed and convenience are your top priorities, the Ethos platform is the most powerful tool available. This link will take you directly to my co-branded, secure application portal. See for yourself how fast and simple the future of insurance can be.</p>
            
            {/* CTA Section */}
            <div className="mt-12 text-center">
                <a 
                    href="https://app.ethoslife.com/partner/cca97/q/goals"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-block px-12 py-5 bg-brand-gold text-brand-navy font-bold text-xl rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
                >
                    Start Your Instant Application
                </a>
            </div>
        </>
    );
};

export default Article13Ethos;