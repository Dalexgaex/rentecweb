const API_URL = "https://rentek.onrender.com/machinery";

// Obtener las máquinas del proveedor
export const getProviderMachines = async () => {
  try {
    const providerId = localStorage.getItem("providerId");
    if (!providerId) throw new Error("No se encontró el ID del proveedor en sesión");

    const response = await fetch(`${API_URL}?providerId=${providerId}`);
    if (!response.ok) throw new Error("No se pudieron obtener las máquinas");

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al obtener las máquinas");
  }
};

// Eliminar una máquina
export const deleteMachine = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar la máquina:", error);
    throw error;
  }
};

// Actualizar una máquina
export const updateMachine = async (id, machineData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(machineData),
    });
    if (!response.ok) throw new Error("Error al actualizar la máquina");
  } catch (error) {
    throw new Error(error.message || "Error al actualizar la máquina");
  }
};