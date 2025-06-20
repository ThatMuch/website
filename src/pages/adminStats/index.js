import React, { useState } from "react";
import { useFetchFirebase } from "../../hooks/use-firebase";
import questionsData from "../../data/questionquiz.json";
import CategorySelector from "../../components/AdminStats/CategorySelector/CategorySelector";
import QuestionStats from "../../components/AdminStats/QuestionStats/QuestionStats";

/**
 * Composant principal d'administration des statistiques du quiz.
 */
const AdminStats = () => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);

  // Récupération des soumissions depuis Firebase
  const { data, isLoading, errorMessage } = useFetchFirebase("submissions");

  const submissions = data || [];

  // Calcul des statistiques par catégorie
  const categoryStats = questionsData.map((category) => {
    const slug = category.slug;

    // Score total obtenu pour cette catégorie dans toutes les soumissions
    const totalScore = submissions.reduce((acc, submission) => {
      const score = submission?.scores?.scoresByCategory?.[slug] || 0;
      return acc + score;
    }, 0);

    // Score maximum possible pour une seule soumission dans cette catégorie
    const maxScorePerSubmission = category.questions.reduce(
      (maxSum, question) => {
        const maxOptionScore = Math.max(
          ...question.options.map((opt) => opt.score)
        );
        return maxSum + maxOptionScore;
      },
      0
    );

    // Score maximum possible global pour cette catégorie
    const maxPossibleScore = submissions.length * maxScorePerSubmission;

    const averageScore = totalScore / submissions.length || 0;

    // Pourcentage de réussite dans cette catégorie
    const percentage = maxPossibleScore
      ? (totalScore / maxPossibleScore) * 100
      : 0;

    return {
      ...category,
      averageScore,
      totalScore,
      maxPossibleScore,
      percentage: Math.round(percentage), // arrondi à l'entier
    };
  });

  // Statistiques globales tous quiz confondus
  const totalSubmissions = submissions.length;

  const totalGlobalScore = submissions.reduce(
    (acc, submission) => acc + (submission?.scores?.globalScore || 0),
    0
  );
  
  const averageGlobalScore = totalGlobalScore / totalSubmissions || 0;

  // Gère la sélection d'une catégorie via le composant CategorySelector
  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
  };

  // Récupère la catégorie sélectionnée depuis les données de base
  const selectedCategory = questionsData.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <div className="bg-landing">
      <h1 className="text-2xl font-bold">Statistiques des réponses</h1>
      
      {/* Affichage du nombre de réponses et du score global moyen */}
      <p>Total de réponses : {totalSubmissions}</p>
      <p>Score global moyen : {averageGlobalScore.toFixed(2)}</p>

      {/* Sélecteur de catégories avec leurs statistiques */}
      <CategorySelector
        categories={categoryStats}
        selectedSlug={selectedCategorySlug}
        onSelect={handleCategoryClick}
      />

      {/* Affichage des statistiques détaillées pour la catégorie sélectionnée */}
      {selectedCategory && (
        <QuestionStats category={selectedCategory} submissions={submissions} />
      )}
    </div>
  );
};

export default AdminStats;