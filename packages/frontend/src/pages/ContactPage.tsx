
import React from 'react';
import { Link } from 'react-router-dom';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-brand-gold" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
            Let's Start the <span className="text-brand-gold">Conversation</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
            Have a question? I'm here to provide clarity and strategic guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-brand-gold h-full">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Contact Information</h2>
                <div className="space-y-6">
                    <div className="flex items-center">
                        <MailIcon />
                        <div>
                            <h3 className="font-semibold text-brand-navy">Email</h3>
                            <a href="mailto:Kevin@Kevinbrownjrinsurance.com" className="text-brand-body-text hover:text-brand-gold transition-colors">Kevin@Kevinbrownjrinsurance.com</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <LinkedInIcon />
                        <div>
                            <h3 className="font-semibold text-brand-navy">LinkedIn</h3>
                            <Link to="/founder-profile" className="text-brand-body-text hover:text-brand-gold transition-colors">Connect via the Founder Profile</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-brand-navy">Business Hours</h3>
                    <p className="text-brand-body-text">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-brand-body-text">Submissions are welcome 24/7 and will be reviewed promptly.</p>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-brand-gold">
                <h2 className="text-2xl font-bold text-brand-navy mb-6">Send a Message</h2>
                <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" data-netlify-recaptcha="true" action="/#/thank-you">
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                </p>
                
                <div className="mb-6">
                    <label htmlFor="contact-name" className="block text-brand-body-text font-semibold mb-2">Full Name</label>
                    <input type="text" id="contact-name" name="name" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="contact-email" className="block text-brand-body-text font-semibold mb-2">Email Address</label>
                    <input type="email" id="contact-email" name="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required />
                </div>

                <div className="mb-8">
                    <label htmlFor="contact-message" className="block text-brand-body-text font-semibold mb-2">Your Message</label>
                    <textarea id="contact-message" name="message" rows={5} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition" required></textarea>
                </div>

                <div data-netlify-recaptcha="true" className="mb-8"></div>

                <button type="submit" className="w-full py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/20 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300">
                    Submit
                </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
