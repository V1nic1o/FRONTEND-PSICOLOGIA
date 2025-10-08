import axios from 'axios';

// Creamos una instancia de Axios con una configuración base
const api = axios.create({
  // Usamos la variable de entorno que definimos en el .env
  // import.meta.env es la forma en que Vite accede a estas variables
  baseURL: import.meta.env.VITE_API_BASE_URL
});


export default api;