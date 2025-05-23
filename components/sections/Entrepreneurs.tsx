import React from 'react';
import Image from 'next/image';

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
            
            
          </div>
          
          <div className="w-full md:w-2/5">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/3siblings2.jpg"
                alt="Th3 Good Broth3rs Siblings"
                fill
                className="object-cover"
                priority
              />
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entrepreneurs; 