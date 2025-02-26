import React, { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { getProviderMachines, deleteMachine, updateMachine } from "../services/machineService";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Box, TextField, Grid, Modal, Typography } from "@mui/material";
=======
import {
  getProviderMachines,
  deleteMachine,
  updateMachine,
} from "../services/machineService";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const [openModal, setOpenModal] = useState(false); // Modal del formulario
  const [openSuccess, setOpenSuccess] = useState(false); // Modal de éxito
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  const handleDelete = async (id) => {
    try {
      await deleteMachine(id);
      setMachines(machines.filter((machine) => machine.id !== id));
    } catch (error) {
      alert("Error al eliminar la máquina");
    }
  };

>>>>>>> Stashed changes
  const handleUpdate = (machine) => {
    setEditingMachine(machine);
    setUpdatedMachine({
      name: machine.name,
      brand: machine.brand,
      location: machine.location,
      rental_price: machine.rental_price,
      description: machine.description,
    });
    setOpenModal(true); // Abre el formulario como ventana emergente
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
      setOpenModal(false); // Cierra el formulario emergente
      setOpenSuccess(true); // Muestra mensaje de éxito
      setTimeout(() => setOpenSuccess(false), 2000); // Cierra el mensaje de éxito automáticamente
    } catch (error) {
      alert("Error al actualizar la máquina");
    }
  };

  return (
    <div className="provider-dashboard">
      <h1>Dashboard del Proveedor</h1>
      {error && <p className="error-text">{error}</p>}

<<<<<<< Updated upstream
      <Button variant="contained" color="primary" onClick={() => navigate('/add-machine')}>
        Agregar Nueva Máquina
      </Button>
=======
      <button onClick={() => navigate("/add-machine")}>
        Agregar Nueva Máquina
      </button>
>>>>>>> Stashed changes

      <div>
        <h2>Mis Máquinas</h2>
        {machines.length === 0 ? (
          <p>No hay máquinas disponibles.</p>
        ) : (
          <Grid container spacing={3}>
            {machines.map((machine) => (
<<<<<<< Updated upstream
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
                    <Button variant="contained" color="error" onClick={() => deleteMachine(machine.id)}>Eliminar</Button>
                  </div>
                </Box>
              </Grid>
=======
              <li key={machine.id}>
                <h3>{machine.name}</h3>
                <p>Marca: {machine.brand}</p>
                <p>Ubicación: {machine.location}</p>
                <p>Precio de renta: ${machine.rental_price}</p>
                <p>Descripción: {machine.description}</p>
                <img
                  src={machine.image_code}
                  alt={machine.name}
                  style={{ width: "200px", height: "auto" }}
                />
                <button onClick={() => handleViewDetails(machine.id)}>
                  Ver Detalles
                </button>
                <button onClick={() => handleUpdate(machine)}>
                  Actualizar
                </button>
                <button onClick={() => handleDelete(machine.id)}>
                  Eliminar
                </button>
              </li>
>>>>>>> Stashed changes
            ))}
          </Grid>
        )}
      </div>

<<<<<<< Updated upstream
      {/* MODAL DE FORMULARIO PARA ACTUALIZAR */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="modal-box">
          <Typography variant="h6">Actualizar Máquina</Typography>
=======
      {editingMachine && (
        <div>
          <h2>Actualizar Máquina</h2>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
            <div>
              <label>Marca</label>
              <input
                type="text"
                name="brand"
                value={updatedMachine.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ubicación</label>
              <input
                type="text"
                name="location"
                value={updatedMachine.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Precio de Renta</label>
              <input
                type="number"
                name="rental_price"
                value={updatedMachine.rental_price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                name="description"
                value={updatedMachine.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setEditingMachine(null)}>
              Cancelar
            </button>
>>>>>>> Stashed changes
          </form>
        </Box>
      </Modal>

      {/* MODAL DE CONFIRMACIÓN */}
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
