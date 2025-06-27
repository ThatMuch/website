import React, { useState } from "react";
import { categories } from "../utils/categoryIcons";
import "./style.scss";
import Legend from "../Legend/Legend";

const SubmissionAnswers = ({ selectedSubmission, questionsData }) => {
  const [activeTab, setActiveTab] = useState(questionsData?.[0]?.slug || "");

  if (!selectedSubmission || !questionsData) return null;

  const handleTabClick = (slug) => {
    setActiveTab(slug);
  };

  return (
    <div className="submission-answers">
      {/* Onglets */}
      <Legend
        questionsData={questionsData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenu de l'onglet actif */}
      {questionsData
        .filter((category) => category.slug === activeTab)
        .map((category) => {
          const categoryInfo = categories.find((c) => c.key === category.slug);

          return (
            <div key={category.slug} className="submission-answers__category">
              <h3 className="submission-answers__category-title">
                {categoryInfo?.icon} {categoryInfo?.label || category.category}
              </h3>

              <ul className="submission-answers__question-list">
                {category.questions.map((question, index) => {
                  const answerKey = `${category.slug}-${index + 1}`;
                  const selectedScore = parseInt(
                    selectedSubmission.scores.answersByCategory?.[category.slug]?.[answerKey]
                  );
                  const selectedOption = isNaN(selectedScore)
                    ? null
                    : question.options?.find(
                      (option) => option.score === selectedScore
                    );

                  return (
                    <li key={question.id} className="submission-answers__question-item">
                      <p className="submission-answers__question-text">{question.question}</p>
                      <p className="submission-answers__answer-text">
                        Réponse :{" "}
                        {selectedOption
                          ? `${selectedOption.text} (score : ${selectedOption.score})`
                          : "Non répondu"}
                      </p>
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