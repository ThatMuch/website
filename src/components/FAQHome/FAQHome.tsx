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

type FAQItemProps = {
  question: { title: string; description: string };
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
};

// Extracted to prevent re-rendering all items when one is toggled
const FAQItem = React.memo(({ question, index, isActive, onToggle }: FAQItemProps) => {
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
          // sanitizeHtml is expensive (~0.8ms), so we keep it lazily evaluated inside the active condition
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(question.description) }}
        />
      )}
    </li>
  );
});

export default function FAQHome({ title, description, questions }: Props) {

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // Memoize callback to prevent breaking React.memo on FAQItem
  const toggleQuestion = React.useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // Memoize main description sanitization to avoid recalculation on state changes
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
            key={question.title || index} // Prefer unique title over index for React reconciliation
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
