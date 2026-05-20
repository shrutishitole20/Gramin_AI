import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';
import AboutUs from './pages/AboutUs';
import Features from './pages/Features';
import Projects from './pages/Projects';
import Support from './pages/Support';
import Certificates from './pages/Certificates';
import { applyTheme } from './theme';
import { useScrollReveal } from './hooks/useScrollReveal';
import FloatingChatbot from './components/FloatingChatbot';
import './index.css';

function AppContent() {
  const location = useLocation();
  useScrollReveal('.reveal', 0.1, location.pathname);

  useEffect(() => {
    applyTheme();
    // Scroll to top on page change
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // Scroll to hash element if it exists
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/support" element={<Support />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/certifiates" element={<Navigate to="/certificates" replace />} />
          <Route path="/certificate" element={<Navigate to="/certificates" replace />} />
        </Routes>
      </main>
      <FloatingChatbot />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || ''}>
      <AppContent />
    </Router>
  );
}

export default App;
