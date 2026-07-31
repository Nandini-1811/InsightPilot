import json

from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    timeout=30,
)


def generate_response(prompt: str):
    """
    Generate an AI executive summary.
    Returns a Python dictionary.
    """

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b:free",
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

        raise RuntimeError("OpenRouter returned an empty response.")

    except json.JSONDecodeError as e:
        raise RuntimeError(f"AI returned invalid JSON: {e}")

    except Exception as e:
        raise RuntimeError(f"OpenRouter API Error: {e}")