const formatBrevoContactData = (contactData, listIds) => {
  return {
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
};

const sendBrevoContact = async (apikey, formattedData) => {
  const headers = {
    "Content-Type": "application/json",
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
    throw new Error("Failed to send contact");
  }
  return await response.json();
};

module.exports = {
  formatBrevoContactData,
  sendBrevoContact,
};
