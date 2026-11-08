from dotenv import load_dotenv
import os

load_dotenv()


def _split_csv(value: str):
    return [
        item.strip().rstrip("/")
        for item in value.split(",")
        if item.strip()
    ]


class Settings:
    # `or` (not a getenv default) so an empty value in .env still falls back
    APP_NAME = os.getenv("APP_NAME") or "InsightPilot API"
    APP_VERSION = os.getenv("APP_VERSION") or "1.0.0"

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

    # Comma-separated list of frontend origins allowed by CORS
    ALLOWED_ORIGINS = _split_csv(
        os.getenv("ALLOWED_ORIGINS") or "http://localhost:3000"
    )

    # Optional regex, e.g. https://.*\.vercel\.app for preview deployments
    ALLOWED_ORIGIN_REGEX = os.getenv("ALLOWED_ORIGIN_REGEX") or None


settings = Settings()
