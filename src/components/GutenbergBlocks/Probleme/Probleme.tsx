import "./style.scss"

import React from "react"
import type { BlocProbleme } from "../types"

type Props = {
  bloc: BlocProbleme
}

/**
 * Bloc « Le constat » — kicker, divider, titre, intro et cartes taguées.
 *
 * Le nombre de cartes est piloté par le repeater ACF (1 à 4) ; la grille
 * s'adapte, mais le design de référence en prévoit quatre, une par pôle.
 */
export default function Probleme({ bloc }: Props) {
  const { kicker, titre, intro, cartes = [] } = bloc

  return (
    <section className="tm-probleme">
      <div className="tm-probleme__inner">
        {kicker && <p className="tm-probleme__kicker">{kicker}</p>}

        <span className="tm-probleme__divider" aria-hidden="true" />

        <h2 className="tm-probleme__titre">{titre}</h2>

        {intro && <p className="tm-probleme__intro">{intro}</p>}

        {cartes.length > 0 && (
          <div className="tm-probleme__cartes">
            {cartes.map((carte, i) => (
              <article
                key={`${carte.titre}-${i}`}
                className={`tm-probleme__carte tm-probleme__carte--${carte.scope}`}
              >
                {carte.tag_label && (
                  <span className={`tm-probleme__tag tm-probleme__tag--${carte.scope}`}>
                    {carte.tag_label}
                  </span>
                )}

                <h3 className="tm-probleme__carte-titre">{carte.titre}</h3>
                <p className="tm-probleme__carte-texte">{carte.texte}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
