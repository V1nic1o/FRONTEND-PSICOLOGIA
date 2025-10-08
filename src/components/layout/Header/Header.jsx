// src/components/layout/Header.jsx
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import { BrainCircuit } from 'lucide-react';

const Header = () => {
  return (
    // 1. El <header> ahora es un contenedor de ancho completo con padding
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      
      {/* 2. El <nav> se centra, tiene un ancho máximo y las esquinas redondeadas */}
      <nav 
        className="w-full max-w-7xl mx-auto px-6 py-3 flex items-center justify-between 
                   bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                   border border-gray-200 dark:border-gray-700 
                   rounded-2xl shadow-md"
      >
        {/* Logo como botón para recargar */}
        <a href="/" className="flex items-center gap-3 cursor-pointer">
          <BrainCircuit size={28} className="text-blue-600" />
          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Inner Journey
          </span>
        </a>

        {/* Controles (ej. cambio de tema) */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>

    </header>
  );
};

export default Header;