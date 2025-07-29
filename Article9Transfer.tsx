
import React from 'react';
import { Link } from 'react-router-dom';

const Article9Transfer: React.FC = () => {
    return (
        <>
            <p>You've worked hard to build your assets in New Jersey—your home, your investments, your business. But building wealth is only half the battle. The other half is ensuring it transfers efficiently to the people you love without a significant portion being lost to taxes.</p>
            <p>New Jersey is one of a handful of states with its own inheritance tax. This, combined with potential estate taxes, can create a hefty tax bill for your heirs, forcing them to sell assets you intended for them to keep. Fortunately, there is a powerful and straightforward strategy to protect your legacy.</p>

            <h3>The Problem: A Tax Bill Due in Cash</h3>
            <p>When you pass away, your estate's tax bill is due within months, and it must be paid in cash. If your heirs don't have enough liquid cash on hand, they may be forced to quickly sell off assets—like the family home or a stock portfolio—often at a discount, just to pay the government. This can dismantle the very legacy you spent a lifetime building.</p>

            <h3>The Solution: The Power of Life Insurance</h3>
            <p>Life insurance provides a uniquely effective solution. The death benefit from a life insurance policy is paid out almost immediately, and it is almost always 100% income-tax-free. This creates a ready pool of tax-free cash that your heirs can use for any purpose, most notably, to pay the estate's tax bill.</p>
            
            <h3>The 3-Step NJ Wealth Transfer Plan</h3>
            <ol>
                <li><strong>Step 1: Calculate Your Potential Tax Liability.</strong> Work with a financial professional to estimate your potential New Jersey inheritance tax and any other estate settlement costs. This gives you a clear target for the amount of liquidity your estate will need.</li>
                <li><strong>Step 2: Purchase a Life Insurance Policy for That Amount.</strong> Secure a life insurance policy with a death benefit equal to or greater than your estimated tax liability. For maximum efficiency, this policy should be owned by an Irrevocable Life Insurance Trust (ILIT) to ensure the death benefit itself is not included in your taxable estate.</li>
                <li><strong>Step 3: Preserve Your Assets.</strong> When you pass away, the trust receives the tax-free death benefit. The trustee then uses that cash to pay the estate's tax bill. Your other assets—your home, your investments, your business—can then pass to your heirs fully intact, exactly as you intended.</li>
            </ol>
            
            <p>This strategy is not just for the ultra-wealthy. For any New Jersey resident with a home and a retirement account, this is a critical planning tool. It's the most efficient way to ensure the wealth you built stays with your family, not with the state treasury.</p>
            
            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-navy">Protect Your New Jersey Legacy</h3>
                <p className="mt-2 mb-4 text-brand-body-text">Don't let taxes be the final chapter of your financial story. Let's create a strategy to ensure your wealth is transferred efficiently and privately.</p>
                <div className="flex">
                    <Link to="/free-audit" className="px-8 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg text-center hover:bg-brand-gold-dark transition-colors">
                        Book a Legacy Strategy Session
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Article9Transfer;
