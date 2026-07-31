from app.services.ai_context_builder import build_ai_context
from app.api.ai.prompt_builder import build_prompt
from app.api.ai.openrouter_service import generate_response


def generate_ai_summary(
    business_health,
    business_analysis,
    business_validation,
    detected_kpis,
    insights,
    recommendations,
):
    """
    Generate an AI executive summary.

    Flow:
    Context
        ↓
    Prompt
        ↓
    OpenRouter
        ↓
    JSON Response
    """

    context = build_ai_context(
        business_health,
        business_analysis,
        business_validation,
        detected_kpis,
        insights,
        recommendations,
    )

    prompt = build_prompt(context)

    return generate_response(prompt)