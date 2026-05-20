import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [langTooltip, setLangTooltip] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'mr' ? 'en' : 'mr';
    i18n.changeLanguage(newLang);
    setLangTooltip(true);
    setTimeout(() => setLangTooltip(false), 2000);
  };
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/gramin-ai' || location.pathname === '/gramin-ai/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isHome) {
        const sections = ['speakers', 'agenda', 'about', 'features', 'projects', 'news'];
        let current = 'home';

        // Find which section is currently centered on screen or near top
        sections.forEach((section) => {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Generous threshold to ensure early detection on scroll
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
              current = section;
            }
          }
        });

        // Special case for scrolling to absolute bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          current = 'news';
        }

        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Update active section when route changes
  useEffect(() => {
    if (isHome) {
      setScrolled(window.scrollY > 20);
      // Small timeout to allow jumping to hash to complete
      setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          setActiveSection(hash);
        } else {
          setActiveSection('home');
        }
      }, 100);
    }
  }, [location, isHome]);

  // Helper function to handle link click
  const handleNavLinkClick = (e, targetHash) => {
    setMenuOpen(false);

    // If we're already on the home page and clicked a hash link
    if (isHome && targetHash.startsWith('#')) {
      const id = targetHash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        // Update hash in URL
        window.location.hash = id;
        setActiveSection(id);
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-glass" : ""}`}>
      <div className="container nav-content">
        <NavLink to="/" className="brand" onClick={(e) => handleNavLinkClick(e, '#home')}>
          <img src={process.env.PUBLIC_URL + "/graminailogo.jpeg"} alt="Gramin AI Summit" className="brand-summit-logo" />
          <div className="nav-brand-divider"></div>
          <img
            src={process.env.PUBLIC_URL + "/LOGO.png"}
            alt="Gramin AI Logo"
            className="brand-logo-main"
          />
        </NavLink>

        <div
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/#home"
              onClick={(e) => handleNavLinkClick(e, '#home')}
              className={() =>
                isHome && activeSection === "home" ? "active-link" : ""
              }
            >
              {t('nav_home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#speakers"
              onClick={(e) => handleNavLinkClick(e, '#speakers')}
              className={
                isHome && activeSection === "speakers" ? "active-link" : ""
              }
            >
              {t('nav_speakers')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#about"
              onClick={(e) => handleNavLinkClick(e, '#about')}
              className={
                isHome && activeSection === "about" ? "active-link" : ""
              }
            >
              {t('nav_about')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#agenda"
              onClick={(e) => handleNavLinkClick(e, '#agenda')}
              className={
                isHome && activeSection === "agenda" ? "active-link" : ""
              }
            >
              {t('nav_agenda')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#features"
              onClick={(e) => handleNavLinkClick(e, '#features')}
              className={
                isHome && activeSection === "features" ? "active-link" : ""
              }
            >
              {t('nav_features')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#projects"
              onClick={(e) => handleNavLinkClick(e, '#projects')}
              className={
                isHome && activeSection === "projects" ? "active-link" : ""
              }
            >
              {t('nav_projects')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/#news"
              onClick={(e) => handleNavLinkClick(e, '#news')}
              className={
                isHome && activeSection === "news" ? "active-link" : ""
              }
            >
              {t('nav_news')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {t('nav_register')}
            </NavLink>
          </li>
          <li>
            <button className="lang-toggle-nav" onClick={toggleLanguage} aria-label="Toggle Language">
              <span className="lang-icon">🌐</span>
              <span className="lang-text">{t('nav_lang')}</span>
              {langTooltip && (
                <div className="lang-bubble-tooltip">
                  {t('nav_lang_switched')}
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
