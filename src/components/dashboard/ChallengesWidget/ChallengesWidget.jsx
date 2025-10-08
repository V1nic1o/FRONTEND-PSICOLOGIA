// src/components/dashboard/ChallengesWidget.jsx
import { useEffect, useState } from 'react';
import { ShieldCheck, Target } from 'lucide-react';
import api from '../../../api/api';
import DashboardCard from '../../common/DashboardCard/DashboardCard';

const ChallengesWidget = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get('/challenges/personal');
        setChallenges(response.data.challenges);
      } catch (err) {
        console.error("Error al obtener los retos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="h-32 flex items-center justify-center text-gray-500">Buscando tus retos...</div>;
    }

    if (challenges.length === 0) {
      return (
        <div className="h-32 flex flex-col items-center justify-center text-center">
          <ShieldCheck size={32} className="text-gray-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-400">¡Buen trabajo! No tienes retos pendientes por ahora.</p>
        </div>
      );
    }

    return (
      <ul className="space-y-4">
        {challenges.map((challenge, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Target size={20} className="text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{challenge.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <DashboardCard
      title="Tus Retos Semanales"
      icon={<ShieldCheck size={24} className="text-amber-500" />}
    >
      {renderContent()}
    </DashboardCard>
  );
};

export default ChallengesWidget;