import "./style.scss"

import React from 'react'

type Props = {
	content?: string
	index?: number
}

export default function FAQ({ content,index }: Props) {
	const items = document.querySelectorAll(
    ".wp-block-faq-block-for-gutenberg-faq .question"
  );

	const toggleAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
		console.log("toto")
		const target = event.currentTarget;
		console.log(target)
		const answer = target.nextElementSibling as HTMLDivElement;
		console.log(answer)
		if (answer) {
			target.classList.toggle("active");
		}
	};
	items.forEach((item) => {
		item.addEventListener('click', (event) => toggleAnswer(event));
	});
  return (
    <div key={index} dangerouslySetInnerHTML={{ __html: content }} />
  );
}
