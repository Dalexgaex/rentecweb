import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home"; // Asegúrate de que la ruta sea correcta
import MyMachines from "./components/MyMachines";
import MachineDetails from "./components/MachineDetails";
import ProviderLogin from "./components/ProviderLogin";
import ProviderDashboard from "./page/ProviderDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile"; // Importa Profile aquí
import AddMachinePage from "./page/AddMachinePage"; // Añadido desde router.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
        <Route path="/maquina/:id" element={<MachineDetails />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/add-machine" element={<AddMachinePage />} />
        <Route path="/perfil" element={<Profile />} /> {/* Ruta para Profile */}
      </Routes>
    </Router>
  );
}

export default App;