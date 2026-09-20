# CalTrack

Mobile-first calorie tracking app for the web and mobile Chrome. CalTrack is designed as an installable Progressive Web App (PWA) that can use the device camera to identify food and estimate nutrition.

## Stack

- React + TypeScript
- Vite
- Progressive Web App support with `vite-plugin-pwa`
- Mobile-first CSS
- Vitest + Testing Library for tests
- ESLint + TypeScript checks

## Requirements

- Node.js 20+
- npm 10+

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To test installability and service-worker behavior, use a production build:

```bash
npm run build
npm run preview
```

Camera access requires HTTPS in production (localhost is allowed during development).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build the PWA
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm run test` — run unit tests once
- `npm run test:watch` — run tests in watch mode

## Project structure

```text
src/
  app/          Application shell and routes/screens
  components/   Reusable UI components
  features/     Feature modules (camera, nutrition, profile, etc.)
  lib/          Shared utilities and browser integrations
  styles/       Global styles and design tokens
  test/         Test setup
public/         Static PWA assets
```

The initial shell intentionally stays minimal so the product UI can be built next without replacing the project foundation.
