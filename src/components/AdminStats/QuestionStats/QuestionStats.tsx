import React, { useState } from "react";

// Interface pour TypeScript
interface SelectedAnswer {
  questionId: string;
  optionScore: string;
  optionText: string;
  people: any[];
}
import CamembertChart from "../CamembertChart/CamembertChart";
import "./style.scss"

const QuestionStats = ({ category, submissions, onClick }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(null);

  if (!category) return null;

  // Récupère les réponses pour une question donnée
  const getOptionStats = (questionId) => {
    const counts = {};
    submissions.forEach((submission) => {
      const allAnswers =
        submission?.scores?.answersByCategory?.[category.slug] || {};
      const value = allAnswers?.[questionId];
      if (value !== undefined) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    return counts;
  };

  // Récupère la liste des personnes ayant donné une réponse spécifique
  const getPeopleByAnswer = (questionId, score) => {
    const result = submissions.filter((submission) => {
      const allAnswers = submission?.scores?.answersByCategory?.[category.slug] || {};
      const submissionScore = allAnswers?.[questionId];

      // Conversion pour comparer string avec number
      const match = String(submissionScore) === String(score);

      return match;
    });

    return result;
  };

  // Gère le clic sur une section du camembert
  const handleSectionClick = (questionId: string, optionScore: string, optionText: string) => {
    const people = getPeopleByAnswer(questionId, optionScore);
    const answerData: SelectedAnswer = {
      questionId,
      optionScore,
      optionText,
      people
    };
    setSelectedAnswer(answerData);
  };

  // Ferme la modal
  const closeModal = () => {
    setSelectedAnswer(null);
  };

  return (
    <div className="stat-questions-wrapper">
      <h2 className="text-xl font-bold title">{category.category}</h2>
      <div className="stat-questions-section">
        {category.questions.map((question) => {
          const optionStats = getOptionStats(question.id);
          const chartData = question.options.map((option) => ({
            name: option.text,
            value: optionStats[String(option.score)] || 0,
            score: String(option.score), // Convertir en string pour la cohérence
          }));

          return (
            <div key={question.id} className="question">
              <p className="font-semibold mb-2">{question.question}</p>
              <CamembertChart
                data={chartData}
                onSectionClick={(data) => handleSectionClick(question.id, data.score, data.name)}
              />
            </div>
          );
        })}
      </div>

      {/* Modal pour afficher la liste des personnes */}
      {selectedAnswer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Personnes ayant répondu : "{selectedAnswer.optionText}"</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {selectedAnswer.people.length > 0 ? (
                <ul className="people-list">
                  {selectedAnswer.people.map((person, index) => (
                    <li key={person.id || index} className="person-item">
                      <button onClick={() => onClick && onClick(person.id)} >
                        <span className="person-name">
                          {person.firstName} {person.lastName}
                        </span>
                      </button>

                      <span className="person-email">{person.email}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune personne n'a donné cette réponse.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionStats;