const API_URL = "https://rentek.onrender.com/machinery";

// Crear una nueva máquina usando /machinery/bulk
export const createMachine = async (machineData) => {
  try {
    const providerId = localStorage.getItem("providerId");
    if (!providerId) throw new Error("No se encontró el ID del proveedor");

    const BULK_URL = `${API_URL}/bulk`;
    console.log("Enviando solicitud a:", BULK_URL);
    console.log("Datos enviados:", [machineData]); // Envolvemos en un arreglo para /bulk

    const response = await fetch(BULK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`, // Descomentado si el backend lo requiere
      },
      body: JSON.stringify([machineData]), // Enviar como arreglo
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText || "No se pudo crear la máquina"}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error en createMachine (bulk):", error);
    throw error;
  }
};