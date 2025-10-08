// src/pages/App.jsx
import { useState, useEffect } from 'react';
import ThemeToggle from '../components/common/ThemeToggle/ThemeToggle';
import Loader from '../components/common/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  // Simula una carga de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Ahora usamos clases de Tailwind para el modo oscuro
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold mb-8">Base de la Aplicación Lista</h1>
      
      {loading ? (
        <Loader />
      ) : (
        <p className="text-lg">¡Bienvenido! El contenido ha cargado.</p>
      )}

    </div>
  );
}

export default App;