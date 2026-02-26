import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceList from './ServiceList';

// Mock dependencies
jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('ServiceList', () => {
  const mockServices = [
    {
      titre: 'Service 1',
      desc: '<p>Description 1</p>',
      image: {
        node: {
          mediaItemUrl: 'http://example.com/image1.jpg',
          altText: 'Image 1',
        },
      },
    },
    {
      titre: 'Service 2',
      desc: '<script>alert("xss")</script><p>Description 2</p>',
      image: {
        node: {
          mediaItemUrl: 'http://example.com/image2.jpg',
          altText: 'Image 2',
        },
      },
    },
  ];

  it('renders services and sanitizes unsafe HTML', () => {
    const { container } = render(<ServiceList services={mockServices} />);

    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();

    // Check for safe HTML content
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();

    // Verify unsafe HTML is NOT present (after fix)
    // Note: in JSDOM scripts inserted via innerHTML do not execute, but the tag remains if not sanitized

    // Check if script tag exists in the HTML
    expect(container.innerHTML).not.toContain('<script>alert("xss")</script>');
  });
});
