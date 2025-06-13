import  FormContainer  from '../../components/LandingRefonte/Form/FormContainer/FormContainer';
import {HeroSection} from '../../components/LandingRefonte/Landing/HeroSection/HeroSection';
import React from 'react';
import logo from "../../images/THATMUCH_Logo_White.png";

const RefonteForm = () => {
  return (
    <div className="bg-form">
      <div className="container-fluid">
        <HeroSection
          title={"Est-ce le moment de refaire mon site internet ?"}
          isLanding={false}
			  />
			  <FormContainer/>

      </div>
      <div className="d-flex justify-content-center p-2 bg-dark mt-5">
        <span className="uppercase">thatmuch</span>
      </div>
    </div>
  );
};

export default RefonteForm;
