// src/services/machineService.js

const API_URL = "https://rentek.onrender.com/machinery/by-provider";

// Obtener las máquinas del proveedor
export const getProviderMachines = async (providerId) => {
  try {
    const response = await fetch(`${API_URL}/${providerId}`);
    if (!response.ok) throw new Error("No se pudieron obtener las máquinas");
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al obtener las máquinas");
  }
};

// Eliminar una máquina
export const deleteMachine = async (id) => {
  try {
    const response = await fetch(`https://rentek.onrender.com/machinery/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar la máquina");
  } catch (error) {
    throw new Error(error.message || "Error al eliminar la máquina");
  }
};

// Actualizar una máquina
export const updateMachine = async (id, machineData) => {
  try {
    const response = await fetch(`https://rentek.onrender.com/machinery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(machineData),
    });
    if (!response.ok) throw new Error("Error al actualizar la máquina");
  } catch (error) {
    throw new Error(error.message || "Error al actualizar la máquina");
  }
};
// Crear una nueva máquina
export const createMachine = async (machineData) => {
  try {
    const response = await fetch("https://rentek.onrender.com/machinery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(machineData),
    });

    if (!response.ok) {
      throw new Error("Error al crear la máquina");
    }

    // Retornar la respuesta si la máquina fue creada exitosamente
    const data = await response.json();
    return data; // Esto te permitirá manejar la respuesta desde el componente
  } catch (error) {
    throw new Error(error.message || "Error al crear la máquina");
  }
};
