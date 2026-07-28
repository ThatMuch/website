import "./style.scss"

import React, { useMemo } from "react"
import type { BlocPromesse } from "../types"
import { sanitizeHtml } from "../../../utils/sanitize"

type Props = {
  bloc: BlocPromesse
}

/**
 * Bloc « Notre définition » — contenu riche à gauche, cartes à icône à droite.
 *
 * Le champ `contenu` est un wysiwyg ACF : il arrive en HTML et doit être
 * assaini avant injection, comme pour le bloc FAQ.
 */
export default function Promesse({ bloc }: Props) {
  const { kicker, titre, contenu, cartes = [] } = bloc

  const contenuAssaini = useMemo(
    () => ({ __html: sanitizeHtml(contenu || "") }),
    [contenu]
  )

  return (
    <section className="tm-promesse">
      <div className="tm-promesse__inner">
        <div className="tm-promesse__colonne">
          {kicker && <p className="tm-promesse__kicker">{kicker}</p>}

          <span className="tm-promesse__divider" aria-hidden="true" />

          <h2 className="tm-promesse__titre">{titre}</h2>

          {contenu && (
            <div
              className="tm-promesse__contenu"
              dangerouslySetInnerHTML={contenuAssaini}
            />
          )}
        </div>

        {cartes.length > 0 && (
          <div className="tm-promesse__cartes">
            {cartes.map((carte, i) => (
              <article key={`${carte.titre}-${i}`} className="tm-promesse__carte">
                {carte.icone?.url && (
                  <img
                    className="tm-promesse__carte-icone"
                    src={carte.icone.url}
                    alt=""
                    width={34}
                    height={34}
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}

                <div>
                  <h3 className="tm-promesse__carte-titre">{carte.titre}</h3>
                  <p className="tm-promesse__carte-texte">{carte.texte}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
