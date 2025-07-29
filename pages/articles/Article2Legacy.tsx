
import React from 'react';
import { Link } from 'react-router-dom';

const Article2Legacy: React.FC = () => {
    return (
        <>
            <p>Ask a hundred people what life insurance is for, and ninety-nine will say, "It pays out when you die." While true, that's like saying a smartphone is "for making calls." It completely misses the point and ignores its most powerful features.</p>
            <p>The old mindset sees life insurance as a begrudging monthly expense. The strategic mindset sees it for what it truly is: a powerful, tax-advantaged financial asset that can protect your family, build wealth, and create a lasting legacy.</p>
            
            <h3>Shift Your Mindset: From Expense to Asset</h3>
            <p>Permanent life insurance (like Whole Life or IUL) is more than just a death benefit. It's a multi-faceted financial tool. Here’s how the shift in thinking works:</p>
            
            <h4>It's a Tax-Advantaged Savings Vehicle</h4>
            <p>A portion of your premium in a permanent policy funds a "cash value" account. This isn't just a number on a page; it's a liquid asset.
            <ul className="list-disc pl-6 my-4 space-y-2">
                <li><strong>Tax-Deferred Growth:</strong> Your cash value grows without being taxed annually. This allows your money to compound faster than it would in a regular savings or brokerage account.</li>
                <li><strong>Tax-Free Access:</strong> You can take tax-free loans against your cash value for any reason—a down payment on a house, college tuition, or a business opportunity—without selling an asset or triggering a taxable event.</li>
            </ul>
            </p>

            <h4>It's a Source of Stability in a Volatile World</h4>
            <p>When the stock market is in turmoil, your other investments might take a hit. The cash value in a properly structured life insurance policy offers a level of security and guarantees that can be a bedrock for your entire financial portfolio. It’s a source of liquidity that isn't correlated to market performance.</p>
            
            <h4>It's the Ultimate Inheritance Tool</h4>
            <p>The death benefit from a life insurance policy is paid out to your beneficiaries 100% income-tax-free. This makes it one of the most efficient ways to transfer wealth to the next generation, ensuring the legacy you built passes to your loved ones intact, without a significant portion being lost to taxes.</p>
            
            <h3>The Blueprint in Action</h3>
            <p>When you see insurance as an asset, you stop asking, "What's the cheapest policy?" and start asking, "How can this policy accelerate my financial goals?" It becomes the foundation of your legacy blueprint—a tool for protecting your family today and empowering their dreams tomorrow.</p>

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-navy">Build Your Legacy Blueprint</h3>
                <p className="mt-2 mb-4 text-brand-body-text">Ready to move beyond the basics and use insurance as a strategic tool? Let's talk about your vision.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                     <Link to="/founder-profile" className="px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg text-center hover:bg-brand-gold-dark transition-colors">
                        Meet the Founder
                    </Link>
                    <Link to="/free-audit" className="px-6 py-3 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg text-center hover:bg-gray-100 transition-colors">
                       Discuss Your Goals
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Article2Legacy;
