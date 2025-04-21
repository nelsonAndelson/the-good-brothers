import React from 'react';
import Link from 'next/link';

const ReferralProgram = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Referral Program
        </h2>
        
        <p className="text-gray-700 mb-6">
          Earn a $150 referral bonus when you refer a friend who becomes eligible to receive a 
          $150 bonus check, and refer a friend who places a vending machine in their office. 
          Your friend receives the same $150 bonus when they sign up with TH3 GOOD BROTH3RS SNACKS &amp; TREATS!
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-600 italic text-sm">
            &quot;I was very happy with the service I got from TH3 GOOD BROTH3RS. Not only did I get great snacks 
            for my office, but I also earned $150 when my friend signed up with their office too!&quot;
          </p>
        </div>
        
        {/* <Link 
          href="/referral" 
          className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Get Started
        </Link> */}
      </div>
    </section>
  );
};

export default ReferralProgram; 