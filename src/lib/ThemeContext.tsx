
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  font: string;
  setTheme: (theme: string) => void;
  setFont: (font: string) => void;
  previewTheme: string | null;
  previewFont: string | null;
  setPreviewTheme: (theme: string | null) => void;
  setPreviewFont: (font: string | null) => void;
  saveSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>('default');
  const [font, setFontState] = useState<string>('quicksand');
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [previewFont, setPreviewFont] = useState<string | null>(null);

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFont = localStorage.getItem('font');
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedFont) setFontState(savedFont);
  }, []);

  // Apply theme and font whenever they change or when previewing
  useEffect(() => {
    const activeTheme = previewTheme || theme;
    const activeFont = previewFont || font;
    
    document.documentElement.setAttribute('data-theme', activeTheme);
    
    // Apply the font class to body
    document.body.className = `font-${activeFont}`;
    
    // If not previewing, save to localStorage
    if (!previewTheme && !previewFont) {
      localStorage.setItem('theme', theme);
      localStorage.setItem('font', font);
    }
    
    // Apply comprehensive theme variables
    if (activeTheme === 'space') {
      // Deep Space theme (dark blue/purple space theme)
      document.documentElement.style.setProperty('--background', '240 20% 3%');
      document.documentElement.style.setProperty('--foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--primary', '240 60% 60%');
      document.documentElement.style.setProperty('--primary-foreground', '240 10% 95%');
      document.documentElement.style.setProperty('--secondary', '240 30% 20%');
      document.documentElement.style.setProperty('--secondary-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--card', '240 20% 8%');
      document.documentElement.style.setProperty('--card-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--muted', '240 15% 15%');
      document.documentElement.style.setProperty('--muted-foreground', '240 10% 70%');
      document.documentElement.style.setProperty('--accent', '240 40% 30%');
      document.documentElement.style.setProperty('--accent-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--border', '240 30% 20%');
      document.documentElement.style.setProperty('--input', '240 30% 20%');
      document.documentElement.style.setProperty('--ring', '240 60% 60%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '240 20% 10%');
      document.documentElement.style.setProperty('--sidebar-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--sidebar-primary', '240 60% 60%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '240 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '240 30% 25%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '240 10% 90%');
      document.documentElement.style.setProperty('--sidebar-border', '240 30% 25%');
      document.documentElement.style.setProperty('--sidebar-ring', '240 60% 60%');
    } else if (activeTheme === 'galaxy') {
      // Cosmic Galaxy theme (purple/pink galaxy theme)
      document.documentElement.style.setProperty('--background', '270 30% 10%');
      document.documentElement.style.setProperty('--foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--primary', '270 70% 70%');
      document.documentElement.style.setProperty('--primary-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--secondary', '270 40% 30%');
      document.documentElement.style.setProperty('--secondary-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--card', '270 30% 15%');
      document.documentElement.style.setProperty('--card-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--muted', '270 25% 25%');
      document.documentElement.style.setProperty('--muted-foreground', '270 10% 80%');
      document.documentElement.style.setProperty('--accent', '300 60% 50%');
      document.documentElement.style.setProperty('--accent-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--border', '270 40% 30%');
      document.documentElement.style.setProperty('--input', '270 40% 30%');
      document.documentElement.style.setProperty('--ring', '270 70% 70%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '270 30% 15%');
      document.documentElement.style.setProperty('--sidebar-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--sidebar-primary', '270 70% 70%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '300 60% 40%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '270 10% 95%');
      document.documentElement.style.setProperty('--sidebar-border', '270 40% 35%');
      document.documentElement.style.setProperty('--sidebar-ring', '270 70% 70%');
    } else if (activeTheme === 'mars') {
      // Mars Red theme (warm red/orange Mars theme)
      document.documentElement.style.setProperty('--background', '10 30% 95%');
      document.documentElement.style.setProperty('--foreground', '10 30% 20%');
      document.documentElement.style.setProperty('--primary', '10 80% 55%');
      document.documentElement.style.setProperty('--primary-foreground', '10 10% 95%');
      document.documentElement.style.setProperty('--secondary', '20 60% 70%');
      document.documentElement.style.setProperty('--secondary-foreground', '20 10% 20%');
      document.documentElement.style.setProperty('--card', '10 30% 97%');
      document.documentElement.style.setProperty('--card-foreground', '10 30% 20%');
      document.documentElement.style.setProperty('--muted', '10 20% 85%');
      document.documentElement.style.setProperty('--muted-foreground', '10 30% 40%');
      document.documentElement.style.setProperty('--accent', '30 80% 60%');
      document.documentElement.style.setProperty('--accent-foreground', '10 10% 95%');
      document.documentElement.style.setProperty('--border', '20 60% 80%');
      document.documentElement.style.setProperty('--input', '20 60% 80%');
      document.documentElement.style.setProperty('--ring', '10 80% 55%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '10 30% 90%');
      document.documentElement.style.setProperty('--sidebar-foreground', '10 30% 20%');
      document.documentElement.style.setProperty('--sidebar-primary', '10 80% 55%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '10 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '30 80% 60%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '10 10% 95%');
      document.documentElement.style.setProperty('--sidebar-border', '20 60% 75%');
      document.documentElement.style.setProperty('--sidebar-ring', '10 80% 55%');
    } else if (activeTheme === 'ocean') {
      // Deep Ocean theme (blue/teal ocean theme)
      document.documentElement.style.setProperty('--background', '200 70% 95%');
      document.documentElement.style.setProperty('--foreground', '200 50% 20%');
      document.documentElement.style.setProperty('--primary', '200 80% 50%');
      document.documentElement.style.setProperty('--primary-foreground', '200 10% 95%');
      document.documentElement.style.setProperty('--secondary', '180 50% 60%');
      document.documentElement.style.setProperty('--secondary-foreground', '200 50% 20%');
      document.documentElement.style.setProperty('--card', '200 70% 97%');
      document.documentElement.style.setProperty('--card-foreground', '200 50% 20%');
      document.documentElement.style.setProperty('--muted', '200 40% 85%');
      document.documentElement.style.setProperty('--muted-foreground', '200 50% 40%');
      document.documentElement.style.setProperty('--accent', '180 80% 45%');
      document.documentElement.style.setProperty('--accent-foreground', '200 10% 95%');
      document.documentElement.style.setProperty('--border', '180 50% 80%');
      document.documentElement.style.setProperty('--input', '180 50% 80%');
      document.documentElement.style.setProperty('--ring', '200 80% 50%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '200 70% 90%');
      document.documentElement.style.setProperty('--sidebar-foreground', '200 50% 20%');
      document.documentElement.style.setProperty('--sidebar-primary', '200 80% 50%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '200 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '180 80% 45%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '200 10% 95%');
      document.documentElement.style.setProperty('--sidebar-border', '180 50% 75%');
      document.documentElement.style.setProperty('--sidebar-ring', '200 80% 50%');
    } else if (activeTheme === 'forest') {
      // Forest theme (green/brown forest theme)
      document.documentElement.style.setProperty('--background', '120 20% 95%');
      document.documentElement.style.setProperty('--foreground', '120 30% 20%');
      document.documentElement.style.setProperty('--primary', '120 50% 45%');
      document.documentElement.style.setProperty('--primary-foreground', '120 10% 95%');
      document.documentElement.style.setProperty('--secondary', '40 40% 65%');
      document.documentElement.style.setProperty('--secondary-foreground', '120 30% 20%');
      document.documentElement.style.setProperty('--card', '120 20% 97%');
      document.documentElement.style.setProperty('--card-foreground', '120 30% 20%');
      document.documentElement.style.setProperty('--muted', '120 15% 85%');
      document.documentElement.style.setProperty('--muted-foreground', '120 30% 40%');
      document.documentElement.style.setProperty('--accent', '40 60% 50%');
      document.documentElement.style.setProperty('--accent-foreground', '120 10% 95%');
      document.documentElement.style.setProperty('--border', '80 40% 80%');
      document.documentElement.style.setProperty('--input', '80 40% 80%');
      document.documentElement.style.setProperty('--ring', '120 50% 45%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '120 20% 90%');
      document.documentElement.style.setProperty('--sidebar-foreground', '120 30% 20%');
      document.documentElement.style.setProperty('--sidebar-primary', '120 50% 45%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '120 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '40 60% 50%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '120 10% 95%');
      document.documentElement.style.setProperty('--sidebar-border', '80 40% 75%');
      document.documentElement.style.setProperty('--sidebar-ring', '120 50% 45%');
    } else {
      // Default theme (pink/purple love theme)
      document.documentElement.style.setProperty('--background', '340 100% 99%');
      document.documentElement.style.setProperty('--foreground', '340 10% 20%');
      document.documentElement.style.setProperty('--primary', '340 90% 68%');
      document.documentElement.style.setProperty('--primary-foreground', '340 100% 99%');
      document.documentElement.style.setProperty('--secondary', '270 50% 81%');
      document.documentElement.style.setProperty('--secondary-foreground', '270 45% 25%');
      document.documentElement.style.setProperty('--card', '340 100% 99%');
      document.documentElement.style.setProperty('--card-foreground', '340 10% 20%');
      document.documentElement.style.setProperty('--muted', '340 30% 95%');
      document.documentElement.style.setProperty('--muted-foreground', '340 10% 45%');
      document.documentElement.style.setProperty('--accent', '270 50% 81%');
      document.documentElement.style.setProperty('--accent-foreground', '270 45% 25%');
      document.documentElement.style.setProperty('--border', '340 50% 90%');
      document.documentElement.style.setProperty('--input', '340 50% 90%');
      document.documentElement.style.setProperty('--ring', '340 90% 68%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '340 100% 99%');
      document.documentElement.style.setProperty('--sidebar-foreground', '340 10% 20%');
      document.documentElement.style.setProperty('--sidebar-primary', '340 90% 68%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '340 100% 99%');
      document.documentElement.style.setProperty('--sidebar-accent', '340 30% 95%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '340 10% 20%');
      document.documentElement.style.setProperty('--sidebar-border', '340 50% 90%');
      document.documentElement.style.setProperty('--sidebar-ring', '340 90% 68%');
    }
  }, [theme, font, previewTheme, previewFont]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const setFont = (newFont: string) => {
    setFontState(newFont);
  };
  
  const saveSettings = () => {
    if (previewTheme) setThemeState(previewTheme);
    if (previewFont) setFontState(previewFont);
    setPreviewTheme(null);
    setPreviewFont(null);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      font, 
      setTheme, 
      setFont, 
      previewTheme, 
      previewFont, 
      setPreviewTheme, 
      setPreviewFont,
      saveSettings
    }}>
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
