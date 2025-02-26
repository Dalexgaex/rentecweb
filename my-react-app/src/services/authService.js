import axios from "axios";

const API_URL = "https://rentek.onrender.com/api-docs/#/"; // Asegúrate de tener la URL base correcta

// Función para autenticar al usuario normal (para login)
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al registrar el usuario");
  }
};

// Función para autenticar al proveedor
export const loginProvider = async (providerData) => {
  try {
    const response = await axios.post(`${API_URL}/provider/login`, providerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión como proveedor");
  }
};

// Función para obtener las máquinas del proveedor
export const getProviderMachines = async (providerId) => {
    try {
      const response = await axios.get(`${API_URL}/machines?provider_id=${providerId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al obtener las máquinas del proveedor");
    }
  };
