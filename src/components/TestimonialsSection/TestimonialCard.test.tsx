import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialCard from './TestimonialCard';
import '@testing-library/jest-dom';

describe('TestimonialCard', () => {
  const mockTestimonial = {
    title: 'Test Title',
    testimonialContent: {
      nom: 'John Doe',
      role: 'Developer',
      citation: '<p>This is a great product!</p>',
      stars: 5,
    },
  };

  it('renders correctly', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('This is a great product!')).toBeInTheDocument();
  });

  it('sanitizes malicious HTML in citation', () => {
    const maliciousTestimonial = {
      ...mockTestimonial,
      testimonialContent: {
        ...mockTestimonial.testimonialContent,
        citation: '<img src="x" onerror="alert(1)" />',
      },
    };
    const { container } = render(<TestimonialCard testimonial={maliciousTestimonial} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAttribute('onerror');
  });
});
