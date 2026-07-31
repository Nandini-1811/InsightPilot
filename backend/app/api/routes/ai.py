from fastapi import APIRouter

from app.services.ai_service import generate_ai_summary
from app.schemas.ai_summary import AIRequest

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/summary")
async def generate_summary(request: AIRequest):

    try:
        summary = generate_ai_summary(
            business_health=request.business_health,
            business_analysis=request.business_analysis,
            business_validation=request.business_validation,
            detected_kpis=request.detected_kpis,
            insights=request.insights,
            recommendations=request.recommendations,
        )

        return {
            "ai_summary": summary
        }

    except Exception as e:
        import traceback
        traceback.print_exc()

        return {
            "error": str(e)
        }