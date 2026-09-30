import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, otherwise default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Apply theme class to document root
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update body class for smooth transitions
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const themeColors = {
    light: {
      primary: '#0ea5e9',
      primaryDark: '#0369a1',
      secondary: '#3b82f6',
      background: '#ffffff',
      backgroundAlt: '#f8fafc',
      backgroundGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      text: '#1e293b',
      textSecondary: '#64748b',
      textLight: '#94a3b8',
      border: '#e2e8f0',
      card: '#ffffff',
      cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      hover: '#f1f5f9',
      overlay: 'rgba(0, 0, 0, 0.5)',
      buttonPrimary: '#0ea5e9',
      buttonText: '#ffffff',
    },
    dark: {
      primary: '#38bdf8',
      primaryDark: '#0ea5e9',
      secondary: '#60a5fa',
      background: '#0f172a',
      backgroundAlt: '#1e293b',
      backgroundGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textLight: '#94a3b8',
      border: '#334155',
      card: '#1e293b',
      cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      hover: '#334155',
      overlay: 'rgba(0, 0, 0, 0.7)',
      buttonPrimary: '#38bdf8',
      buttonText: '#0f172a',
    }
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

