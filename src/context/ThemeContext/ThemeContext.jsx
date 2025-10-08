// src/context/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Lee el tema del localStorage o usa 'light' por defecto
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark'); // Limpia clases anteriores
    root.classList.add(theme); // Añade la clase del tema actual

    localStorage.setItem('theme', theme); // Guarda la preferencia del usuario
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Un custom hook para usar el contexto más fácilmente
export const useTheme = () => {
  return useContext(ThemeContext);
};