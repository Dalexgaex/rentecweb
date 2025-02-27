import React, { useEffect, useState } from "react";
import {
  getProviderMachines,
  deleteMachine,
  updateMachine,
} from "../services/machineService";
import { useNavigate } from "react-router-dom"; // Importa el hook de redirección
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
  const providerId = "3772a608-06cc-4ff4-8c69-8fb28452269e";

  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getProviderMachines(providerId);
        if (data && data.length > 0) {
          setMachines(data);
        } else {
          setError("No hay máquinas disponibles.");
        }
      } catch (error) {
        setError(error.message || "Error al obtener las máquinas");
      }
    };

    fetchMachines();
  }, [providerId]);

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
  };

  const handleViewDetails = (id) => {
    alert(Ver detalles de la máquina con ID: ${id});
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
      setEditingMachine(null);
    } catch (error) {
      alert("Error al actualizar la máquina");
    }
  };

  return (
    <div>
      <h1>Dashboard del Proveedor</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Botón para redirigir a la página de agregar nueva máquina */}
      <button onClick={() => navigate("/add-machine")}>
        Agregar Nueva Máquina
      </button>

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
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar formulario de actualización solo cuando hay una máquina en edición */}
      {editingMachine && (
        <div>
          <h2>Actualizar Máquina</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={updatedMachine.name}
                onChange={handleChange}
                required
              />
            </div>
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
          </form>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;