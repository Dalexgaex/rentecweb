import { useState } from "react";
import { loginProvider } from "../services/authService"; // Asumiendo que tienes un servicio para autenticar proveedores
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const ProviderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const providerData = await loginProvider({ email, password });
      console.log('Provider logged in:', providerData);
      // Asegurarse de que los datos se guarden antes de navegar
      localStorage.setItem('isProviderLoggedIn', 'true');
      navigate("/provider-dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="right-side">
        <div className="login-box">
          <h2>Iniciar Sesión como Proveedor</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo"
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
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderLogin;
