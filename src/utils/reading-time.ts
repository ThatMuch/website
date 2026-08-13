const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time in minutes from an HTML string.
 * @param html The HTML content to estimate.
 * @returns The estimated reading time in minutes (minimum 1).
 */
export const getReadingTime = (html?: string | null): number => {
  if (!html) return 0;
  const text = html.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount === 0) return 0;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
};
