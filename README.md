# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f259055c-52b4-4211-ac06-fb08b0543563

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f259055c-52b4-4211-ac06-fb08b0543563) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f259055c-52b4-4211-ac06-fb08b0543563) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

---

## Supabase (local self-hosted)

The frontend talks to a Supabase stack running on this Zo server. The cloud
project `ibhqtvsygrtdncnwqhjb.supabase.co` no longer resolves (deleted/paused),
so all auth and data now live locally.

| Piece | Value |
| --- | --- |
| Gateway (public) | `https://supabase-herb.zocomputer.io` |
| REST | `https://supabase-herb.zocomputer.io/rest/v1` |
| Auth | `https://supabase-herb.zocomputer.io/auth/v1` |
| Studio | `https://supabase-herb.zocomputer.io/project/default` (basic auth in `/opt/supabase/env/gateway.env`) |
| Local Postgres | `127.0.0.1:5432`, PGDATA `/opt/supabase/data/db` |
| Backend files | `/opt/supabase` (`bin/run.sh`, `env/*.env`) |

Client config comes from `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). `.env` is gitignored.

### Tables

`profiles`, `job_submissions`, `market_ranges`, `trades`, plus a
`handle_new_user()` trigger on `auth.users` that inserts a `profiles` row.

### Restarting the backend

Each component is a Zo user service: `supabase-db`, `supabase-auth`,
`supabase-rest`, `supabase-realtime`, `supabase-storage`, `supabase-imgproxy`,
`supabase-meta`, `supabase-functions`, `supabase-studio`, and `supabase`
(the gateway). Restart the gateway after editing `/opt/supabase/env/*.env`.

### Deploy

`vercel.json` sets the Vite build and SPA rewrite. Deploys run from
`GustheTrader/handyhub-signin` on Vercel project `handyhub-signin`
(alias `https://handyhub-signin.vercel.app`).

## Blog

Posts live as markdown in `content/blog/` (`YYYY-MM-DD-slug.md` with YAML
frontmatter: `title`, `slug`, `date`/`publish_date`, `category`, `services`,
`read_time`, `seo_description`). `build/blog-posts.ts` exposes them to the app
as the Vite virtual module `virtual:blog-posts`, so adding a post is a file
drop — no index to update. Routes: `/blog` (search + category filter) and
`/blog/:slug` (rendered with react-markdown, styled by `src/styles/blog.css`).
