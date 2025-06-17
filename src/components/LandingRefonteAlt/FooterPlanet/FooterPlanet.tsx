import React from "react";
import imgPlanet from "../../../images/Icon-planet.png"; // adapte le chemin si nécessaire
import "./style.scss";

const FooterPlanet = () => {
  return (
    <div className="footer-planet-container">
      <img src={imgPlanet} alt="Planète décorative" className="planet-bottom-img" />
      <div className="d-flex justify-content-center p-2 bg-dark mt-5 footer-text">
        <span className="uppercase">thatmuch 2025</span>
      </div>
    </div>
  )
};

export default FooterPlanet;