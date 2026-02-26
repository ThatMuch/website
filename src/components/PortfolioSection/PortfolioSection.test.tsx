import React from 'react';
import { render } from '@testing-library/react';
import PortfolioSection from './PortfolioSection';
import { sanitizeHtml } from '../../utils/sanitize';

// Mock EmblaCarousel to just render children
jest.mock('../EmblaCarousel/EmblaCarousel', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

// Mock sanitizeHtml
jest.mock('../../utils/sanitize', () => ({
  sanitizeHtml: jest.fn((html) => html),
}));

describe('PortfolioSection', () => {
  const mockSection = {
    title: 'Test Title',
    sousTitre: 'Test Subtitle',
    description: '<p>Test Description</p>',
    project: [
      {
        client: 'Test Client',
        url: 'http://example.com',
        images: {
          node: {
            mediaItemUrl: 'http://example.com/image.jpg',
          },
        },
        title: 'Project Title',
        description: '<p>Project Description</p>',
      },
    ],
  };

  it('renders without crashing and calls sanitizeHtml on descriptions', () => {
    render(<PortfolioSection section={mockSection} />);

    expect(sanitizeHtml).toHaveBeenCalledWith(mockSection.description);
    expect(sanitizeHtml).toHaveBeenCalledWith(mockSection.project[0].description);
  });
});
