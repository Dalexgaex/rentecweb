import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home";
import ProviderLogin from "./components/ProviderLogin";
import ProviderDashboard from "./page/ProviderDashboard";
import AddMachinePage from "./page/AddMachinePage";
import MyMachines from "./components/MyMachines"; 
import Catalog from "./page/Catalog"; // Agregado
import Favorites from "./page/Favorites"; // Agregado
import Profile from "./page/Profile"; // Agregado
import Settings from "./page/Settings"; // Agregado
import RentekPromoPage from "./page/RentekPromoPage"; // Asegúrate de esta línea


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/add-machine" element={<AddMachinePage />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
         <Route path="/catalog" element={<Catalog />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/maquina/:id" element={<RentekPromoPage />} /> {/* Aquí se usa */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
