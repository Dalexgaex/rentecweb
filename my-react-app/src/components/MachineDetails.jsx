// src/components/MachineDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/machinedetails.css"; // Opcional

const MachineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await fetch(`https://rentek.onrender.com/machinery/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo cargar la máquina");
        }
        const data = await response.json();
        setMachine(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMachine();
  }, [id]);

  if (loading) {
    return <div>Cargando detalles de la máquina...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={() => navigate("/home")}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="machine-details-container">
      <h1>{machine.name}</h1>
      <img src={machine.image_code} alt={machine.name} />
      <p><strong>Marca:</strong> {machine.brand}</p>
      <p><strong>Ubicación:</strong> {machine.location}</p>
      <p><strong>Descripción:</strong> {machine.description}</p>
      <p><strong>Precio de renta:</strong> ${machine.rental_price}</p>
      <p><strong>Estado:</strong> {machine.state ? "Disponible" : "No disponible"}</p>
      <button onClick={() => navigate("/home")}>Volver al inicio</button>
    </div>
  );
};

export default MachineDetails;