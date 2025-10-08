// src/pages/WelcomePage.jsx (versión final)
import { useState, useEffect } from 'react'; // 1. Añadimos useEffect
import Modal from '../../components/common/Modal/Modal';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm'; 
import Header from '../../components/layout/Header/Header';
import HeroSection from '../../components/welcome/HeroSection/HeroSection';
import FeaturesSection from '../../components/welcome/FeaturesSection/FeaturesSection';
import Loader from '../../components/common/Loader/Loader'; // 2. Importamos el Loader

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true); // 3. Reintroducimos el estado de carga

  // 4. Usamos useEffect para manejar el loader inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Muestra el loader por 1.5 segundos

    return () => clearTimeout(timer); // Limpieza al desmontar el componente
  }, []);

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  // 5. Renderizado condicional: si está cargando, muestra el Loader
  if (loading) {
    return <Loader />;
  }

  // Si no, muestra la página completa
  return (
    <div className="bg-gray-100 dark:bg-gray-900 animate-fade-in">
      <Header />
      
      <main>
        <HeroSection onLoginClick={switchToLogin} onRegisterClick={switchToRegister} />
        <FeaturesSection />
      </main>
      
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Inner Journey. Todos los derechos reservados.</p>
      </footer>

      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)} title="Iniciar Sesión">
        <LoginForm onSwitchToRegister={switchToRegister} />
      </Modal>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title="Crear Cuenta">
        <RegisterForm onSwitchToLogin={switchToLogin} />
      </Modal>
    </div>
  );
};

export default WelcomePage;