
import React from 'react';
import { Link } from 'react-router-dom';

const Article12QuoteTool: React.FC = () => {
    return (
        <>
            <p>The old way of getting insurance was designed to benefit the agent, not you. It involved phone calls, opaque pricing, and a sales pitch. It was a black box. We decided to smash the box.</p>
            <p>Our Quote & Apply tool is the engine of our "Strategic Disruptor" philosophy. It's built on a foundation of radical transparency, putting the power of the entire marketplace directly into your hands. This isn't just a form; it's a strategic weapon.</p>
            
            <h3>The Three Pillars of Your Advantage:</h3>
            <ol>
                <li><strong>Instant Market Access:</strong> The moment you enter your information, our tool scans the offerings from dozens of A-rated carriers. You're not just seeing one company's biased quote; you are seeing a real-time, unbiased snapshot of the entire competitive landscape.</li>
                <li><strong>Total Anonymity & Control:</strong> This is a no-pressure zone. You can run scenarios, compare rates, and analyze your options without ever having to speak to an agent. You are in complete control of the process, from start to finish. We are here to help if you need us, not because we need to hit a sales quota.</li>
                <li><strong>Speed to Application:</strong> The old process took weeks. Our system allows you to go from comparing quotes to submitting a secure application in a matter of minutes. We use technology to cut out the bureaucracy and get you protected faster.</li>
            </ol>
            
            <h3>Your Strategic Next Move:</h3>
            <p>Stop guessing what a good rate looks like. It's time to see the real numbers for yourself and take control of your financial protection. The tool is free, confidential, and gives you the information you need to make a truly intelligent decision.</p>

            {/* CTA Section */}
            <div className="mt-12 text-center">
                <Link 
                    to="/quote-and-apply" 
                    className="inline-block px-12 py-5 bg-brand-gold text-brand-navy font-bold text-xl rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
                >
                    Access the Tool Now
                </Link>
            </div>
        </>
    );
};

export default Article12QuoteTool;
