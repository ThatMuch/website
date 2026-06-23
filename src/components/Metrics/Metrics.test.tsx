import React from 'react';
import { render, screen } from '@testing-library/react';
import Metrics from './Metrics';
import '@testing-library/jest-dom';

// Mock gatsby-plugin-image for future use
jest.mock('gatsby-plugin-image', () => ({
  StaticImage: (props: any) => <img {...props} />,
}));

describe('Metrics', () => {
  it('renders correctly', () => {
    const props = {
      title: 'Test Title',
      sousTitre: 'Test Subtitle',
      description: '<p>Test Description</p>',
      metric: [
        {
          titre: 'Metric 1',
          description: 'Desc 1',
          number: '10',
        },
      ],
    };

    render(<Metrics {...props} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    // Use getByAltText to find the image
    const image = screen.getByAltText('Starfleet');
    expect(image).toBeInTheDocument();

    // Check if it has the correct class (optional but good)
    // Note: When using StaticImage, the class might be on the wrapper or image depending on how we use it.
    expect(image).toHaveClass('img-fluid');

    // Verify it uses the correct source path (confirming StaticImage usage with string src)
    expect(image).toHaveAttribute('src', '../../images/Starfleet.webp');
  });
});
