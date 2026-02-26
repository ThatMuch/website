import React from 'react';
import { render } from '@testing-library/react';
import FAQ from './Faq';
import { sanitizeHtml } from '../../../utils/sanitize';

// Mock the sanitize module
jest.mock('../../../utils/sanitize', () => ({
  sanitizeHtml: jest.fn((html) => html),
}));

describe('FAQ Component Performance', () => {
  it('calls sanitizeHtml only once on re-renders with same content (optimized)', () => {
    const sanitizeSpy = sanitizeHtml as jest.Mock;
    sanitizeSpy.mockClear();

    const { rerender } = render(<FAQ content="<p>Test</p>" index={0} />);

    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(<FAQ content="<p>Test</p>" index={0} />);

    // After optimization, it should NOT be called again
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Re-render with different props
    rerender(<FAQ content="<p>Test 2</p>" index={0} />);
    expect(sanitizeSpy).toHaveBeenCalledTimes(2);
  });
});
