export const addContact = (nom, prenom, email) => fetch(process.env.BREVO_URL, {
  method: "POST",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: email,
    attributes: {
      PRENOM: prenom,
      NOM: nom,
      DESIGN: 12,
      MARKETING: 7,
      UX: 13,
      SEO: 6,
      PERFORMANCE: 10,
      TECH: 9,
      LEGAL: 17,
      TOTAL: 50
    },
    updateEnabled: true,
    listIds: [6]
  })
});
