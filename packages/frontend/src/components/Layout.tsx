import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout: React.FC = () => {
  const location = useLocation();
  const showStickyButton = location.pathname !== '/quote-and-apply';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-4">
        {showStickyButton && (
          <Link
            to="/quote-and-apply"
            className="bg-brand-gold text-brand-navy font-bold py-3 px-6 rounded-full shadow-lg hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105"
          >
            Apply Now
          </Link>
        )}
        <Chatbot />
      </div>
    </div>
  );
};

export default Layout;
