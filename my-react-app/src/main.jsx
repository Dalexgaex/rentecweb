import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./css/login.css";  // Ruta correcta
import "./css/register.css"; // Ruta correcta

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
