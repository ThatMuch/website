import React from "react";
import { useFetchFirebase } from "../../hooks/use-firebase";
import GlobalAverageScore from "../../components/AdminStats/GlobalAverageScore/GlobalAverageScore";
import AveragesByCategory from "../../components/AdminStats/AveragesByCategory/AveragesByCategory";
//import data from "../../data/questionquiz.json";

const AdminStats = () => {
  const { data, isLoading, errorMessage, refetch } =
    useFetchFirebase("submissions-test");
  const responseCount = data.length;

  const { averages, globalAverageScore } = computeAverageScores(data);

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
          <GlobalAverageScore score={globalAverageScore}/>
          <AveragesByCategory averages={averages}/>
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

export default AdminStats;
