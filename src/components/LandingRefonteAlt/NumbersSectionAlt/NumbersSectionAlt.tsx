import "./style.scss";

import {
  FaArrowTrendUp,
  FaCalendar,
  FaGlobe,
  FaGoogle,
  FaHourglass,
  FaMobile,
} from "react-icons/fa6";

import React from "react";
import { CardNumber } from "../CardNumber/CardNumber";

type Props = {};

export default function NumbersSectionAlt({}: Props) {
  return (
    <div className="NumbersSectionAlt">
      <div className="numbersSection_content">
        <h2>Chiffres clés sur la refonte de site web en 2025</h2>
        <div className="divider mb-4"></div>
      </div>
      <div className="cards-container">
        <div className="cards-row">
          <CardNumber number={"60 %"} text={"du trafic internet mondial provient du mobile"} iconName={"FaMobile"}/>
          <CardNumber number={"81 %"} text={"des consommateurs voient le site web comme un critère de confiance de la marque"} iconName={"FaGlobe"}/>
          <CardNumber number={"3 ans"} text={"c'est le temps qu'il faut pour qu'un site soit jugé obsolète"} iconName={"FaCalendar"}/>
        </div>
        <div className="cards-row">
          <CardNumber number={"3 sec"} text={"de temps de chargement augmente le taux de rebond de 40 %"} iconName={"FaHourglass"}/>
          <CardNumber number={"+12 %"} text={"de taux de conversion pour les landing pages optimisées."} iconName={"FaArrowTrendUp"}/>
        </div>
      </div>
    </div>
  );
}
