'use client';

import React from 'react';
import Image from 'next/image';
import heroImage from '@/public/man-next-to-machine.jpeg';

const Hero = () => {
  const scrollToForm = (tabId: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
      
      // Find and click the appropriate tab trigger
      setTimeout(() => {
        const tabTrigger = document.querySelector(`[data-value="${tabId}"]`) as HTMLElement;
        if (tabTrigger) {
          tabTrigger.click();
        }
      }, 500);
    }
  };

  return (
    <section className="hero-pattern w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500">
              TH3 GOOD BROTH3RS<br />
              <span className="text-orange-500">SNACKS AND TREATS</span>
            </h1>
            
            <p className="text-gray-700 text-lg">
              Providing quality snacks, drinks, and fresh food delivered with reliability 
              and care to Cleveland businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => scrollToForm('service')} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-center font-medium transition-colors"
              >
                Request Vending Service
              </button>
              
              <button 
                onClick={() => scrollToForm('issue')} 
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-md text-center font-medium transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Report an Issue or Restocking
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <Image 
                src={heroImage} 
                alt="Th3 Good Broth3rs Vending Services" 
                width={500}
                height={650}
                className="rounded-lg shadow-lg object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 