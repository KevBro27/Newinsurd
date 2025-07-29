
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activeLinkStyle = {
    color: '#FBBF24',
    textShadow: '0 0 2px rgba(251, 191, 36, 0.5)',
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://i.postimg.cc/NMwBgf0V/KBJInsurance-logo.jpg" 
            alt="www.kevinbrownjrinsurance.com Logo" 
            className="h-10 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/solutions" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Solutions
          </NavLink>
          <NavLink 
            to="/articles" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Insights
          </NavLink>
           <NavLink 
            to="/founder-profile" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Founder Profile
          </NavLink>
          <NavLink 
            to="/free-audit" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Free Policy Audit
          </NavLink>
          <NavLink 
            to="/quote-and-apply" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Quote & Apply
          </NavLink>
          <NavLink 
            to="/ethos" 
            className="text-brand-navy hover:text-brand-gold transition-colors duration-300 font-semibold"
            style={({ isActive }) => isActive ? activeLinkStyle : {}}
          >
            Ethos Instant
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;