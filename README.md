# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

# UI/UX & Frontend Engineering Interview Guide

A curated set of high-frequency interview questions and model answers bridging **UI/UX Design Systems**, **Accessibility**, **React**, and **Angular**.

---

## 1. Design Systems & Figma-to-Code Workflow

### Q1: How do you structure design tokens in Figma so they scale cleanly into React or Angular codebases?
**Answer:**
Organize tokens into three semantic tiers rather than hardcoding raw values:
1. **Primitive / Core Tokens:** Raw palette values and scales (e.g., `color-navy-900: #1A2240`, `space-4: 16px`).
2. **Semantic / Alias Tokens:** Context-driven names mapped to primitives (e.g., `bg-surface-primary`, `text-muted`, `border-subtle`). This makes dark/light mode theming seamless.
3. **Component-Specific Tokens:** Scoped overrides for complex widgets (e.g., `datagrid-header-bg`, `button-primary-hover`).

In code, export these via Figma Variables (JSON) into CSS Custom Properties (`--bg-surface-primary`) consumed by Tailwind CSS or component stylesheets, ensuring a single source of truth.

---

### Q2: What is Atomic Design, and how do you apply it to component architecture?
**Answer:**
Atomic Design breaks interfaces into five hierarchical levels: **Atoms** (buttons, inputs, labels), **Molecules** (search bar with button), **Organisms** (navigation header, data grid toolbar), **Templates** (page wireframes), and **Pages** (populated views). 

In React or Angular, Atoms and Molecules map directly to stateless, reusable UI primitives (`<Button />`, `<Input />`) driven by props/inputs, while Organisms manage domain-specific state and API data.

---

### Q3: How do you handle complex SaaS data tables/grids across desktop and smaller viewports?
**Answer:**
* **Prioritization:** Freeze primary identifier columns (e.g., Name/ID) on the left and pin row actions on the right while allowing horizontal scroll for secondary metrics.
* **Density & Scannability:** Offer compact vs. comfortable row-height toggles, right-align numerical columns with tabular numerals (`font-variant-numeric: tabular-nums`), and use progressive disclosure (expandable rows or side drawers) instead of cramming 15+ columns onto one screen.
* **Performance:** Use virtual scrolling (e.g., AG Grid or DevExtreme virtualization) so rendering 10,000+ rows does not degrade frame rates.

---

## 2. Accessibility (WCAG) & Usability

### Q4: Beyond color contrast, what accessibility checks do you enforce when building custom interactive components?
**Answer:**
* **Keyboard Navigation:** Full operability via `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape` (especially focus trapping inside modals and dropdowns).
* **Semantic HTML First:** Using native `<button>`, `<nav>`, `<label>`, and `<table>` elements before reaching for ARIA attributes.
* **ARIA States & Live Regions:** Managing `aria-expanded`, `aria-selected`, and `aria-live="polite"` so screen readers announce dynamic validation errors or toast notifications without losing focus.
* **Focus Indicators:** Preserving high-contrast `:focus-visible` outlines rather than removing them with `outline: none`.

---

### Q5: How do you reduce perceived latency in data-heavy web applications?
**Answer:**
* **Skeleton Screens:** Display layout-matched shimmer placeholders instead of generic spinners so the layout doesn't jump when data resolves.
* **Optimistic UI Updates:** Immediately reflect low-risk user actions (like toggling a task or bookmark) in local state while syncing with the server in the background, rolling back only if the API fails.
* **Debounced Inputs:** Debounce live search and filter inputs (typically 250–300ms) to avoid flooding the backend and causing UI jitter.

---

## 3. React & Angular Frontend Architecture

### Q6: What are the key architectural differences between React and Angular?
**Answer:**
* **Scope:** React is a UI view library focused on declarative components and one-way data flow, leaving routing, forms, and HTTP to ecosystem choices. Angular is a full-featured TypeScript framework with built-in Dependency Injection (DI), RxJS reactive streams, Angular Router, and Reactive Forms out of the box.
* **Change Detection:** React reconciles updates via a Virtual DOM diffing algorithm triggered by state/prop updates. Angular uses zone-based change detection (and fine-grained **Signals** in modern Angular) to update the real DOM directly.

---

### Q7: How do you prevent unnecessary re-renders in React?
**Answer:**
1. **Colocate State:** Keep state as close as possible to the component that uses it rather than lifting everything to a global store.
2. **Component Composition:** Pass changing children via `props.children` so parent state updates don't re-render static subtrees.
3. **Memoization (Targeted):** Use `React.memo`, `useMemo`, and `useCallback` specifically when passing callbacks or derived arrays to heavy child components (like charts or large lists) where profiling confirms a bottleneck.

---

### Q8: How do you handle design handoff and collaboration with developers or PMs when requirements change mid-sprint?
**Answer:**
* **Annotate Edge Cases Early:** Include empty states, loading states, error boundaries, and max-character truncation rules directly in Figma specs—not just the "happy path."
* **Trade-off Matrix:** When scope changes mid-sprint, separate *must-have usability blockers* (e.g., form validation, keyboard access) from *visual polish* (e.g., custom micro-animations) so the team ships a functional MVP on time and logs polish items as fast-follows.
