import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React from "react";
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

// ⚡ Bolt Optimization: Extracted FAQItem and wrapped in React.memo.
// This prevents all items in the list from re-rendering when the user
// toggles a single item, saving expensive computations (like sanitizeHtml)
// and improving interaction performance.
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
            // ⚡ Bolt Optimization: Lazy evaluation of sanitizeHtml
            // It only runs when the item is expanded
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(question.description),
            }}
          />
        )}
      </li>
    );
  }
);

export default function FAQHome({ title, description, questions }: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoized event handler with useCallback
  // to prevent re-creating functions on every render, ensuring
  // FAQItem's React.memo correctly bails out of re-renders.
  const toggleQuestion = React.useCallback(
    (index: number) => {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    },
    []
  );

  // ⚡ Bolt Optimization: Memoized the main description's sanitizeHtml
  // call since it's an expensive operation and only needs to run when
  // the description changes, not on every re-render (e.g. state changes)
  const sanitizedDescription = React.useMemo(() => {
    return { __html: sanitizeHtml(description) };
  }, [description]);

  return (
    <div className="FAQHome">
      <h2>{title}</h2>
      <div className="divider mb-4"></div>
      <div dangerouslySetInnerHTML={sanitizedDescription} />
      <ul>
        {questions.map((question, index) => (
          <FAQItem
            key={index}
            question={question}
            index={index}
            isActive={activeIndex === index}
            onToggle={toggleQuestion}
          />
        ))}
      </ul>
    </div>
  );
}
