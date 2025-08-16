
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t-4 border-brand-gold mt-16 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="https://i.postimg.cc/NMwBgf0V/KBJInsurance-logo.jpg" 
              alt="www.kevinbrownjrinsurance.com Logo" 
              className="h-12 w-auto mb-4 bg-white p-1 rounded-md"
            />
            <p className="font-bold text-white text-lg">More Than a Policy. A Partnership.</p>
            <p className="mt-4 text-sm text-gray-400">
              Proudly serving all of New Jersey, from Bergen County to Cape May. 
              Your trusted local partner for modern life insurance solutions.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/solutions" className="hover:text-brand-gold transition-colors">Solutions</Link>
              <Link to="/free-audit" className="hover:text-brand-gold transition-colors">Free Policy Audit</Link>
              <Link to="/quote-and-apply" className="hover:text-brand-gold transition-colors">Quote & Apply</Link>
              <Link to="/articles" className="hover:text-brand-gold transition-colors">Insights</Link>
            </div>
          </div>

          {/* Column 3: Legal & Contact */}
          <div>
            <h3 className="font-bold text-white tracking-wider uppercase mb-4">Connect & Legal</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/partners" className="hover:text-brand-gold transition-colors">Strategic Partner Program</Link>
              <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link>
              <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
            <p className="font-semibold mb-2">Licensed in New Jersey | Kevin Brown Jr. Insurance | NJ Insurance Producer No. 3003694894.</p>
            <p>&copy; {new Date().getFullYear()} www.kevinbrownjrinsurance.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;