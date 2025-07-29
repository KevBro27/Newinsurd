
import React from 'react';

const carrierLogos = [
  { name: 'Ethos', src: 'https://i.postimg.cc/856RTzsq/new-ethos-logo.png', alt: 'Ethos Life logo' },
  { name: 'Gerber Life', src: 'https://logo.clearbit.com/gerberlife.com', alt: 'Gerber Life Insurance logo' },
  { name: 'John Hancock', src: 'https://logo.clearbit.com/johnhancock.com', alt: 'John Hancock logo' },
  { name: 'Nationwide', src: 'https://logo.clearbit.com/nationwide.com', alt: 'Nationwide logo' },
  { name: 'Mutual of Omaha', src: 'https://logo.clearbit.com/mutualofomaha.com', alt: 'Mutual of Omaha logo' },
  { name: 'New York Life', src: 'https://logo.clearbit.com/newyorklife.com', alt: 'New York Life logo' }
];

const TrustedCarriers: React.FC = () => {
  return (
    <div className="py-8 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center">
          {carrierLogos.map((carrier) => (
            <div key={carrier.name} className="flex justify-center items-center h-full">
              <img
                src={carrier.src}
                alt={carrier.alt}
                className="max-h-12 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-110 transform transition-all duration-300 ease-in-out"
                style={{'--clearbit-logo-filter': 'grayscale(1) opacity(0.7)'} as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedCarriers;
