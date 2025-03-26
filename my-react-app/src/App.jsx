import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./page/Home.jsx";
import MyMachines from "./components/MyMachines";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mis-maquinas" element={<MyMachines />} />
      </Routes>
    </Router>
  );
}

export default App;
