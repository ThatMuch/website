import "./style.scss";

import * as React from "react";

import { FaArrowRight } from "react-icons/fa6";
import logo from "../../../images/THATMUCH_Logo_White.png";
import planet1 from "../../../images/Planets_blue.png";
import planet2 from "../../../images/Planets_yellow.png";

export interface IHeroSectionProps {
  title: string;
  desc: string;
  url: string;
  label?: string;
}

export const HeroSectionAlt: React.FC<IHeroSectionProps> = ({
  title,
  desc,
  url,
  label = "Découvrir",
}) => {
  return (
    <React.Fragment>
      <header className="landing-header">
        <a
          href="/"
          className="logo"
          aria-label="Accueil"
          title="Lien vers l'accueil"
        >
          <img src={logo} alt="THATMUCH" />
        </a>
      </header>
      <section className="hero-sectionAlt">
        <div className="hero-content">
          <div className="hero-title-content">
            <h1 className="hero-title">
              {title.split(/(20\d{2})/g).map((part, i) =>
                /^\d{4}$/.test(part) ? (
                  <span key={i} className="highlight-year">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </h1>
            <a href={url} className="btn btn-dev" aria-label={label}>
              {label}
              <FaArrowRight className="btn-icon" />
            </a>
          </div>
          <div className="hero-desc-content">
            <img
              src={planet1}
              alt="planette bleu"
              className="planet planet-left"
            />
            <p className="hero-desc">{desc}</p>
            <img
              src={planet2}
              alt="planette jaune"
              className="planet planet-right"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
