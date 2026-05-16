# LLMRank

LLMRank is a Next.js app that analyzes a URL for LLM-oriented content quality, PageSpeed metrics, SERP data, and detected technology.

## Local Setup

Install dependencies:

```bash
npm install
```

Copy the example environment file:

```bash
copy .env.example .env.local
```

Add your keys to `.env.local`:

```bash
ANTHROPIC_API_KEY=your_anthropic_key
ANTHROPIC_MODEL=claude-sonnet-4-20250514
PAGE_SPEED_API_KEY=your_google_pagespeed_key
SERP_API_KEY=your_serpapi_key
WAPPALYZER_API_KEY=your_wappalyzer_key
SEMRUSH_API_KEY=
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## API Keys

The app reads API keys only on the server through environment variables. Do not paste API keys into the browser or commit `.env.local`.

Required for real LLM scoring:

- `ANTHROPIC_API_KEY`

Optional:

- `ANTHROPIC_MODEL` defaults to `claude-sonnet-4-20250514`
- `PAGE_SPEED_API_KEY` enables PageSpeed Insights data
- `SERP_API_KEY` enables SerpAPI search result data
- `WAPPALYZER_API_KEY` enables technology detection
- `SEMRUSH_API_KEY` is reserved for future SEO metrics

If a key is missing or an integration fails, LLMRank returns demo/default values for that section so the UI still loads.

## Deploying on Vercel

`.env.local` is ignored by git, so uploading to GitHub does not upload your secrets. Add the same variables in:

`Vercel Project Settings -> Environment Variables`

Add them for Production, Preview, and Development if you want all deployments to work. After changing environment variables, redeploy the project.

## Configuration Check

Click the settings button in the app header to see which server-side environment variables are configured. The app only shows configured/missing status; it never exposes the secret values.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
