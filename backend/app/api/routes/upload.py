import uuid

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
)

from app.services.upload_service import process_csv


router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("")
async def upload_csv(
    file: UploadFile = File(...),
):

    # --------------------------------
    # File validation
    # --------------------------------

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed.",
        )

    content = await file.read()

    # --------------------------------
    # Process CSV
    # --------------------------------

    try:

        result = process_csv(content)

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:

        import traceback

        print(
            "========== UPLOAD ERROR =========="
        )

        traceback.print_exc()

        print(
            "==================================="
        )

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    # --------------------------------
    # Create analysis ID
    # --------------------------------

    analysis_id = str(uuid.uuid4())

    result["analysis_id"] = analysis_id
    result["filename"] = file.filename

    return result