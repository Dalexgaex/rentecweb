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

export const updateMachine = async (machineId, machineData) => {
  try {
    const providerData = JSON.parse(localStorage.getItem('providerData'));
    if (!providerData || !providerData.id) {
      throw new Error('No se encontró ID del proveedor');
    }

    const response = await fetch(`https://rentek.onrender.com/machinery/${machineId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...machineData,
        provider_id: providerData.id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar la máquina');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error al actualizar la máquina: ' + error.message);
  }
};

export const deleteMachine = async (machineId) => {
  try {
    const response = await fetch(`https://rentek.onrender.com/machinery/${machineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al eliminar la máquina');
    }

    return true;
  } catch (error) {
    throw new Error('Error al eliminar la máquina: ' + error.message);
  }
};