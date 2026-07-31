from typing import Any

from pydantic import BaseModel


class AIRequest(BaseModel):
    business_health: dict[str, Any]
    business_analysis: dict[str, Any]
    business_validation: dict[str, Any]
    detected_kpis: dict[str, Any]
    insights: list[dict[str, Any]]
    recommendations: list[dict[str, Any]]