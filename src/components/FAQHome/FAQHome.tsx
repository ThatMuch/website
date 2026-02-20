import "./FAQHome.scss";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

import React from "react";

type Questions = {
  title: string;
  description: string;
}[];

type Props = {
  title: string;
  description: string;
  questions: Questions;
};

export default function FAQHome({ title, description, questions }: Props) {

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const toggleQuestion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div className="FAQHome">
      <h2>{title}</h2>
      <div className="divider mb-4"></div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="FAQHome__question">
            <h3>
              <button
                type="button"
                className="d-flex align-items-center justify-content-between FAQHome__question__title w-100 border-0 bg-transparent p-0 text-start"
                onClick={() => toggleQuestion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-home-answer-${index}`}
              >
                {question.title}
                {activeIndex === index ? <FiMinusCircle /> : <FiPlusCircle />}
              </button>
            </h3>
            {activeIndex === index && (
              <div
                id={`faq-home-answer-${index}`}
                dangerouslySetInnerHTML={{ __html: question.description }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
