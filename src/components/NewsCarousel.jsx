import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './NewsCarousel.css';

const newsItems = [
  { id: 1,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.12%20(1).jpeg', titleFallback: 'Gramin AI Summit 2026',           descFallback: 'Highlights from the landmark summit in Ahilyanagar where experts discussed the future of AI in rural development, agriculture, and local education.', tag: 'Highlights'     },
  { id: 2,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.12.jpeg',        titleFallback: 'Rural AI Innovation Seminar',     descFallback: 'Coverage of the April 24th seminar focusing on empowering local youth and bridging the digital divide in rural sectors.',                        tag: 'Seminar'        },
  { id: 3,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.13%20(1).jpeg', titleFallback: 'Ahilyanagar: The Next AI Hub',    descFallback: 'MLA Sangram Jagtap emphasizes Ahilyanagar\'s potential to become a leading startup and technology center.',                                      tag: 'Tech Hub'       },
  { id: 4,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.13%20(2).jpeg', titleFallback: 'Micro-Enterprise AI Empowerment', descFallback: 'Supporting 2000+ local micro-entrepreneurs by integrating AI-powered business analytics into rural trade.',             tag: 'Empowerment'    },
  { id: 5,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.13.jpeg',        titleFallback: 'Agentic AI Summit 2026',        descFallback: 'Preparing Ahilyanagar for the next industrial revolution via localized intelligence.',  tag: 'Summit'         },
  { id: 6,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.14%20(1).jpeg', titleFallback: 'Digital Literacy Drive',        descFallback: 'Training 10,000+ rural youth with AI, data literacy, and digital skills.',             tag: 'Education'      },
  { id: 7,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.14%20(2).jpeg', titleFallback: 'Healthcare AI Initiative',      descFallback: 'Deploying AI diagnostic tools in 50+ primary health centres across Maharashtra.',      tag: 'Healthcare'     },
  { id: 8,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.14.jpeg',        titleFallback: 'Gramin AI Awards',              descFallback: 'Celebrating top 10 breakthrough innovations from the Gramin AI summit ecosystem.',      tag: 'Awards'         },
  { id: 9,  image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.15%20(1).jpeg', titleFallback: 'Global Mentorship Launch',      descFallback: 'Connecting village innovators with world-class researchers and industry veterans.',     tag: 'Community'      },
  { id: 10, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.15%20(2).jpeg', titleFallback: 'Farmers AI Network',            descFallback: 'Building a connected digital network of farmers across 500 villages.',                  tag: 'Farming'        },
  { id: 11, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.15.jpeg',        titleFallback: 'Rural Data Centers',            descFallback: 'Establishing edge computing infrastructure at village level for low-latency AI.',        tag: 'Infrastructure' },
  { id: 12, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.16%20(1).jpeg', titleFallback: 'Policy and Governance AI',      descFallback: 'Using AI to streamline gram panchayat governance and welfare delivery.',                tag: 'Governance'     },
  { id: 13, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.16%20(2).jpeg', titleFallback: 'AI in Rural Education',         descFallback: 'Transforming village classrooms with personalized AI tutoring in Marathi.',             tag: 'Education'      },
  { id: 14, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.16.jpeg',        titleFallback: 'Climate-Smart AI',              descFallback: 'Using satellite AI to predict drought patterns and plan water conservation.',            tag: 'Climate'        },
  { id: 15, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.17%20(1).jpeg', titleFallback: 'Micro-Enterprise AI',           descFallback: 'Supporting 2000+ micro-entrepreneurs with AI-powered business analytics.',              tag: 'Enterprise'     },
  { id: 16, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.17%20(2).jpeg', titleFallback: 'AI Skilling Camp',              descFallback: '3-day intensive AI bootcamp for rural teachers and community leaders.',                 tag: 'Skilling'       },
  { id: 17, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.17.jpeg',        titleFallback: 'Vernacular AI Tools',           descFallback: 'Launching Marathi and Hindi AI chatbots for government scheme access.',                 tag: 'Language AI'    },
  { id: 18, image: '/images/WhatsApp%20Image%202026-05-16%20at%2012.32.18%20(1).jpeg', titleFallback: 'Women in Rural Tech',           descFallback: 'Empowering women entrepreneurs with AI tools to build digital-first businesses.',         tag: 'Empowerment'    },
];

const NewsCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, newsItems.length - 1));
    setCurrentIndex(clamped);
  }, []);

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  return (
    <section id="news" className="nc-section">
      {/* Section Header */}
      <div className="nc-header">
        <div className="nc-badge">
          <span className="nc-badge-dot" />
          {t('news_badge', 'LATEST UPDATES')}
        </div>
        <h2 className="nc-title">{t('news_title', 'Latest News & Updates')}</h2>
        <p className="nc-subtitle">{t('news_desc', 'Stay updated with the latest breakthroughs in rural AI innovation and community impact.')}</p>
      </div>

      {/* Carousel Wrapper */}
      <div className="nc-wrapper">
        {/* Prev Button */}
        <button
          className="nc-arrow nc-arrow--prev"
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Previous news item"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Track */}
        <div className="nc-track" ref={trackRef}>
          {newsItems.map((item, i) => {
            const distance = i - currentIndex;
            let cardClass = 'nc-card';
            if (distance === 0) cardClass += ' nc-card--active';
            else if (Math.abs(distance) === 1) cardClass += ' nc-card--peek';
            else cardClass += ' nc-card--hidden';

            return (
              <div
                key={item.id}
                className={cardClass}
                onClick={() => goTo(i)}
                style={{ '--distance': distance }}
              >
                <div className="nc-card-image-wrap">
                  <span className="nc-card-tag">{item.tag}</span>
                  <div className="nc-card-image-inner">
                    <img
                      src={item.image}
                      alt={item.titleFallback}
                      className="nc-card-img"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="nc-card-body">
                  <h3 className="nc-card-title">{item.titleFallback}</h3>
                  <p className="nc-card-desc">{item.descFallback}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="nc-arrow nc-arrow--next"
          onClick={next}
          disabled={currentIndex === newsItems.length - 1}
          aria-label="Next news item"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dot Markers */}
      <div className="nc-markers" role="tablist" aria-label="News carousel navigation">
        {newsItems.map((item, i) => (
          <button
            key={item.id}
            className={`nc-dot${i === currentIndex ? ' nc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to news item ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="nc-counter">{currentIndex + 1} / {newsItems.length}</p>
    </section>
  );
};

export default NewsCarousel;
