// ProviderDashboard.jsx

import React, { useEffect, useState } from "react";
import { getProviderMachines } from "../services/machineService"; // Importamos el servicio

const ProviderDashboard = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);
  const providerId = "3772a608-06cc-4ff4-8c69-8fb28452269e"; // Ejemplo de providerId

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getProviderMachines(providerId); // Llamada a la API
        if (data && data.length > 0) {
          setMachines(data); // Guardamos las máquinas en el estado
        } else {
          setError("No hay máquinas disponibles."); // Mensaje si no hay máquinas
        }
      } catch (error) {
        setError(error.message || "Error al obtener las máquinas");
      }
    };

    fetchMachines(); // Ejecutamos la función al cargar el componente
  }, [providerId]);

  return (
    <div>
      <h1>Dashboard del Proveedor</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores si los hay */}
      <div>
        <h2>Mis Máquinas</h2>
        {machines.length === 0 ? (
          <p>No hay máquinas disponibles.</p>
        ) : (
          <ul>
            {machines.map((machine) => (
              <li key={machine.id}>
                <h3>{machine.name}</h3>
                <p>Marca: {machine.brand}</p>
                <p>Ubicación: {machine.location}</p>
                <p>Precio de renta: ${machine.rental_price}</p>
                <p>Descripción: {machine.description}</p>
                <img src={machine.image_code} alt={machine.name} style={{ width: "200px", height: "auto" }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
