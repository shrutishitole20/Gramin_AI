import React from 'react';
import { motion } from 'framer-motion';
import assetsList from '../assetsList.json';

const cards = assetsList.map((filename, idx) => ({
  id: idx,
  image: `/assets/${filename}`,
  title: filename.split('.')[0],
}));

const ImageCarousel = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050510] to-[#0a0a1a]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight"
        >
          Our Success Story
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Explore our vibrant moments from recent summits and events.
        </p>
      </div>

      <div className="relative w-full flex items-center overflow-hidden">
        {/* Blurred edges for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First set of cards */}
          <div className="flex gap-6 pr-6">
            {cards.map((card, idx) => (
              <div 
                key={`set1-${idx}`} 
                className="w-72 md:w-80 flex-shrink-0 rounded-xl bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-300 relative overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                {/* Subtle hover glow on card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="h-64 md:h-72 w-full overflow-hidden relative z-10">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Second set of cards for seamless looping */}
          <div className="flex gap-6 pr-6">
            {cards.map((card, idx) => (
              <div 
                key={`set2-${idx}`} 
                className="w-72 md:w-80 flex-shrink-0 rounded-xl bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-300 relative overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                {/* Subtle hover glow on card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="h-64 md:h-72 w-full overflow-hidden relative z-10">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default ImageCarousel;
