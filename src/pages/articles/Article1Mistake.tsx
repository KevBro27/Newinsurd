
import React from 'react';
import { Link } from 'react-router-dom';

const Article1Mistake: React.FC = () => {
    return (
        <>
            <p>For most people, life insurance is a “set it and forget it” purchase. You buy a policy when you get married or have a child, file the paperwork, and assume you’re covered for life. This is a common assumption, but in the world of financial strategy, it’s the single biggest—and most dangerous—mistake you can make.</p>
            <h3>The Real #1 Mistake: Relying Solely on Your Employer's Group Life Insurance</h3>
            <p>Your employer-provided life insurance feels like a great perk. It’s often free or very low-cost, and it’s automatic. But relying on this policy as your family’s primary safety net is like building your financial house on a foundation of sand. Here's why:</p>
            <ol>
                <li><strong>It's Not Yours.</strong> You don't own your group policy; your employer does. If you leave your job, get laid off, or retire, that coverage disappears. You're then left searching for a new policy at an older age, with potentially new health conditions, making it significantly more expensive—or even impossible—to get the coverage you need.</li>
                <li><strong>It's Rarely Enough.</strong> Most group policies offer a death benefit of 1-2 times your annual salary. Let's be blunt: that is not enough. Consider what that money needs to cover: a mortgage, ongoing living expenses for your family for decades, childcare, future college tuition, and final expenses. A 1x salary payout might not even cover your mortgage balance, let alone secure your family's future.</li>
                <li><strong>It Creates a False Sense of Security.</strong> This is the most insidious part of the trap. Because you "have life insurance," you stop thinking about it. You don't analyze your actual needs, you don't shop the market for better rates, and you don't build a real, strategic plan. You're checking a box, but the box is practically empty.</li>
            </ol>
            <h3>The Strategic Solution: Own Your Protection</h3>
            <p>The solution is simple and powerful: secure a private life insurance policy that you own and control. This policy stays with you regardless of your employment status, and it’s tailored to your family's actual financial needs, not a generic corporate formula.</p>
            <p>By treating your work policy as a minor supplement and not the main event, you take control of your family’s financial destiny. You ensure that no matter what happens with your job, your legacy is protected.</p>

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-navy">Your Strategic Next Move</h3>
                <p className="mt-2 mb-4 text-brand-body-text">Don't wait until it's too late. Let's find out if you're making this common mistake and what it takes to fix it.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/free-audit" className="px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg text-center hover:bg-brand-gold-dark transition-colors">
                        Audit My Current Coverage
                    </Link>
                    <Link to="/quote-and-apply" className="px-6 py-3 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg text-center hover:bg-gray-100 transition-colors">
                        See Private Policy Rates
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Article1Mistake;
