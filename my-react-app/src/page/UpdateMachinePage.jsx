import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateMachine } from "../services/machineServiceBulk";
import { Button, TextField, Typography, Box } from "@mui/material";
import "../css/ProviderDashboard.css";

const UpdateMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState({
    name: "",
    brand: "",
    location: "",
    description: "",
    rental_price: "",
    image_code: "",
    state: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await fetch(`https://rentek.onrender.com/machinery/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener la máquina');
        const data = await response.json();
        setMachine(data);
      } catch (error) {
        setError("Error al cargar la máquina: " + error.message);
      }
    };

    fetchMachine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMachine(id, {
        ...machine,
        rental_price: Number(machine.rental_price)
      });
      alert("Máquina actualizada con éxito");
      navigate("/provider-dashboard");
    } catch (error) {
      setError("Error al actualizar: " + error.message);
    }
  };

  return (
    <div className="container">
      <Box className="provider-dashboard">
        <Typography variant="h4" component="h1" gutterBottom>
          Actualizar Máquina
        </Typography>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={machine.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          {/* Resto de los campos igual que en AddMachinePage */}
          <TextField
            fullWidth
            label="Marca"
            name="brand"
            value={machine.brand}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ubicación"
            name="location"
            value={machine.location}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={machine.description}
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
            value={machine.rental_price}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Enlace de Imagen"
            name="image_code"
            value={machine.image_code}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Box className="button-container" sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Actualizar Máquina
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

export default UpdateMachine;