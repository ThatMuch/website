import React from "react";
import CamembertChart from "../CamembertChart/CamembertChart";

const QuestionStats = ({ category, submissions }) => {
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

  return (
    <div >
      <h2 className="text-xl font-bold">{category.category}</h2>
      {category.questions.map((question) => {
        const optionStats = getOptionStats(question.id);

        const chartData = question.options.map((option) => ({
          name: option.text,
          value: optionStats[option.score] || 0,
        }));

        return (
          <div key={question.id}>
            <h3 className="font-semibold mb-2">{question.question}</h3>
            <CamembertChart data={chartData} />
          </div>
        );
      })}
    </div>
  );
};

export default QuestionStats;