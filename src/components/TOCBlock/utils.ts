export const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Enlever les caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .trim();
};
