
import React from 'react';
import { Link } from 'react-router-dom';

const Article11FounderStory: React.FC = () => {
    return (
        <>
            <p>My journey isn't a typical one. It was forged by a challenge most people never have to face: Sickle Cell Disease.</p>
            <p>Going through pain crises and blood transfusions can be overwhelming for anyone, especially a child. But from a young age, I learned a critical lesson: you either let your circumstances define you, or you build a strategy to defy them. I chose to defy them.</p>
            <p>I did the things the doctors told me not to. I played basketball. I drank soda. My mindset was simple: I was going to live life on my own terms, and nothing was going to stop me.</p>
            <p>As I got older, the hospital visits became less frequent. My mission became clear: I wanted to help people navigate their own challenges. This led me to become a Registered Behavior Technician (RBT), where my job was to build strategies for children with autism, helping them fight through their own battles. Seeing the sincere appreciation on their parents' faces when a plan came together meant the world to me. I was living my dream—I was healthy, I had a career I loved, and I was driving a pretty sweet car, a white Dodge Challenger GT.</p>
            <p>Then, at 30, the fight came back harder.</p>
            <p>A severe Sickle Cell crisis led to a stroke—or multiple strokes—and a month-long coma. I spent another month in rehab, learning how to walk and talk again. There were days I wanted to give up. But then I was reminded of the kids I worked with. I couldn't demand they fight their battles if I wasn't willing to fight my own. It took tears and a relentless fight, but I got back on my feet.</p>
            <p>But while I was fighting for my health, my finances collapsed. My bank account hit zero. The car I'd worked so hard for was repossessed. I even had hiring managers tell me they loved my RBT resume but wouldn't hire me because of my health issues. I was in a downward spiral.</p>
            <p>Scrolling the internet, I saw an opportunity to study for a life insurance license. A bell went off in my head. This is it. This is how I go back and help people.</p>
            <p>I cut off social media and dedicated myself to studying. I earned my license and got a lot of attention from different insurance companies, but I quickly realized their playbook was wrong. It was about sales quotas, not solutions. They weren't equipped to help people avoid the exact financial catastrophe I had just survived.</p>
            <p>So I started on the journey to create this platform. Not to be another overbearing or pushy agent, but to be a strategic disruptor. My mission is to use my story—the fight, the collapse, and the comeback—to arm people with a real plan, so they can protect their life and build their legacy with confidence.</p>
            
            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border-l-4 border-brand-gold">
                <h3 className="text-2xl font-bold text-brand-navy">Your Strategic Next Move</h3>
                <p className="mt-2 mb-6 text-brand-body-text">This is the story behind the strategy. Now, it's time to see the tools I built because of it.</p>
                <div className="space-y-6">
                    <div>
                        <p className="text-brand-body-text mb-2"><strong>If you have a policy, let's make sure it's strong enough.</strong></p>
                        <Link to="/free-audit" className="px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg text-center hover:bg-brand-gold-dark transition-colors inline-block">
                            Audit My Policy
                        </Link>
                    </div>
                    <div>
                        <p className="text-brand-body-text mb-2"><strong>If you're starting fresh, let's build your blueprint.</strong></p>
                         <Link to="/quote-and-apply" className="px-6 py-3 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg text-center hover:bg-gray-100 transition-colors inline-block">
                            Build My Blueprint
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Article11FounderStory;
