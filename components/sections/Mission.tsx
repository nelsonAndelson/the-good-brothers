'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Mission = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const images = [
    {
      type: 'video',
      src: '/Video-of-machine-with-Jahari-1.mp4',
      alt: 'Watch our story',
      caption: 'Watch our story: How Th3 Good Broth3rs got started',
      position: 'object-center',
      priority: true
    },

    {
      src: '/boy-next-to-machine.jpeg',
      alt: 'Team members in action',
      caption: 'Making a difference one vending machine at a time',
      position: 'object-center'
    },
    {
      src: '/new-img-mom-pointing.jpg',
      alt: 'Community impact',
      caption: 'Family-driven entrepreneurship making a difference',
      position: 'object-top'
    },
    {
      src: '/boy-man-standing-vending-machine.jpeg',
      alt: 'Young entrepreneurs at work',
      caption: 'Our team delivering quality service to the community',
      priority: true,
      position: 'object-center'
    },
  ];

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering young entrepreneurs while serving our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative pt-[75%] w-full">
                  {image.type === 'video' ? (
                    <video
                      src={image.src}
                      className={`w-full h-full absolute top-0 left-0 object-cover rounded-xl ${image.position}`}
                      controls
                      onLoadedData={handleImageLoad}
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`transition-transform duration-500 group-hover:scale-105 ${image.position}`}
                      priority={image.priority}
                      onLoad={handleImageLoad}
                      quality={90}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-lg font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

      

          <div className="mt-16">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="relative pt-[56.25%] w-full">
                <Image
                  src="/3siblings.jpg"
                  alt="Young entrepreneur and student athlete"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority
                  quality={90}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                <div className="p-8 text-white max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-2">Meet Th3 Good Broth3rs</h3>
                  <p className="text-lg mb-1">Young Cleveland Entrepreneurs</p>
                  <p className="text-lg mb-3">Student Athletes & Business Owners</p>
                  <p className="text-base opacity-90">
                    Family-driven entrepreneurship balancing academics, athletics, and business excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-6 max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed">
              At Th3 Good Broth3rs, we&apos;re more than just a vending business. We&apos;re a team of young 
              entrepreneurs from Cleveland who are passionate about making a difference in our community.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Our journey combines business excellence with community impact. Through our vending services, 
              we&apos;re not just providing snacks and refreshments - we&apos;re building bridges, creating 
              opportunities, and inspiring the next generation of entrepreneurs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission; 