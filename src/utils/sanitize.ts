import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (dirty: string | undefined | null): string => {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty);
};
