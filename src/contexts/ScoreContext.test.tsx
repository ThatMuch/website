import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ScoreProvider, useScores } from './ScoreContext';

describe('ScoreContext', () => {
  const initialCategories = [{ slug: 'category1' }, { slug: 'category2' }];

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ScoreProvider initialCategories={initialCategories}>{children}</ScoreProvider>
  );

  test('updateScoreByCategory updates the score for a specific category', () => {
    const { result } = renderHook(() => useScores(), { wrapper });

    // Initial state check
    expect(result.current.scores.scoresByCategory['category1']).toBe(0);

    // Update score
    act(() => {
      result.current.updateScoreByCategory('category1', 10);
    });

    // Verify update
    expect(result.current.scores.scoresByCategory['category1']).toBe(10);

    // Verify other category untouched
    expect(result.current.scores.scoresByCategory['category2']).toBe(0);
  });

  test('updateScoreByCategory handles non-existent category (adds it)', () => {
     // Although the app might not intend this, the current implementation:
     // [categorySlug]: score
     // allows adding new keys.
     const { result } = renderHook(() => useScores(), { wrapper });

     act(() => {
       result.current.updateScoreByCategory('new-category', 5);
     });

     expect(result.current.scores.scoresByCategory['new-category']).toBe(5);
  });
});
