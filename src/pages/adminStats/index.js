import React, { useEffect } from "react";
import { useFetchFirebase } from "../../hooks/use-firebase";
import GlobalAverageScore from "../../components/AdminStats/GlobalAverageScore/GlobalAverageScore";
import AveragesByCategory from "../../components/AdminStats/AveragesByCategory/AveragesByCategory";
import questionsData from "../../data/questionquiz.json";

const AdminStats = () => {
  const { data, isLoading, errorMessage, refetch } =
    useFetchFirebase("submissions");
  const responseCount = data.length;

  const { averages, globalAverageScore } = computeAverageScores(data);
  const result = computeAverageScoresByQuestion(data, questionsData);
  console.log("Moyennes par question :", result);

  console.log(data);
  return (
    <div>
      <h1>Test de Fetch Firebase</h1>

      {isLoading && <p>Chargement...</p>}

      {errorMessage && <p>Erreur : {errorMessage}</p>}

      {!isLoading && responseCount === 0 && <p>Aucun document trouvé.</p>}

      {!isLoading && responseCount > 0 && (
        <>
          <p>{formatResponseLabel(responseCount)}</p>
          <GlobalAverageScore score={globalAverageScore} />
          <AveragesByCategory averages={averages} />

          <h2>Moyennes par question :</h2>
          <ul>
            {result.map(({ questionKey, questionLabel, averageScore }) => (
              <li key={questionKey}>
                <strong>{questionLabel}</strong> ({questionKey}) :{" "}
                {averageScore.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={refetch}>Recharger</button>
    </div>
  );
};

function formatResponseLabel(count) {
  return `${count} réponse${count > 1 ? "s" : ""} soumise${
    count > 1 ? "s" : ""
  } au test`;
}

function computeAverageScores(data) {
  const categorySums = {};
  const categoryCounts = {};
  let globalScoreSum = 0;

  data.forEach((entry) => {
    console.log(entry.scores.answersByCategory);
    const scores = entry.scores.scoresByCategory || {};
    const globalScore = entry.scores.globalScore || 0;

    globalScoreSum += globalScore;

    // Moyennes par catégorie
    Object.entries(scores).forEach(([category, score]) => {
      if (!categorySums[category]) {
        categorySums[category] = 0;
        categoryCounts[category] = 0;
      }
      categorySums[category] += score;
      categoryCounts[category] += 1;
    });
  });

  const averages = {};
  Object.entries(categorySums).forEach(([category, total]) => {
    averages[category] = total / categoryCounts[category];
  });

  // Moyenne global
  const globalAverageScore = data.length > 0 ? globalScoreSum / data.length : 0;

  return { averages, globalAverageScore };
}

function computeAverageScoresByQuestion(data, questionsData) {
  const questionSums = {};
  const questionCounts = {};

  data.forEach((entry) => {
    const answers = entry.scores.answersByCategory || {};

    Object.entries(answers).forEach(([category, questions]) => {
      Object.entries(questions).forEach(([questionKey, scoreStr]) => {
        const score = parseInt(scoreStr, 10);

        if (!questionSums[questionKey]) {
          questionSums[questionKey] = 0;
          questionCounts[questionKey] = 0;
        }

        questionSums[questionKey] += score;
        questionCounts[questionKey] += 1;
      });
    });
  });

  const results = Object.entries(questionSums).map(([questionKey, total]) => {
    const averageScore = total / questionCounts[questionKey];
    const questionLabel = getQuestionById(questionKey, questionsData);
    return {
      questionKey,
      questionLabel,
      averageScore,
    };
  });

  return results;
}

function getQuestionById(questionId, allCategories) {
  for (const category of allCategories) {
    for (const question of category.questions) {
      if (question.id === questionId) {
        return question.question;
      }
    }
  }
  return questionId;
}

export default AdminStats;
