
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  font: string;
  setTheme: (theme: string) => void;
  setFont: (font: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>('default');
  const [font, setFontState] = useState<string>('quicksand');

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFont = localStorage.getItem('font');
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedFont) setFontState(savedFont);
  }, []);

  // Apply theme and font whenever they change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Apply the theme variables
    if (theme === 'space') {
      document.documentElement.style.setProperty('--background', '240 20% 3%');
      document.documentElement.style.setProperty('--foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--primary', '240 60% 60%');
      document.documentElement.style.setProperty('--primary-foreground', '240 10% 95%');
      document.documentElement.style.setProperty('--secondary', '240 30% 20%');
      document.documentElement.style.setProperty('--secondary-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--card', '240 20% 8%');
    } else if (theme === 'galaxy') {
      document.documentElement.style.setProperty('--background', '270 30% 10%');
      document.documentElement.style.setProperty('--foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--primary', '270 70% 70%');
      document.documentElement.style.setProperty('--primary-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--secondary', '270 40% 30%');
      document.documentElement.style.setProperty('--secondary-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--card', '270 30% 15%');
    } else if (theme === 'mars') {
      document.documentElement.style.setProperty('--background', '10 30% 95%');
      document.documentElement.style.setProperty('--foreground', '10 30% 20%');
      document.documentElement.style.setProperty('--primary', '10 80% 55%');
      document.documentElement.style.setProperty('--primary-foreground', '10 10% 95%');
      document.documentElement.style.setProperty('--secondary', '20 60% 70%');
      document.documentElement.style.setProperty('--secondary-foreground', '20 10% 20%');
      document.documentElement.style.setProperty('--card', '10 30% 97%');
    } else {
      // Default theme - reset to original values
      document.documentElement.style.setProperty('--background', '340 100% 99%');
      document.documentElement.style.setProperty('--foreground', '340 10% 20%');
      document.documentElement.style.setProperty('--primary', '340 90% 68%');
      document.documentElement.style.setProperty('--primary-foreground', '340 100% 99%');
      document.documentElement.style.setProperty('--secondary', '270 50% 81%');
      document.documentElement.style.setProperty('--secondary-foreground', '270 45% 25%');
      document.documentElement.style.setProperty('--card', '340 100% 99%');
    }
  }, [theme]);

  // Apply font changes
  useEffect(() => {
    document.body.className = `font-${font}`;
    localStorage.setItem('font', font);
  }, [font]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const setFont = (newFont: string) => {
    setFontState(newFont);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
