import React from "react";
import "../css/Settings.css"; // Asegúrate de importar el archivo CSS

const Settings = () => {
  return (
    <div className="settings-container">
      <h1>Configuraciones del Sistema</h1>
      
      <h2>Preferencias Generales</h2>
      <div className="setting-item">
        <p><strong>Idioma:</strong> Español</p>
        <button className="btn">Cambiar</button>
      </div>

      <div className="setting-item">
        <p><strong>Zona Horaria:</strong> GMT -5</p>
        <button className="btn">Cambiar</button>
      </div>

      <h2>Notificaciones</h2>
      <div className="setting-item">
        <p><strong>Notificaciones por correo:</strong> Activado</p>
        <button className="btn">Desactivar</button>
      </div>

      <h2>Seguridad</h2>
      <div className="setting-item">
        <p><strong>Autenticación de dos factores:</strong> Desactivado</p>
        <button className="btn">Activar</button>
      </div>

      <h2>Cuenta</h2>
      <div className="setting-item">
        <p><strong>Correo electrónico:</strong> juan.perez@rentek.com</p>
        <button className="btn">Actualizar</button>
      </div>

      <h2>Soporte</h2>
      <div className="setting-item">
        <p><strong>Contactar soporte:</strong> support@rentek.com</p>
        <button className="btn">Contactar</button>
      </div>
    </div>
  );
};

export default Settings;
