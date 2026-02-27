import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ClickSpark from './ClickSpark';

describe('ClickSpark Performance', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock ResizeObserver
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does NOT call requestAnimationFrame when idle', () => {
    let rafCount = 0;
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCount++;
        return setTimeout(() => cb(Date.now()), 16);
    });

    // Mock canvas context
    const mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    };
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as any);

    render(<ClickSpark />);

    // Fast-forward time
    act(() => {
        jest.advanceTimersByTime(1000);
    });

    expect(rafCount).toBe(0);

    rafSpy.mockRestore();
  });

  test('starts animation on click and stops after duration', () => {
    let rafCount = 0;
    // We need a way to stop the mock loop if the component stops requesting it
    // But our mock implementation effectively recurses if the component calls it again.
    // The component calls rAF inside the callback.

    const rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCount++;
         // We don't automatically schedule the next frame in the mock because
         // the component does that by calling rAF again.
         // We just execute the callback immediately (or with timeout)
         // But wait, if we use setTimeout, we need to advance timers.
         return setTimeout(() => {
             cb(Date.now())
         }, 16);
    });

    const mockContext = {
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
      };
      jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as any);

      const { container } = render(<ClickSpark duration={400}><div data-testid="child">child</div></ClickSpark>);

      // Initial state: idle
      act(() => { jest.advanceTimersByTime(100); });
      const initialCount = rafCount;
      expect(initialCount).toBe(0);

      // Trigger click
      const clickArea = container.firstChild;
      fireEvent.click(clickArea!);

      // Advance time slightly to let animation start
      act(() => { jest.advanceTimersByTime(50); });
      expect(rafCount).toBeGreaterThan(0);
      const startCount = rafCount;

      // Advance time to cover full duration (400ms) + buffer
      act(() => { jest.advanceTimersByTime(600); });

      const endCount = rafCount;

      // Advance more time to ensure it stopped
      act(() => { jest.advanceTimersByTime(1000); });

      expect(rafCount).toBe(endCount); // Should not have increased

      rafSpy.mockRestore();
  });
});
