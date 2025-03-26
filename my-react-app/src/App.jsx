import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home.jsx";
import MyMachines from "./components/MyMachines";
import MachineDetails from "./components/MachineDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
        <Route path="/maquina/:id" element={<MachineDetails />} />
      </Routes>
    </Router>
  );
}

export default App;