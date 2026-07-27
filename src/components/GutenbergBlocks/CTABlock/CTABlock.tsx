import "./style.scss";

import type { CTABlock } from "../types";
import React from "react";
import illustrationParDefaut from "../../../images/blocks/tardis.png";

type Props = {
  bloc: CTABlock;
};

/**
 * Bloc « Faites le test » — bandeau starfield indigo avec CTA.
 *
 * L'illustration vient d'un champ image ACF ; à défaut on retombe sur
 * l'illustration du design, versionnée dans le repo.
 */
export default function CTABlock({ bloc }: Props) {
  const { kicker, titre, texte, bouton_label, bouton_url, illustration } = bloc;

  const imageSrc = illustration?.url ?? illustrationParDefaut;
  const imageAlt = illustration?.alt ?? "";

  return (
    <section className="tm-test">
      <div className="tm-test__contenu">
        {kicker && <p className="tm-test__kicker">{kicker}</p>}

        <span className="tm-test__divider" aria-hidden="true" />

        <h2 className="tm-test__titre">{titre}</h2>

        {texte && <p className="tm-test__texte">{texte}</p>}

        {bouton_label && bouton_url && (
          <a
            className="btn btn-primary"
            href={bouton_url}
            rel="noopener noreferrer"
            title={bouton_label}
            aria-label={bouton_label}
            target="_blank"
          >
            <div className="btn__overlay"></div>
            <div className="btn__content">
              <span>{bouton_label}</span>
              <span className="tm-test__bouton-icone" aria-hidden="true">
                &rarr;
              </span>
            </div>
          </a>
        )}
      </div>

      <img
        className="tm-test__illustration"
        src={imageSrc}
        alt={imageAlt}
        width={342}
        height={478}
        loading="lazy"
      />
    </section>
  );
}
