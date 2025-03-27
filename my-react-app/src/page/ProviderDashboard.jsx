import React, { useEffect, useState } from "react";
import {
  getProviderMachines,
  updateMachine,
  deleteMachine,
} from "../services/machineService";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "../css/ProviderDashboard.css";

const CompanyProfile = () => (
  <Container className="company-profile">
    <Typography variant="h4" className="profile-title">
      Perfil de Leobani - Renta de Máquinas
    </Typography>
    <div className="profile-content">
      <img
        src="https://via.placeholder.com/300x200?text=Leobani+Logo"
        alt="Leobani Logo"
        className="profile-logo"
      />
      <div className="profile-info">
        <Typography variant="h6">Acerca de Nosotros</Typography>
        <Typography paragraph>
          Leobani es una empresa líder en el alquiler de maquinaria pesada y
          herramientas especializadas, fundada en 2010 en Guadalajara, México.
          Nos especializamos en ofrecer soluciones integrales para
          construcción, minería y agricultura, con un catálogo de más de 50
          tipos de máquinas, desde excavadoras hasta grúas.
        </Typography>
        <Typography variant="h6">Misión</Typography>
        <Typography paragraph>
          Facilitar el éxito de nuestros clientes proporcionando equipos de alta
          calidad, mantenimiento garantizado y un servicio al cliente
          excepcional.
        </Typography>
        <Typography variant="h6">Datos Clave</Typography>
        <ul>
          <li>
            <Typography>
              <strong>Años en el mercado:</strong> 15
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Clientes atendidos:</strong> Más de 1,000
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Ubicaciones:</strong> Guadalajara, CDMX, Monterrey
            </Typography>
          </li>
          <li>
            <Typography>
              <strong>Flota:</strong> 50+ máquinas disponibles
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Contacto</Typography>
        <Typography>
          Email: contacto@leobani.com | Teléfono: +52 33 1234 5678
        </Typography>
      </div>
    </div>
  </Container>
);

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const [showProfile, setShowProfile] = useState(false); // Estado para el perfil

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getProviderMachines();
        setMachines(data.length > 0 ? data : []);
        setFilteredMachines(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error al obtener máquinas:", error.message);
        setError("Error al obtener las máquinas: " + error.message);
        if (error.message.includes("No se encontró ID del proveedor")) {
          navigate("/provider-login");
        }
      }
    };
    fetchMachines();
  }, [navigate]);

  useEffect(() => {
    const filtered = machines.filter(
      (machine) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMachines(filtered);
  }, [searchTerm, machines]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta máquina?")) {
      try {
        await deleteMachine(id);
        setMachines(machines.filter((machine) => machine.id !== id));
        setFilteredMachines(
          filteredMachines.filter((machine) => machine.id !== id)
        );
        alert("Máquina eliminada con éxito");
      } catch (error) {
        alert("Error al eliminar la máquina: " + error.message);
      }
    }
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
      setFilteredMachines(
        filteredMachines.map((machine) =>
          machine.id === editingMachine.id
            ? { ...machine, ...updatedMachine }
            : machine
        )
      );
      setOpenModal(false);
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 2000);
    } catch (error) {
      alert("Error al actualizar la máquina: " + error.message);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Barra Lateral */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <PersonIcon className="user-icon" />
          <Typography variant="h6">Proveedor</Typography>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => setShowProfile(false)}>Dashboard</li>
          <li onClick={() => setShowProfile(true)}>Mi Perfil</li>
          <li onClick={() => navigate("/configuraciones")}>Configuraciones</li>
          <li onClick={() => navigate("/mis-maquinas")}>Mis Máquinas</li>
          <li onClick={() => navigate("/provider-login")}>Cerrar Sesión</li>
        </ul>
      </aside>

      {/* Contenido Principal */}
      <div className="container">
        {showProfile ? (
          <CompanyProfile />
        ) : (
          <div className="provider-dashboard">
            <h1>Dashboard del Proveedor</h1>
            {error && <p className="error-text">{error}</p>}

            <div className="button-container">
              <Button
                className="add-machine-btn"
                variant="contained"
                onClick={() => navigate("/add-machine")}
              >
                Agregar Nueva Máquina
              </Button>
            </div>

            <div className="search-container">
              <TextField
                fullWidth
                label="Buscar máquinas"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Escribe nombre, marca, ubicación..."
                className="search-input"
              />
            </div>

            <div className="machines-list">
              {filteredMachines.length === 0 ? (
                <p>No hay máquinas que coincidan con la búsqueda.</p>
              ) : (
                filteredMachines.map((machine) => (
                  <div className="machine-card" key={machine.id}>
                    <img
                      src={
                        machine.image_code || "https://via.placeholder.com/150"
                      }
                      alt={machine.name}
                      className="machine-image"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                    <div className="machine-info">
                      <h3>{machine.name}</h3>
                      <p>
                        <strong>Marca:</strong> {machine.brand}
                      </p>
                      <p>
                        <strong>Ubicación:</strong> {machine.location}
                      </p>
                      <p>
                        <strong>Precio de renta:</strong> ${machine.rental_price}
                      </p>
                      <p>{machine.description}</p>
                    </div>
                    <div className="button-group">
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(machine)}
                      >
                        Actualizar
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(machine.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal para Actualización */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <Box className="modal-box">
                <Typography variant="h6">Actualizar Máquina</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={updatedMachine.name}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Marca"
                    name="brand"
                    value={updatedMachine.brand}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Ubicación"
                    name="location"
                    value={updatedMachine.location}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Precio de Renta"
                    type="number"
                    name="rental_price"
                    value={updatedMachine.rental_price}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    multiline
                    label="Descripción"
                    name="description"
                    value={updatedMachine.description}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <div className="modal-buttons">
                    <Button type="submit" variant="contained" color="success">
                      Guardar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Box>
            </Modal>

            {/* Modal de Confirmación de Éxito */}
            <Modal open={openSuccess} onClose={() => setOpenSuccess(false)}>
              <Box className="modal-box success">
                <Typography variant="h6">
                  ✅ ¡Actualización Exitosa!
                </Typography>
                <Typography>
                  La máquina ha sido actualizada correctamente.
                </Typography>
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;