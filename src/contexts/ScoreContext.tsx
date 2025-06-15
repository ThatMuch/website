import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// Define the shape of scores for each category
export interface CategoryScores {
  [categorySlug: string]: number;
}

export interface Answers {
  [questionId: string]: string; // Assuming answers can be strings or numbers
}

// Define the shape of the overall scores state
export interface ScoresState {
  globalScore: number;
  scoresByCategory: CategoryScores;
  answersByCategory?: {
    [categorySlug: string]: Answers; // Optional, if you want to track answers by category
  };
}

// Define the shape of the context value
export interface ScoreContextType {
  scores: ScoresState;
  updateScoreByCategory: (categorySlug: string, score: number) => void;
  calculateAndSetGlobalScore: () => void;
  resetScores: (categoriesForReset: { slug: string }[]) => void;
  setAnswersByCategory: (categorySlug: string, answers: Answers) => void;
}

// Create the context
// The undefined default is acceptable as we'll ensure Provider is always used.
export const ScoreContext = createContext<ScoreContextType | undefined>(
  undefined
);

// Custom hook for easy consumption of the ScoreContext
export const useScores = (): ScoreContextType => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScores must be used within a ScoreProvider");
  }
  return context;
};

// Props for the ScoreProvider
interface ScoreProviderProps {
  children: ReactNode;
  initialCategories: { slug: string }[]; // Used to initialize the structure of scoresByCategory
}

// Helper to generate initial scores state
const getInitialScoresState = (
  categories: { slug: string }[]
): ScoresState => ({
  globalScore: 0,
  scoresByCategory: categories.reduce((acc, category) => {
    acc[category.slug] = 0;
    return acc;
  }, {} as CategoryScores),
  answersByCategory: {},
});

// ScoreProvider component
export const ScoreProvider = ({
  children,
  initialCategories,
}: ScoreProviderProps) => {
  const [scores, setScores] = useState<ScoresState>(() =>
    getInitialScoresState(initialCategories)
  );

  const setAnswersByCategory = useCallback(
    (categorySlug: string, answers: Answers) => {
      setScores((prevScores) => ({
        ...prevScores,
        answersByCategory: {
          ...prevScores.answersByCategory,
          [categorySlug]: answers,
        },
      }));
    },
    []
  );
  const updateScoreByCategory = useCallback(
    (categorySlug: string, score: number) => {
      setScores((prevScores) => ({
        ...prevScores,
        scoresByCategory: {
          ...prevScores.scoresByCategory,
          [categorySlug]: score,
        },
      }));
    },
    []
  );

  const calculateAndSetGlobalScore = useCallback(() => {
    setScores((prevScores) => {
      const totalGlobalScore = Object.values(
        prevScores.scoresByCategory
      ).reduce((acc, categoryScore) => acc + (Number(categoryScore) || 0), 0);
      return {
        ...prevScores,
        globalScore: totalGlobalScore,
      };
    });
  }, []);

  const resetScores = useCallback((categoriesForReset: { slug: string }[]) => {
    setScores(getInitialScoresState(categoriesForReset));
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        scores,
        updateScoreByCategory,
        calculateAndSetGlobalScore,
        resetScores,
        setAnswersByCategory,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
