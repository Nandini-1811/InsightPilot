import json

from openai import OpenAI

from app.core.config import settings


class AIConfigurationError(RuntimeError):
    """Raised when the AI provider is not configured correctly."""


class AIProviderError(RuntimeError):
    """Raised when the AI provider cannot produce a usable response."""


MODEL = "openrouter/free"

# The free model occasionally returns an empty or malformed answer, so a
# failed attempt is retried before giving up.
MAX_ATTEMPTS = 3


def _request_summary(client: OpenAI, prompt: str) -> dict:
    """Make a single request and return the parsed JSON."""

    try:
        response = client.chat.completions.create(
            model=MODEL,
            response_format={
                "type": "json_object",
            },
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a Senior Business Analyst.\n"
                        "Return ONLY valid JSON.\n"
                        "Never explain your reasoning.\n"
                        "Never wrap JSON in markdown."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
        )

    except Exception as exc:
        raise AIProviderError(
            f"OpenRouter could not generate the AI summary: {exc}"
        ) from exc

    choices = getattr(response, "choices", None)

    if not choices:
        raise AIProviderError(
            "OpenRouter returned an empty AI response."
        )

    content = choices[0].message.content

    if not content:
        raise AIProviderError(
            "OpenRouter returned an empty AI response."
        )

    try:
        return json.loads(content)

    except json.JSONDecodeError as exc:
        raise AIProviderError(
            "OpenRouter returned a response that was not valid JSON."
        ) from exc


def generate_response(prompt: str) -> dict:
    """
    Generate an AI executive summary.

    The AI response must be valid JSON because the rest of the
    application expects structured data.
    """

    api_key = settings.OPENROUTER_API_KEY

    if not api_key:
        raise AIConfigurationError(
            "AI summaries are not configured. "
            "Set OPENROUTER_API_KEY in the backend environment."
        )

    client = OpenAI(
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        timeout=30,
    )

    last_error = None

    for _ in range(MAX_ATTEMPTS):
        try:
            return _request_summary(client, prompt)

        except AIProviderError as exc:
            last_error = exc

    raise last_error