## 2024-05-28 - List item memoization with expensive functions
**Learning:** In interactive lists (like accordions or hovered metrics), functions like `sanitizeHtml` can cause significant performance bottlenecks if the entire list re-renders when only one item's local state changes.
**Action:** Extract list items into a `React.memo` component, memoize event handlers with `React.useCallback`, and ensure expensive functions inside list items are lazily evaluated (e.g. `isActive && sanitizeHtml(...)`). Use `React.useMemo` for static content that only changes on props/data updates.
