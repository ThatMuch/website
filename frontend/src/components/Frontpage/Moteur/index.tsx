import "./style.scss"

import React, { FC, useEffect, useState } from 'react';

import Card from "../../Card/Card"
import bg_assemblage from "../../../images/bg_content_assemblage.png"
import illustration from "../../../images/assemblage.png"

interface MoteurProps {
	fullpageapi: any;
	title: string;
	index: number;
	anchor: string;
}

const Moteur: FC<MoteurProps> = ({ title, index, anchor }) => {
	let [random, setRandom] = useState(19)
	useEffect(() => {
		randomNumber()
	}, [])
	const randomNumber = () => {
		setInterval(() => {
			if (random > 0) {
				setRandom(random--)
			} else {
				setRandom(19)
			}
		}, 2000)
	}
	return (
		<div className="Moteur section" data-anchor={anchor}>
			<div className="container text-center">
				<div className="content">
					<h1><span className="fw-normal">0{index}</span> {title}</h1>
					<p> Phase de développement du projet, les maquettes sont codées, assemblées et testées. Lors de cette phase nous repérons les bugs ou malfonctions puis nous les corrigeons. </p>
				</div>
				<img src={bg_assemblage} alt="Assemblage THATMUCH" className="illu_desktop" />
				<img src={illustration} className="illu_mobile" alt="Assemblage THATMUCH" />

				<div className="number">
					{random}
				</div>
			</div>
		</div>
	)
};

export default Moteur;