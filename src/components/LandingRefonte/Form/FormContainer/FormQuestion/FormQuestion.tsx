import "./style.scss";

import { Field } from "formik";
import React from "react";

type Props = {
  item: any;
  errors: any;
  touched: any;
  showErrors?: boolean;
};

const FormQuestion = ({ item, errors, touched, showErrors }: Props) => {
  const { question, options, id, description } = item;
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
        {description && (
          <p className="FormQuestion__description">{description}</p>
        )}
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
          {/* {showErrors && errors[id] && (
            <div className={`FormQuestion__error`} id={`error-${id}`}>
              {errors[id] || "Veuillez sélectionner une option."}
            </div>
          )} */}
        </div>
      </fieldset>
    </div>
  );
};

export default FormQuestion;
