import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickSpark from './ClickSpark';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLCanvasElement.getContext
// @ts-ignore
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
}));

describe('ClickSpark', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ClickSpark>
        <div data-testid="child">Child Content</div>
      </ClickSpark>
    );
    expect(container.textContent).toBe('Child Content');
  });

  it('handles click event', () => {
    const { container } = render(
      <ClickSpark>
        <div>Content</div>
      </ClickSpark>
    );

    const wrapper = container.firstChild as HTMLElement;
    fireEvent.click(wrapper);

    // If no error thrown, it's good.
  });
});
