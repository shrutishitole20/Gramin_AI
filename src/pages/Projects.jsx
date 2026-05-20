import React from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.css';

const projectData = [
  {
    id: 1,
    title: "Rural Cloud Computing",
    category: "CORE CAPABILITY",
    phase: "Hiring Top Talent",
    icon: "☁️",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    description: "High-performance edge computing infrastructure specifically designed for limited-bandwidth rural zones.",
    details: "Deployment without barriers. We provide high-availability cloud and edge resources that function seamlessly in areas with low connectivity. No more server delays—scale your application directly where it is needed the most."
  },
  {
    id: 2,
    title: "Gramin Shiksha LMS",
    category: "EDUCATION TOOL",
    phase: "Deployed in 40 Schools",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    description: "LLM-based personalized tutoring systems localized in Marathi and Hindi for rural schools without dedicated stem teachers.",
    details: "Gramin Shiksha bridges the educational divide by providing students in remote villages with high-quality AI tutoring in their native languages. The platform adaptively adjusts to each student's learning pace."
  }
];

const Projects = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="projects-page container reveal reveal-up">
        <div className="section-header text-center pb-8">
          <span className="section-tag-modern">{t('projects_tag', 'SUMMIT EVENTS')}</span>
          <h2 className="narrative-title"><span className="brand-highlight">{t('projects_brand', 'Gramin AI')}</span> <span className="highlight-blue">{t('projects_summit', 'Summit 2026')}</span></h2>
          <p className="mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem', color: '#64748b' }}>
            {t('projects_desc', 'Explore the premier hackathons, showcases, and roundtable events scheduled for our flagship AI conference.')}
          </p>
        </div>

        <div className="projects-stacked-list">
          {projectData.map((project) => (
            <div
              className="project-stacked-card"
              key={project.id}
            >
              <div className="project-stacked-img">
                <img src={project.image} alt={project.title} />
                <div className="project-phase-tag">{t(`proj_phase_${project.id}`, project.phase)}</div>
              </div>
              <div className="project-stacked-info">
                <h3>{t(`proj_title_${project.id}`, project.title)}</h3>
                <p>{t(`proj_desc_${project.id}`, project.description)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Projects;
