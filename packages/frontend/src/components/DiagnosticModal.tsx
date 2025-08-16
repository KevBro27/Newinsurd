

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to first step whenever modal is opened
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleHavePolicy = () => {
    onClose();
    navigate('/free-audit');
  };

  const handleNeedPolicy = () => {
    setStep(2);
  };

  const handleSeeFullCoverage = () => {
    onClose();
    navigate('/quote-and-apply');
  };
  
  const handleFitBudget = () => {
    onClose();
    navigate('/solutions', { state: { scrollTo: '#budget-tool' } });
  };


  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-8 m-4 w-full max-w-lg relative transform transition-all duration-300 scale-95 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl leading-none">&times;</button>
        
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-brand-navy mb-4">Let's Find Your Path</h2>
            <p className="text-center text-brand-body-text mb-8">Start with this simple question.</p>
            <h3 className="text-xl font-semibold text-center text-brand-navy mb-6">Do you currently have a Life Insurance Policy?</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={handleHavePolicy}
                className="flex-1 py-4 px-6 bg-brand-gold text-brand-navy font-bold rounded-lg transition-transform transform hover:scale-105 hover:bg-brand-gold-dark"
              >
                Yes, I Have a Policy
              </button>
              <button 
                onClick={handleNeedPolicy}
                className="flex-1 py-4 px-6 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg transition-all transform hover:scale-105 hover:bg-gray-100"
              >
                No, I'm Starting
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-brand-navy mb-4">How would you like to start?</h2>
            <p className="text-center text-brand-body-text mb-8">We have two great options to get you started.</p>
            <div className="flex flex-col gap-4">
               <button 
                onClick={handleSeeFullCoverage}
                className="py-4 px-6 bg-brand-gold text-brand-navy font-bold rounded-lg transition-transform transform hover:scale-105 hover:bg-brand-gold-dark"
              >
                See What Full Coverage Costs
              </button>
              <button 
                onClick={handleFitBudget}
                className="py-4 px-6 bg-white border-2 border-brand-navy text-brand-navy font-bold rounded-lg transition-all transform hover:scale-105 hover:bg-gray-100"
              >
                See What Fits My Budget
              </button>
            </div>
          </div>
        )}

      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DiagnosticModal;
