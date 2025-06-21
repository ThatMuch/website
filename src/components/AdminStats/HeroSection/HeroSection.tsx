import React from "react";
import "./style.scss";

const HeroSection = ({ isGlobalStat, onToggle }) => {
    return (
        <div className="stat-hero-section">
            <h1 className="hero-title">Statistiques des réponses</h1>
            <div className="section-button">
                <button
                    className={`btn btn-dev btn-animate ${isGlobalStat ? "active" : ""}`}
                    onClick={() => onToggle(true)}
                >
                    Vue globale
                </button>
                <button
                    className={`btn btn-dev btn-animate ${!isGlobalStat ? "active" : ""}`}
                    onClick={() => onToggle(false)}
                >
                    Vue soumissions
                </button>
            </div>
        </div>

    );
};

export default HeroSection;