import "./style.scss";

import React, { useState } from "react";

import Legend from "../Legend/Legend";
import { categories } from "../utils/categoryIcons";

const SubmissionAnswers = ({
  selectedSubmission,
  questionsData,
  selectedCategorySlug,
}) => {
  if (!selectedSubmission || !questionsData) return null;

  return (
    <div className="submission-answers">
      {/* Contenu de l'onglet actif */}
      {questionsData
        .filter((category) => category.slug === selectedCategorySlug)
        .map((category) => {
          const categoryInfo = categories.find((c) => c.key === category.slug);

          return (
            <div key={category.slug} className="submission-answers__category">
              <h3 className="submission-answers__category-title">
                {categoryInfo?.label}
              </h3>

              <ul className="submission-answers__question-list">
                {category.questions.map((question, index) => {
                  const answerKey = `${category.slug}-${index + 1}`;
                  const selectedScore = parseInt(
                    selectedSubmission.scores.answersByCategory?.[
                      category.slug
                    ]?.[answerKey]
                  );
                  const selectedOption = isNaN(selectedScore)
                    ? null
                    : question.options?.find(
                        (option) => option.score === selectedScore
                      );

                  return (
                    <li
                      key={question.id}
                      className="submission-answers__question-item"
                    >
                      <p className="submission-answers__question-text">
                        {question.question}
                      </p>
                      <p className="submission-answers__answer-text">
                        {selectedOption
                          ? `${selectedOption.text}`
                          : "Non répondu"}
                      </p>
                      <span className="submission-answers__answer-score">
                        {selectedOption?.score}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default SubmissionAnswers;
