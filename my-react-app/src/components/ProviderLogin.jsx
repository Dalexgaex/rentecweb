import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/register.css";

const ProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Reemplaza con la URL correcta para iniciar sesión del proveedor
      const response = await axios.post("https://rentek.onrender.com/Providers", {
        email,
        password,
      });

      // Si el inicio de sesión es exitoso, guarda el token o la sesión
      // (por ejemplo, puedes almacenar el token en localStorage o context)
      localStorage.setItem("providerToken", response.data.token);

      // Redirigir al proveedor a la página donde verá sus máquinas
      navigate("/proveedor/maquinas");
    } catch (error) {
      setError("Credenciales incorrectas o error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión como proveedor</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default ProviderLogin;
