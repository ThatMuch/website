import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes an HTML string using DOMPurify.
 * @param html The HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html);
};
