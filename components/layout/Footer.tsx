'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@/public/logo.jpg';

const Footer = () => {
  const scrollToSection = (sectionId: string, formTab?: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
      
      // Set the form tab if provided
      if (formTab && sectionId === 'contact') {
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
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <button onClick={() => scrollToSection('hero')} className="flex items-center">
              <Image 
                src={logo} 
                alt="Th3 Good Broth3rs Logo" 
                width={80} 
                height={80} 
                className="rounded-md"
              />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-sm text-gray-600 hover:text-primary text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('hero')} className="text-sm text-gray-600 hover:text-primary text-left">
                    Our Team
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact-us')} className="text-sm text-gray-600 hover:text-primary text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('contact', 'issue')} className="text-sm text-gray-600 hover:text-primary text-left">
                    Report Issue
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact', 'issue')} className="text-sm text-gray-600 hover:text-primary text-left">
                    Restocking
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact', 'service')} className="text-sm text-gray-600 hover:text-primary text-left">
                    Request Service
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-gray-600">
                    Cleveland, OH
                  </p>
                </li>
                <li>
                  <a href="mailto:th3goodbroth3rssnackstreat@gmail.com" className="text-sm text-gray-600 hover:text-primary">
                    th3goodbroth3rssnackstreat@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+12163749817" className="text-sm text-gray-600 hover:text-primary">
                    (216) 374-9817
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2023 Th3 Good Broth3rs Snacks & Treats. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 