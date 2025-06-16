import React, { useMemo, useState } from "react";

import ClickSpark from "../../components/ClickSpark/ClickSpark";
import ContactForm from "../../components/LandingRefonte/ContactForm/ContactForm";
import  FormContainer  from '../../components/LandingRefonte/Form/FormContainer/FormContainer';
import FormStepper from '../../components/LandingRefonte/Form/FormStepper/FormStepper';
import {HeroSection} from '../../components/LandingRefonte/Landing/HeroSection/HeroSection';
import { ScoreProvider } from '../../contexts/ScoreContext';
import Seo from "../../components/Seo";
import data from "../../data/questionquiz.json";

const RefonteForm = () => {
	const [currentCategoryIndex,setCurrentCategoryIndex] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	  const categories = useMemo(() => {
		// Récupération des catégories à partir des questions
		const uniqueCategories = new Set(data.map((q) => q));
		return Array.from(uniqueCategories).map((item) => ({
		  name: item.category,
		  slug: item.slug,
		}));
	  },[]);
	  const categoriesForProvider = categories.map((cat) => ({
      slug: cat.slug,
    }));

	return (
		<ScoreProvider initialCategories={categoriesForProvider}>
			<Seo
			title="Test de la refonte de site web"
			description="Faites le test et découvrez si c'est le bon moment pour refaire votre site internet."
			pathname="/analyse-refonte-site-web/refonte-form"
			/>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="bg-form">
          <div className="container-fluid">
            <HeroSection
              title={"Est-ce le moment de refaire mon site internet ?"}
              isLanding={false}
            />

            {!isFinished ? (
              <>
                <FormStepper
                  categories={categories}
                  currentCategoryIndex={currentCategoryIndex}
                />
                <FormContainer
                  currentCategoryIndex={currentCategoryIndex}
                  categories={categories}
                  setCurrentCategoryIndex={setCurrentCategoryIndex}
                  data={data}
                  setIsFinished={setIsFinished}
                />
              </>
            ) : (
              <ContactForm />
            )}
          </div>
          <div className="d-flex justify-content-center p-2 bg-dark mt-5">
            <span className="uppercase">thatmuch</span>
          </div>
        </div>
      </ClickSpark>
    </ScoreProvider>
  );
};

export default RefonteForm;
