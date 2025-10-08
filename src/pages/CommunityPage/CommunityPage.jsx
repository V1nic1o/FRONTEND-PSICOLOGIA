// src/pages/CommunityPage.jsx
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import api from '../../api/api';
import Loader from '../../components/common/Loader/Loader';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- COMPONENTE: Anillo de Progreso para Percentiles ---
const PercentileRing = ({ trait, percentile, color }) => {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentile / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center h-full">
      <div className="relative w-32 h-32">
        <svg height="100%" width="100%" viewBox="0 0 120 120" className="transform -rotate-90">
          <circle className="text-gray-200 dark:text-gray-700" stroke="currentColor" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
          <circle
            className={color}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, strokeLinecap: 'round' }}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{percentile}</span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">%</span>
        </div>
      </div>
      <p className="mt-3 font-semibold text-gray-700 dark:text-gray-200">{trait}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
        Tu puntuación es más alta que el {percentile}% de los usuarios.
      </p>
    </div>
  );
};

// --- COMPONENTE: Renderizado de la sección activa del Gráfico ---
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#999" className="text-sm">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
    </g>
  );
};

const CommunityPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/community/stats');
        const chartData = Object.entries(response.data.archetypeDistribution)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);
        setStats({ ...response.data, archetypeChartData: chartData });
      } catch (err) {
        setError("No se pudieron cargar las estadísticas de la comunidad.");
        console.error("Error al obtener las estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 p-8">{error}</p>;
  if (!stats) return null;

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];
  const TRAIT_COLORS = {
    openness: 'text-blue-500',
    conscientiousness: 'text-purple-500',
    extraversion: 'text-pink-500',
    agreeableness: 'text-green-500',
    neuroticism: 'text-amber-500'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full mb-4">
          <Users size={32} className="text-teal-600 dark:text-teal-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Estadísticas de la Comunidad</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-3xl mx-auto">
          Descubre cómo tus rasgos se comparan con los de otros usuarios. Todos los datos son anónimos.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Tu Posición en la Comunidad</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <PercentileRing trait="Apertura" percentile={stats.userPercentiles.openness} color={TRAIT_COLORS.openness} />
          <PercentileRing trait="Responsabilidad" percentile={stats.userPercentiles.conscientiousness} color={TRAIT_COLORS.conscientiousness} />
          <PercentileRing trait="Extraversión" percentile={stats.userPercentiles.extraversion} color={TRAIT_COLORS.extraversion} />
          <PercentileRing trait="Amabilidad" percentile={stats.userPercentiles.agreeableness} color={TRAIT_COLORS.agreeableness} />
          <PercentileRing trait="Neuroticismo" percentile={stats.userPercentiles.neuroticism} color={TRAIT_COLORS.neuroticism} />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Distribución de Arquetipos</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto">
            
            <div className="h-80 w-full md:col-span-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={stats.archetypeChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {stats.archetypeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={() => null} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 md:col-span-2">
              {stats.archetypeChartData.map((entry, index) => (
                <div 
                  key={`legend-${index}`} 
                  className={`flex items-center justify-between text-base p-2 rounded-lg transition-colors ${activeIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-100">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;