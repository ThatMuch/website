import React, { useState } from "react";
import { useFetchFirebase } from "../../hooks/use-firebase";
import questionsData from "../../data/questionquiz.json";
import HeroSection from "../../components/AdminStats/HeroSection/HeroSection";
import CategorySelector from "../../components/AdminStats/CategorySelector/CategorySelector";
import QuestionStats from "../../components/AdminStats/QuestionStats/QuestionStats";
import SubmissionListTable from "../../components/AdminStats/SubmissionListTable/SubmissionListTable";
import {
  getMaxScoreByCategory,
  computeCategoryStats,
  computeGlobalScoreStats,
} from "../../components/AdminStats/utils/quizStatsUtils";

/**
 * Composant principal d'administration des statistiques du quiz.
 */
const AdminStats = () => {
  const [isGlobalStat, setGlobalStat] = useState(true); // true par défaut ?
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(
    questionsData[0]?.slug || null
  );

  const { data, isLoading, errorMessage } = useFetchFirebase("submissions");
  const submissions = data || [];

  const maxScorePerCategory = getMaxScoreByCategory(questionsData);
  const categoryStats = computeCategoryStats(submissions, questionsData);
  const { totalSubmissions, totalGlobalScore, averageGlobalScore } =
    computeGlobalScoreStats(submissions);

  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
  };

  const selectedCategory = questionsData.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <div className="bg-landing">
      <HeroSection isGlobalStat={isGlobalStat} onToggle={setGlobalStat} />

      {/* Vue globale */}
      {isGlobalStat && (
        <>
          <CategorySelector
            totalSubmissions={totalSubmissions}
            averageGlobalScore={averageGlobalScore.toFixed(0)}
            categories={categoryStats}
            selectedSlug={selectedCategorySlug}
            onSelect={handleCategoryClick}
          />

          {selectedCategory && (
            <QuestionStats
              category={selectedCategory}
              submissions={submissions}
            />
          )}
        </>
      )}

      {/* Vue des soumissions individuelles */}
      {!isGlobalStat && <SubmissionListTable submissions={submissions} />}
    </div>
  );
};

export default AdminStats;
