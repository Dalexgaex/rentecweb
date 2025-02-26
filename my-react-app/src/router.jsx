import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home";
import ProviderLogin from "./components/ProviderLogin"; // Importa el componente de login para proveedores
import ProviderDashboard from "./page/ProviderDashboard"; // Importa el dashboard del proveedor

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/provider-login" element={<ProviderLogin />} /> {/* Ruta para el login del proveedor */}
        <Route path="/provider-dashboard" element={<ProviderDashboard />} /> {/* Ruta para el dashboard del proveedor */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
