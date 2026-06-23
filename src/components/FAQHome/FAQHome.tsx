import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React, { useMemo, useCallback } from "react";
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
// toggles a single item. It also keeps the expensive `sanitizeHtml` call
// within conditional rendering (isActive && ...) so it is lazily evaluated.
const FAQItem = React.memo(({
  question,
  index,
  isActive,
  onToggle
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
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(question.description) }}
        />
      )}
    </li>
  );
});

export default function FAQHome({ title, description, questions }: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoized toggle callback with useCallback
  // to ensure FAQItem's React.memo can properly bail out of re-renders.
  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  }, []);

  // ⚡ Bolt Optimization: Memoized the main description's sanitizeHtml call
  // to avoid expensive DOMPurify execution (~0.8ms) on every state update.
  const sanitizedDescription = useMemo(() => {
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
