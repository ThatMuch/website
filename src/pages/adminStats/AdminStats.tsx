import React, { useState } from "react";
import {
  computeCategoryStats,
  computeGlobalScoreStats,
  getMaxScoreByCategory,
} from "../../components/AdminStats/utils/quizStatsUtils";

import CategoryDisplayReadOnly from "../../components/AdminStats/CategorySelector/CategoryDisplauReadOnly";
import CategorySelector from "../../components/AdminStats/CategorySelector/CategorySelector";
import HeroSection from "../../components/AdminStats/HeroSection/HeroSection";
import QuestionStats from "../../components/AdminStats/QuestionStats/QuestionStats";
import SubmissionAnswers from "../../components/AdminStats/SubmissionAnswers/SubmissionAnswers";
import SubmissionListTable from "../../components/AdminStats/SubmissionListTable/SubmissionListTable";
import questionsData from "../../data/questionquiz.json";
import { useFetchFirebase } from "../../hooks/use-firebase";

/**
 * Composant principal d'administration des statistiques du quiz.
 */
const AdminStats = () => {
  const currentMonth = new Date().getMonth();
  //const currentMonth = 4;
  const [isGlobalStat, setGlobalStat] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(
    questionsData[0]?.slug || null
  );
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // données de la bdd
  const { data, isLoading, errorMessage } =
    useFetchFirebase("submissions-test");
  const submissions = data || [];

  const maxScorePerCategory = getMaxScoreByCategory(questionsData);
  const categoryStats = computeCategoryStats(submissions, questionsData);
  const {
    totalSubmissions,
    totalGlobalScore,
    averageGlobalScore,
    numberThisMonth,
  } = computeGlobalScoreStats(submissions, currentMonth);

  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
  };

  const selectedCategory = questionsData.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <div className="bg-landing">
      <div className="">
        <HeroSection
          isGlobalStat={isGlobalStat}
          onToggle={setGlobalStat}
          responseCount={totalSubmissions}
          responseThisMonth={numberThisMonth}
          average={averageGlobalScore.toFixed(0)}
        />

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
                onClick={(id) => {
                  const selected = submissions.find((s) => s.id === id);
                  setSelectedSubmission(selected);
                  setGlobalStat(false);
                }}
              />
            )}
          </>
        )}

        {/* Vue des soumissions individuelles */}
        {!isGlobalStat && (
          <SubmissionListTable
            submissions={submissions}
            onClick={(id) => {
              const selected = submissions.find((s) => s.id === id);
              setSelectedSubmission(selected);
            }}
          />
        )}
        {!isGlobalStat && selectedSubmission && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-1">
              Détail des scores de {selectedSubmission.firstName}{" "}
              {selectedSubmission.lastName}
            </h2>
            <CategoryDisplayReadOnly
              categories={computeCategoryStats(
                selectedSubmission ? [selectedSubmission] : [],
                questionsData
              )}
              globalScore={selectedSubmission.scores.globalScore}
            />
            <SubmissionAnswers
              selectedSubmission={selectedSubmission}
              questionsData={questionsData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
