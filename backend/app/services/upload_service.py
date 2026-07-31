import pandas as pd
from io import StringIO

from app.analytics.column_mapping import map_columns
from app.analytics.capability_detector import detect_kpis
from app.analytics.business_validation import validate_business_capability
from app.analytics.derived_fields import generate_derived_fields
from app.analytics.business_intelligence import analyze_business
from app.analytics.business_health import calculate_business_health
from app.analytics.insight_generator import generate_insight
from app.analytics.recommendation_engine import generate_recommendations

from app.services.normalization_service import normalize_dataset
from app.services.profiling_service import profile_dataset
from app.services.quality_service import calculate_quality_score
from app.services.dashboard_service import generate_dashboard_data



def process_csv(file_content: bytes):

    # -------------------------
    # File Validation
    # -------------------------

    if not file_content:
        raise ValueError("Uploaded file is empty.")

    try:
        decoded_content = file_content.decode("utf-8")
    except UnicodeDecodeError:
        raise ValueError("File encoding must be UTF-8.")

    try:
        original_df = pd.read_csv(
            StringIO(decoded_content)
        )
    except pd.errors.EmptyDataError:
        raise ValueError("CSV file contains no data.")
    except Exception:
        raise ValueError("Invalid CSV file.")

    # -------------------------
    # Dataset Validation
    # -------------------------

    if original_df.empty:
        raise ValueError("Dataset contains no rows.")

    if original_df.shape[1] == 0:
        raise ValueError("Dataset contains no columns.")

    # Remove accidental index columns
    original_df = original_df.loc[
        :,
        ~original_df.columns.str.contains("^Unnamed")
    ]

    if original_df.shape[1] == 0:
        raise ValueError("Dataset contains no usable columns.")

    empty_columns = [
        column
        for column in original_df.columns
        if original_df[column].isna().all()
    ]

    if empty_columns:
        raise ValueError(
            f"Dataset contains empty columns: {empty_columns}"
        )

    # -------------------------
    # Data Preparation
    # -------------------------

    mapped_df = map_columns(original_df)

    normalized_df = normalize_dataset(mapped_df)

    detected_kpis = detect_kpis(normalized_df)

    business_validation = validate_business_capability(
        detected_kpis
    )

    derived_df = generate_derived_fields(
        normalized_df,
        detected_kpis
    )

    # -------------------------
    # Dataset Profiling
    # -------------------------

    profile = profile_dataset(
        derived_df
    )

    quality = calculate_quality_score(
        derived_df
    )

    # -------------------------
    # Business Intelligence
    # -------------------------

    business_analysis = analyze_business(
        derived_df,
        detected_kpis
    )

    business_health = calculate_business_health(
        detected_kpis,
        quality
    )

    insights = generate_insight(
        quality,
        business_analysis
    )

    recommendations = generate_recommendations(
        business_analysis,
        business_validation
    )

    dashboard = generate_dashboard_data(
        business_analysis
    )


    # -------------------------
    # Final API Response
    # -------------------------

    profile["column_names"] = derived_df.columns.tolist()

    profile["data_quality"] = quality

    profile["detected_kpis"] = detected_kpis

    profile["business_validation"] = business_validation

    profile["business_analysis"] = business_analysis

    profile["business_health"] = business_health

    profile["insights"] = insights

    profile["recommendations"] = recommendations


    profile["derived_fields"] = [
        column
        for column in derived_df.columns
        if column not in normalized_df.columns
    ]

    profile["dashboard"] = dashboard

    return profile