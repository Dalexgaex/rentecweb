import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home";
import ProviderLogin from "./components/ProviderLogin";
import ProviderDashboard from "./page/ProviderDashboard";
import AddMachinePage from "./page/AddMachinePage";
import MyMachines from "./components/MyMachines";
import MachineDetails from "./components/MachineDetails"; // Añade este import

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
        <Route path="/maquina/:id" element={<MachineDetails />} /> {/* Nueva ruta dinámica */}
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;