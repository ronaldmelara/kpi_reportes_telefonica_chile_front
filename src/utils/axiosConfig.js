// axiosConfig.js
import axios from "axios";

const addAuthorizationHeader = (config, token) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
};

const handleAuthorizationError = (error) => {
  if (error.response.status === 401) {
    // Manejo de errores de autorización, por ejemplo, redirigir al inicio de sesión
  }
  return Promise.reject(error);
};

const createAxiosInstance = (token) => {
  const instance = axios.create();
  instance.interceptors.request.use((config) =>
    addAuthorizationHeader(config, token)
  );
  instance.interceptors.response.use(
    (response) => response,
    handleAuthorizationError
  );

  return instance;
};

export default createAxiosInstance;
