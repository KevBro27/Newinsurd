
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Article5Parent: React.FC = () => {
    const navigate = useNavigate();

    const handleBudgetClick = () => {
        navigate('/solutions', { state: { scrollTo: '#budget-tool' } });
    };

    return (
        <>
            <p>Bringing a new baby home is a whirlwind of joy, exhaustion, and expenses. Between diapers, formula, and daycare, the budget can feel tight. It's easy to think, "I can't afford another bill right now." Many new parents push life insurance to the bottom of the to-do list, assuming it's a luxury they can't afford.</p>
            <p>This is a dangerous misconception. The reality is, you can secure massive financial protection for your new family for a surprisingly small cost. Here’s the simple, no-nonsense playbook for new parents.</p>

            <h3>The Goal: Maximum Protection, Minimum Cost</h3>
            <p>As a new parent, your primary financial risks are large and temporary. You have a mortgage to pay for the next 30 years. You have childcare and living expenses until your kids are independent. You have college tuition looming in 18 years. Your goal is to get the largest possible safety net to cover these specific years for the lowest possible price.</p>

            <h3>The Tool: Term Life Insurance</h3>
            <p>This is your silver bullet. Forget the complex, expensive permanent policies for now. Term life insurance is pure, simple, and incredibly affordable protection. You are essentially "renting" a massive death benefit for a specific term, like 20 or 30 years—perfectly aligning with the years you need it most.</p>
            <p>How affordable is it? A healthy 30-year-old can often get a <strong>$1,000,000 policy for 30 years</strong> for around $50-$70 per month. That’s less than a weekly trip to Starbucks or, yes, a large box of diapers. For that small monthly cost, you ensure that if anything happens to you, your partner has a million tax-free dollars to:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Pay off the mortgage instantly.</li>
                <li>Replace your income for years to come.</li>
                <li>Fund college savings accounts.</li>
                <li>Eliminate all financial stress during an already difficult time.</li>
            </ul>

            <h3>The Playbook: A 3-Step Action Plan</h3>
            <ol>
                <li><strong>Calculate Your Need:</strong> Don't guess. A good starting point is 10-15 times your annual income, plus your mortgage balance and any other major debts.</li>
                <li><strong>Choose Your Term:</strong> Match the term length to your longest financial obligation. If your youngest child is a newborn, a 20 or 30-year term is a smart choice to see them through college.</li>
                <li><strong>Lock In Your Rate:</strong> The younger and healthier you are, the cheaper your premiums will be. Lock in these low rates now for the next few decades.</li>
            </ol>
            <p>Protecting your family is the most important financial decision you'll make as a new parent. The good news is that it's also one of the most affordable.</p>
            
            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-navy">Take Action for Your Family</h3>
                <p className="mt-2 mb-4 text-brand-body-text">You have two easy ways to get started right now. See what full coverage costs, or find out what fits your current budget.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/quote-and-apply" className="px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg text-center hover:bg-brand-gold-dark transition-colors">
                        Compare Instant Quotes
                    </Link>
                    <button onClick={handleBudgetClick} className="px-6 py-3 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg text-center hover:bg-gray-100 transition-colors">
                        See What Fits My Budget
                    </button>
                </div>
            </div>
        </>
    );
};

export default Article5Parent;
