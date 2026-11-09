import pandas as pd


def normalize_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """
    Prepare an already-cleaned dataset for analysis.

    Data cleaning and repair happen in data_quality_service.py.
    This stage should only perform lightweight structural
    normalization needed by downstream analytics.
    """

    normalized_df = df.copy()

    # Standardize column names for downstream processing.
    normalized_df.columns = [
        str(column).strip()
        for column in normalized_df.columns
    ]

    return normalized_df