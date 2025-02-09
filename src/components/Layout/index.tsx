import 'normalize.css';
import "./style.scss"

import React, { useEffect } from 'react'

import AOS from "aos";
import Header from "../Header"
import { useSiteMenu } from "../../hooks/use-site-menu"

export default function Layout({ children }) {
	const menuItems = useSiteMenu()
	useEffect(() => {
		AOS.init({
			anchorPlacement: 'top-bottom',
			easing: 'ease-in-out',
		});
		AOS.refresh();
	}, []);
	return (
		<>
			<Header data={menuItems}></Header>
			{children}
		</>
	)
}
