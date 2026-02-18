// create a custom hook to use brevo
import { useCallback, useEffect, useState } from "react";

export function useSendContactBrevo(listIds: number[]) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apikey = process.env.GATSBY_BREVO_API_KEY;
  const sendContact = useCallback(async (contactData) => {
    setLoading(true);
    //format the contactData to match Brevo's API requirements
    const formattedData = {
      email: contactData.email,
      attributes: {
        PRENOM: contactData.firstName,
        NOM: contactData.lastName,
        DESIGN: contactData.scores.scoresByCategory.design,
        MARKETING: contactData.scores.scoresByCategory.marketing,
        UX: contactData.scores.scoresByCategory.ux,
        SEO: contactData.scores.scoresByCategory.seo,
        PERFORMANCE: contactData.scores.scoresByCategory.performance,
        TECH: contactData.scores.scoresByCategory.technique,
        LEGAL: contactData.scores.scoresByCategory.legal,
        TOTAL: contactData.scores.globalScore,
      },
      updateEnabled: true,
      listIds: listIds,
    };
    console.log("Brevo API Key present:", !!apikey);
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "accept": "application/json",
      };
      if (apikey) {
        headers["api-key"] = apikey;
      }
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers,
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Brevo Error Response:", errorData);
        throw new Error(`Failed to send contact: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Brevo Fetch Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apikey, listIds]);

  return { sendContact, loading, error };
}
