from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.upload_service import process_csv

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

@router.post("/")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed."
        )

    content = await file.read()

    result = process_csv(content)

    result["filename"] = file.filename

    return result

