# Deploying InsightPilot

Backend (FastAPI) on Railway, frontend (Next.js) on Vercel. Deploy the backend first so the frontend can point at it.

## 1. Backend on Railway

1. Railway, New Project, Deploy from GitHub repo, pick `InsightPilot`.
2. Service Settings, **Root Directory** = `backend`. (This also makes Railway ignore anything at the repo root.)
3. Variables:
   - `OPENROUTER_API_KEY` = your OpenRouter key
   - `ALLOWED_ORIGINS` = `http://localhost:3000` for now (you add the Vercel URL in step 3)
4. Settings, Networking, **Generate Domain**.
5. Check `https://<your-service>.up.railway.app/` returns `{"message": "...", "status": "Running"}` and `/docs` opens.

`backend/railway.json` already sets the start command (`uvicorn app.main:app --host 0.0.0.0 --port $PORT`) and the health check.

## 2. Frontend on Vercel

1. Vercel, Add New Project, import `InsightPilot`.
2. **Root Directory** = `frontend` (framework is detected as Next.js).
3. Environment Variables: `NEXT_PUBLIC_API_URL` = your Railway domain, with `https://` and no trailing slash.
4. Deploy.

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy the frontend whenever you change this one.

## 3. Connect them (CORS)

1. Copy your Vercel production URL, for example `https://insightpilot-xyz.vercel.app`.
2. In Railway set `ALLOWED_ORIGINS` = `http://localhost:3000,https://insightpilot-xyz.vercel.app` (no trailing slashes).
3. Optional, to allow Vercel preview URLs too: `ALLOWED_ORIGIN_REGEX` = `https://.*\.vercel\.app`.
4. Railway redeploys on a variable change. Then open the Vercel site and upload a CSV.

## 4. Local development

- Backend: `cd backend`, copy `.env.example` to `.env`, then `pip install -r requirements.txt` and `uvicorn app.main:app --reload`.
- Frontend: `cd frontend`, copy `.env.example` to `.env.local`, then `npm install` and `npm run dev`.

## Troubleshooting

- Upload fails in the browser with a CORS error in the console: the Vercel URL is missing from `ALLOWED_ORIGINS`, or has a trailing slash.
- Upload goes to `127.0.0.1`: `NEXT_PUBLIC_API_URL` was not set before the Vercel build. Set it, then redeploy.
- AI Summary returns 500 "OPENROUTER_API_KEY is not set": add the key in Railway variables.
- AI Summary fails intermittently: the backend uses OpenRouter's free models, which are rate limited and rotate. The service tries three in order.
