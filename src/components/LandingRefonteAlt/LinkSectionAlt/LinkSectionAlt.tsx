import "./style.scss";

import React from "react";
import img from "../../../images/R2D2.svg";

type Props = {url:string};

export default function LinkSectionAlt({url}: Props) {
  return (
    <div className="LinkSectionAlt">
      <div className="LinkSectionAlt__content">
        <h2 className="h4">Prêt à faire le point de votre site ?</h2>
        <div className="divider mb-2"></div>
        <h3 className="h1 mb-4">Faites le test !</h3>
        <p className="LinkSection__desc">
          Répondez à notre questionnaire "Dois-je refaire mon site web ?" et obtenez un diagnostic personnalisé en moins de 3 minutes !
        </p>
        <a href={url} className="btn btn-white">
          Évaluer mon site
        </a>
      </div>
      <img src={img} alt="r2d2" />
    </div>
  );
}