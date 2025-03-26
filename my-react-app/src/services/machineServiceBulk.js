export const createMachine = async (machineData, imageFile) => {
  try {
    const providerData = JSON.parse(localStorage.getItem('providerData'));
    if (!providerData || !providerData.id) {
      throw new Error('No se encontró ID del proveedor');
    }

    // Convertir los datos en un array como lo espera el endpoint bulk
    const machinePayload = [{
      ...machineData,
      provider_id: providerData.id
    }];

    const response = await fetch('https://rentek.onrender.com/machinery/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(machinePayload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la máquina');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error al crear la máquina: ' + error.message);
  }
};