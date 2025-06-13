import "./style.scss";

import FormQuestion from "./FormQuestion/FormQuestion";
import React from "react";
import questionquiz from "../../../../data/questionquiz.json";

type Props = {};

export default function FormContainer({}: Props) {
  return (
    <div className="FormContainer">
      {questionquiz?.map((question, index) => (
        <FormQuestion key={index} item={question} />
      ))}
    </div>
  );
}
