import "./style.scss";

import ButtonTab from "./ButtonTab/buttonTab";
import Pastille from "../Pastille/pastille";
import React from "react";
import ResponseCount from "./ResponseCount/ResponseCount";
import { getCurrentMonth } from "../utils/dateUtils";
import { scoreResult } from "../utils/scoreResult";

const HeroSection = ({
  isGlobalStat,
  onToggle,
  responseCount,
  responseThisMonth,
  average,
}) => {
  return (
    <div className="stat-hero-section">
      <h1>Statistiques des réponses</h1>
      <div className="section-numbers">
        <ResponseCount label="Total des réponses" count={responseCount} />
        <ResponseCount
          label={"Réponses en " + getCurrentMonth()}
          count={responseThisMonth}
        />
        <ResponseCount label="Moyenne des réponses" count={average} />
        {/* <Pastille value={Number(average)} big /> */}
      </div>
      <div className="section-button">
        <ButtonTab
          label="Réponses"
          isActive={!isGlobalStat}
          onClick={() => onToggle(false)}
        ></ButtonTab>
        <ButtonTab
          label="Stats"
          isActive={isGlobalStat}
          onClick={() => onToggle(true)}
        ></ButtonTab>
      </div>
    </div>
  );
};

export default HeroSection;
