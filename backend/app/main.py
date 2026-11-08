from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Business Analytics Platform"
)


# Allow the Next.js frontend to communicate with the FastAPI backend.
# Origins come from the ALLOWED_ORIGINS env var (comma-separated), e.g.
# "http://localhost:3000,https://your-app.vercel.app".
# ALLOWED_ORIGIN_REGEX is optional (e.g. to allow Vercel preview URLs).
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_origin_regex=settings.ALLOWED_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "status": "Running"
    }
