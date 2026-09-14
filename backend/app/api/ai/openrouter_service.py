import json

from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    timeout=30,
)


# Free-tier OpenRouter models get deprecated/rotated frequently.
# Try a small ordered list instead of hardcoding a single slug, so one
# deprecation doesn't take down the whole AI Summary feature again.
CANDIDATE_MODELS = [
    "openrouter/free",          # OpenRouter's own auto-router across free models
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemini-2.0-flash-exp:free",
]


def generate_response(prompt: str):
    """
    Generate an AI executive summary.
    Returns a Python dictionary.
    """

    last_error = None

    for model in CANDIDATE_MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                response_format={
                    "type": "json_object"
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

            message = response.choices[0].message

            if message.content:
                return json.loads(message.content)

            last_error = RuntimeError(f"{model} returned an empty response.")

        except json.JSONDecodeError as e:
            last_error = RuntimeError(f"AI returned invalid JSON from {model}: {e}")

        except Exception as e:
            last_error = RuntimeError(f"OpenRouter API Error ({model}): {e}")
            continue  # try the next candidate model

    raise last_error or RuntimeError("All OpenRouter model attempts failed.")