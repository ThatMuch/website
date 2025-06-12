import "./style.scss";

import React from "react";
import img from "./tardisStars.png";

type Props = {};

export default function LinkSection({}: Props) {
  return (
    <div className="LinkSection">
      <img src={img} alt="Tardis dans les étoiles" />
      <div className="LinkSection__content">
        <h2 className="h4">Prêt à faire le point de votre site ?</h2>
        <div className="divider mb-2"></div>
        <h3 className="h1 mb-4">Faites le test !</h3>
        <p className="LinkSection__desc">
          Répondez à notre questionnaire et obtenez une évaluation personnalisé
          en moins de 3 minutes !
        </p>
        <a href="#" className="btn btn-dev">
          Évaluer mon site
        </a>
      </div>
    </div>
  );
}
