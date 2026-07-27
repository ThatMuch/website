import "./style.scss";

import type { BeneficeCarte, BlocBenefices, Scope } from "../types";

import React from "react";
import planeteCom from "../../../images/blocks/planete-com.png";
import planeteDesign from "../../../images/blocks/planete-design.png";
import planeteDev from "../../../images/blocks/planete-dev.png";
import planeteProject from "../../../images/blocks/planete-project.png";

type Props = {
  bloc: BlocBenefices;
};

/** Le design system suffixe le tag « proj », là où le scope ACF dit « project ». */
const TAG_SCOPE: Record<Scope, string> = {
  com: "com",
  design: "design",
  dev: "dev",
  project: "proj",
};

/** Planètes du design, versionnées : servent de repli si le champ ACF est vide. */
const PLANETE_PAR_DEFAUT: Record<Scope, string> = {
  com: planeteCom,
  design: planeteDesign,
  dev: planeteDev,
  project: planeteProject,
};

export default function Benefices({ bloc }: Props) {
  const { kicker, titre, cartes = [] } = bloc;

  return (
    <section className="tm-benefices">
      {kicker && <p className="tm-benefices__kicker">{kicker}</p>}

      <div className="divider tm-benefices__divider" aria-hidden="true" />

      <h2 className="tm-benefices__titre">{titre}</h2>

      {cartes.length > 0 && (
        <div className="tm-benefices__cartes">
          {cartes.map((carte: BeneficeCarte, i) => (
            <article key={`${carte.titre}-${i}`} className="tm-benefices__carte">
              <img
                className="tm-benefices__planete"
                src={carte.planete?.url ?? PLANETE_PAR_DEFAUT[carte.scope]}
                alt=""
                width={101}
                height={99}
                aria-hidden="true"
                loading="lazy"
              />

              {carte.tag_label && (
                <span className={`tag tag--${TAG_SCOPE[carte.scope]}`}>
                  {carte.tag_label}
                </span>
              )}

              <h3 className="tm-benefices__carte-titre">{carte.titre}</h3>
              <p className="tm-benefices__carte-texte">{carte.texte}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
