from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.upload_service import process_csv

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("")
async def upload_csv(file: UploadFile = File(...)):

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed."
        )

    content = await file.read()

    try:
        result = process_csv(content)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        import traceback

        print("========== UPLOAD ERROR ==========")
        traceback.print_exc()
        print("===================================")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    result["filename"] = file.filename

    return result