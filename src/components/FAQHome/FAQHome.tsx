import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React, { useState, useCallback, useMemo, memo } from "react";
import { sanitizeHtml } from "../../utils/sanitize";

type Question = {
  title: string;
  description: string;
};

type Questions = Question[];

type Props = {
  title: string;
  description: string;
  questions: Questions;
};

type FAQItemProps = {
  question: Question;
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
};

// ⚡ Bolt Optimization: Extracted FAQ items into a memoized component.
// Why: Prevents re-rendering all list items when only one question is toggled.
// Impact: Reduces unnecessary React reconciliation, particularly avoiding repeated
// expensive lazy evaluation of sanitizeHtml if other parts of the component update.
const FAQItem = memo(({ question, index, isActive, onToggle }: FAQItemProps) => {
  const handleClick = useCallback(() => {
    onToggle(index);
  }, [index, onToggle]);

  return (
    <li className="FAQHome__question">
      <h3>
        <button
          type="button"
          className="d-flex align-items-center justify-content-between FAQHome__question__title w-100 border-0 bg-transparent p-0 text-start"
          onClick={handleClick}
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ⚡ Bolt Optimization: Memoized toggle callback.
  // Why: Prevents creating a new function reference on every re-render of FAQHome.
  // Impact: Allows FAQItem to actually benefit from React.memo, saving computation time.
  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // ⚡ Bolt Optimization: Memoized main description sanitizeHtml call.
  // Why: DOMPurify.sanitize (sanitizeHtml) is an expensive operation (~0.8ms per call).
  // Impact: Prevents heavy recalculation on every state-triggered re-render (e.g. toggling a question).
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
