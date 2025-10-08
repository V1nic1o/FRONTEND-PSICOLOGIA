// src/components/auth/LoginForm.jsx (versión actualizada)
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Loader from '../common/Loader/Loader';

const LoginForm = ({ onSwitchToRegister }) => { // 1. Añadimos la prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Entrar
        </button>
      </div>
      {/* 2. Añadimos el enlace para cambiar de formulario */}
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        ¿No tienes una cuenta?{' '}
        <button type="button" onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:underline">
          Regístrate
        </button>
      </p>
    </form>
  );
};

export default LoginForm;