import "./HeroSection.scss";

import React from "react";
import { FaStar } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { sanitizeHtml } from "../../utils/sanitize";

interface ImageNode {
  mediaItemUrl: string;
  altText: string;
}

interface ButtonData {
  url: string;
  title: string;
  target?: string;
}

interface LogosData {
  title: string;
  images: {
    nodes: ImageNode[];
  };
}

export interface HeroSectionData {
  title: string;
  desc: string;
  boutton: ButtonData;
  logos: LogosData;
}

interface Props {
  data: HeroSectionData;
}

export default function HeroSection({ data }: Props) {
  const { title, desc, boutton, logos } = data;

  return (
    <>
    <section className="HeroSection">
      <div className="HeroSection__header">
        <h1 className="HeroSection__title">{title}</h1>
        <div
          className="HeroSection__desc"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(desc) }}
        />
        {boutton && (
           <a
            href={boutton.url}
            target={boutton.target || "_blank"}
            rel="noopener noreferrer"
            className="btn btn-dev"
            aria-label={boutton.title}
            title={`Lien dans la hero section vers ${boutton.title}`}
          >
            {boutton.title}
          </a>
        )}
        </div>
        <div className="HeroSection__stats">
          <div>
            <p className="HeroSection__stats__stars"><FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
              <FaStar />
            </p>
            <p>Satisfaction client</p>
          </div>
          <div>
            <p className="HeroSection__stats__title">+ 10 ans</p>
            <p>d'expérience</p>
          </div>
          <div>
            <p className="HeroSection__stats__title">+ 50 projets</p>
            <p>Réalisés</p>
          </div>
        </div>
    </section>
        {logos && (
        <div className="HeroSection__logos">
          {logos.title && <p className="HeroSection__logos-title no-animation">{logos.title}</p>}
          <div className="HeroSection__logos__list">
            <div className="HeroSection__logos__track">
              {logos.images?.nodes.map((logo, index) => (
                <div key={`original-${index}`} className="HeroSection__logos__list__logo">
                  <LazyLoadImage
                    src={logo.mediaItemUrl}
                    alt={logo.altText || "Logo partenaire"}
                    effect="blur"
                    className="HeroSection__logos__list__logo__image"
                  />
                </div>
              ))}
              {/* Duplicated list for infinite scroll */}
              {logos.images?.nodes.map((logo, index) => (
                <div key={`duplicate-${index}`} className="HeroSection__logos__list__logo">
                  <LazyLoadImage
                    src={logo.mediaItemUrl}
                    alt={logo.altText || "Logo partenaire"}
                    effect="blur"
                    className="HeroSection__logos__list__logo__image"
                  />
                </div>
              ))}
            </div>
          </div>
    </div>
  )
  }
  </>
  );
}
