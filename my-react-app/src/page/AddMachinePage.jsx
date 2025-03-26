import React, { useState, useEffect } from "react";
import { createMachine } from "../services/machineServiceBulk"; // Importamos desde el nuevo archivo
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";
import "../css/ProviderDashboard.css";

const AddMachine = () => {
  const [newMachine, setNewMachine] = useState({
    name: "",
    brand: "",
    location: "",
    description: "",
    rental_price: "",
    image_code: "",
    state: true,
    provider_id: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProviderId = localStorage.getItem("providerId") || "3772a608-06cc-4ff4-8c69-8fb28452269e";
    if (storedProviderId) {
      setNewMachine((prev) => ({
        ...prev,
        provider_id: storedProviderId,
      }));
    } else {
      setError("No se encontró un proveedor autenticado.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newMachine.name || !newMachine.brand || !newMachine.location || !newMachine.rental_price) {
        throw new Error("Todos los campos obligatorios deben estar llenos.");
      }

      // Convertimos rental_price a número para evitar problemas de formato
      const machineData = {
        ...newMachine,
        rental_price: Number(newMachine.rental_price),
      };

      const response = await createMachine(machineData);
      console.log("Máquina creada:", response);
      alert("¡Máquina creada con éxito!");
      setNewMachine({
        name: "",
        brand: "",
        location: "",
        description: "",
        rental_price: "",
        image_code: "",
        state: true,
        provider_id: newMachine.provider_id,
      });
      navigate("/provider-dashboard");
    } catch (error) {
      setError("Error al crear la máquina: " + error.message);
      console.error("Error en handleSubmit:", error);
    }
  };

  return (
    <div className="container">
      <Box className="provider-dashboard">
        <Typography variant="h4" component="h1" gutterBottom>
          Agregar Nueva Máquina
        </Typography>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={newMachine.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Marca"
            name="brand"
            value={newMachine.brand}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ubicación"
            name="location"
            value={newMachine.location}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={newMachine.description}
            onChange={handleChange}
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Precio de Renta"
            type="number"
            name="rental_price"
            value={newMachine.rental_price}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Enlace de Imagen"
            name="image_code"
            value={newMachine.image_code}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Box className="button-container" sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" className="add-machine-btn">
              Crear Máquina
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/provider-dashboard")}
              sx={{ ml: 2 }}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddMachine;