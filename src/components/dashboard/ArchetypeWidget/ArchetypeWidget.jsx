// src/components/dashboard/ArchetypeWidget.jsx
import { Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import DashboardCard from '../../common/DashboardCard/DashboardCard';

const ArchetypeWidget = () => {
  const { user } = useAuth(); // Usamos el contexto para obtener los datos del perfil

  // Si aún no hay datos del arquetipo, no mostramos nada (o un loader pequeño)
  if (!user || !user.archetype) {
    return null; 
  }

  const { name, description, superpower } = user.archetype;

  return (
    <DashboardCard
      title="Tu Arquetipo Actual"
      icon={<Sparkles size={24} className="text-purple-500" />}
    >
      <div className="space-y-3">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="pt-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Tu Superpoder: <span className="font-normal text-gray-600 dark:text-gray-400">{superpower}</span>
          </p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ArchetypeWidget;