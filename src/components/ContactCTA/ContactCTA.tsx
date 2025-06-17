import "./ContactCTA.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import tardis from "../../images/tardis.png";

export default function ContactCTA() {
  return (
    <div className="ContactCTA">
      <div className="ContactCTA__content">
        <h2 className="h3">Vous avez un projet ?</h2>
        <div className="divider mb-4"></div>
        <h3 className="h2">Contactez-nous</h3>
        <p>
          Nous sommes là pour vous aider à réaliser vos projets. N'hésitez pas à
          nous contacter pour discuter de vos besoins.
        </p>
        <a
          href="https://meetings-eu1.hubspot.com/mathilde-arconte?uuid=e5cf8126-6dc9-4ec7-947e-2760637a43f2"
          className="btn btn-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Programmez un appel
        </a>
      </div>
      <LazyLoadImage src={tardis} alt="Tardis" />
    </div>
  );
}
