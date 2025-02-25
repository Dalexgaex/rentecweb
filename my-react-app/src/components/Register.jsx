import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../csss/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, phoneNumber });
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="tel" placeholder="Teléfono" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
