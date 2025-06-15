import "./ContactForm.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik"; // Added Field
import React, { useContext } from "react";

import tardis from "../../../images/tardis.png";
import { useAddDoc } from "../../../hooks/use-firebase";
import { useScores } from "../../../contexts/ScoreContext";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Votre prénom est requis"),
  lastName: Yup.string().required("Votre nom est requis"),
  email: Yup.string().email("Email invalide").required("Email est requis"),
});
export default function ContactForm() {
  // get the score from the context if needed
  const { scores } = useScores();

  const { addDocument } = useAddDoc("submissions");
  return (
    <div className="ContactFormRefonte">
      <div className="row">
        <div className="col-md-6 position-relative">
          <h2 className="h3">Analyse terminée !</h2>
          <div className="divider mb-4"></div>
          <h3 className="h1">Recevez votre résulat par mail</h3>
          <img src={tardis} alt="Tardis" />
        </div>
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const submissionData = {
                ...values,
                scores: scores, // Include scores from context
              };
              addDocument(submissionData)
                .then(() => {
                  console.log("Submission successful");
                  resetForm(); // Reset the form after successful submission
                })
                .catch((error) => {
                  console.error("Error submitting form:", error);
                })
                .finally(() => {
                  setSubmitting(false); // Set submitting to false after operation
                });
            }}
          >
            {(
              { isSubmitting, errors, touched } // Added errors and touched for aria-invalid
            ) => (
              <Form>
                <div className="form-group mb-4">
                  <label htmlFor="firstName">Prénom</label>
                  <Field
                    type="text"
                    id="firstName" // Added id
                    name="firstName"
                    className="form-control"
                    aria-invalid={touched.firstName && !!errors.firstName} // Added aria-invalid
                    aria-describedby="firstNameError" // Added aria-describedby
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    id="firstNameError" // Added id for aria-describedby
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="lastName">Nom</label>
                  <Field
                    type="text"
                    id="lastName" // Added id
                    name="lastName"
                    className="form-control"
                    aria-invalid={touched.lastName && !!errors.lastName} // Added aria-invalid
                    aria-describedby="lastNameError" // Added aria-describedby
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    id="lastNameError" // Added id for aria-describedby
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email" // Added id
                    name="email"
                    className="form-control"
                    aria-invalid={touched.email && !!errors.email} // Added aria-invalid
                    aria-describedby="emailError" // Added aria-describedby
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    id="emailError" // Added id for aria-describedby
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-white"
                  disabled={isSubmitting} // Disable button during Formik's submission or React Query's mutation loading state
                >
                  Envoyer
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
