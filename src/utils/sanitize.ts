import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string using DOMPurify.
 * @param html The HTML string to sanitize.
 * @returns The sanitized HTML string.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  if (typeof window === 'undefined') {
    return html;
  }
  return DOMPurify.sanitize(html);
};
