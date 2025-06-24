import React from "react";

const SubmissionAnswers = ({ selectedSubmission, questionsData }) => {
  if (!selectedSubmission || !questionsData) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Réponses du questionnaire</h2>

      <div>
        {questionsData.map((category) => (
          <div key={category.slug} className="mb-6">
            <h3 className="text-lg font-bold text-primary mb-2">
              {category.category}
            </h3>

            <ul className="space-y-3">
              {category.questions.map((question, index) => {
                // Clé pour identifier la réponse dans answersByCategory
                const answerKey = `${category.slug}-${index + 1}`;

                // Score obtenu
                const selectedScore = parseInt(
                  selectedSubmission.scores.answersByCategory?.[
                    category.slug
                  ]?.[answerKey]
                );

                // Option correspondant au score
                const selectedOption = isNaN(selectedScore)
                  ? null
                  : question.options?.find(
                      (option) => option.score === selectedScore
                    );

                return (
                  <li key={question.id} className="border rounded p-3">
                    <p className="font-medium">{question.question}</p>
                    <p className="text-sm text-gray-600">
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
        ))}
      </div>
    </div>
  );
};

export default SubmissionAnswers;