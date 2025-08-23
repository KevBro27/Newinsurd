import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
      {showStickyButton && (
        <Link
          to="/quote-and-apply"
          className="fixed bottom-4 right-4 bg-brand-gold text-brand-navy font-bold py-3 px-6 rounded-full shadow-lg hover:bg-brand-gold-dark transition-all duration-300 transform hover:scale-105 z-50"
        >
          Apply Now
        </Link>
      )}
    </div>
  );
};

export default Layout;
