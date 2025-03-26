import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css"; // Nuevo archivo CSS

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Reemplaza con tu endpoint real para el perfil del usuario
        const response = await fetch("https://rentek.onrender.com/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el perfil del usuario");
        }

        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setUser(null);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    alert("Sesión cerrada");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return <div className="profile-container">Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Tu Perfil</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Nombre:</strong> {user.name || "Usuario"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>ID:</strong> {user.id || "N/A"}</p>
          <div className="button-container">
            <button className="edit-button" onClick={handleEditProfile}>
              Editar Perfil
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <div className="no-session">
          <h2>No has iniciado sesión</h2>
          <p>Por favor, inicia sesión para ver tu perfil.</p>
          <button className="login-button" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;