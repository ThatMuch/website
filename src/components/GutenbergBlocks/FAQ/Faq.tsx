import "./style.scss"

import React, { useEffect, useRef } from 'react'
import { sanitizeHtml } from "../../../utils/sanitize"

type Props = {
	content?: string
	index?: number
}

export default function FAQ({ content,index }: Props) {
	const faqContainerRef = useRef < HTMLDivElement > (null);

	useEffect(() => {
    const container = faqContainerRef.current;
    if (container) {
      // Event delegation: attach listener to the container
      const handleContainerClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const question = target.closest(".question");

        // Ensure the click was on a question and it belongs to our block structure
        if (question && question.closest(".wp-block-faq-block-for-gutenberg-faq")) {
          // Find the answer element (next sibling)
          const answer = question.nextElementSibling as HTMLElement;
          if (answer) {
            question.classList.toggle("active");
          }
        }
      };

      container.addEventListener("click", handleContainerClick);

      // Cleanup function: remove event listener when the component unmounts
      return () => {
        container.removeEventListener("click", handleContainerClick);
      };
    }
  }, [content]);

  return (
    <div
      ref={faqContainerRef}
      key={index}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
    />
  );
}
