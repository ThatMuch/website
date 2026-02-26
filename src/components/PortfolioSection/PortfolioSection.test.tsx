import React from 'react';
import { render, screen } from '@testing-library/react';
import PortfolioSection from './PortfolioSection';
import '@testing-library/jest-dom';

const mockEmblaApi = {
  scrollSnapList: () => [],
  canScrollPrev: () => false,
  canScrollNext: () => false,
  selectedScrollSnap: () => 0,
  on: jest.fn(),
  off: jest.fn(),
};

// Chainable mocks
mockEmblaApi.on.mockReturnValue(mockEmblaApi);
mockEmblaApi.off.mockReturnValue(mockEmblaApi);

// Mock Embla Carousel
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [jest.fn(), mockEmblaApi],
}));

// Mock Gatsby Plugin Image
jest.mock('gatsby-plugin-image', () => ({
  GatsbyImage: jest.fn(({ image, alt, className }) => (
    <div data-testid="gatsby-image" className={className}>
      Mock Gatsby Image: {alt}
    </div>
  )),
  getImage: jest.fn((localFile) => {
    return localFile?.childImageSharp?.gatsbyImageData;
  }),
}));

const mockSection = {
  title: 'Test Title',
  sousTitre: 'Test Subtitle',
  description: '<p>Test Description</p>',
  project: [
    {
      client: 'Client 1',
      url: 'http://example.com/1',
      images: {
        node: {
          mediaItemUrl: 'http://example.com/image1.jpg',
          localFile: {
            childImageSharp: {
              gatsbyImageData: {
                width: 600,
                height: 400,
                fallback: 'http://example.com/gatsby-image1.jpg'
              },
            },
          },
        },
      },
      title: 'Project 1',
      description: '<p>Project 1 Description</p>',
    },
    {
      client: 'Client 2',
      url: 'http://example.com/2',
      images: {
        node: {
          mediaItemUrl: 'http://example.com/image2.jpg',
        },
      },
      title: 'Project 2',
      description: '<p>Project 2 Description</p>',
    },
  ],
};

// We need to cast the mock section to any because the component doesn't expect localFile yet
const sectionProps: any = mockSection;

describe('PortfolioSection', () => {
  it('renders projects', () => {
     render(<PortfolioSection section={sectionProps} />);
     expect(screen.getByText('Project 1')).toBeInTheDocument();
     expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  it('renders GatsbyImage when localFile is available', () => {
    render(<PortfolioSection section={sectionProps} />);

    // Project 1 should use GatsbyImage
    const gatsbyImage = screen.getByTestId('gatsby-image');
    expect(gatsbyImage).toBeInTheDocument();
    expect(gatsbyImage).toHaveTextContent('Mock Gatsby Image: Project 1');
  });

  it('falls back to img tag when localFile is missing', () => {
    render(<PortfolioSection section={sectionProps} />);

    // Project 2 should use regular img
    // We look for img with src matching the mediaItemUrl
    const images = screen.getAllByRole('img');
    const project2Img = images.find(img => img.getAttribute('src') === 'http://example.com/image2.jpg');

    expect(project2Img).toBeInTheDocument();
    expect(project2Img).toHaveAttribute('alt', 'Project 2');
  });
});
