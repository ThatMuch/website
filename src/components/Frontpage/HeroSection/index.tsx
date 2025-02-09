import "./style.scss"

import React, { useState } from 'react'

import SolarSystem from "../../SVG/SolarSystem/index_1.tsx"
import logo from "../../../images/THATMUCH_Logo_Black.png"

export default function HeroSection({ fullpageapi, anchor }) {
	const [isStarted, setIsStarted] = useState(false)

	const start = () => {
		setIsStarted(true)

		setTimeout(() => {
			fullpageapi.moveSectionDown();

		}, 800)
		setTimeout(() => {
			setIsStarted(false)

		}, 1500)
	}
	return (
		<div className="section HeroSection" data-anchor={anchor}>
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="logo">
							<img src={logo} alt="Thatmuch" className="logo_img" />
							<span className="logo_tagline">
								Agence web
								<div className="divider"></div>
							</span>
						</div>
						<h1 className="lead-heading">La puissance du design pour des sites web au-delà des galaxies.</h1>
						<p className="lead"> Bienvenue à bord du vaisseau <span className="text-uppercase fw-bold">Thatmuch</span> à destination de Naboo ! Veuillez attacher et ajuster votre ceinture de sécurité. Au nom de <span className="text-uppercase fw-bold">Thatmuch</span> et de ses partenaires, nous vous souhaitons un très bon voyage.
						</p>
					</div>
					<div className="col-lg-5">
						<div className={`masque ${isStarted ? "full" : ""}`}>
							<SolarSystem />
							<button className="btn_TM btn_TM_gradient" onClick={() => start()}>Décoller</button>
						</div>

					</div>
				</div>
			</div>
		</div >
	)
}
