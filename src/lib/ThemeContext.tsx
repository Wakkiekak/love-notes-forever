
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
    const fontScale = localStorage.getItem('fontScale');
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedFont) setFontState(savedFont);
    
    // Apply font scale if set
    if (fontScale) {
      document.documentElement.style.fontSize = `${fontScale}%`;
    }
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
    if (activeTheme === 'mars') {
      // Updated Mars Night theme (orange-red, like night on Mars)
      document.documentElement.style.setProperty('--background', '10 60% 8%');  // Dark orange-red background
      document.documentElement.style.setProperty('--foreground', '30 80% 85%');  // Soft amber text
      document.documentElement.style.setProperty('--primary', '15 90% 45%');     // Bright Mars orange-red
      document.documentElement.style.setProperty('--primary-foreground', '30 80% 95%'); // Amber text on primary
      document.documentElement.style.setProperty('--secondary', '20 50% 25%');   // Darker rust color
      document.documentElement.style.setProperty('--secondary-foreground', '30 80% 95%'); // Light text on secondary
      document.documentElement.style.setProperty('--card', '10 50% 12%');        // Slightly lighter card background
      document.documentElement.style.setProperty('--card-foreground', '30 80% 85%'); // Amber text on cards
      document.documentElement.style.setProperty('--muted', '10 40% 18%');       // Muted background
      document.documentElement.style.setProperty('--muted-foreground', '30 50% 70%'); // Muted text
      document.documentElement.style.setProperty('--accent', '25 70% 35%');      // Rust accent
      document.documentElement.style.setProperty('--accent-foreground', '30 80% 95%'); // Light text on accent
      document.documentElement.style.setProperty('--border', '15 40% 25%');      // Border color
      document.documentElement.style.setProperty('--input', '15 40% 25%');       // Input border color
      document.documentElement.style.setProperty('--ring', '15 90% 45%');        // Focus ring
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '10 60% 12%'); // Sidebar background
      document.documentElement.style.setProperty('--sidebar-foreground', '30 80% 85%'); // Sidebar text color
      document.documentElement.style.setProperty('--sidebar-primary', '15 90% 45%');    // Sidebar primary color
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '30 80% 95%'); // Text on primary
      document.documentElement.style.setProperty('--sidebar-accent', '25 70% 35%');     // Sidebar accent
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '30 80% 95%'); // Text on accent
      document.documentElement.style.setProperty('--sidebar-border', '15 40% 25%');     // Sidebar border
      document.documentElement.style.setProperty('--sidebar-ring', '15 90% 45%');       // Sidebar focus ring
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
    } else if (activeTheme === 'sunset') {
      // Sunset theme (orange/purple sunset colors)
      document.documentElement.style.setProperty('--background', '25 100% 97%');
      document.documentElement.style.setProperty('--foreground', '280 30% 25%');
      document.documentElement.style.setProperty('--primary', '25 95% 60%');
      document.documentElement.style.setProperty('--primary-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--secondary', '280 60% 60%');
      document.documentElement.style.setProperty('--secondary-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--card', '25 100% 99%');
      document.documentElement.style.setProperty('--card-foreground', '280 30% 25%');
      document.documentElement.style.setProperty('--muted', '25 30% 90%');
      document.documentElement.style.setProperty('--muted-foreground', '280 20% 40%');
      document.documentElement.style.setProperty('--accent', '280 60% 60%');
      document.documentElement.style.setProperty('--accent-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--border', '25 50% 85%');
      document.documentElement.style.setProperty('--input', '25 50% 85%');
      document.documentElement.style.setProperty('--ring', '25 95% 60%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '25 100% 95%');
      document.documentElement.style.setProperty('--sidebar-foreground', '280 30% 25%');
      document.documentElement.style.setProperty('--sidebar-primary', '25 95% 60%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--sidebar-accent', '280 60% 60%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '0 0% 100%');
      document.documentElement.style.setProperty('--sidebar-border', '25 50% 85%');
      document.documentElement.style.setProperty('--sidebar-ring', '25 95% 60%');
    } else if (activeTheme === 'midnight') {
      // Midnight theme (dark blue/purple night theme)
      document.documentElement.style.setProperty('--background', '230 50% 5%');
      document.documentElement.style.setProperty('--foreground', '230 15% 85%');
      document.documentElement.style.setProperty('--primary', '230 80% 65%');
      document.documentElement.style.setProperty('--primary-foreground', '230 10% 95%');
      document.documentElement.style.setProperty('--secondary', '250 50% 30%');
      document.documentElement.style.setProperty('--secondary-foreground', '230 10% 95%');
      document.documentElement.style.setProperty('--card', '230 50% 8%');
      document.documentElement.style.setProperty('--card-foreground', '230 15% 85%');
      document.documentElement.style.setProperty('--muted', '230 30% 15%');
      document.documentElement.style.setProperty('--muted-foreground', '230 15% 65%');
      document.documentElement.style.setProperty('--accent', '250 50% 40%');
      document.documentElement.style.setProperty('--accent-foreground', '230 10% 95%');
      document.documentElement.style.setProperty('--border', '230 30% 15%');
      document.documentElement.style.setProperty('--input', '230 30% 15%');
      document.documentElement.style.setProperty('--ring', '230 80% 65%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '230 50% 10%');
      document.documentElement.style.setProperty('--sidebar-foreground', '230 15% 85%');
      document.documentElement.style.setProperty('--sidebar-primary', '230 80% 65%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '230 10% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '250 50% 40%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '230 10% 95%');
      document.documentElement.style.setProperty('--sidebar-border', '230 30% 20%');
      document.documentElement.style.setProperty('--sidebar-ring', '230 80% 65%');
    } else if (activeTheme === 'retro') {
      // Retro theme (vintage colors)
      document.documentElement.style.setProperty('--background', '40 30% 92%');
      document.documentElement.style.setProperty('--foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--primary', '20 70% 40%');
      document.documentElement.style.setProperty('--primary-foreground', '40 30% 95%');
      document.documentElement.style.setProperty('--secondary', '180 15% 60%');
      document.documentElement.style.setProperty('--secondary-foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--card', '40 30% 95%');
      document.documentElement.style.setProperty('--card-foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--muted', '40 20% 85%');
      document.documentElement.style.setProperty('--muted-foreground', '20 20% 40%');
      document.documentElement.style.setProperty('--accent', '180 15% 60%');
      document.documentElement.style.setProperty('--accent-foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--border', '40 30% 80%');
      document.documentElement.style.setProperty('--input', '40 30% 80%');
      document.documentElement.style.setProperty('--ring', '20 70% 40%');
      
      // Sidebar colors
      document.documentElement.style.setProperty('--sidebar-background', '40 30% 90%');
      document.documentElement.style.setProperty('--sidebar-foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--sidebar-primary', '20 70% 40%');
      document.documentElement.style.setProperty('--sidebar-primary-foreground', '40 30% 95%');
      document.documentElement.style.setProperty('--sidebar-accent', '180 15% 60%');
      document.documentElement.style.setProperty('--sidebar-accent-foreground', '20 30% 25%');
      document.documentElement.style.setProperty('--sidebar-border', '40 30% 80%');
      document.documentElement.style.setProperty('--sidebar-ring', '20 70% 40%');
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
