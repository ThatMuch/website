import "./style.scss";

import type { BlocPourquoi } from "../types";
import React from "react";

type Props = {
  bloc: BlocPourquoi;
};

/**
 * Bloc « Pourquoi THATMUCH » — même en-tête que « Le constat », mais des
 * cartes blanches ombrées, identiques à celles du bloc « Notre définition ».
 */
export default function Pourquoi({ bloc }: Props) {
  const { kicker, titre, intro, cartes = [] } = bloc;

  return (
    <section className="tm-pourquoi">
      {kicker && <p className="tm-pourquoi__kicker">{kicker}</p>}

      <div className="divider" aria-hidden="true" />

      <h2 className="tm-pourquoi__titre">{titre}</h2>

      {intro && <p className="tm-pourquoi__intro">{intro}</p>}

      {cartes.length > 0 && (
        <div className="tm-pourquoi__cartes">
          {cartes.map((carte, i) => (
            <article key={`${carte.titre}-${i}`} className="tm-pourquoi__carte">
              <h3 className="tm-pourquoi__carte-titre">{carte.titre}</h3>
              <p className="tm-pourquoi__carte-texte">{carte.texte}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
