# Taylor Plumbing & Heating — Website

Marketing website for Taylor Plumbing & Heating Installation Ltd, Norwich.
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

## Quote form emails (Resend)

The "Get a Free Quote" / contact form posts to the serverless function `api/send-quote.js`,
which emails submissions (including any attached photos) via [Resend](https://resend.com).

1. Create a free Resend account and generate an API key.
2. In the Vercel project settings, add an environment variable `RESEND_API_KEY` with that key
   (Project Settings → Environment Variables), then redeploy.
3. By default the email is sent **to** `info@taylor-plumbing.com` **from** Resend's shared
   `onboarding@resend.dev` sender. To send from your own domain (recommended for deliverability),
   verify `taylor-plumbing.com` in Resend and set the optional env var
   `QUOTE_FROM_EMAIL=Taylor Plumbing Website <quotes@taylor-plumbing.com>`.
   `QUOTE_TO_EMAIL` can also be overridden if quotes should go elsewhere.

To test the form locally you need the [Vercel CLI](https://vercel.com/docs/cli) so `/api` routes
run alongside Vite:

```bash
npm i -g vercel
vercel dev
```

Copy `.env.example` to `.env` and fill in `RESEND_API_KEY` for local testing (plain `npm run dev`
only serves the frontend, so the form will fail to send without `vercel dev`).

## Editing

- Business name, phone, email, address: `src/App.jsx` (the `BUSINESS` object at the top)
- Services: the `SERVICES` array in `src/App.jsx`
- Recent work / gallery photos: the `GALLERY` array in `src/App.jsx`
- Colors: `tailwind.config.js`
- Legal pages: `src/pages/PrivacyPolicy.jsx`, `src/pages/Terms.jsx`
