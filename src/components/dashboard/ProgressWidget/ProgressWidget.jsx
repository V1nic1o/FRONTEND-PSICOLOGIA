// src/components/dashboard/ProgressWidget.jsx
import { useEffect, useState } from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import api from '../../../api/api';
import DashboardCard from '../../common/DashboardCard/DashboardCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const ProgressWidget = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/profile/history');

        const data = Array.isArray(response.data) ? response.data : [response.data];

        // Formateamos los datos correctamente para mantener coherencia con EvolutionPage
        const formattedData = data.map(snapshot => ({
          ...snapshot,
          openness: Number(snapshot.openness) || 0,
          conscientiousness: Number(snapshot.conscientiousness) || 0,
          extraversion: Number(snapshot.extraversion) || 0,
          agreeableness: Number(snapshot.agreeableness) || 0,
          neuroticism: Number(snapshot.neuroticism) || 0,
          date: new Date(snapshot.snapshot_date).toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
          }),
        }));

        // Orden cronológico
        const sortedData = formattedData.sort(
          (a, b) => new Date(a.snapshot_date) - new Date(b.snapshot_date)
        );

        setHistory(sortedData);
      } catch (err) {
        console.error('Error al obtener el historial de progreso:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-48 flex items-center justify-center text-gray-500">
          Cargando progreso...
        </div>
      );
    }

    if (history.length === 0) {
      return (
        <div className="h-48 flex flex-col items-center justify-center text-center">
          <Activity size={32} className="text-gray-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Aún no hay registros suficientes. ¡Completa un dilema para iniciar tu progreso!
          </p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={history}
          margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
          <XAxis
            dataKey="date"
            stroke="rgb(156 163 175)"
            fontSize={11}
            tickMargin={6}
          />
          <YAxis
            domain={[0, 100]}
            stroke="rgb(156 163 175)"
            fontSize={11}
            tickMargin={4}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30,41,59,0.9)',
              border: '1px solid #475569',
              borderRadius: '0.75rem',
              color: '#f1f5f9',
              padding: '0.75rem',
            }}
            labelStyle={{ color: '#e2e8f0', fontWeight: 600 }}
          />
          <Legend
            verticalAlign="bottom"
            height={24}
            wrapperStyle={{
              fontSize: '11px',
              paddingTop: '4px',
            }}
          />

          {/* 🎨 Líneas coherentes con EvolutionPage */}
          <Line
            type="monotone"
            dataKey="agreeableness"
            name="Amabilidad"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="openness"
            name="Apertura"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="extraversion"
            name="Extraversión"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="neuroticism"
            name="Neuroticismo"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="conscientiousness"
            name="Responsabilidad"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <DashboardCard
      title="Tu Evolución"
      icon={<TrendingUp size={22} className="text-green-500" />}
    >
      {renderContent()}
    </DashboardCard>
  );
};

export default ProgressWidget;