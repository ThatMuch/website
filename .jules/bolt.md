
## 2024-05-15 - React List Rendering with Expensive Sanitization
**Learning:** Calling an expensive operation like `sanitizeHtml` (~0.8ms) directly in the body of a component rendered in a list can cause severe performance regressions, particularly when the entire list re-renders on state changes (like toggling an accordion).
**Action:** When a list triggers frequent state updates, extract the list item into a `React.memo` component, wrap the interaction handler with `React.useCallback`, and memoize or lazily evaluate any expensive HTML sanitization to avoid redundant recalculations.
