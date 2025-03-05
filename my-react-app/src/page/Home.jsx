import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css"; // Asegúrate de que esta ruta sea correcta

const Home = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0); // Para rastrear la posición anterior del scroll
  const [hidden, setHidden] = useState(false); // Para saber si el navbar debe estar oculto

  // Fetch de las máquinas
  useEffect(() => {
    fetch("https://rentek.onrender.com/machinery")
      .then((res) => res.json())
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando máquinas:", error);
        setLoading(false);
      });
  }, []);

  // Lógica de scroll para ocultar/mostrar el navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Oculta el navbar solo si se desplaza hacia abajo y supera un umbral
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="home-container">
      {/* Navbar con contenedor adicional para mejor control de diseño */}
      <nav className={`navbar ${hidden ? "hidden" : ""}`}>
        <div className="navbar-left">
          <img src="../src/assets/logo.png" alt="Logo Rentek" className="logo" />
        </div>
        <div className="navbar-center">
          <input
            type="text"
            placeholder="Buscar máquinas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
            aria-label="Buscar máquinas" // Mejor accesibilidad
          />
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/catalogo")}>Catálogo</li>
          <li onClick={() => navigate("/favoritos")}>Favoritos</li>
          <li onClick={() => navigate("/perfil")}>Perfil</li>
          <li onClick={() => navigate("/configuraciones")}>Configuraciones</li>
          <li onClick={() => navigate("/mis-maquinas")}>Mis Máquinas</li>
        </ul>
      </nav>

      {/* Contenedor de máquinas */}
      <div className="machines-container">
        {loading ? (
          <p className="loading-text">Cargando máquinas...</p>
        ) : (
          machines
            .filter((machine) =>
              machine.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((machine) => (
              <div key={machine.id} className="machine-card">
                <img src={machine.image_code} alt={machine.name} />
                <h3>{machine.name}</h3>
                <p>
                  <strong>Marca:</strong> {machine.brand}
                </p>
                <p>
                  <strong>Ubicación:</strong> {machine.location}
                </p>
                <p>
                  <strong>Descripción:</strong> {machine.description}
                </p>
                <p>
                  <strong>Precio de renta:</strong> ${machine.rental_price}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {machine.state ? "Disponible" : "No disponible"}
                </p>
                <button onClick={() => navigate(`/maquina/${machine.id}`)}>
                  Ver detalles
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;