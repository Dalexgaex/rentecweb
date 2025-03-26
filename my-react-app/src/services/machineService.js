import { getProviderId } from './authService';

export const getProviderMachines = async () => {
  const providerId = getProviderId();
  if (!providerId) {
    throw new Error('No se encontró ID del proveedor');
  }
  
  try {
    const response = await fetch(`https://rentek.onrender.com/machinery/by-provider/${providerId}`);
    if (!response.ok) {
      throw new Error('Error al obtener las máquinas');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};