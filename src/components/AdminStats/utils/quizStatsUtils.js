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

/**
 * Calcule diverses statistiques globales et mensuelles basées sur un tableau de soumissions.
 *
 * @param {Array<Object>} submissions - Un tableau d'objets de soumissions. Chaque objet de soumission
 * est attendu de contenir au moins une propriété `createdAt` (avec une méthode `toDate()`)
 * et une propriété `scores` qui contient `globalScore`.
 * Exemple attendu : `{ createdAt: { toDate: () => Date }, scores: { globalScore: Number } }`
 * @param {number} actualMonth - L'index du mois actuel (0 pour Janvier, 11 pour Décembre).
 * Typiquement obtenu via `new Date().getMonth()`.
 * @returns {Object} Un objet contenant les statistiques calculées :
 * @returns {number} returns.totalSubmissions - Le nombre total de soumissions dans le tableau `submissions`.
 * @returns {number} returns.totalGlobalScore - La somme de tous les `globalScore` de toutes les soumissions.
 * @returns {number} returns.averageGlobalScore - Le score global moyen de toutes les soumissions. Retourne 0 si `totalSubmissions` est 0.
 * @returns {number} returns.numberThisMonth - Le nombre de soumissions dont la date de création (`createdAt`) correspond au `actualMonth`.
 */
export const computeGlobalScoreStats = (submissions, actualMonth) => {
  const totalSubmissions = submissions.length;

  const totalGlobalScore = submissions.reduce(
    (acc, submission) => acc + (submission?.scores?.globalScore || 0),
    0
  );

  const submissionsThisMonth = submissions.filter((sub) => {
    // Vérifie que sub.createdAt existe et est un objet avec une méthode toDate
    if (!sub.createdAt || typeof sub.createdAt.toDate !== "function")
      return false;
    const date = sub.createdAt.toDate();
    return date.getMonth() === actualMonth;
  });

  const numberThisMonth = submissionsThisMonth.length;

  // Évite la division par zéro si aucune soumission n'est présente
  const averageGlobalScore = totalGlobalScore / totalSubmissions || 0;

  return {
    totalSubmissions,
    totalGlobalScore,
    averageGlobalScore,
    numberThisMonth,
  };
};
