// create a custom hook to use brevo
import { useCallback, useState } from "react";
import { sendContactToBrevo } from "../utils/brevo-api";

export function useSendContactBrevo(listIds: number[]) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apikey = process.env.GATSBY_BREVO_API_KEY;
  const sendContact = useCallback(async (contactData) => {
    setLoading(true);

    try {
      const response = await sendContactToBrevo(contactData, listIds, apikey);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendContact, loading, error };
}
