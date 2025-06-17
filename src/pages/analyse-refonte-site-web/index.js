import { HeroSection } from "../../components/LandingRefonte/Landing/HeroSection/HeroSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LinkSection from "../../components/LandingRefonte/Landing/LinkSection/LinkSection";
import NumbersSection from "../../components/LandingRefonte/Landing/NumbersSection/NumbersSection";
import React from "react";
import ScoreSection from "../../components/LandingRefonte/Landing/ScoreSection/ScoreSection";
import Seo from "../../components/Seo";
import planetPink from "../../images/planet-pink.webp";
import planetYellow from "../../images/planet-yellow.webp";
const AnalyseRefonteSiteWeb = () => {
  return (
	  <div className="bg-landing">
		  <Seo
		  title="Analyse de la refonte de site web"
			  description="Découvrez si c'est le bon moment pour refaire votre site internet."
			  pathname="/analyse-refonte-site-web"
		  />
		  <LazyLoadImage src={planetPink} className="planet-pink" alt="Planète rose" />
		  <LazyLoadImage src={planetYellow} className="planet-yellow" alt="Planète jaune" />
      <div className="container-fluid z-2 position-relative">
        <HeroSection
          title="Est-ce le moment de refaire  mon site internet ?"
          desc="Nous avons concocté pour vous, une petite évaluation pour répondre à cette question que vous vous êtes sûrement déjà posé : quand faut-il engager la refonte de son site internet ?"
          url="./refonte-form"
          label="Evaluer mon site"
        />
        <NumbersSection />
        <ScoreSection />
        <LinkSection />
      </div>
      <div className="d-flex justify-content-center p-2 bg-dark mt-5">
        <span className="uppercase">thatmuch</span>
      </div>
    </div>
  );
};

export default AnalyseRefonteSiteWeb;
