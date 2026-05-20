/**
 * theme.js
 * Design system tokens and CSS variables for Gramin AI
 */

export const theme = {
  colors: {
    primary: '#A855F7',
    'primary-light': '#C084FC',
    'primary-dark': '#7C3AED',
    secondary: '#A855F7',
    accent: '#F4D03F',
    'dark-base': '#ffffff',
    'soft-surface': '#f8f5ff',
    glass: 'rgba(168, 85, 247, 0.05)',
    'glass-border': 'rgba(168, 85, 247, 0.2)',
    glassDark: 'rgba(168, 85, 247, 0.1)',
    textPrimary: '#0f172a',
    textSecondary: '#4b5563',
    'gradient-main': 'linear-gradient(135deg, #A855F7, #7C3AED)',
    'gradient-tech': 'linear-gradient(135deg, #A855F7, #7C3AED)',
    'glow-purple': '0 0 20px rgba(168, 85, 247, 0.25)',
    'glow-combined': '0 0 25px rgba(168, 85, 247, 0.2)',
  },
  animations: {
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  shadows: {
    soft: '0 4px 20px rgba(168, 85, 247, 0.1)',
    medium: '0 8px 30px rgba(168, 85, 247, 0.15)',
    glass: '0 8px 32px rgba(168, 85, 247, 0.1)',
    sm: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px -5px rgba(168, 85, 247, 0.15)',
  }
};

export const applyTheme = () => {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  root.style.setProperty('--transition', theme.animations.transition);
  root.style.setProperty('--shadow-soft', theme.shadows.soft);
  root.style.setProperty('--shadow-medium', theme.shadows.medium);
  root.style.setProperty('--shadow-glass', theme.shadows.glass);
  root.style.setProperty('--shadow-sm', theme.shadows.sm);
  root.style.setProperty('--shadow-md', theme.shadows.md);
  root.style.setProperty('--shadow-lg', theme.shadows.lg);

  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundColor = '#ffffff';
};
