import pandas as pd
from io import StringIO

from app.services.profiling_service import profile_dataset
from app.services.normalization_service import normalize_dataset
from app.services.quality_service import calculate_quality_score
from backend.app.analytics.capability_detector import detect_kpis
from app.analytics.business_health import calculate_business_health

def process_csv(file_content:bytes):
    original_df = pd.read_csv(
        StringIO(file_content.decode("utf-8"))
    )
    normalized_df = normalize_dataset(original_df)
    profile = profile_dataset(normalized_df)
    quality = calculate_quality_score(normalized_df)
    profile["column_names"] = normalized_df.columns.tolist()
    profile["data_quality"] = quality
    detected_kpis = detect_kpis(normalized_df)
    business_health = calculate_business_health(
        detected_kpis,
        quality
    )
    profile["detected_kpis"] = detected_kpis
    profile["business_health"] = business_health

    return profile
