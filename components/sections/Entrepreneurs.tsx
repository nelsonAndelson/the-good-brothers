import React from 'react';
import Link from 'next/link';

const Entrepreneurs = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-3/5 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Young Entrepreneurs Making a Difference
            </h2>
            
            <p className="text-gray-700">
              Th3 Good Broth3rs Snacks &amp; Treats is a values-driven vending machine business 
              founded by young entrepreneurs in Cleveland. We&apos;re on a mission to provide quality 
              snacks while also giving back to our community in a meaningful way.
            </p>
            
            <p className="text-gray-700">
              Our unique team is blending business skills while providing exceptional service. By 
              choosing us, you&apos;re not just getting a vending machine company - you&apos;re supporting 
              local youth entrepreneurship.
            </p>
            
            <Link 
              href="#about  " 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors mt-4"
            >
              Learn More About Our Mission
            </Link>
          </div>
          
          <div className="w-full md:w-2/5">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <video 
                src="/Video-of-machine-with-Jahari-1.mp4"
                className="w-full h-full object-cover"
                controls
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Watch our story
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entrepreneurs; 