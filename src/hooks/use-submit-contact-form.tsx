import { FormikHelpers } from "formik";
import { useState } from "react";
import { useScores } from "../contexts/ScoreContext";
import { useSendContactBrevo } from "./use-brev";
import { useAddDoc } from "./use-firebase";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  terms?: boolean; // terms might be optional in values if not handled by onSubmit except for validation
}

export function useSubmitContactForm(listIds: number[] = [5]) {
  const { scores } = useScores();
  const { addDocument } = useAddDoc(
    process.env.GATSBY_FIREBASE_COLLECTION_SUBMISSIONS || "submissions"
  );
  const { sendContact } = useSendContactBrevo(listIds);
  const [isSend, setIsSend] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const handleSubmit = (
    values: ContactFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
  ) => {
    const cleanValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      url: values.url,
    };
    const submissionData = {
      ...cleanValues,
      scores: scores,
    };
    sendContact(submissionData)
      .then(() => {
        console.log("Brevo submission successful");
      })
      .catch((error: any) => {
        console.error("Error submitting to Brevo:", error);
      });
    addDocument(submissionData)
      .then(() => {
        console.log("Submission successful");
        resetForm();
      })
      .catch((error: any) => {
        console.error(
          "Firebase addDocument error:",
          error,
          "Error details:",
          JSON.stringify(error, Object.getOwnPropertyNames(error))
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
    setEmailSent(values.email);
    setIsSend(true);
  };

  return { handleSubmit, isSend, setIsSend, emailSent };
}
