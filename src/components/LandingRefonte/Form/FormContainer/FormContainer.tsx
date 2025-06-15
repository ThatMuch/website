import "./style.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useMemo, useState } from "react";

import Button from "../../../UI/Button/Button";
import FormQuestion from "./FormQuestion/FormQuestion";
import questionquiz from "../../../../data/questionquiz.json";

type Props = {};

export default function FormContainer({}: Props) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Catégorie actuelle
  const categories = useMemo(() => {
    // Récupération des catégories à partir des questions
    const uniqueCategories = new Set(questionquiz.map((q) => q));
    return Array.from(uniqueCategories).map((item) => ({
      name: item.category,
      slug: item.slug,
    }));
  }, []);
  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;

  const [scores, setScores] = useState({
    globalScore: 0,
    scoresByCategory: {
      ...categories.reduce((acc, category) => {
        acc[category.slug] = 0;
        return acc;
      }, {}),
    },
  });

  const handleScoreByCategory = (category, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      scoresByCategory: {
        ...prevScores.scoresByCategory,
        [category]: score,
      },
    }));
  };

  const handleAllScores = (values) => {
    let score: number = Object.values(values).reduce(
      (acc: number, val: unknown) => acc + (parseInt(val as string) || 0),
      0
    );

    const totalScore =
      Object.values(scores.scoresByCategory).reduce(
        (acc: number, val: unknown) => acc + (parseInt(val as string) || 0),
        0
      ) + score;
    // Mettre à jour le score global
    setScores((prevScores) => ({
      ...prevScores,
      globalScore: totalScore,
    }));
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const handleNext = (values) => {
    const score = Object.values(values).reduce(
      (acc: number, val) => acc + (parseInt(val as string) || 0),
      0
    );
    handleScoreByCategory(currentCategory.slug, score);
    setCurrentCategoryIndex((prev) => prev + 1);
  };

  const handleSubmit = (values) => {
    const score = Object.values(values).reduce(
      (acc: number, val) => acc + (parseInt(val as string) || 0),
      0
    );
    handleScoreByCategory(currentCategory.slug, score);
    handleAllScores(values);
    console.log(values);
  };

  // Gestion des touches clavier pour l'accessibilité
  const handleKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  // Initialisation des valeurs du formulaire et du schéma de validation
  const initialValues = {};
  const validationSchemaShape = {};

  questionquiz?.forEach((category) => {
    category.questions?.forEach((q) => {
      initialValues[q.id] = "";
      validationSchemaShape[q.id] = Yup.string().required(
        "Veuillez sélectionner une réponse"
      );
    });
  });

  const validationSchema = Yup.object().shape(validationSchemaShape);

  return (
    <div className="FormContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleNext}
        //enableReinitialize={true}
      >
        {({ errors, touched, values }) => (
          <Form role="form" aria-labelledby="quiz-title">
            {questionquiz[currentCategoryIndex]?.questions?.map((question) => (
              <FormQuestion
                item={question}
                key={question.id}
                errors={errors}
                touched={touched}
              />
            ))}
            <div
              className="quiz-navigation"
              role="navigation"
              aria-label="Navigation du quiz"
            >
              {currentCategoryIndex > 0 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, handlePrevious)
                  }
                  label="Revenir à la catégorie précédente"
                  className="btn btn-dev"
                >
                  Précédent
                </Button>
              )}
              {isLastCategory ? (
                <Button
                  type="submit"
                  onClick={() => handleSubmit(values)}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, handleSubmit)
                  }
                  label="Envoyer toutes les réponses"
                  className="btn btn-dev"
                >
                  Envoyer
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleNext(values)}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, () => handleNext(values))
                  }
                  label="Passer à la catégorie suivante"
                  className="btn btn-dev"
                >
                  Suivant
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
