import json


def build_ai_context(
    business_health,
    business_analysis,
    business_validation,
    detected_kpis,
    insights,
    recommendations,
):
    """
    Build a compact JSON context for the AI model.
    Only include information required for generating
    an executive business summary.
    """

    context = {
        "business_health": business_health,
        "business_validation": business_validation,
        "detected_kpis": detected_kpis,
        "business_analysis": business_analysis,
        "insights": insights,
        "recommendations": recommendations,
    }

    return json.dumps(
        context,
        indent=2,
        ensure_ascii=False,
    )