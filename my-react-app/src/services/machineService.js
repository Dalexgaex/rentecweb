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

// Crear una nueva máquina (sin requerir token para pruebas)
export const createMachine = async (machineData) => {
  try {
    const providerId = localStorage.getItem("providerId");
    if (!providerId) throw new Error("No se encontró el ID del proveedor");

    const CREATE_URL = `${API_URL}/by-provider`; // Usamos el endpoint tentativo
    console.log("Enviando solicitud a:", CREATE_URL);
    console.log("Datos enviados:", machineData);

    const response = await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Comentamos la autorización para pruebas
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(machineData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText || "No se pudo crear la máquina"}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en createMachine:", error);
    throw error;
  }
};