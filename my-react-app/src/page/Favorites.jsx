// src/components/Favorites.jsx
import React from "react";
import "../css/home.css";

const Favorites = () => {
  return (
    <div className="home-container">
      <h1>Mis Favoritos</h1>
      <div className="machines-container">
        <div className="machine-card">
          <div className="machine-card-image-container">
            <img
              src="https://www.madisa.com/wp-content/uploads/2019/01/Excavadora_Hidraulica_320DL_Caterpillar_1.jpg"
              alt="Excavadora"
              className="machine-card-image"
            />
          </div>
          <div className="machine-card-content">
            <h3 className="machine-card-title">Excavadora 320D</h3>
            <p>Marca: Caterpillar</p>
            <p>Ubicación: Ciudad del Sol</p>
            <p>Precio: $12,000</p>
            <button className="machine-card-button">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;