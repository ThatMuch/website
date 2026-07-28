import "./style.scss";

import type { BlocEtapes } from "../types";
import React from "react";

type Props = {
  bloc: BlocEtapes;
};

/**
 * Bloc « La méthode » — étapes numérotées séparées par un filet.
 *
 * La numérotation n'est pas saisie en back : elle est dérivée de l'ordre du
 * repeater, pour qu'un ajout ou un déplacement d'étape ne laisse pas de trou
 * dans la séquence.
 */
export default function Etapes({ bloc }: Props) {
  const { kicker, titre, intro, etapes = [] } = bloc;

  return (
    <section className="tm-etapes">
      {kicker && <p className="tm-etapes__kicker">{kicker}</p>}

      <div className="divider" aria-hidden="true" />

      <h2 className="tm-etapes__titre h2">{titre}</h2>

      {intro && <p className="tm-etapes__intro">{intro}</p>}

      {etapes.length > 0 && (
        <ol className="tm-etapes__liste">
          {etapes.map((etape, i) => (
            <li key={`${etape.titre}-${i}`} className="tm-etapes__etape">
              <span className="tm-etapes__numero" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="tm-etapes__etape-titre">{etape.titre}</h3>
                <p className="tm-etapes__etape-texte">{etape.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
