import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isLightMode: boolean;
  isHighContrast: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "light";
    }
    const legacySaved = localStorage.getItem("high-contrast-mode");
    return legacySaved === "true";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isLightMode) {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      localStorage.setItem("high-contrast-mode", "true");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
      localStorage.setItem("high-contrast-mode", "false");
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, isHighContrast: isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
