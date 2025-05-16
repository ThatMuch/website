import "./style.scss"

import React from 'react'
import badge from "../../images/Badge.png"
import {useSitePages} from '../../hooks/use-site-pages'

export default function ComingSoon() {
	return (
		<main className="ComingSoon bg-dark">
			<img src={badge} alt="thatmuch" />
			<h1>Coming soon ...</h1>
			{useSitePages().map(item => (
				<a href={item.node.link}>{item.node.title}</a>
			))
			}
		</main>
	)
}
