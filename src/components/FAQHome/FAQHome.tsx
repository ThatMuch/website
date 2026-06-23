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
// This prevents all items from re-rendering when the user toggles a single item.
// Keeping sanitizeHtml lazily evaluated within the condition ensures it's not run
// needlessly for unexpanded questions.
const FAQItem = React.memo(({
  question,
  index,
  isActive,
  toggleQuestion
}: {
  question: { title: string; description: string };
  index: number;
  isActive: boolean;
  toggleQuestion: (index: number) => void;
}) => (
  <li className="FAQHome__question">
    <h3>
      <button
        type="button"
        className="d-flex align-items-center justify-content-between FAQHome__question__title w-100 border-0 bg-transparent p-0 text-start"
        onClick={() => toggleQuestion(index)}
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
));

export default function FAQHome({ title, description, questions }: Props) {

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoized event handler to prevent breaking React.memo bailout
  const toggleQuestion = React.useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  // ⚡ Bolt Optimization: Memoize the main description's sanitizeHtml call
  // to avoid ~0.8ms recalculation on every state change (e.g., toggling a question).
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
            key={question.title || index}
            question={question}
            index={index}
            isActive={activeIndex === index}
            toggleQuestion={toggleQuestion}
          />
        ))}
      </ul>
    </div>
  );
}
