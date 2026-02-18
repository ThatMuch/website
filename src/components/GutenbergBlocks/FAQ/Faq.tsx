import "./style.scss"

import React, { useEffect, useRef } from 'react'

type Props = {
	content?: string
	index?: number
}

export default function FAQ({ content,index }: Props) {
	const faqContainerRef = useRef < HTMLDivElement > (null);
	useEffect(() => {
    if (faqContainerRef.current) {
      // Now that we're in the browser, we can safely query the DOM within this specific container
      const items = faqContainerRef.current.querySelectorAll(
        ".wp-block-faq-block-for-gutenberg-faq .question"
      );

      // Function to handle the click event
		const toggleAnswer = (event: Event) => {

        // Use Event from DOM for addEventListener
        const target = event.currentTarget as HTMLDivElement; // Cast to HTMLDivElement
        const answer = target.nextElementSibling as HTMLDivElement;
        if (answer) {
          target.classList.toggle("active");
        }
      };

      // Add event listeners to each question
      items.forEach((item) => {
        item.addEventListener("click", toggleAnswer);
      });
      // Cleanup function: remove event listeners when the component unmounts
      return () => {
        items.forEach((item) => {
          item.removeEventListener("click", toggleAnswer);
        });
      };
    }
  }, [content]);

  return (
    <div
      ref={faqContainerRef}
      key={index}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
