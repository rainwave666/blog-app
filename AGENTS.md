# AGENTS

This workspace is a small Vue 3 + Vite blog app. Use the existing project conventions before introducing new patterns or dependencies.

## Project map

- [README.md](README.md) contains the local setup and build commands.
- [src/main.js](src/main.js) boots the app and wires in Pinia and Vue Router.
- [src/router/index.js](src/router/index.js) defines the app routes: `/` and `/post/:id`.
- [src/views](src/views) contains page-level views such as the home page and post page.
- [src/components](src/components) contains reusable UI components.
- [src/stores](src/stores) is where Pinia stores live.

## Coding conventions

- Prefer Vue 3 Composition API and `<script setup>` in single-file components.
- Keep page logic in views and presentational logic in components.
- Use props and emitted events for parent-child communication; keep shared state in the parent view when the data is used across siblings.
- Use `scoped` styles for component-local CSS.
- Preserve the current route names and router links when changing navigation behavior.

## Important app-specific patterns

- The home page in [src/views/HomeView.vue](src/views/HomeView.vue) owns article data, category filtering, and the list of visible posts.
- The filtering contract is intentionally driven by `categories`, `activeCategory`, and the `update-category` event.
- If you touch [src/components/CategoryFilter.vue](src/components/CategoryFilter.vue), keep it compatible with the contract used by [src/views/HomeView.vue](src/views/HomeView.vue): it should accept the categories list and currently selected category, then emit the selected category when the user changes it.
- Card links use `RouterLink` to the `post` route with the article `id` param, as implemented in [src/components/BlogCard.vue](src/components/BlogCard.vue).

## Validation

- Local development: `npm run dev`
- Production build verification: `npm run build`
- There is no dedicated automated test suite in this project at the moment, so prefer build validation after code changes.

## When making changes

- Prefer small, targeted edits that match the existing Vue file structure.
- Reuse the current Vite/Vue patterns instead of introducing new state management or routing abstractions.
- Keep UI changes aligned with the current lightweight blog styling and card-based layout.
- If a component is intentionally incomplete, do not silently break the parent contract; either implement it or update the calling code to match the new design.
