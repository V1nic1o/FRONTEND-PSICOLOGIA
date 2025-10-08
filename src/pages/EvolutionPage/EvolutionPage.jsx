import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../../api/api';
import { Activity } from 'lucide-react';
import Loader from '../../components/common/Loader/Loader';

const EvolutionPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.get('/profile/history');
        const data = Array.isArray(response.data) ? response.data : [response.data];

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
          })
        }));

        const sortedData = formattedData.sort(
          (a, b) => new Date(a.snapshot_date) - new Date(b.snapshot_date)
        );

        setHistory(sortedData);
      } catch (err) {
        console.error('Error al obtener el historial de progreso:', err);
        setError('No se pudo cargar tu historial de evolución.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

    if (history.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-[50vh] px-4">
          <Activity size={48} className="text-gray-400 mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Sin datos disponibles
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-md">
            Aún no tienes historial suficiente. Completa un dilema para iniciar tu evolución.
          </p>
        </div>
      );
    }

    return (
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={history}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
            <XAxis
              dataKey="date"
              stroke="rgb(107 114 128)"
              fontSize={10}
              tickMargin={8}
            />
            <YAxis
              stroke="rgb(107 114 128)"
              fontSize={10}
              domain={[0, 100]}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(6px)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '0.85rem'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: 10 }} />

            {/* Líneas adaptadas a colores suaves */}
            <Line
              type="monotone"
              dataKey="openness"
              name="Apertura"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="conscientiousness"
              name="Responsabilidad"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="extraversion"
              name="Extraversión"
              stroke="#ec4899"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="agreeableness"
              name="Amabilidad"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="neuroticism"
              name="Neuroticismo"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8 px-2 sm:px-0 text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight 
                       bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                       dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 
                       text-transparent bg-clip-text">
          Mi Evolución
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
          Observa cómo tus rasgos de personalidad han cambiado con el tiempo según tus decisiones.
        </p>
      </div>

      {/* Contenedor del gráfico */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default EvolutionPage;