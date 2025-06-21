
export const getMaxScoreByCategory = (questionsData) => {
  const result = {};

  questionsData.forEach((category) => {
    const slug = category.slug;

    const maxScore = category.questions.reduce((sum, question) => {
      const maxOptionScore = Math.max(
        ...question.options.map((opt) => opt.score)
      );
      return sum + maxOptionScore;
    }, 0);

    result[slug] = maxScore;
  });

  return result;
};

export const computeCategoryStats = (submissions, questionsData) => {
  const maxScorePerCategory = getMaxScoreByCategory(questionsData);

  return questionsData.map((category) => {
    const slug = category.slug;

    const totalScore = submissions.reduce((acc, submission) => {
      const score = submission?.scores?.scoresByCategory?.[slug] || 0;
      return acc + score;
    }, 0);

    const maxScorePerSubmission = maxScorePerCategory[slug];
    const maxPossibleScore = submissions.length * maxScorePerSubmission;

    const averageScore = totalScore / submissions.length || 0;

    const percentage = maxPossibleScore
      ? (totalScore / maxPossibleScore) * 100
      : 0;

    return {
      ...category,
      averageScore,
      totalScore,
      maxPossibleScore,
      percentage: Math.round(percentage),
    };
  });
};

export const computeGlobalScoreStats = (submissions) => {
  const totalSubmissions = submissions.length;

  const totalGlobalScore = submissions.reduce(
    (acc, submission) => acc + (submission?.scores?.globalScore || 0),
    0
  );

  const averageGlobalScore = totalGlobalScore / totalSubmissions || 0;

  return {
    totalSubmissions,
    totalGlobalScore,
    averageGlobalScore,
  };
};