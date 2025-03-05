import React, { useState, useEffect } from "react";
import { createMachine } from "../services/machineService"; // Asegúrate de que la ruta esté correcta

const AddMachine = () => {
  const [newMachine, setNewMachine] = useState({
    name: "",
    brand: "",
    location: "",
    description: "",
    rental_price: "",
    image_code: "",
    state: true,
    provider_id: "", // Lo inicializamos vacío, se actualizará después
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = getCurrentUser(); // Obtén el usuario actual (suponiendo que se guarda en Firebase o un estado global)
    if (user && user.provider_id) {
      setNewMachine((prev) => ({
        ...prev,
        provider_id: user.provider_id, // Establecemos el provider_id desde el usuario
      }));
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
      // Aquí mandamos la solicitud para crear la máquina con los datos del formulario
      await createMachine(newMachine);
      alert("¡Máquina creada con éxito!");
      setNewMachine({
        name: "",
        brand: "",
        location: "",
        description: "",
        rental_price: "",
        image_code: "",
        state: true,
        provider_id: newMachine.provider_id, // Mantén el provider_id
      });
    } catch (error) {
      setError("Error al crear la máquina: " + error.message);
    }
  };

  return (
    <div>
      <h1>Agregar Nueva Máquina</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newMachine.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={newMachine.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Ubicación:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newMachine.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={newMachine.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rental_price">Precio de Renta:</label>
          <input
            type="number"
            id="rental_price"
            name="rental_price"
            value={newMachine.rental_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image_code">Enlace de Imagen:</label>
          <input
            type="text"
            id="image_code"
            name="image_code"
            value={newMachine.image_code}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Crear Máquina</button>
        </div>
      </form>
    </div>
  );
};

export default AddMachine;
