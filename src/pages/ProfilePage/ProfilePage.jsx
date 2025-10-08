// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Calendar, Edit, LogOut, Sparkles } from 'lucide-react';
import Modal from '../../components/common/Modal/Modal';
import ProfileEditForm from '../../components/profile/ProfileEditForm';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (user);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatBirthDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const parts = dateString.split('T')[0].split('-');
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  if (!user) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* --- NUEVO BANNER DE PERFIL --- */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 sm:px-8 pb-8 -mt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:gap-6">
            {user.profile_image_url ? (
              <img
                src={user.profile_image_url}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-lg object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-5xl border-4 border-white dark:border-gray-800 shadow-lg">
                {user.first_name ? user.first_name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <div className="mt-4 sm:mt-0 sm:mb-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-4 sm:ml-auto flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900"
            >
              <Edit size={16} className="text-gray-800 dark:text-gray-100" /> Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* --- NUEVA SECCIÓN DE CONTENIDO --- */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna de Información */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Detalles de la Cuenta
          </h2>
          <dl className="space-y-6">
            <div className="flex justify-between items-center">
              <dt className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <User size={18} className="text-gray-800 dark:text-gray-100" />
                Nombre Completo
              </dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">
                {user.first_name} {user.last_name}
              </dd>
            </div>

            <div className="flex justify-between items-center">
              <dt className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Mail size={18} className="text-gray-800 dark:text-gray-100" />
                Correo Electrónico
              </dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">
                {user.email}
              </dd>
            </div>

            <div className="flex justify-between items-center">
              <dt className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Calendar size={18} className="text-gray-800 dark:text-gray-100" />
                Fecha de Nacimiento
              </dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">
                {formatBirthDate(user.date_of_birth)}
              </dd>
            </div>

            <div className="flex justify-between items-center">
              <dt className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Lock size={18} className="text-gray-800 dark:text-gray-100" />
                Contraseña
              </dt>
              <dd className="font-medium text-gray-900 dark:text-gray-100">
                ••••••••
              </dd>
            </div>
          </dl>
        </div>

        {/* Columna de Arquetipo y Logout */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Tu Arquetipo
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900/50 dark:text-purple-300">
              <Sparkles size={16} className="text-gray-800 dark:text-gray-100" />
              <span className="font-semibold">
                {user.archetype?.name || 'No definido'}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {user.archetype?.description}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
          >
            <LogOut size={18} className="text-red-700 dark:text-red-400" /> Cerrar Sesión
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Perfil"
      >
        <ProfileEditForm user={user} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;