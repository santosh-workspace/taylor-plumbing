# Santkrupa Hospital — Website-1

Marketing website for Santkrupa Hospital, Alandi, Pune.
Built with React 18, Vite 5, Tailwind CSS 3, and GSAP.

## Run locally

Requires Node.js 18+ (check with `node -v`).

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build
```

## Deploy to Vercel

Import the repository in Vercel — it auto-detects Vite.
The included `vercel.json` handles client-side routing for /privacy and /terms.

## Editing

- Hospital name, phone, email, address: `src/App.jsx` (the `HOSPITAL` object at the top)
- Departments/services: the `SERVICES` array in `src/App.jsx`
- Colors: `tailwind.config.js`
- Legal pages: `src/pages/PrivacyPolicy.jsx`, `src/pages/Terms.jsx`
