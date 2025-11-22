This is a small PWA built with Next.js (App Router) that lets you search weather by city, save short notes per city, and work offline with cached data.

Features

- Search weather by city (OpenWeatherMap)
- Save a note per city (persisted to `localStorage` via Zustand)
- Simple offline mode: cached city data is shown when offline
- PWA support via `next-pwa` with a service worker and `manifest.json`

Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Notes

- The app uses the OpenWeatherMap API. An API key was included in the project for demo purposes.
- Build will generate a service worker via `next-pwa`. In development the service worker is disabled by default.
- `axios` and `zustand` were added as dependencies.

Environment variables

- Create a `.env` file in the project root with your OpenWeatherMap key:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=development|production
```

The `NEXT_PUBLIC_` prefix exposes the variable to browser code (this demo reads the key client-side). If you prefer to keep the key secret, move the API calls to server-side code (API routes or server components) and use a non-`NEXT_PUBLIC_` variable.

Files of interest

- `app/page.tsx` — main UI
- `app/saved/page.tsx` — saved/cached cities
- `store/useWeatherStore.ts` — Zustand store persisted to `localStorage`
- `lib/api.ts` — wrapper for OpenWeatherMap requests

If you'd like, I can also run `npm install` here and start the dev server, or adjust caching strategies for the service worker.
