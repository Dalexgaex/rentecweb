import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css"; // Existing CSS import

// Updated NavBar component (unchanged)
const NavBar = ({ hidden, search, setSearch, navigate }) => (
  <nav className={`navbar ${hidden ? "hidden" : ""}`}>
    <div className="navbar-left">
      <img
        src="../src/assets/logo.png"
        alt="Logo Rentek"
        className="logo"
        aria-label="Rentek Logo"
      />
    </div>
    <div className="navbar-center">
      <input
        type="text"
        placeholder="Buscar máquinas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
        aria-label="Buscar máquinas"
      />
    </div>
    <ul className="nav-links">
      {[
        { label: "Catálogo", path: "/catalogo" },
        { label: "Favoritos", path: "/favoritos" },
        { label: "Perfil", path: "/perfil" },
        { label: "Configuraciones", path: "/configuraciones" },
        { label: "Mis Máquinas", path: "/mis-maquinas" },
      ].map(({ label, path }) => (
        <li key={path} onClick={() => navigate(path)}>
          {label}
        </li>
      ))}
    </ul>
  </nav>
);

// Updated MachineCard component with enhanced styling
const MachineCard = ({ machine, navigate }) => (
  <div className="machine-card">
    <div className="machine-card-image-container">
      <img
        src={machine.image_code}
        alt={machine.name}
        className="machine-card-image"
        loading="lazy"
      />
    </div>
    <div className="machine-card-content">
      <h3 className="machine-card-title">{machine.name}</h3>

      <div className="machine-card-details">
        <div className="machine-detail">
          <span className="machine-detail-label">Marca:</span>
          <span className="machine-detail-value">{machine.brand}</span>
        </div>

        <div className="machine-detail">
          <span className="machine-detail-label">Ubicación:</span>
          <span className="machine-detail-value">{machine.location}</span>
        </div>

        <div className="machine-detail">
          <span className="machine-detail-label">Precio de renta:</span>
          <span className="machine-detail-value">
            ${machine.rental_price.toLocaleString()}
          </span>
        </div>

        <div className="machine-detail">
          <span className="machine-detail-label">Estado:</span>
          <span
            className={`machine-status ${
              machine.state ? "text-green-600" : "text-red-600"
            }`}
          >
            {machine.state ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>

      <p className="machine-card-description">{machine.description}</p>

      <button
        onClick={() => navigate(`/maquina/${machine.id}`)}
        className="machine-card-button"
      >
        Ver detalles
      </button>
    </div>
  </div>
);

// Home component remains unchanged
const Home = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Memoized filtered machines to improve performance
  const filteredMachines = useMemo(
    () =>
      machines.filter((machine) =>
        machine.name.toLowerCase().includes(search.toLowerCase())
      ),
    [machines, search]
  );

  // Loading and empty state handlers
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <p className="loading-text">Cargando máquinas...</p>
          <div className="loading-spinner"></div>
        </div>
      );
    }

    if (filteredMachines.length === 0) {
      return (
        <div className="no-results-container">
          <p className="no-results-text">
            No se encontraron máquinas que coincidan con tu búsqueda.
          </p>
        </div>
      );
    }

    return filteredMachines.map((machine) => (
      <MachineCard key={machine.id} machine={machine} navigate={navigate} />
    ));
  };

  return (
    <div className="home-container">
      <NavBar
        hidden={hidden}
        search={search}
        setSearch={setSearch}
        navigate={navigate}
      />

      <div className="machines-container">{renderContent()}</div>
    </div>
  );
};

export default Home;
