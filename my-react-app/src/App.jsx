import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home.jsx";
import MyMachines from "./components/MyMachines";
import MachineDetails from "./components/MachineDetails";
import ProviderLogin from "./components/ProviderLogin";
import Catalog from "./page/Catalog"; // Agregado
import Favorites from "./page/Favorites"; // Agregado
import Profile from "./page/Profile"; // Agregado
import Settings from "./page/Settings"; // Agregado
import MyMachine from "./page/MyMachine"; // Agregado


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
        <Route path="/maquina/:id" element={<MachineDetails />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/catalog" element={<Catalog />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/Mymachine" element={<MyMachine />} />

        
      </Routes>
    </Router>
  );
}

export default App;