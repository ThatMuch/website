import "./HeroSection.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";

type Props = {
  data?: any;
};

export default function HeroSection({ data }: Props) {
  const { title, desc, boutton, logos } = data;
  return (
    <div className="HeroSection">
      <h1 className="HeroSection__title">{title}</h1>
      <div
        className="HeroSection__desc"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <a
        href={boutton.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary HeroSection__btn"
        aria-label={boutton.title}
        title={"Lien dans la hero section vers " + boutton.title}
      >
        {boutton.title}
      </a>

      <p>{logos.title} </p>
      <div className="HeroSection__logos">
        {logos?.images?.nodes.map((logo, index) => (
          <div key={index} className="HeroSection__logos__logo">
            <LazyLoadImage
              src={logo.mediaItemUrl}
              alt={logo.altText}
              effect="blur"
              className="HeroSection__logos__logo__image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
