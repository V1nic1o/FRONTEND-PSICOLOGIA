// src/components/welcome/HeroSection.jsx
import HeroIllustration from '../../../assets/hero-illustration.svg'; // 1. Importa tu ilustración principal aquí

const HeroSection = ({ onLoginClick, onRegisterClick }) => {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* 2. Usamos un grid de dos columnas para el layout principal */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Columna de Texto (izquierda) */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
              Descubre Tu
              {/* 3. Título con gradiente para un efecto visual impactante */}
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text">
                Interior
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto md:mx-0">
              Una aplicación diseñada para el autoconocimiento a través de tus decisiones diarias. ¿Estás listo para empezar tu viaje?
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={onLoginClick}
                className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={onRegisterClick}
                className="px-8 py-3 font-semibold text-blue-600 bg-white dark:bg-gray-800 border-2 border-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Registrarse
              </button>
            </div>
          </div>

          {/* Columna de Ilustración (derecha) */}
          <div className="hidden md:flex items-center justify-center">
             {/* 4. Espacio para la ilustración principal */}
            <img 
              src={HeroIllustration} 
              alt="Ilustración de autodescubrimiento" 
              className="w-full h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;