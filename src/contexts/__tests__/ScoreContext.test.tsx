import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ScoreProvider, useScores } from '../ScoreContext';

describe('ScoreContext', () => {
  const initialCategories = [
    { slug: 'category-1' },
    { slug: 'category-2' },
    { slug: 'category-3' },
  ];

  test('initial state is correct', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScoreProvider initialCategories={initialCategories}>
        {children}
      </ScoreProvider>
    );

    const { result } = renderHook(() => useScores(), { wrapper });

    expect(result.current.scores.globalScore).toBe(0);
    expect(result.current.scores.scoresByCategory).toEqual({
      'category-1': 0,
      'category-2': 0,
      'category-3': 0,
    });
  });

  test('calculateAndSetGlobalScore correctly sums up category scores', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScoreProvider initialCategories={initialCategories}>
        {children}
      </ScoreProvider>
    );

    const { result } = renderHook(() => useScores(), { wrapper });

    // Update scores
    act(() => {
      result.current.updateScoreByCategory('category-1', 10);
    });

    expect(result.current.scores.scoresByCategory['category-1']).toBe(10);
    // Global score should not update automatically
    expect(result.current.scores.globalScore).toBe(0);

    act(() => {
      result.current.updateScoreByCategory('category-2', 25);
    });

    expect(result.current.scores.scoresByCategory['category-2']).toBe(25);

    // Calculate global score
    act(() => {
      result.current.calculateAndSetGlobalScore();
    });

    // 10 + 25 + 0 = 35
    expect(result.current.scores.globalScore).toBe(35);
  });

  test('calculateAndSetGlobalScore handles zero and negative values', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ScoreProvider initialCategories={initialCategories}>
        {children}
      </ScoreProvider>
    );

    const { result } = renderHook(() => useScores(), { wrapper });

    act(() => {
      result.current.updateScoreByCategory('category-1', 10);
      result.current.updateScoreByCategory('category-2', -5);
      result.current.updateScoreByCategory('category-3', 0);
    });

    act(() => {
      result.current.calculateAndSetGlobalScore();
    });

    // 10 + (-5) + 0 = 5
    expect(result.current.scores.globalScore).toBe(5);
  });
});
