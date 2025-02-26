import React, { useEffect, useState } from "react";
import { getProviderMachines, deleteMachine, updateMachine } from "../services/machineService";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField, Grid } from "@mui/material";
import "../css/ProviderDashboard.css";

const ProviderDashboard = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState(null);
  const [editingMachine, setEditingMachine] = useState(null);
  const [updatedMachine, setUpdatedMachine] = useState({
    name: "",
    brand: "",
    location: "",
    rental_price: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const providerId = "3772a608-06cc-4ff4-8c69-8fb28452269e";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getProviderMachines(providerId);
        setMachines(data.length > 0 ? data : []);
      } catch (error) {
        setError("Error al obtener las máquinas");
      }
    };
    fetchMachines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMachine(id);
      setMachines(machines.filter((machine) => machine.id !== id));
    } catch (error) {
      alert("Error al eliminar la máquina");
    }
  };

  const handleUpdate = (machine) => {
    setEditingMachine(machine);
    setUpdatedMachine({
      name: machine.name,
      brand: machine.brand,
      location: machine.location,
      rental_price: machine.rental_price,
      description: machine.description,
    });
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMachine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMachine(editingMachine.id, updatedMachine);
      setMachines(
        machines.map((machine) =>
          machine.id === editingMachine.id
            ? { ...machine, ...updatedMachine }
            : machine
        )
      );
      setOpenModal(false);
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 2000);
    } catch (error) {
      alert("Error al actualizar la máquina");
    }
  };

  return (
    <div className="provider-dashboard">
      <h1>Dashboard del Proveedor</h1>
      {error && <p className="error-text">{error}</p>}

      <Button variant="contained" color="primary" onClick={() => navigate("/add-machine")}>
        Agregar Nueva Máquina
      </Button>

      <div>
        <h2>Mis Máquinas</h2>
        {machines.length === 0 ? (
          <p>No hay máquinas disponibles.</p>
        ) : (
          <Grid container spacing={3}>
            {machines.map((machine) => (
              <Grid item xs={12} sm={6} md={4} key={machine.id}>
                <Box className="machine-card">
                  <h3>{machine.name}</h3>
                  <p><strong>Marca:</strong> {machine.brand}</p>
                  <p><strong>Ubicación:</strong> {machine.location}</p>
                  <p><strong>Precio de renta:</strong> ${machine.rental_price}</p>
                  <p>{machine.description}</p>
                  <img src={machine.image_code} alt={machine.name} className="machine-image" />
                  <div className="button-group">
                    <Button variant="outlined" onClick={() => handleUpdate(machine)}>Actualizar</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(machine.id)}>Eliminar</Button>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* Modal para Actualización de Máquina */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="modal-box">
          <Typography variant="h6">Actualizar Máquina</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nombre" name="name" value={updatedMachine.name} onChange={handleChange} required />
            <TextField fullWidth label="Marca" name="brand" value={updatedMachine.brand} onChange={handleChange} required />
            <TextField fullWidth label="Ubicación" name="location" value={updatedMachine.location} onChange={handleChange} required />
            <TextField fullWidth label="Precio de Renta" type="number" name="rental_price" value={updatedMachine.rental_price} onChange={handleChange} required />
            <TextField fullWidth multiline label="Descripción" name="description" value={updatedMachine.description} onChange={handleChange} required />
            <div className="modal-buttons">
              <Button type="submit" variant="contained" color="success">Guardar</Button>
              <Button variant="outlined" onClick={() => setOpenModal(false)}>Cancelar</Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Modal de Confirmación de Éxito */}
      <Modal open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <Box className="modal-box">
          <Typography variant="h6">✅ ¡Actualización Exitosa!</Typography>
          <Typography>La máquina ha sido actualizada correctamente.</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ProviderDashboard;
