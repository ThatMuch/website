import React, { useMemo, useState } from "react";

import ClickSpark from "../../components/ClickSpark/ClickSpark";
import  FormContainer  from '../../components/LandingRefonte/Form/FormContainer/FormContainer';
import FormStepper from '../../components/LandingRefonte/Form/FormStepper/FormStepper';
import {HeroSection} from '../../components/LandingRefonte/Landing/HeroSection/HeroSection';
import data from "../../data/questionquiz.json";

const RefonteForm = () => {
	  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	  const categories = useMemo(() => {
		// Récupération des catégories à partir des questions
		const uniqueCategories = new Set(data.map((q) => q));
		return Array.from(uniqueCategories).map((item) => ({
		  name: item.category,
		  slug: item.slug,
		}));
	  },[]);

	return (
		<ClickSpark
		sparkColor="#1e1244"
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
			  <FormStepper
          categories={categories}
          currentCategoryIndex={currentCategoryIndex}
			  />
			  <FormContainer
          currentCategoryIndex={currentCategoryIndex}
          categories={categories}
						setCurrentCategoryIndex={setCurrentCategoryIndex}
				  data={data}
			  />
      </div>
      <div className="d-flex justify-content-center p-2 bg-dark mt-5">
        <span className="uppercase">thatmuch</span>
      </div>
			</div>
		</ClickSpark>
  );
};

export default RefonteForm;
