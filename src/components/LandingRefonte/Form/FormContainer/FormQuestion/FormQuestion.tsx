import "./style.scss";

import { ErrorMessage, Field, Form, Formik } from "formik";

import React from "react";

type Props = {
  item: any;
  errors: any;
  touched: any;
  onKeyDown?: (e: React.KeyboardEvent, callback: () => void) => void;
};

const FormQuestion = ({ item, errors, touched, onKeyDown }: Props) => {
  const { question, options, id } = item;

  // Gestion des touches clavier pour l'accessibilité
  const handleKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };
  return (
    <div className="FormQuestion" key={id}>
      <fieldset
        aria-describedby={errors[id] && touched[id] ? `error-${id}` : undefined}
      >
        <legend id={`legend-${id}`}>
          <h3 className="h6 mb-4">{question}</h3>
        </legend>
        <div
          role="radiogroup"
          aria-labelledby={`legend-${id}`}
          aria-required="true"
        >
          {options?.map((option: any, index: number) => {
            const inputId = `option-${item.id}-${index}`;
            return (
              <div key={index} className={"FormQuestion__option"}>
                <Field
                  type="radio"
                  id={inputId}
                  name={id}
                  value={option.score.toString()}
                  aria-describedby={
                    errors[id] && touched[id] ? `error-${id}` : undefined
                  }
                  onKeyDown={(e: React.KeyboardEvent) =>
                    handleKeyDown(e, () => {
                      const input = e.target as HTMLInputElement;
                      input.checked = true;
                      input.focus();
                    })
                  }
                />
                <label htmlFor={inputId}>{option.text}</label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <ErrorMessage
        name={`question-${question.id}`}
        component="div"
        className="error"
        id={`error-${question.id}`}
        aria-live="polite"
      />
    </div>
  );
};

export default FormQuestion;
