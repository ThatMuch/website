// create a custom hook to use brevo
import { useCallback, useState } from "react";
import { formatBrevoContactData, sendBrevoContact } from "../utils/brevo-api";

export function useSendContactBrevo(listIds: number[]) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apikey = process.env.GATSBY_BREVO_API_KEY;
  const sendContact = useCallback(
    async (contactData) => {
      setLoading(true);
      //format the contactData to match Brevo's API requirements
      const formattedData = formatBrevoContactData(contactData, listIds);
      try {
        const response = await sendBrevoContact(apikey, formattedData);
        return response;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [listIds, apikey],
  );

  return { sendContact, loading, error };
}
