import Benefices from "./Benefices/Benefices";
import CTABlock from "./CTABlock/CTABlock";
import Etapes from "./Etapes/Etapes";
import Pourquoi from "./Pourquoi/Pourquoi";
import Probleme from "./Probleme/Probleme";
import Promesse from "./Promesse/Promesse";
import React from "react";
import Stats from "./Stats/Stats";
import type { ThatmuchBlock } from "./types";

type Props = {
  blocks?: ThatmuchBlock[] | null;
};

/**
 * Rend la liste des blocs THATMUCH d'une page, dans l'ordre défini en back.
 *
 * Le résolveur GraphQL garantit qu'un seul champ de contenu est non-nul par
 * bloc — on peut donc dispatcher sur la présence du champ plutôt que sur
 * `name`, ce qui évite une table de correspondance à maintenir en double.
 */
export default function ThatmuchBlocks({ blocks }: Props) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.name}-${block.order ?? i}`;

        if (block.probleme) return <Probleme key={key} bloc={block.probleme} />;
        if (block.faites_le_test)
          return <CTABlock key={key} bloc={block.faites_le_test} />;
        if (block.promesse) return <Promesse key={key} bloc={block.promesse} />;
        if (block.etapes) return <Etapes key={key} bloc={block.etapes} />;
        if (block.benefices)
          return <Benefices key={key} bloc={block.benefices} />;
        if (block.pourquoi) return <Pourquoi key={key} bloc={block.pourquoi} />;
        if (block.stats) return <Stats key={key} bloc={block.stats} />;

        return null;
      })}
    </>
  );
}
