import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/machinedetails.css";

const MachineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const providerId = localStorage.getItem("providerId") || "3772a608-06cc-4ff4-8c69-8fb28452269e";
        const response = await fetch(`https://rentek.onrender.com/machinery?providerId=${providerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`No se pudo cargar las máquinas: ${response.status} - ${errorText}`);
        }

        const machines = await response.json();
        console.log("Máquinas recibidas en MachineDetails:", machines);

        const foundMachine = machines.find((m) => m.id === id);
        if (!foundMachine) {
          throw new Error(`Máquina con ID ${id} no encontrada`);
        }

        setMachine(foundMachine);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar la máquina:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMachine();
  }, [id]);

  const handleRent = () => {
    alert("Funcionalidad de rentar en desarrollo");
    navigate("/rent-form");
  };

  const handleQuote = () => {
    alert("Funcionalidad de cotizar en desarrollo");
    navigate("/quote-form");
  };

  if (loading) {
    return <div>Cargando detalles de la máquina...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button className="back-button" onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  if (!machine) {
    return <div>No se encontraron detalles para esta máquina.</div>;
  }

  return (
    <div className="machine-details-container">
      <h1>{machine.name}</h1>
      <img
        src={machine.image_code || "https://via.placeholder.com/400"}
        alt={machine.name}
        onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
      />
      <p><strong>Marca:</strong> {machine.brand || "N/A"}</p>
      <p><strong>Ubicación:</strong> {machine.location || "N/A"}</p>
      <p><strong>Descripción:</strong> {machine.description || "Sin descripción"}</p>
      <p><strong>Precio de renta:</strong> ${machine.rental_price || "0"}</p>
      <p><strong>Estado:</strong> {machine.state ? "Disponible" : "No disponible"}</p>
      <div className="button-container">
        <button className="rent-button" onClick={handleRent}>
          Rentar
        </button>
        <button className="quote-button" onClick={handleQuote}>
          Cotizar
        </button>
        <button className="back-button" onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default MachineDetails;