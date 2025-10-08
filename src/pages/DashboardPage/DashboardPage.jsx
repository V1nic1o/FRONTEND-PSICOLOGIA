import { useAuth } from '../../context/AuthContext/AuthContext';
import DilemmasWidget from '../../components/dashboard/DilemmasWidget/DilemmasWidget';
import ArchetypeWidget from '../../components/dashboard/ArchetypeWidget/ArchetypeWidget';
import ProgressWidget from '../../components/dashboard/ProgressWidget/ProgressWidget';
import ChallengesWidget from '../../components/dashboard/ChallengesWidget/ChallengesWidget';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6">
      {/* 🧠 Encabezado minimalista con degradado */}
      {user && (
        <div className="mb-8 px-2 sm:px-0">
          <h1
            className="text-2xl sm:text-4xl font-extrabold text-left tracking-tight
                       bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500
                       dark:from-indigo-300 dark:via-blue-400 dark:to-purple-400
                       text-transparent bg-clip-text select-none"
          >
            ¡Bienvenid@, {user.first_name} {user.last_name}!
          </h1>
        </div>
      )}

      {/* 🔹 Contenedor principal de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* --- COLUMNA IZQUIERDA (PRINCIPAL) --- */}
        <div className="lg:col-span-2 space-y-6">
          <DilemmasWidget />
          <ArchetypeWidget />
        </div>

        {/* --- COLUMNA DERECHA (SECUNDARIA) --- */}
        <div className="space-y-6">
          <ChallengesWidget />
          <ProgressWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;