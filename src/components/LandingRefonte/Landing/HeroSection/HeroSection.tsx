import "./style.scss";

import * as React from "react";

import Button from "../../../UI/Button/Button";
import { FaArrowRight } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../../../images/THATMUCH_Logo_White.webp";

export interface IHeroSectionProps {
  title: string;
  desc: string;
  url: string;
  label?: string;
  isLanding?: boolean;
}

export const HeroSection: React.FC<IHeroSectionProps> = ({
  title,
  desc,
  url,
  label = "Découvrir",
  isLanding = true,
}) => {
  return (
    <React.Fragment>
      <header className="landing-header">
        <LazyLoadImage src={logo} alt="THATMUCH" />
      </header>
      {!isLanding && <h1 className="hero-title">{title}</h1>}
      {isLanding && (
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-desc">{desc}</p>
            <Button
              label={label}
              className="btn btn-dev btn-animate"
              type="link"
              url={url}
            >
              {label}
              <FaArrowRight className="btn-icon" />
            </Button>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};
