import "./style.scss";

import React from "react";

type Props = {
  item: any; // Replace 'any' with the actual type of your question object
};

const FormQuestion = ({ item }: Props) => {
  const { question, options } = item;
  return (
    <div className="FormQuestion">
      <h3 className="h6 mb-4">{question}</h3>
      {options?.map((option: any, index: number) => (
        <div key={index} className={"FormQuestion__option"}>
          <input
            type="radio"
            id={`option-${item.id}-${index}`}
            name={question}
            value={option.text}
          />
          <label htmlFor={`option-${item.id}-${index}`}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default FormQuestion;
