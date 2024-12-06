"use client";

import React, { useState, ReactNode, createContext, useEffect } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;

      localStorage.setItem("darkMode", newDarkMode.toString());

      document.documentElement.classList.toggle("dark", newDarkMode);

      return newDarkMode;
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    setDarkMode(savedMode === "true");

    if (savedMode === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
