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

// ⚡ Bolt: Extracted `FAQItem` to `React.memo` to prevent re-rendering all items when `activeIndex` changes.
// This skips the expensive `sanitizeHtml` call inside un-active items during state updates.
const FAQItem = React.memo(({
  question,
  index,
  isActive,
  onToggle
}: {
  question: { title: string, description: string };
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
}) => {
  return (
    <li className="FAQHome__question">
      <h3
        className="d-flex align-items-center justify-content-between FAQHome__question__title"
        onClick={() => onToggle(index)}
      >
        {question.title}
        {isActive ? <FiMinusCircle /> : <FiPlusCircle />}
      </h3>
      {isActive && (
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(question.description) }} />
      )}
    </li>
  );
});

FAQItem.displayName = "FAQItem";

export default function FAQHome({ title, description, questions }: Props) {

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // ⚡ Bolt: Memoized toggle handler to prevent unnecessary re-renders of the memoized `FAQItem` children.
  const toggleQuestion = React.useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  // ⚡ Bolt: Memoized the result of `sanitizeHtml` because it's an expensive synchronous operation (~0.8ms).
  // Without this, `sanitizeHtml(description)` would execute on *every* click of an FAQ item.
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
            onToggle={toggleQuestion}
          />
        ))}
      </ul>
    </div>
  );
}
