import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

const images = [
  "/src/assets/carousel1.jpg",
  "/src/assets/carousel2.jpg",
  "/src/assets/carousel3.jpg",
];

const Register = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="register-container">
      {/* Carrusel de imágenes */}
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
      </div>

      {/* Formulario de registro */}
      <div className="right-side">
        <div className="register-box">
          <h2>Crear Cuenta</h2>
          <form>
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
          </form>
          <p className="login-text">
            ¿Ya tienes cuenta? <a onClick={() => navigate("/login")}>Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
