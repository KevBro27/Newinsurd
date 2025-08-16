
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Icon Components ---
const MagnifyingGlassIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CompassIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2m-14 0H3m16.031-7.031l-1.414 1.414m-11.214 11.214l-1.414 1.414m11.214-1.414l1.414 1.414M6.343 6.343l1.414 1.414" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-3.354-6.708a.5.5 0 01.894-.448L12 12l2.46-4.156a.5.5 0 01.894.448L12 15z" />
    </svg>
);

const ShieldIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a11.955 11.955 0 0118-8.001c0-1.609-.333-3.14-1.382-4.5z" />
    </svg>
);


const FounderProfilePage: React.FC = () => {
    useEffect(() => {
        const newDescription = "Meet Kevin Brown Jr., the founder of KBJ Insurance. Read the powerful story that drives our mission to disrupt the insurance industry with trust and transparency.";
        
        document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);
    }, []);

  return (
    <div className="bg-white text-brand-body-text">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Meet the <span className="text-brand-gold">Founder</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
            My journey from Registered Behavior Technician to insurance strategist was driven by one simple belief: families deserve a plan built on trust, not pressure.
          </p>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-shrink-0 md:w-1/3 flex justify-center items-center">
             <img 
              src="https://i.postimg.cc/vBB4yWtP/Untitled-Linked-In-Profile-Picture.png" 
              alt="Founder of www.kevinbrownjrinsurance.com" 
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-brand-gold"
            />
          </div>
          <div className="text-left md:w-2/3">
            <h2 className="text-3xl font-bold mb-4 text-brand-navy text-center md:text-left">Why I Do This Differently</h2>
            <div className="space-y-4 text-brand-body-text text-lg prose max-w-none">
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
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-brand-navy mb-16">My Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <MagnifyingGlassIcon />
              <h3 className="text-2xl font-bold text-brand-navy mt-4 mb-2">Radical <span className="text-brand-gold">Transparency</span></h3>
              <p className="text-brand-body-text">You will always see the full picture. I believe an educated client is an empowered client. My job is to provide clarity, not a sales pitch.</p>
            </div>
            <div className="flex flex-col items-center">
              <CompassIcon />
              <h3 className="text-2xl font-bold text-brand-navy mt-4 mb-2">Strategic <span className="text-brand-gold">Guidance</span></h3>
              <p className="text-brand-body-text">We don't just 'sell' policies; we design a strategy. We analyze your unique situation and build a plan that gives you a genuine advantage.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldIcon />
              <h3 className="text-2xl font-bold text-brand-navy mt-4 mb-2">Unwavering <span className="text-brand-gold">Protection</span></h3>
              <p className="text-brand-body-text">At the end of the day, this is about protecting what matters most. We partner with A-rated carriers to ensure the promises made are promises kept.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-brand-navy mb-8">Ready to Build Your Plan?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/free-audit"
              className="px-8 py-4 bg-white border-2 border-brand-navy text-brand-navy font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Your Free Audit
            </Link>
            <Link 
              to="/quote-and-apply"
              className="px-8 py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/20 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
            >
              Compare Instant Quotes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FounderProfilePage;