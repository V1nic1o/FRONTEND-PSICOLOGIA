// src/components/dashboard/RadarChartWidget.jsx
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'; // 1. Importamos Tooltip
import { Target } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import DashboardCard from '../../common/DashboardCard/DashboardCard';

const RadarChartWidget = () => {
  const { user } = useAuth();

  // Preparamos los datos para el gráfico radar, usamos nombres completos
  const data = user ? [
    { trait: 'Apertura', score: user.openness, fullMark: 100 },
    { trait: 'Responsabilidad', score: user.conscientiousness, fullMark: 100 },
    { trait: 'Extraversión', score: user.extraversion, fullMark: 100 },
    { trait: 'Amabilidad', score: user.agreeableness, fullMark: 100 },
    { trait: 'Neuroticismo', score: user.neuroticism, fullMark: 100 },
  ] : [];

  if (!user) {
    return null;
  }

  // Componente personalizado para el Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-800 dark:text-gray-100">{`${payload[0].payload.trait}`}</p>
          <p className="text-blue-600 dark:text-blue-400">{`Puntuación: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardCard
      title="Tu Perfil Actual (Big Five)"
      icon={<Target size={24} className="text-indigo-500" />}
    >
      {/* Ajustamos la altura para dar más espacio */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            {/* 2. Estilo de la rejilla más sutil */}
            <PolarGrid stroke="rgba(128, 128, 128, 0.2)" />
            {/* 3. Eje de ángulos con nombres completos y mejor estilo */}
            <PolarAngleAxis 
              dataKey="trait" 
              tick={{ fill: 'rgb(107 114 128 / 0.8)', fontSize: 13, fontWeight: 500 }} 
            />
            {/* Eje radial (sin cambios visibles) */}
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            {/* 4. Radar con punto activo y transición */}
            <Radar 
              name="Puntuación" 
              dataKey="score" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.5} 
              strokeWidth={2}
              // Punto resaltado al pasar el mouse
              activeDot={{ r: 6, strokeWidth: 2, fill: '#3b82f6', stroke: 'white' }} 
            />
            {/* 5. Añadimos el Tooltip personalizado */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default RadarChartWidget;