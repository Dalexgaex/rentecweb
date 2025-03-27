import React from "react";
import "../css/MyMachines.css"; // Asegúrate de importar el archivo CSS

const MyMachines = () => {
  const machines = [
    { id: 1, name: "Excavadora 320D", type: "Excavadora", status: "Activa", rentalEndDate: "10/04/2025" },
    { id: 2, name: "Bulldozer CAT D8", type: "Bulldozer", status: "Inactiva", rentalEndDate: "N/A" },
    { id: 3, name: "Grúa Liebherr LTM 1350", type: "Grúa", status: "Activa", rentalEndDate: "15/06/2025" },
  ];

  return (
    <div className="machines-container">
      <h1>Mis Maquinarias</h1>
      <div className="machines-list">
        {machines.map((machine) => (
          <div key={machine.id} className="machine-item">
            <div className="machine-info">
              <h3>{machine.name}</h3>
              <p><strong>Tipo:</strong> {machine.type}</p>
              <p><strong>Estado:</strong> {machine.status}</p>
              <p><strong>Fin de alquiler:</strong> {machine.rentalEndDate}</p>
            </div>
            <button className="btn">Ver Detalles</button>
          </div>
        ))}
      </div>
      <button className="add-machine-btn">Agregar Nueva Maquinaria</button>
    </div>
  );
};

export default MyMachines;
