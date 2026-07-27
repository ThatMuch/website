import "./style.scss"

import React from "react"
import type { BlocFaitesLeTest } from "../types"
import illustrationParDefaut from "../../../images/blocks/tardis.png"

type Props = {
  bloc: BlocFaitesLeTest
}

/**
 * Bloc « Faites le test » — bandeau starfield indigo avec CTA.
 *
 * L'illustration vient d'un champ image ACF ; à défaut on retombe sur
 * l'illustration du design, versionnée dans le repo.
 */
export default function FaitesLeTest({ bloc }: Props) {
  const { kicker, titre, texte, bouton_label, bouton_url, illustration } = bloc

  const imageSrc = illustration?.url ?? illustrationParDefaut
  const imageAlt = illustration?.alt ?? ""

  return (
    <section className="tm-test">
      <div className="tm-test__contenu">
        {kicker && <p className="tm-test__kicker">{kicker}</p>}

        <span className="tm-test__divider" aria-hidden="true" />

        <h2 className="tm-test__titre">{titre}</h2>

        {texte && <p className="tm-test__texte">{texte}</p>}

        {bouton_label && bouton_url && (
          <a className="tm-test__bouton" href={bouton_url}>
            <span>{bouton_label}</span>
            <span className="tm-test__bouton-icone" aria-hidden="true">
              &rarr;
            </span>
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
  )
}
