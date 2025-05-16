import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.scss'
import "aos/dist/aos.css";

import Contact from '../components/Frontpage/Contact';
import Decollage from '../components/Frontpage/Decollage';
import Fullpage from "../components/Fullpage"
import Header from '../components/Header';
import HeroSection from "../components/Frontpage/HeroSection"
import Moteur from "../components/Frontpage/Moteur"
import Plan from "../components/Frontpage/Plan"
import Program from "../components/Frontpage/Program/Program"
import React from "react"
import Seo from '../components/Seo';

const sections = [
	{
		component: <HeroSection />,
		anchor: "Accueil",

	},
	{
		component: <Program />,
		anchor: "ProgrammeDeVol",
		title: "Programme de vol"
	},
	{
		component: <Plan />,
		anchor: "PlanDeFusee",
		title: "Votre plan de fusée"
	},
	{
		component: <Moteur />,
		anchor: "AssemblageEtAllumageMoteur",
		title: "Assemblage et allumage moteur"
	},
	{
		component: <Decollage />,
		anchor: "DecollageEtMiseEnOrbite",
		title: "Décollage et mise en orbite"
	},
	{
		component: <Contact />,
		anchor: "Contact",
		title: "Contact"
	},
]

const IndexPage = () => {
  return (
	  <>
		  <Header />
		  <Seo/>
			<Fullpage sections={sections}/>
		</>
  )
}

export default IndexPage
