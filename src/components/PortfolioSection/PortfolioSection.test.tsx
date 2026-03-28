import React from 'react';
import { render } from '@testing-library/react';
import PortfolioSection from './PortfolioSection';


// Mock EmblaCarousel to just render children
jest.mock('../EmblaCarousel/EmblaCarousel', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

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

  it('renders without crashing', () => {
    const { getByText } = render(<PortfolioSection section={mockSection} />);
    expect(getByText('Test Title')).toBeTruthy();
  });
});
