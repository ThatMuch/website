import React from "react";
import "./style.scss";
import { getCurrentMonth } from "../utils/dateUtils";
import { scoreResult } from "../utils/scoreResult";
import Pastille from "../Pastille/pastille";
import ResponseCount from "./ResponseCount/ResponseCount";
import ButtonTab from "./ButtonTab/buttonTab";

const HeroSection = ({ isGlobalStat, onToggle, responseCount, responseThisMonth, average }) => {
    return (
        <div className="stat-hero-section">
            <h1 className="hero-title">Statistiques des réponses</h1>
            <div className="section-numbers">
                <ResponseCount label="Total" count={responseCount} />
                <ResponseCount label={getCurrentMonth()} count={responseThisMonth} />
                <Pastille value={Number(average)} big />

            </div>
            <div className="section-button">
                <ButtonTab
                    label="Réponses"
                    isActive={!isGlobalStat}
                    onClick={() => onToggle(false)}>
                </ButtonTab>
                <ButtonTab
                    label="Stats"
                    isActive={isGlobalStat}
                    onClick={() => onToggle(true)}>
                </ButtonTab>
            </div>
        </div>

    );
};

export default HeroSection;