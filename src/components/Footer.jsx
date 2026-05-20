import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/gramin-ai' || location.pathname === '/gramin-ai/';

  // Function to handle scroll-to-section from footer links
  const handleFooterLinkClick = (e, targetHash) => {
    if (isHome && targetHash.startsWith('#')) {
      const id = targetHash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = id;
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-top">
              <img src={process.env.PUBLIC_URL + "/graminailogo.jpeg"} alt="Gramin AI Summit" className="footer-logo" />
              <div className="footer-brand-divider"></div>
              <img
                src={process.env.PUBLIC_URL + "/LOGO.png"}
                alt="TDTL Logo"
                className="footer-logo"
              />
            </div>
            <p>
              {t('footer_desc')}
            </p>
          </div>
          <div className="footer-links">
            <h4>{t('footer_quick_links')}</h4>
            <ul>
              <li>
                <NavLink
                  to="/#about"
                  onClick={(e) => handleFooterLinkClick(e, '#about')}
                  className={({ isActive }) => (isHome && window.location.hash === "#about" ? "active-link" : "")}
                >
                  {t('nav_about')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#features"
                  onClick={(e) => handleFooterLinkClick(e, '#features')}
                  className={({ isActive }) => (isHome && window.location.hash === "#features" ? "active-link" : "")}
                >
                  {t('nav_features')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#projects"
                  onClick={(e) => handleFooterLinkClick(e, '#projects')}
                  className={({ isActive }) => (isHome && window.location.hash === "#projects" ? "active-link" : "")}
                >
                  {t('nav_projects')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {t('nav_support')}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>{t('footer_follow')}</h4>
            <div className="social-icons">
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </span>
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </span>
              <span className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>
            </div>
          </div>
          <div className="footer-contact">
            <h4>{t('footer_contact')}</h4>
            <p>{t('footer_email', 'aisummitahilyanagar@gmail.com')}</p>
            <p>{t('footer_phone', '+91 9112012291')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
