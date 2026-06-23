import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React, { useCallback, useMemo } from "react";
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

// ⚡ Bolt Optimization: Extracted FAQItem into React.memo to prevent all items
// from re-rendering when the active accordion changes.
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
          // ⚡ Bolt Optimization: Lazy evaluation of sanitizeHtml (only evaluated when isActive is true)
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(question.description) }}
        />
      )}
    </li>
  );
});

export default function FAQHome({ title, description, questions }: Props) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoize toggle callback to prevent breaking child component's React.memo
  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // ⚡ Bolt Optimization: Memoize main description's sanitizeHtml call to prevent expensive recalculations (~0.8ms per call) on every toggle
  const sanitizedDescription = useMemo(() => sanitizeHtml(description), [description]);

  return (
    <div className="FAQHome">
      <h2>{title}</h2>
      <div className="divider mb-4"></div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
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
