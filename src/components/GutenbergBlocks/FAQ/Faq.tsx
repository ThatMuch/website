import "./style.scss"

import React, { useEffect, useRef } from 'react'
import { sanitizeHtml } from "../../../utils/sanitize"

type Props = {
	content?: string
	index?: number
}

export default function FAQ({ content, index }: Props) {
  const faqContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = faqContainerRef.current;
    if (container) {
      // Enhance accessibility for questions
      const questions = container.querySelectorAll(".question");
      questions.forEach((question, i) => {
        question.setAttribute("role", "button");
        question.setAttribute("tabindex", "0");
        const isActive = question.classList.contains("active");
        question.setAttribute("aria-expanded", String(isActive));

        const answer = question.nextElementSibling;
        if (answer) {
          const answerId = `faq-block-${index || 0}-answer-${i}`;
          answer.id = answerId;
          question.setAttribute("aria-controls", answerId);
        }

        // Add keydown listener for keyboard accessibility
        question.addEventListener("keydown", (e: any) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            (question as HTMLElement).click();
          }
        });
      });

      // Event delegation: attach listener to the container
      const handleContainerClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const question = target.closest(".question");

        // Ensure the click was on a question and it belongs to our block structure
        if (
          question &&
          question.closest(".wp-block-faq-block-for-gutenberg-faq")
        ) {
          // Find the answer element (next sibling)
          const answer = question.nextElementSibling as HTMLElement;
          if (answer) {
            const isActive = question.classList.toggle("active");
            question.setAttribute("aria-expanded", String(isActive));
          }
        }
      };

      container.addEventListener("click", handleContainerClick);

      // Cleanup function: remove event listener when the component unmounts
      return () => {
        container.removeEventListener("click", handleContainerClick);
      };
    }
  }, [content, index]);

  return (
    <div
      ref={faqContainerRef}
      key={index}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
    />
  );
}
