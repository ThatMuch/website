import "./style.scss";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "../../../UI/Button/Button";
import FormQuestion from "./FormQuestion/FormQuestion";
import { useScores } from "../../../../contexts/ScoreContext"; // Adjust path as needed

type Props = {
  currentCategoryIndex: number;
  categories: { name: string; slug: string }[];
  setCurrentCategoryIndex: (index: number) => void;
  data: any;
  setIsFinished: (isFinished: boolean) => void;
};

export default function FormContainer({
  currentCategoryIndex,
  categories,
  setCurrentCategoryIndex,
  data,
  setIsFinished,
}: Props) {
  const { updateScoreByCategory, calculateAndSetGlobalScore } = useScores();
  const [showErrors, setShowErrors] = useState(false);
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const currentCategory = categories[currentCategoryIndex];
  const currentCategoryData = data[currentCategoryIndex];

  // Helper function to calculate score for the current category based on form values
  const calculateCurrentCategoryScore = (formValues: any) => {
    const currentQuestions = currentCategoryData?.questions;
    if (!currentQuestions || !formValues) return 0;

    const currentCategoryFormValues = currentQuestions.reduce(
      (acc, question) => {
        acc[question.id] = formValues[question.id];
        return acc;
      },
      {}
    );
    return Object.values(currentCategoryFormValues).reduce(
      (sum: number, val: unknown) => sum + (parseInt(val as string) || 0),
      0
    );
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleNext = (formValues) => {
    // Potentially validate current category fields before proceeding
    // For now, assuming Formik's validation handles this via the disabled state of the button

    const score = calculateCurrentCategoryScore(formValues);
    updateScoreByCategory(currentCategory.slug, score);
    setCurrentCategoryIndex(currentCategoryIndex + 1);
  };

  const handleSubmit = (formValues) => {
    // Ensure validation passes for the last step (Formik handles this by default on submit)
    const score = calculateCurrentCategoryScore(formValues);
    updateScoreByCategory(currentCategory.slug, score);

    // After updating the last category's score, calculate the global score
    calculateAndSetGlobalScore();

    setIsFinished(true);
  };

  // Gestion des touches clavier pour l'accessibilité
  const handleKeyDown = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  const handleDisableNext = (values, errors) => {
    // if values of current category are empty disable next button
    const currentQuestions = currentCategoryData?.questions;
    if (!currentQuestions) return true; // No questions, disable

    const currentCategoryFormValues = currentQuestions.reduce(
      (acc, question) => {
        acc[question.id] = values[question.id] ?? ""; // Use empty string for undefined
        return acc;
      },
      {}
    );

    if (
      Object.values(currentCategoryFormValues).some((value) => value === "") ||
      Object.keys(errors).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Initialisation des valeurs du formulaire et du schéma de validation
  const initialValues = {};
  const validationSchemaShape = {};

  data?.forEach((category) => {
    category.questions?.forEach((q) => {
      initialValues[q.id] = "";
    });
  });

  currentCategoryData?.questions?.forEach((q) => {
    validationSchemaShape[q.id] = Yup.string().required(
      "Veuillez répondre à cette question"
    );
  });

  const validationSchema = Yup.object().shape(validationSchemaShape);

  return (
    <div className="FormContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        //enableReinitialize={true}
      >
        {({ errors, touched, values, dirty }) => (
          <Form role="form" aria-labelledby="quiz-title">
            {currentCategoryData?.questions?.map((question) => (
              <FormQuestion
                item={question}
                key={question.id}
                errors={errors}
                touched={touched}
                showErrors={showErrors}
              />
            ))}
            <div
              className="d-flex justify-content-between align-items-center mt-4"
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
                  className="btn btn-dev btn-outlined"
                >
                  Précédent
                </Button>
              )}
              {isLastCategory ? (
                <Button
                  type="submit"
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, () => handleSubmit(values))
                  }
                  label="Envoyer toutes les réponses"
                  className="btn btn-success ml-auto"
                >
                  Envoyer
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleNext(values)}
                  disabled={handleDisableNext(values, errors)}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, () => handleNext(values))
                  }
                  label="Passer à la catégorie suivante"
                  className="btn btn-dev ml-auto"
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
