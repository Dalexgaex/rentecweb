import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProviderMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("providerToken");

    if (!token) {
      // Si no está logueado, redirige al login del proveedor
      navigate("/proveedor/login");
      return;
    }

    // Reemplaza con la URL correcta para obtener las máquinas del proveedor
    axios
      .get("https://rentek.onrender.com/machinery/with-provider", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMachines(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las máquinas del proveedor:", error);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="provider-machines-container">
      <h2>Mis Máquinas</h2>
      {loading ? (
        <p>Cargando máquinas...</p>
      ) : (
        <div className="machines-container">
          {machines.map((machine) => (
            <div key={machine.id} className="machine-card">
              <img src={machine.image_code} alt={machine.name} />
              <h3>{machine.name}</h3>
              <p><strong>Marca:</strong> {machine.brand}</p>
              <p><strong>Ubicación:</strong> {machine.location}</p>
              <p><strong>Descripción:</strong> {machine.description}</p>
              <p><strong>Precio de renta:</strong> ${machine.rental_price}</p>
              <p><strong>Estado:</strong> {machine.state ? "Disponible" : "No disponible"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderMachines;
