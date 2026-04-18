# WEIR

> Built with [Visila](https://visila.com)

## What this app does

<!-- One sentence describing the core problem this solves -->

## Top user stories

- As a user, I can sign up and log in securely
- As a user, I can [core feature 1]
- As a user, I can [core feature 2]
- As a user, I can manage my account and data
- As a user, I can access the app on any device

## Run locally

```bash
npm install
cp .env.example .env  # fill in your Supabase keys
npm run dev
```

## Deploy

This app auto-deploys to Vercel on every push to main.
Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables.

## You own everything

GitHub: https://github.com/silamutungi/weir-c7e9e8
Vercel: https://vercel.com/dashboard
Supabase: https://supabase.com/dashboard

Visila provisioned this. You own it entirely.

## NEXT STEPS

### Environment Setup

1. Clone the repository from GitHub
2. Install dependencies: `npm install`
3. Copy the environment template: `cp .env.example .env`
4. Fill in your Supabase credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
5. Start development server: `npm run dev`

### Deployment Instructions

1. Push code to the `main` branch on GitHub
2. Vercel will automatically detect and deploy changes
3. Configure environment variables in Vercel:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Verify deployment at your Vercel project URL

### Development Roadmap

- [ ] Implement core feature 1
- [ ] Implement core feature 2
- [ ] Add user authentication flows
- [ ] Set up database schema in Supabase
- [ ] Implement user profile management
- [ ] Add data persistence and sync
- [ ] Test responsive design across devices
- [ ] Optimize performance and bundle size
- [ ] Set up monitoring and error tracking
- [ ] Prepare for production launch