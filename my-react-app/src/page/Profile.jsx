import React from "react";
import "../css/Profile.css"; // Asegúrate de importar el CSS

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Usando la URL de la imagen del proveedor directamente desde la web */}
        <img
          src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D" // URL de la imagen
          alt="Proveedor"
        />
        <h1>Mi Perfil</h1>
      </div>
      
      <div className="profile-info">
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Correo:</strong> juan.perez@rentek.com</p>
        <p><strong>Ubicación:</strong> Ciudad del Sol</p>
        <p><strong>Tipo de usuario:</strong> Cliente</p>
      </div>

      <h3>Mis Rentas Activas</h3>
      <ul className="rentals-list">
        <li>Excavadora 320D - Hasta 10/04/2025</li>
      </ul>
      
      <button className="profile-button">Editar Perfil</button>
    </div>
  );
};

export default Profile;
