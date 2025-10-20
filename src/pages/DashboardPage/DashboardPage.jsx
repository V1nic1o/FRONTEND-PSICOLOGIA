import { useAuth } from '../../context/AuthContext/AuthContext';
import DilemmasWidget from '../../components/dashboard/DilemmasWidget/DilemmasWidget';
import ArchetypeWidget from '../../components/dashboard/ArchetypeWidget/ArchetypeWidget';
import ProgressWidget from '../../components/dashboard/ProgressWidget/ProgressWidget';
import ChallengesWidget from '../../components/dashboard/ChallengesWidget/ChallengesWidget';
import RadarChartWidget from '../../components/dashboard/RadarChartWidget/RadarChartWidget'; 

const DashboardPage = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- COLUMNA IZQUIERDA (PRINCIPAL) --- */}
        <div className="lg:col-span-2 space-y-6">
          <DilemmasWidget />
          <ChallengesWidget /> 
          <ProgressWidget /> 
        </div>

        {/* --- COLUMNA DERECHA (SECUNDARIA) --- */}
        <div className="space-y-6">
          <ArchetypeWidget />
          {/* 2. Añadimos el nuevo widget aquí */}
          <RadarChartWidget /> 
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;