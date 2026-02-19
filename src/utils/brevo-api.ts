export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  scores: {
    scoresByCategory: {
      design: number;
      marketing: number;
      ux: number;
      seo: number;
      performance: number;
      technique: number;
      legal: number;
    };
    globalScore: number;
  };
}

export async function sendContactToBrevo(
  contactData: ContactData,
  listIds: number[],
  apiKey: string | undefined
) {
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

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers["api-key"] = apiKey;
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    throw new Error("Failed to send contact");
  }

  return await response.json();
}
