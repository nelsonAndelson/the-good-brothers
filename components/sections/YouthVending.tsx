import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const YouthVending = () => {
  return (
    <section className="w-full py-16 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl font-bold">
              Youth-Owned Vending Service
            </h2>
            
            <p>
              Support a cause that strengthens youth skills, business acumen, and futures 
              while enjoying quality vending services. Our youth entrepreneurs learn 
              valuable business and customer service skills with every machine we install, 
              becoming tomorrow&apos;s leaders.
            </p>
            
            <Link 
              href="/request-service" 
              className="inline-block bg-white text-primary hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get Started Today
            </Link>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="relative w-full aspect-square md:aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/IMG_6398.jpeg"
                alt="Youth Entrepreneur with Vending Machine"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouthVending; 