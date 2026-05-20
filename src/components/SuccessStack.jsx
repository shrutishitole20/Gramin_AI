import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import assetsList from '../assetsList.json';

// Simple Animated Counter Component
const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

const SuccessStack = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const images = assetsList.map(img => `/assets/${img}`);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const stats = [
    { label: t('stat_villages', 'Villages Empowered'), value: '50+', icon: '🏘️' },
    { label: t('stat_farmers', 'Farmers Trained'), value: '10000+', icon: '👨‍🌾' },
    { label: t('stat_growth', 'Impact Growth'), value: '400%', icon: '📈' },
    { label: t('stat_labs', 'Innovation Labs'), value: '15+', icon: '🔬' }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-400/5 blur-[150px] rounded-full"
        />
      </div>

      <div className="max-w-[92%] lg:max-w-[1400px] mx-auto px-4 relative z-10">
        
        {/* Header Section: Centered & Immersive */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/10 text-blue-600 font-bold text-xs tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {t('success_badge', 'Our Journey & Impact')}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter"
          >
            {t('success_heading_new', 'Our Success Story')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            {t('success_desc_new', 'Witness the convergence of rural resilience and cutting-edge Agentic AI. We are building the intelligent foundations for a future where every village is a hub of innovation.')}
          </motion.p>
        </div>

        {/* Immersive Split Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-4 min-h-[650px]">
          
          {/* LEFT SIDE: Cinematic Video */}
          <div className="w-full lg:w-1/2 px-4">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: "easeOut"
              }}
              className="relative group cursor-pointer"
            >
              <div className="relative h-[450px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[12px] border-white bg-black transition-transform duration-700 group-hover:scale-[1.01]">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="auto"
                  className="w-full h-full object-cover relative z-10 bg-black"
                  style={{ 
                    opacity: 1,
                    filter: 'contrast(1.2) saturate(1.2) brightness(1)',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity',
                    backgroundColor: 'black'
                  }}
                >
                  <source src="/assets/success-video.mp4#t=0.1" type="video/mp4" />
                </video>
                
                {/* All potentially foggy overlays completely removed */}
                
                {/* Video Info Badge */}
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div className="text-white">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Now Playing</div>
                    <div className="font-bold">Gramin AI Vision 2026</div>
                  </div>
                </div>
              </div>
              
              {/* Cinematic Glow */}
              <div className="absolute -inset-8 bg-blue-600/10 blur-[80px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Dramatic Image Stack */}
          <div className="w-full lg:w-1/2 px-2 flex justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-[500px] h-[650px] flex items-center justify-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="popLayout">
                {images.map((img, i) => {
                  const distance = (i - currentIndex + images.length) % images.length;
                  const isVisible = distance < 4;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={img}
                      style={{ zIndex: 10 - distance }}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ 
                        opacity: 1 - distance * 0.2,
                        scale: 1 - distance * 0.05,
                        x: 0,
                        y: distance * -20,
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.4, 
                        y: 100, 
                        transition: { duration: 0.4 } 
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30 
                      }}
                      className="absolute w-72 md:w-[460px] h-[450px] md:h-[580px] rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] border-4 border-white bg-white group/card"
                    >
                      <img 
                        src={img} 
                        alt="Success Moment" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Enhanced Controls */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 flex items-center gap-4 z-20">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-90 flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 rounded-2xl bg-slate-900 shadow-xl shadow-slate-900/20 text-white hover:bg-blue-600 transition-all active:scale-90 flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Section: Glass Cards with Icons */}
        {/* <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:bg-white hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-3xl bg-blue-600/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600/10 transition-all duration-500">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                <Counter value={stat.value} />
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default SuccessStack;
