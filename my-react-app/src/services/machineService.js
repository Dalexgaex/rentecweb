// machineService.js

const API_URL = "https://rentek.onrender.com/api/machinery"; // Ajusta la URL base si es necesario

// Función para obtener las máquinas asociadas a un proveedor
export const getProviderMachines = async (providerId) => {
  try {
    // Actualiza la URL a la correcta si ha cambiado
    const response = await fetch(`${API_URL}/machines?provider_id=${providerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener las máquinas");
    }

    const data = await response.json();
    return data; // Deberías retornar la lista de máquinas
  } catch (error) {
    throw new Error(error.message || "Error al obtener las máquinas");
  }
};
