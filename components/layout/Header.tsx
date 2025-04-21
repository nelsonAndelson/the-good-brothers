'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string, formTab?: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
      
      // Set the form tab if provided
      if (formTab && (sectionId === 'contact' || sectionId === 'contact-us')) {
        // Find the tab trigger element and click it to activate the tab
        setTimeout(() => {
          const tabTrigger = document.querySelector(`[data-value="${formTab}"]`) as HTMLElement;
          if (tabTrigger) {
            tabTrigger.click();
          }
        }, 500); // Small delay to ensure the section has scrolled into view
      }
    }
  };

  return (
    <header className="w-full py-2 px-4 md:px-8 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center">
        <button 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center cursor-pointer"
        >
          <Image 
            src="/logo.jpg" 
            alt="Th3 Good Broth3rs Logo" 
            width={130} 
            height={65} 
            className="object-contain"
          />
        </button>
      </div>
      
      <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none md:items-center space-y-4 md:space-y-0 md:space-x-6`}>
        <button 
          onClick={() => scrollToSection('about')} 
          className="text-sm hover:text-orange-500 transition-colors text-left md:text-center"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('services')} 
          className="text-sm hover:text-orange-500 transition-colors text-left md:text-center"
        >
          Services
        </button>
        <button 
          onClick={() => scrollToSection('contact-us')} 
          className="text-sm hover:text-orange-500 transition-colors text-left md:text-center"
        >
          Contact
        </button>
        <button 
          onClick={() => scrollToSection('contact', 'issue')} 
          className="text-sm hover:text-orange-500 transition-colors text-left md:text-center"
        >
          Report Issue
        </button>
      </nav>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => scrollToSection('contact', 'service')}
          className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Request Service
        </button>
        
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 