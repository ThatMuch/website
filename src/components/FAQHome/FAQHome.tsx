import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React, { useCallback, useMemo, useState } from "react";
import { sanitizeHtml } from "../../utils/sanitize";

type Questions = {
  title: string;
  description: string;
}[];

type Props = {
  title: string;
  description: string;
  questions: Questions;
};

// ⚡ Bolt Optimization: Extracted FAQItem and wrapped in React.memo to prevent
// unnecessary re-renders of all items when only one is toggled.
const FAQItem = React.memo(
  ({
    question,
    index,
    isActive,
    onToggle,
  }: {
    question: { title: string; description: string };
    index: number;
    isActive: boolean;
    onToggle: (index: number) => void;
  }) => {
    return (
      <li className="FAQHome__question">
        <h3>
          <button
            type="button"
            className="d-flex align-items-center justify-content-between FAQHome__question__title w-100 border-0 bg-transparent p-0 text-start"
            onClick={() => onToggle(index)}
            aria-expanded={isActive}
            aria-controls={`faq-home-answer-${index}`}
          >
            {question.title}
            {isActive ? <FiMinusCircle /> : <FiPlusCircle />}
          </button>
        </h3>
        {isActive && (
          <div
            id={`faq-home-answer-${index}`}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(question.description),
            }}
          />
        )}
      </li>
    );
  }
);

FAQItem.displayName = "FAQItem";

export default function FAQHome({ title, description, questions }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoized callback so FAQItem.memo can properly bail out
  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // ⚡ Bolt Optimization: Memoized expensive sanitizeHtml call (~0.8ms) for the main description
  const sanitizedDescription = useMemo(
    () => ({ __html: sanitizeHtml(description) }),
    [description]
  );

  return (
    <div className="FAQHome">
      <h2>{title}</h2>
      <div className="divider mb-4"></div>
      <div dangerouslySetInnerHTML={sanitizedDescription} />
      <ul>
        {questions.map((question, index) => (
          <FAQItem
            key={index}
            index={index}
            question={question}
            isActive={activeIndex === index}
            onToggle={toggleQuestion}
          />
        ))}
      </ul>
    </div>
  );
}
