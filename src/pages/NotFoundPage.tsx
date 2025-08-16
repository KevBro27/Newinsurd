
import React from 'react';
import { Link } from 'react-router-dom';

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);


const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border-2 border-brand-gold text-center flex flex-col items-center">
            <WarningIcon />
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mt-6">
                It Seems You've Found a <span className="text-brand-gold">Gap in the Blueprint.</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-brand-body-text">
                The page you're looking for doesn't exist. But a strategic plan always has a contingency.
            </p>
            <Link
                to="/"
                className="mt-8 px-10 py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg shadow-lg shadow-brand-gold/30 transform hover:scale-105 hover:bg-brand-gold-dark transition-all duration-300"
            >
                Return to the Homepage
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
