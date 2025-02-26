import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const images = [
  "../src/assets/login.png",
  "../src/assets/logo.png",
  "../src/assets/slider1.jpeg",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Cambio automático de imagen cada 7 segundos
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginUser({ email, password });
      alert("Inicio de sesión exitoso");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <div className="carousel-container">
          <button className="carousel-button left" onClick={prevImage}>
            ❮
          </button>
          <div className="carousel-images">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Slide ${i}`}
                style={{ opacity: i === index ? 1 : 0 }}
              />
            ))}
          </div>
          <button className="carousel-button right" onClick={nextImage}>
            ❯
          </button>
        </div>

        <div className="social-section">
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGooglePlay />
            </a>
          </div>
          <div className="download-buttons">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="ios-button">Descargar en iOS</button>
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="android-button">Descargar en Android</button>
            </a>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
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
          <p className="register-text">
            ¿No tienes cuenta?{" "}
            <button
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Crea una
            </button>
          </p>
          <p className="provider-text">
            ¿Eres proveedor?{" "}
            <button
              className="provider-button"
              onClick={() => navigate("/provider-login")}
            >
              Soy proveedor
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
