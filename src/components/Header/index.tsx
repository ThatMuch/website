import "./style.scss"

import React, { useEffect, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import close from "../../images/29-cross-outline.png"
import close_gif from "../../images/29-cross-outline.gif"
import comet from "../../images/Comet.svg"
import logo from "../../images/THATMUCH_Logo_Black.png"

export default function Header({ data }) {
	// hide the .menu__txt if the page is scrolled
	const [isOpened, setIsOpened] = useState(false)
	const [isActive, setIsActive] = useState(0)
	const [isScrolled, setIsScrolled] = useState(false)

	return (
		<header className="menu">
			<button id="bento-menu" className="ml-auto menu__button" onClick={() => setIsOpened(true)}>
				<div className="bento">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
				{!isScrolled && <span className="menu__txt">Menu</span>}
			</button>
			{isOpened ? (
				<div className="menu__wrapper">
					<button id="btn_close" className="btn_close" onClick={() => setIsOpened(false)}>
						<img className="close" src={close} alt="Close Thatmuch" />
						<img className="close_hover" src={close_gif} alt="Close Thatmuch" />
					</button>
					<img src={logo} alt="Thatmuch" className="logo" />
					<div className="row">
						<div className="col-12 col-sm-4 ">
							<ul>
								{data.nodes.map((item, index) =>
								(<li key={index} data-aos="slide-up" data-aos-delay={index * 100} onMouseEnter={() => setIsActive(index)}>
									<a href={item.url} target={item.target} onClick={() => setIsOpened(false)}>{item.label}</a>
								</li>)
								)}
							</ul>
						</div>
						<div className="d-none d-sm-flex col-sm-8  align-items-center">
							<p className="menu__item__desc" >{data.nodes[isActive].description}</p>
							<div className="comets">
								<img data-aos="fade-down-left" data-aos-delay="100" src={comet} alt="Comet Thatmuch" />
								<img data-aos="fade-down-left" data-aos-delay="200" src={comet} alt="Comet Thatmuch" />
								<img data-aos="fade-down-left" data-aos-delay="300" src={comet} alt="Comet Thatmuch" />
							</div>
						</div>
					</div>
				</div>
			) : null}

		</header>
	)
}

const MenuItem = ({ url, label }) => {
	return (<Nav.Item><Nav.Link href={url}>{label}</Nav.Link></Nav.Item>)
}


