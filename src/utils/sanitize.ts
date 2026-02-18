import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (content: string): string => {
  return DOMPurify.sanitize(content);
};
