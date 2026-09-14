import asyncio

from fastapi import APIRouter, HTTPException

from app.services.ai_service import generate_ai_summary
from app.schemas.ai_summary import AIRequest


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/summary")
async def generate_summary(
    request: AIRequest,
):

    try:

        # generate_ai_summary makes a blocking network call.
        # Run it in a thread so it doesn't block FastAPI's single
        # event loop — otherwise two near-simultaneous requests
        # (e.g. React Strict Mode's double effect in dev) serialize
        # behind each other instead of actually running concurrently.
        summary = await asyncio.to_thread(
            generate_ai_summary,
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

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )