'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import manySnacks from '@/public/th3goodbroth3rs-candy.jpg';
import drinks from '@/public/th3goodbroth3rs-drinks.jpg';

// Drink Images
import pepsi from '@/public/products/pepsi.jpg';
import pepsiBottle from '@/public/products/pepsi-bottle.jpg';
import cocaCola from '@/public/products/cocola.jpg';
import dietPepsi from '@/public/products/diet-pepsi.png';
import canadaDry from '@/public/products/canada-dry.png';
import canadaDryBottle from '@/public/products/canda-dry-bottle.png';
import deepParkWater from '@/public/products/deep-park-water.png';
import gatoradeBlue from '@/public/products/gatorade-blue.png';
import mtnDew from '@/public/products/mtn-dew.png';
import mtnDewBottle from '@/public/products/mtn-dew-bottle.png';
import sprite from '@/public/products/sprite.png';

// Snack Images
import bigTexas from '@/public/products/snacks/big-texas.png';
import swedishFish from '@/public/products/snacks/swedish fish.png';
import skittles from '@/public/products/snacks/skittles.png';
import twix from '@/public/products/snacks/twix.jpg';
import mmCookies from '@/public/products/snacks/m&m-cookies.png';
import oreo from '@/public/products/snacks/oreo.png';
import snacksCollection from '@/public/th3goodbroth3rs-snacks.jpg';
import chexMix from '@/public/products/snacks/chex-mix.png';
import laysClassic from '@/public/products/snacks/lays-classic.png';
import doritosNachoCheese from '@/public/products/snacks/doritors-nacho-cheese.png';
import popTartsStrawberry from '@/public/products/snacks/pop-tarts-strawberry.png';
import cheetosFlaminHot from '@/public/products/snacks/cheetos-flamin-hot.png';

// Product type definition
type ProductType = {
  id: number;
  name: string;
  category: 'candy' | 'drinks' | 'snacks';
  description: string;
  image: StaticImageData; // Using any for StaticImageData type
};

// Product data
const PRODUCTS: ProductType[] = [
  // Candy
  { id: 1, name: 'Big Texas Cinnamon Roll', category: 'candy', description: 'Sweet cinnamon pastry', image: bigTexas },
  { id: 2, name: 'Swedish Fish', category: 'candy', description: 'Chewy candy treats', image: swedishFish },
  { id: 3, name: 'Skittles', category: 'candy', description: 'Taste the rainbow', image: skittles },
  { id: 4, name: 'Twix', category: 'candy', description: 'Chocolate caramel cookie bars', image: twix },
  { id: 5, name: 'M&M Cookies', category: 'candy', description: 'Chocolate chip cookies with M&Ms', image: mmCookies },
  { id: 6, name: 'Oreo', category: 'candy', description: 'Chocolate sandwich cookies', image: oreo },
  
  // Snacks
  { id: 7, name: 'Chex Mix', category: 'snacks', description: 'Crunchy snack mix', image: chexMix },
  { id: 8, name: 'Lay\'s Classic', category: 'snacks', description: 'Original potato chips', image: laysClassic },
  { id: 9, name: 'Doritos Nacho Cheese', category: 'snacks', description: 'Bold nacho cheese flavor', image: doritosNachoCheese },
  { id: 10, name: 'Pop-Tarts Strawberry', category: 'snacks', description: 'Toaster pastries with strawberry filling', image: popTartsStrawberry },
  { id: 11, name: 'Cheetos Flamin\' Hot', category: 'snacks', description: 'Spicy cheese flavored snacks', image: cheetosFlaminHot },
  
  // Drinks
  { id: 12, name: 'Pepsi', category: 'drinks', description: 'Classic cola', image: pepsi },
  { id: 13, name: 'Pepsi', category: 'drinks', description: 'Bottle', image: pepsiBottle },
  { id: 14, name: 'Coca Cola', category: 'drinks', description: 'Classic cola', image: cocaCola },
  { id: 15, name: 'Diet Pepsi', category: 'drinks', description: 'Zero sugar cola', image: dietPepsi },
  { id: 16, name: 'Canada Dry', category: 'drinks', description: 'Ginger ale', image: canadaDry },
  { id: 17, name: 'Canada Dry', category: 'drinks', description: 'Ginger ale bottle', image: canadaDryBottle },
  { id: 18, name: 'Deep Park', category: 'drinks', description: 'Pure water', image: deepParkWater },
  { id: 19, name: 'Gatorade', category: 'drinks', description: 'Blue raspberry', image: gatoradeBlue },
  { id: 20, name: 'Mountain Dew', category: 'drinks', description: 'Original', image: mtnDew },
  { id: 21, name: 'Mountain Dew', category: 'drinks', description: 'Bottle', image: mtnDewBottle },
  { id: 22, name: 'Sprite', category: 'drinks', description: 'Lemon-lime soda', image: sprite },
];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProducts = activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === activeFilter);

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Our Products
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Browse our selection of quality snacks and treats
        </p>
        
        {/* Product Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">
            Our Product Categories
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Category 1 - Candy */}
            <div className="relative overflow-hidden rounded-lg aspect-square shadow-md">
              <Image 
                src={manySnacks} 
                alt="Candy" 
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h4 className="text-white font-medium p-4 w-full">Candy</h4>
              </div>
            </div>
            
            {/* Category 2 - Snacks */}
            <div className="relative overflow-hidden rounded-lg aspect-square shadow-md">
              <Image 
                src={snacksCollection} 
                alt="Snacks" 
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h4 className="text-white font-medium p-4 w-full">Snacks</h4>
              </div>
            </div>
            
            {/* Category 3 - Drinks */}
            <div className="relative overflow-hidden rounded-lg aspect-square shadow-md">
              <Image 
                src={drinks} 
                alt="Drinks" 
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h4 className="text-white font-medium p-4 w-full">Drinks</h4>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtered Products Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">
            Browse Products
          </h3>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All Items
            </button>
            {['candy', 'drinks', 'snacks'].map((category) => (
              <button 
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize
                  ${activeFilter === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Filtered Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`relative ${product.category === 'drinks' ? 'aspect-[3/4]' : 'aspect-square'} p-4`}>
                  <div className="relative w-full h-full">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-contain transition-transform hover:scale-105 ${
                        product.category === 'drinks' ? 'object-center' : 'object-cover'
                      }`}
                    />
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-medium text-gray-800 text-sm">{product.name}</h4>
                  <p className="text-gray-500 text-xs mt-1">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products; 