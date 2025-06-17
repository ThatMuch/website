import React from "react";
import { HeroSectionAlt } from "../../components/LandingRefonteAlt/HeroSectionAlt/HerosSectionAlt";
import NumbersSectionAlt from "../../components/LandingRefonteAlt/NumbersSectionAlt/NumbersSectionAlt";
import LinkSectionAlt from "../../components/LandingRefonteAlt/LinkSectionAlt/LinkSectionAlt";
import FooterPlanet from "../../components/LandingRefonteAlt/FooterPlanet/FooterPlanet";
import Seo from "../../components/Seo";
const AnalyseRefonteSiteWeb = () => {
  const url ="./refonte-form";
  return (
	  <div className="bg-landing-alt">
		  <Seo
		  title="Analyse de la refonte de site web"
			  description="Découvrez si c'est le bon moment pour refaire votre site internet."
			  pathname="/analyse-refonte-site-web"
		  />
      <div className="container-fluid">
        <HeroSectionAlt
        title="Votre site web est-il à la hauteur de vos ambitions en 2025 ?"
        desc="Le monde digital évolue à une vitesse fulgurante. Un site web performant hier peut rapidement devenir obsolète aujourd’hui. Mais comment savoir si le vôtre répond encore aux attentes de vos clients et aux exigences du marché ?"
        url={url}
        label="Évaluer mon site"
        />
        <NumbersSectionAlt/>
        <LinkSectionAlt url={url}/>
      </div>
      <FooterPlanet/>
    </div>
  );
};

export default AnalyseRefonteSiteWeb;
