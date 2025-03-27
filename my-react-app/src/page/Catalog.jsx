// src/components/Catalog.jsx
import React from "react";
import "../css/home.css"; // Reutilizo el CSS de Home para consistencia

const Catalog = () => {
  return (
    <div className="home-container">
      <h1>Catálogo de Máquinas</h1>
      <div className="machines-container">
        <div className="machine-card">
          <div className="machine-card-image-container">
            <img
              src="https://s7d2.scene7.com/is/image/Caterpillar/CM20240517-58464-44194?$cc-g$&fmt=pjpeg"
              alt="Bulldozer"
              className="machine-card-image"
            />
          </div>
          <div className="machine-card-content">
            <h3 className="machine-card-title">Bulldozer D8</h3>
            <p>Marca: Caterpillar</p>
            <p>Ubicación: Ciudad del Sol</p>
            <p>Precio: $15,000</p>
            <p>Estado: Disponible</p>
            <button className="machine-card-button">Ver detalles</button>
          </div>
        </div>
        <div className="machine-card">
          <div className="machine-card-image-container">
            <img
              src="https://www.lectura-specs.es/models/renamed/detail_max_retina/gruas-rt-rt50-xcmg.jpg"
              alt="Grúa"
              className="machine-card-image"
            />
          </div>
          <div className="machine-card-content">
            <h3 className="machine-card-title">Grúa RT50</h3>
            <p>Marca: Terex</p>
            <p>Ubicación: Valle Industrial</p>
            <p>Precio: $20,000</p>
            <p>Estado: No disponible</p>
            <button className="machine-card-button">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;