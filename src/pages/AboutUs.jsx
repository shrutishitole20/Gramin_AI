import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import assetsList from '../assetsList.json';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="section-tag-modern">{t('about_story')}</span>
          <h1>{t('about_title')} <span className="highlight-blue">{t('about_highlight')}</span></h1>
          <p className="hero-sub">{t('about_sub')}</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="about-grid">
          <div className="about-text">
            <h2>{t('about_vision_heading')} <span className="highlight-blue">{t('about_vision_highlight')}</span></h2>
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            
            <div className="vision-boxes">
               <div className="v-box">
                  <h4>{t('about_mission')}</h4>
                  <p>{t('about_mission_desc')}</p>
               </div>
               <div className="v-box secondary">
                  <h4>{t('about_vision_title')}</h4>
                  <p>{t('about_vision_desc')}</p>
               </div>
            </div>
          </div>
          <div className="about-image">
             <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" alt="Vision" />
          </div>
        </div>
      </section>

      <section className="success-story-section container">
        <div className="section-header">
          <span className="section-tag-modern">{t('success_story_tag', 'Our Impact')}</span>
          <h2>{t('success_story_title', 'Our Success Story')}</h2>
          <p className="section-sub">{t('success_story_sub', 'Witness the transformative power of AI education in rural communities through our vibrant events and eager learners.')}</p>
        </div>

        <div className="relative w-full flex items-center overflow-hidden py-4" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: '40s' }}>
            <div className="flex gap-6 pr-6">
              {assetsList.map((img, index) => (
                <div 
                  className="w-72 md:w-80 h-48 md:h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-purple-500/20 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.25)] transition-all duration-300 relative" 
                  key={`about1-${index}`} 
                >
                  <img src={`/assets/${img}`} alt={`Our Success Story ${index + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {assetsList.map((img, index) => (
                <div 
                  className="w-72 md:w-80 h-48 md:h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-purple-500/20 group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.25)] transition-all duration-300 relative" 
                  key={`about2-${index}`} 
                >
                  <img src={`/assets/${img}`} alt={`Our Success Story ${index + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
