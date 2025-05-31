"use client";

import type { Dispatch, SetStateAction } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeColors = {
  primary: string;
  background: string;
  accent: string;
};

type ThemeContextType = {
  colors: ThemeColors;
  setColors: Dispatch<SetStateAction<ThemeColors>>;
  resetColors: () => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
};

const defaultColors: ThemeColors = {
  primary: 'hsl(124 59% 52%)', // #3bd047
  background: 'hsl(0 0% 99%)', // #fcfcfc
  accent: 'hsl(236 56% 18%)', // #151948
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  const applyColors = useCallback((newColors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', newColors.primary);
    // Note: background color changes require careful handling of foreground and other derived colors.
    // For simplicity, we're only changing the CSS variable here.
    // A full dynamic background change would also need to update --foreground, --card, etc., or use CSS to derive them.
    root.style.setProperty('--background', newColors.background);
    root.style.setProperty('--accent', newColors.accent);
    
    // Potentially re-calculate and set related colors based on primary/accent
    // For example, if primary changes, --ring might need to change.
    // Or if background changes, --foreground, --card, --popover might need to adjust.
    // This simple implementation just sets the main ones.
    if (newColors.primary) {
        root.style.setProperty('--ring', newColors.primary);
    }

  }, []);
  
  useEffect(() => {
    setIsMounted(true);
    const storedColors = localStorage.getItem('themeColors');
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;

    if (storedColors) {
      const parsedColors = JSON.parse(storedColors);
      setColors(parsedColors);
      applyColors(parsedColors);
    } else {
      applyColors(defaultColors); // Apply defaults if nothing stored
    }

    if (storedMode) {
      setThemeModeState(storedMode);
      document.documentElement.classList.toggle('dark', storedMode === 'dark');
    } else {
       document.documentElement.classList.remove('dark');
    }
  }, [applyColors]);


  useEffect(() => {
    if(isMounted) {
      localStorage.setItem('themeColors', JSON.stringify(colors));
      applyColors(colors);
    }
  }, [colors, applyColors, isMounted]);

  const setThemeMode = (mode: 'light' | 'dark') => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  const resetColors = () => {
    setColors(defaultColors);
    localStorage.setItem('themeColors', JSON.stringify(defaultColors));
    applyColors(defaultColors);
  };
  
  if (!isMounted) {
    return null; // Avoid rendering children until theme is loaded to prevent flash
  }

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetColors, themeMode, setThemeMode }}>
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
