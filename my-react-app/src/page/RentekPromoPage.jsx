import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import "../css/RentekPromoPage.css"; // CSS específico para esta página

const RentekPromoPage = () => {
  const { id } = useParams(); // Obtiene el ID de la máquina desde la URL
  const navigate = useNavigate();

  return (
    <Container className="promo-container">
      <div className="promo-content">
        <Typography variant="h3" className="promo-title">
          Rentek
        </Typography>
        <Typography variant="h5" className="promo-subtitle">
          ¡Para poder rentar esta máquina, descarga nuestra app!
        </Typography>
        <Typography paragraph className="promo-text">
          Con la app de Rentek, puedes explorar nuestro catálogo completo,
          reservar máquinas en segundos y gestionar tus rentas desde cualquier
          lugar. Disponible para Android y iOS.
        </Typography>
        <div className="promo-buttons">
          <Button
            variant="contained"
            className="store-button android-button"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps",
                "_blank"
              )
            }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="store-icon"
            />
            Descarga en Google Play
          </Button>
          <Button
            variant="contained"
            className="store-button ios-button"
            onClick={() =>
              window.open(
                "https://www.apple.com/app-store/",
                "_blank"
              )
            }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="store-icon"
            />
            Descarga en App Store
          </Button>
        </div>
        <Button
          variant="outlined"
          className="back-button"
          onClick={() => navigate("/home")}
        >
          Volver al Inicio
        </Button>
      </div>
    </Container>
  );
};

export default RentekPromoPage;