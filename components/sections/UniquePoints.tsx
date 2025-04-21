import React from 'react';
import Image from 'next/image';

const UniquePoints = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          What Makes Us Unique
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Variety */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800">Variety</h3>
            
            <p className="text-gray-600">
              We offer a wide selection of snacks and beverages. From chips 
              and candy to healthier options and fresh food selections.
            </p>
          </div>
          
          {/* Reliability */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2v4m0 12v4M6 12H2m20 0h-4m1.6-7L17 7.6M7 17l-2.6 2.6M17 17l2.6 2.6M7 7.6 4.4 5"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800">Reliability</h3>
            
            <p className="text-gray-600">
              We restock on time, every time. Our machines are maintained regularly 
              to ensure they&apos;re always working properly.
            </p>
          </div>
          
          {/* Personalized Service */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800">Personalized Service</h3>
            
            <p className="text-gray-600">
              We tailor our services to match your specific needs, 
              from product selection to machine placement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquePoints; 