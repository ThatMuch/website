import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Metrics from './Metrics';
import '@testing-library/jest-dom';

// Mock static assets
jest.mock('../../images/Starfleet.webp', () => 'test-file-stub');

const mockMetric = [
  {
    titre: 'Metric 1',
    description: '<script>alert("XSS")</script><p>Safe content</p>',
    number: '10',
  },
  {
    titre: 'Metric 2',
    description: '<b>Another</b> item',
    number: '20',
  }
];

const mockData = {
  title: 'Main Title',
  sousTitre: 'Subtitle',
  description: '<div onclick="alert(1)">Description</div>',
  metric: mockMetric,
};

describe('Metrics Component', () => {
  test('renders SANITIZED HTML (safe)', () => {
    render(
      <Metrics
        title={mockData.title}
        sousTitre={mockData.sousTitre}
        description={mockData.description}
        metric={mockData.metric}
      />
    );

    const itemDesc = screen.getByText('Safe content').closest('div');
    expect(itemDesc?.innerHTML).not.toContain('<script>');

    const topDescText = screen.getByText('Description');
    expect(topDescText).not.toHaveAttribute('onclick');
  });

  test('initial render performance benchmark', () => {
    const start = performance.now();
    for (let i = 0; i < 50; i++) {
        const { unmount } = render(
            <Metrics
                title={mockData.title}
                sousTitre={mockData.sousTitre}
                description={mockData.description}
                metric={mockData.metric}
            />
        );
        unmount();
    }
    const end = performance.now();
    console.log(`Initial Render time (50 runs): ${end - start}ms`);
  });

  test('re-render performance (hover)', () => {
    const { getByText } = render(
      <Metrics
        title={mockData.title}
        sousTitre={mockData.sousTitre}
        description={mockData.description}
        metric={mockData.metric}
      />
    );

    const item = getByText('Metric 1').closest('.Metrics__list__item');
    if (!item) throw new Error('Item not found');

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
        // Trigger hover
        fireEvent.mouseEnter(item);
        // We need to wait for state update?
        // fireEvent is synchronous but React state updates might be batched or async in concurrent mode.
        // But in testing-library with standard React 18, it usually wraps in act().
        // However, standard React state updates are batched.
        // But for synthetic events, it should trigger re-render.

        fireEvent.mouseLeave(item);
    }
    const end = performance.now();
    console.log(`Re-render time (100 hovers): ${end - start}ms`);
  });
});
