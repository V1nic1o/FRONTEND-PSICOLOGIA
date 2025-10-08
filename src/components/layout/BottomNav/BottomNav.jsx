// src/components/layout/BottomNav.jsx (Diseño de Alto Contraste con Etiquetas Permanentes)
import { NavLink } from 'react-router-dom';
import { Home, UserCircle, LineChart, ShieldCheck, Users } from 'lucide-react';

const NavItem = ({ to, icon, label }) => {
  // Clases base para el contenedor del enlace
  const commonClasses = "flex flex-col items-center justify-center h-full transition-all duration-300 ease-in-out relative";
  
  // Clases de color para el ícono y texto
  const activeColorClasses = "text-blue-600 dark:text-blue-400";
  const inactiveColorClasses = "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400";

  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `${commonClasses} w-1/5 group`}
    >
      {({ isActive }) => (
        // Contenedor principal para Ícono y Etiqueta
        <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full">
          
          {/* Indicador de Línea Superior (Mejora Visual) */}
          <div className={`absolute top-0 h-[3px] w-full rounded-b-md transition-all duration-300 ease-in-out 
                          ${isActive ? 'bg-blue-600 dark:bg-blue-400' : 'bg-transparent'}`} 
          />
          
          {/* Ícono con animación de rebote sutil al estar activo */}
          <div className={`transition-transform duration-300 ${isActive ? 'transform translate-y-[-2px] scale-105' : 'translate-y-0'}`}>
             {icon}
          </div>
          
          {/* Etiqueta - AHORA SIEMPRE VISIBLE */}
          <span className={`text-[10px] font-medium whitespace-nowrap transition-colors duration-300 
                            ${isActive ? activeColorClasses : inactiveColorClasses}`}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
};

const BottomNav = () => {
  return (
    // Mantenemos el look moderno (blur y sombra)
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 
                    bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm
                    border-t border-gray-100 dark:border-gray-800 
                    shadow-xl shadow-gray-400/10 dark:shadow-black/70"> 
      <div className="container mx-auto h-full flex items-stretch justify-around">
        <NavItem to="/dashboard" icon={<Home size={22} />} label="Inicio" />
        <NavItem to="/challenges" icon={<ShieldCheck size={22} />} label="Retos" />
        <NavItem to="/evolution" icon={<LineChart size={22} />} label="Evolución" />
        <NavItem to="/community" icon={<Users size={22} />} label="Comunidad" />
        <NavItem to="/profile" icon={<UserCircle size={22} />} label="Perfil" /> 
      </div>
    </nav>
  );
};

export default BottomNav;