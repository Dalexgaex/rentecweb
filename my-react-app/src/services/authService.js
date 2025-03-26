import axios from "axios";

const API_URL = "https://rentek.onrender.com/api-docs/#/Machinery%20method%20get/get_machinery_by_provider__provider_id_"; // Asegúrate de tener la URL base correcta
const API_URL2 = 'https://rentek.onrender.com/providers'; // Replace with your actual API base URL

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

export const loginProvider = async ({ email, password }) => {
  const response = await fetch(`${API_URL2}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al iniciar sesión');
  }

  const providerData = await response.json();
  // Guardamos los datos del proveedor y el ID por separado
  localStorage.setItem('providerData', JSON.stringify(providerData));
  localStorage.setItem('provider_id', providerData.id);
  return providerData;
};

// También podemos agregar una función auxiliar para obtener el ID cuando lo necesitemos
export const getProviderId = () => {
  return localStorage.getItem('provider_id');
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
