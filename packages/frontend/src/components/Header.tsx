import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (type: 'event', eventName: string, eventParams: object) => void;
  }
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // We are using gtag directly to preserve the single-page application (SPA) navigation experience.
  // The gtag_report_conversion function uses window.location, which causes a full page reload.
  const handleTrackedNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17509882211/co-LCIKIu44bEOOyrp1B',
        'value': 1.0,
        'currency': 'USD',
        'event_callback': () => {
          navigate(path);
          setIsOpen(false);
        }
      });
    } else {
      navigate(path);
      setIsOpen(false);
    }
  };

  const activeLinkStyle = {
    color: '#FBBF24',
    textShadow: '0 0 2px rgba(251, 191, 36, 0.5)',
  };

  const navLinks = (
    <>
      <NavLink
        to="/solutions"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={(e) => handleTrackedNavigation(e, '/solutions')}
      >
        Solutions
      </NavLink>
      <NavLink
        to="/articles"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={() => setIsOpen(false)}
      >
        Insights
      </NavLink>
       <NavLink
        to="/founder-profile"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={() => setIsOpen(false)}
      >
        Founder Profile
      </NavLink>
      <NavLink
        to="/free-audit"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={(e) => handleTrackedNavigation(e, '/free-audit')}
      >
        Free Policy Audit
      </NavLink>
      <NavLink
        to="/quote-and-apply"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={(e) => handleTrackedNavigation(e, '/quote-and-apply')}
      >
        Quote & Apply
      </NavLink>
      <NavLink
        to="/ethos"
        className="block md:inline-block text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold py-2 md:py-0"
        style={({ isActive }) => isActive ? activeLinkStyle : {}}
        onClick={() => setIsOpen(false)}
      >
        Ethos Instant
      </NavLink>
    </>
  );

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img 
            src="https://i.postimg.cc/NMwBgf0V/KBJInsurance-logo.jpg" 
            alt="www.kevinbrownjrinsurance.com Logo" 
            className="h-10 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-navy focus:outline-none">
            {isOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-6 pt-2 pb-4 space-y-1 text-center">
            {navLinks}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;