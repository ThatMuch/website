import { HeroSection } from "../components/LandingRefonte/HeroSection/HeroSection";
import LinkSection from "../components/LandingRefonte/LinkSection/LinkSection";
import NumbersSection from "../components/LandingRefonte/NumbersSection/NumbersSection";
import React from "react";
import ScoreSection from "../components/LandingRefonte/ScoreSection/ScoreSection";

const AnalyseRefonteSiteWeb = () => {
  return (
    <div className="bg-landing">
      <div className="container-fluid">
        <HeroSection
          title="Est-ce le moment de refaire  mon site internet ?"
          desc="Nous avons concocté pour vous, une petite évaluation pour répondre à cette question que vous vous êtes sûrement déjà posé : quand faut-il engager la refonte de son site internet ?"
          url="#"
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
