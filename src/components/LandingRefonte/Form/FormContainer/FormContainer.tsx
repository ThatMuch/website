import "./style.scss";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useState } from "react";

import Button from "../../../UI/Button/Button";
import FormQuestion from "./FormQuestion/FormQuestion";

type Props = {
  currentCategoryIndex: number;
  categories: { name: string; slug: string }[];
  setCurrentCategoryIndex: (index: number) => void;
  data: any;
};

export default function FormContainer({
  currentCategoryIndex,
  categories,
  setCurrentCategoryIndex,
  data,
}: Props) {
  const [showErrors, setShowErrors] = useState(false);
  const [scores, setScores] = useState({
    globalScore: 0,
    scoresByCategory: {
      ...categories.reduce((acc, category) => {
        acc[category.slug] = 0;
        return acc;
      }, {}),
    },
  });
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const currentCategory = categories[currentCategoryIndex];

  const handleScoreByCategory = (category, score) => {
    console.log("handleScoreByCategory: ", score);
    setScores((prevScores) => ({
      ...prevScores,
      scoresByCategory: {
        ...prevScores.scoresByCategory,
        [category]: score,
      },
    }));
  };

  const handleAllScores = (values) => {
    const currentCategoryValues = data[currentCategoryIndex]?.questions?.reduce(
      (acc, question) => {
        acc[question.id] = values[question.id];
        return acc;
      },
      {}
    );
    let score: number = Object.values(currentCategoryValues).reduce(
      (acc: number, val: unknown) => acc + (parseInt(val as string) || 0),
      0
    );

    const totalScore =
      Object.values(scores.scoresByCategory).reduce(
        (acc: number, val: unknown) => acc + (parseInt(val as string) || 0),
        0
      ) + score;
    console.log("handleAllScores: ", totalScore);
    // Mettre à jour le score global
    setScores((prevScores) => ({
      ...prevScores,
      globalScore: totalScore,
    }));
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleNext = (values, errors, dirty) => {
    // setShowErrors(false);
    // const currentCategoryValues = data[currentCategoryIndex]?.questions?.reduce(
    //   (acc, question) => {
    //     acc[question.id] = values[question.id];
    //     return acc;
    //   },
    //   {}
    // );

    // if (
    //   Object.values(currentCategoryValues).some(
    //     (value) => value === "" || value === undefined
    //   ) ||
    //   Object.keys(errors).length > 0
    // ) {
    //   setShowErrors(true);
    //   return;
    // }
    const currentCategoryValues = data[currentCategoryIndex]?.questions?.reduce(
      (acc, question) => {
        acc[question.id] = values[question.id];
        return acc;
      },
      {}
    );

    const score = Object.values(currentCategoryValues).reduce(
      (acc: number, val) => acc + (parseInt(val as string) || 0),
      0
    );
    handleScoreByCategory(currentCategory.slug, score);
    setCurrentCategoryIndex(currentCategoryIndex + 1);
  };

  const handleSubmit = (values) => {
    const currentCategoryValues = data[currentCategoryIndex]?.questions?.reduce(
      (acc, question) => {
        acc[question.id] = values[question.id];
        return acc;
      },
      {}
    );
    const score = Object.values(currentCategoryValues).reduce(
      (acc: number, val) => acc + (parseInt(val as string) || 0),
      0
    );
    handleScoreByCategory(currentCategory.slug, score);
    handleAllScores(values);
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
    const currentCategoryValues = data[currentCategoryIndex]?.questions?.reduce(
      (acc, question) => {
        acc[question.id] = values[question.id];
        return acc;
      },
      {}
    );

    if (
      Object.values(currentCategoryValues).some(
        (value) => value === "" || value === undefined
      ) ||
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

  data[currentCategoryIndex]?.questions?.forEach((q) => {
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
            {data[currentCategoryIndex]?.questions?.map((question) => (
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
                    handleKeyDown(e, handleSubmit)
                  }
                  label="Envoyer toutes les réponses"
                  className="btn btn-success ml-auto"
                >
                  Envoyer
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleNext(values, errors, dirty)}
                  disabled={handleDisableNext(values, errors)}
                  onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown(e, () => handleNext(values, errors, dirty))
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
