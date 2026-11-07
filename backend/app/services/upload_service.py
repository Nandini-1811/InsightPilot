import pandas as pd
from io import StringIO

from app.analytics.column_mapping import map_columns
from app.analytics.capability_detector import detect_kpis
from app.analytics.business_validation import validate_business_capability
from app.analytics.derived_fields import generate_derived_fields
from app.analytics.business_intelligence import analyze_business
from app.analytics.analysis_readiness import calculate_analysis_readiness
from app.analytics.insight_generator import generate_insight
from app.analytics.recommendation_engine import generate_recommendations

from app.services.normalization_service import normalize_dataset
from app.services.profiling_service import profile_dataset
from app.services.data_quality_service import clean_dataset
from app.services.dashboard_service import generate_dashboard_data
from app.services.chart_service import generate_chart_data


def _build_column_quality(df: pd.DataFrame) -> dict:
    """
    Calculate column-level data coverage for the dataframe
    that will actually be used by the analytics engine.

    Example:

        Revenue -> 80% coverage
        Employees -> 100% coverage

    This is used by business capability detection to decide
    whether an analysis module is available or only partial.
    """

    column_quality = {}

    total_rows = len(df)

    for column in df.columns:
        missing_count = int(df[column].isna().sum())
        non_missing_count = total_rows - missing_count

        if total_rows > 0:
            coverage = round(
                (non_missing_count / total_rows) * 100,
                2,
            )
        else:
            coverage = 0.0

        column_quality[column] = {
            "missing": missing_count,
            "non_missing": non_missing_count,
            "coverage": coverage,
        }

    return column_quality


def _parse_csv(file_content: bytes) -> pd.DataFrame:
    """
    Convert uploaded CSV bytes into a pandas DataFrame.

    This function is responsible only for reading the CSV.
    Cleaning and analysis happen later in the pipeline.
    """

    if not file_content:
        raise ValueError(
            "Uploaded file is empty."
        )

    try:
        decoded_content = file_content.decode("utf-8-sig")
    except UnicodeDecodeError:
        raise ValueError(
            "File encoding is not supported. "
            "Please upload a UTF-8 CSV file."
        )

    try:
        df = pd.read_csv(
            StringIO(decoded_content)
        )

    except pd.errors.EmptyDataError:
        raise ValueError(
            "CSV file contains no data."
        )

    except pd.errors.ParserError as e:
        raise ValueError(
            f"CSV structure is invalid: {e}"
        )

    except Exception as e:
        raise ValueError(
            f"Unable to read CSV file: {e}"
        )

    return df


def _validate_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """
    Perform basic structural validation before the quality
    engine processes the dataset.
    """

    if df.empty:
        raise ValueError(
            "Dataset contains no rows."
        )

    if df.shape[1] == 0:
        raise ValueError(
            "Dataset contains no columns."
        )

    # Convert column names to strings before checking them.
    df.columns = [
        str(column).strip()
        for column in df.columns
    ]

    # Remove accidental pandas/index columns such as:
    # Unnamed: 0
    df = df.loc[
        :,
        ~df.columns.str.contains(
            r"^Unnamed",
            case=False,
            regex=True,
        ),
    ]

    if df.shape[1] == 0:
        raise ValueError(
            "Dataset contains no usable columns."
        )

    # Check for duplicate column names.
    duplicate_columns = df.columns[
        df.columns.duplicated()
    ].tolist()

    if duplicate_columns:
        raise ValueError(
            "Dataset contains duplicate column names: "
            f"{duplicate_columns}"
        )

    return df


def process_csv(file_content: bytes):
    """
    Main InsightPilot CSV processing pipeline.

    Pipeline:

        Upload
          ↓
        Parse CSV
          ↓
        Basic validation
          ↓
        Data cleaning + quality analysis
          ↓
        Column mapping
          ↓
        Normalization
          ↓
        KPI detection
          ↓
        Column coverage
          ↓
        Derived fields
          ↓
        Dataset profiling
          ↓
        Business capability
          ↓
        Business intelligence
          ↓
        Business health
          ↓
        Deterministic insights
          ↓
        Recommendations
          ↓
        Charts
          ↓
        Dashboard
          ↓
        Final response
    """

    # =========================================================
    # 1. PARSE CSV
    # =========================================================

    original_df = _parse_csv(
        file_content
    )

    # =========================================================
    # 2. BASIC DATASET VALIDATION
    # =========================================================

    original_df = _validate_dataset(
        original_df
    )

    # =========================================================
    # 3. DATA QUALITY + CLEANING
    # =========================================================
    #
    # This is our dedicated data-quality engine.
    #
    # It can:
    #
    # - normalize missing values
    # - clean column names
    # - rename duplicate columns when possible
    # - remove empty columns
    # - remove exact duplicate rows
    # - normalize numeric values
    # - detect invalid numeric values
    # - calculate quality dimensions
    # - record repairs
    # - record remaining issues
    #
    # Most importantly:
    #
    # cleaned_df is what the analytics engine will work with.
    #
    # quality is the explanation of what happened to the data.
    #

    cleaned_df, quality = clean_dataset(
        original_df
    )

    print("========== AFTER CLEANING ==========")
    print(cleaned_df.dtypes)
    print(cleaned_df.head())
    print("====================================")
    

    if cleaned_df.empty:
        raise ValueError(
            "Dataset contains no usable rows after cleaning."
        )

    if cleaned_df.shape[1] == 0:
        raise ValueError(
            "Dataset contains no usable columns after cleaning."
        )

    # =========================================================
    # 4. COLUMN MAPPING
    # =========================================================
    #
    # Converts business-specific column names into canonical
    # names used by InsightPilot.
    #
    # Example:
    #
    # "Total Revenue"  -> "revenue"
    # "Net Profit"     -> "profit"
    # "Employee Count" -> "employees"
    #

    column_mapping = map_columns(cleaned_df)

    print("========== COLUMN MAPPING ===========")
    print(column_mapping)
    print("=====================================")


    normalized_df = normalize_dataset(cleaned_df)

    print("========== AFTER NORMALIZATION =====")
    print(normalized_df.dtypes)
    print(normalized_df.head())
    print("====================================")

    if normalized_df.empty:
        raise ValueError(
            "Dataset contains no usable data after normalization."
        )

    # =========================================================
    # 6. KPI DETECTION
    # =========================================================
    #
    # Detect which business concepts are actually present.
    #
    # Example:
    #
    # revenue   -> Revenue column
    # profit    -> Profit column
    # employees -> Employees column
    # date      -> none
    #

    detected_kpis = detect_kpis(
        normalized_df,
        column_mapping,
    )

    # =========================================================
    # 7. ANALYSIS-LEVEL COLUMN QUALITY
    # =========================================================
    #
    # The original quality report tells us about the cleaned
    # uploaded dataset.
    #
    # This second report tells us how much usable data the
    # analytics engine actually has for each column.
    #
    # Business capability uses this information.
    #

    analysis_column_quality = _build_column_quality(
        normalized_df
    )

    # =========================================================
    # 8. DERIVED FIELDS
    # =========================================================
    #
    # Generate safe calculated fields only after cleaning,
    # mapping, and normalization.
    #

    derived_df = generate_derived_fields(
        normalized_df,
        detected_kpis,
    )

    # =========================================================
    # 9. DATASET PROFILING
    # =========================================================

    profile = profile_dataset(
        derived_df
    )

    # =========================================================
    # 10. BUSINESS CAPABILITY
    # =========================================================
    #
    # Determines what InsightPilot can actually analyze.
    #
    # Example:
    #
    # Revenue  -> partial
    # Profit   -> partial
    # Employees -> available
    # Growth   -> unavailable
    # Trend    -> unavailable
    #

    business_validation = validate_business_capability(
        detected_kpis,
        analysis_column_quality,
    )

    # =========================================================
    # 11. BUSINESS INTELLIGENCE
    # =========================================================
    #
    # Calculate deterministic business facts.
    #
    # The analytics engine, not AI, is responsible for
    # calculating these facts.
    #

    business_analysis = analyze_business(
        derived_df,
        detected_kpis,
    )

    # =========================================================
    # 12. BUSINESS HEALTH
    # =========================================================
    #
    # IMPORTANT:
    #
    # This currently calls the existing business-health module.
    #
    # We will rewrite business_health.py next so that Business
    # Health is NOT simply the Data Quality score.
    #

    business_health = calculate_analysis_readiness(
        detected_kpis,
        quality,
        business_validation,
    )

    # =========================================================
    # 13. DETERMINISTIC INSIGHTS
    # =========================================================

    insights = generate_insight(
        quality,
        business_analysis,
    )

    # =========================================================
    # 14. RECOMMENDATIONS
    # =========================================================

    recommendations = generate_recommendations(
        business_analysis,
        business_validation,
    )

    # =========================================================
    # 15. CHART DATA
    # =========================================================

    charts = generate_chart_data(
        derived_df,
        detected_kpis,
    )

    # =========================================================
    # 16. DASHBOARD DATA
    # =========================================================

    dashboard = generate_dashboard_data(
        business_analysis
    )

    # =========================================================
    # 17. BUILD FINAL RESPONSE
    # =========================================================

    profile["column_names"] = (
        derived_df.columns.tolist()
    )

    # -------------------------
    # Data Quality
    # -------------------------

    profile["data_quality"] = quality

    # -------------------------
    # KPI Detection
    # -------------------------

    profile["detected_kpis"] = detected_kpis

    # -------------------------
    # Business Capability
    # -------------------------

    profile["business_validation"] = (
        business_validation
    )

    # -------------------------
    # Business Analysis
    # -------------------------

    profile["business_analysis"] = (
        business_analysis
    )

    # -------------------------
    # Business Health
    # -------------------------

    profile["business_health"] = (
        business_health
    )

    # -------------------------
    # Insights
    # -------------------------

    profile["insights"] = insights

    # -------------------------
    # Recommendations
    # -------------------------

    profile["recommendations"] = (
        recommendations
    )

    # -------------------------
    # Derived Fields
    # -------------------------

    profile["derived_fields"] = [
        column
        for column in derived_df.columns
        if column not in normalized_df.columns
    ]

    # -------------------------
    # Charts
    # -------------------------

    profile["charts"] = charts

    # -------------------------
    # Dashboard
    # -------------------------

    profile["dashboard"] = dashboard

    # -------------------------
    # Analysis Column Quality
    # -------------------------
    #
    # This is useful for the frontend because it describes
    # coverage after mapping and normalization.
    #

    profile["analysis_column_quality"] = (
        analysis_column_quality
    )

    return profile