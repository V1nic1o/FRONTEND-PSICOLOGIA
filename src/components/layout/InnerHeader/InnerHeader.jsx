import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';

const InnerHeader = () => {
  const { user } = useAuth();

  return (
    <header className="w-full 
                       bg-white dark:bg-gray-900 
                       border-b border-gray-200 dark:border-gray-700 
                       shadow-sm z-30"> 
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
          <BrainCircuit size={28} className="text-blue-600" />
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            Inner Journey
          </span>
        </Link>

        {/* Controles (Tema y Avatar) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Botón de Tema */}
          <ThemeToggle />

          {/* Avatar del Usuario */}
          {user && (
            <>
              {user.profile_image_url ? (
                <img 
                  src={user.profile_image_url}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg border-2 border-gray-300 dark:border-gray-600">
                  {user.first_name ? user.first_name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default InnerHeader;