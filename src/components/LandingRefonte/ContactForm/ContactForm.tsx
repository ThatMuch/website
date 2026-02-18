import "./ContactForm.scss";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik"; // Added Field
import React, { useContext } from "react";

import Button from "../../UI/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import tardis from "../../../images/tardis.webp";
import { useSubmitContactForm } from "../../../hooks/use-submit-contact-form";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  url: "",
  terms: false,
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Votre prénom est requis"),
  lastName: Yup.string().required("Votre nom est requis"),
  email: Yup.string().email("Email invalide").required("Email est requis"),
  url: Yup.string()
    .required("URL du site web est requise")
    .url("URL invalide")
    .notRequired(), // Optional URL field
  // terms: Yup.boolean
  terms: Yup.boolean().oneOf(
    [true],
    "Vous devez accepter les conditions d'utilisation"
  ), // Added validation for terms
});

const scoresSchema = Yup.object().shape({
  globalScore: Yup.number().required(),
  scoresByCategory: Yup.object().test(
    "is-category-scores",
    "Invalid category scores",
    (value) => {
      if (!value || typeof value !== "object") return false;
      return Object.values(value).every((val) => typeof val === "number");
    }
  ),
  answersByCategory: Yup.object().optional(),
});

const submissionDataSchema = Yup.object().shape({
  firstName: Yup.string().required("Votre prénom est requis"),
  lastName: Yup.string().required("Votre nom est requis"),
  email: Yup.string().email("Email invalide").required("Email est requis"),
  url: Yup.string()
    .required("URL du site web est requise")
    .url("URL invalide"),
  scores: scoresSchema.required(),
});

export default function ContactForm() {
  const { handleSubmit, isSend, setIsSend, emailSent } = useSubmitContactForm();

  const { addDocument } = useAddDoc(
    process.env.GATSBY_FIREBASE_COLLECTION_SUBMISSIONS || "submissions",
    submissionDataSchema
  );
  const { sendContact } = useSendContactBrevo([5]);
  const [isSend, setIsSend] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState("");
  return (
    <div className="ContactFormRefonte">
      <div className="row">
        <div className="col-md-6 position-relative">
          <h2 className="h3">Analyse terminée !</h2>
          <div className="divider mb-4"></div>
          <h3 className="h1">Recevez votre résulat par mail</h3>
          <LazyLoadImage src={tardis} alt="Tardis" />
        </div>
        <div className="col-md-6">
          {!isSend ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(
                { isSubmitting, errors, touched, values } // Added errors and touched for aria-invalid
              ) => (
                <Form
                  id="contact-form-refonte-siteweb"
                  role="form"
                  aria-labelledby="contact-form-refonte-siteweb-title"
                  aria-describedby="contact-form-refonte-siteweb-description"
                  aria-label="Formulaire de contact pour l'analyse de site web"
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <div className="form-group mb-4 w-100">
                    <label htmlFor="url">URL du site web</label>
                    <Field
                      type="url"
                      id="url"
                      name="url"
                      className="form-control"
                      aria-invalid={touched.url && !!errors.url} // Added aria-invalid
                      aria-describedby="urlError" // Added aria-describedby
                    />
                    <ErrorMessage
                      name="url"
                      component="div"
                      id="urlError" // Added id for aria-describedby
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-4 w-100">
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
                  <div className="form-group mb-4 w-100">
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
                  <div className="form-group mb-4 w-100">
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
                  <div className="form-group mb-4 w-100">
                    <div className="d-flex gap-2">
                      <Field
                        type="checkbox"
                        name="terms"
                        className="form-check-input"
                        id="terms"
                        aria-label="Accepter les conditions d'utilisation" // Added aria-label
                      />
                      <label htmlFor="terms" className="form-check-label ">
                        <small>
                          J'accepte que{" "}
                          <span className="uppercase">Thatmuch</span> collecte
                          mes données selon sa{" "}
                          <a
                            href="/politique-de-confidentialite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-underline"
                          >
                            politique de confidentialité.
                          </a>
                        </small>
                      </label>
                    </div>

                    <ErrorMessage
                      name="terms"
                      component="div"
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
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className="badge badge-success">
                <MdOutlineMarkEmailUnread className="icon" />
              </span>
              <p className="text-center mt-3">
                L’analyse de votre site web vous attend dans votre boîte mail à
                l'adresse <strong>{emailSent}</strong>. Pensez à vérifier vos
                spams si vous ne le voyez pas dans votre boîte de réception.
              </p>
              <Button
                type="button"
                onClick={() => setIsSend(false)}
                label="Refaire une analyse"
                className="btn btn-white mt-3"
              >
                Renvoyer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
