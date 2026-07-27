import "./style.scss";

import type { BlocStats } from "../types";
import React from "react";

type Props = {
  bloc: BlocStats;
};

/**
 * Bloc « Chiffres clés » — bandeau dégradé indigo, un chiffre coloré par carte.
 *
 * La valeur et son libellé forment une seule unité de sens : ils sont groupés
 * dans un <dl> pour que les lecteurs d'écran les restituent liés.
 */
export default function Stats({ bloc }: Props) {
  const { stats = [] } = bloc;

  if (!stats.length) return null;

  return (
    <section className="tm-stats">
      <dl className="tm-stats__grille">
        {stats.map((stat, i) => (
          <div key={`${stat.valeur}-${i}`} className="tm-stats__carte">
            <dt
              className={`tm-stats__valeur tm-stats__valeur--${stat.couleur}`}
            >
              {stat.valeur}
            </dt>
            <dd className="tm-stats__libelle">{stat.libelle}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
