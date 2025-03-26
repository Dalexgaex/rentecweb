import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home.jsx";
import MyMachines from "./components/MyMachines";
import MachineDetails from "./components/MachineDetails";
import ProviderLogin from "./components/ProviderLogin";
import ProviderDashboard from "./page/ProviderDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
        <Route path="/maquina/:id" element={<MachineDetails />} />
        {/* Nuevas rutas para proveedores */}
        <Route path="/provider-login" element={<ProviderLogin />} />
        
      </Routes>
    </Router>
  );
}

export default App;