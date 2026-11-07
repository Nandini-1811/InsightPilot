import re
from typing import Any

import pandas as pd

# ---------------------------------------------------------
# Common values that should be treated as missing
# ---------------------------------------------------------

MISSING_TOKENS = {
    "",
    " ",
    "n/a",
    "na",
    "n.a.",
    "null",
    "none",
    "-",
    "--",
    "unknown",
}

# ---------------------------------------------------------
# Helpers
# ---------------------------------------------------------
def _is_missing(value: Any) -> bool:
    """
    Safely determine whether a value is missing.
    """

    if value is None:
        return True
    try:
        return bool(pd.isna(value))
    except (TypeError, ValueError):
        return False


def _normalize_missing_value(value: Any) -> Any:
    """
    Convert common textual representations of missing values
    into pandas.NA.
    """

    if _is_missing(value):
        return pd.NA

    if isinstance(value, str):
        cleaned = value.strip()

        if cleaned.lower() in MISSING_TOKENS:
            return pd.NA

        return cleaned

    return value


def _clean_numeric_string(value: Any) -> Any:
    """
    Clean common numeric formatting without inventing values.

    Examples:

        "$1,250"   -> "1250"
        "1,250"    -> "1250"
        "12%"      -> "12"
        "(500)"    -> "-500"
    """

    if _is_missing(value):
        return pd.NA

    if not isinstance(value, str):
        return value

    value = value.strip()

    if not value:
        return pd.NA

    # Parentheses are commonly used to represent negatives.
    is_negative = (
        value.startswith("(")
        and value.endswith(")")
    )

    if is_negative:
        value = value[1:-1]

    # Remove common currency symbols.
    value = re.sub(
        r"[$€£₹]",
        "",
        value,
    )

    # Remove percentage symbol.
    value = value.replace("%", "")

    # Remove thousands separators.
    value = value.replace(",", "")

    # Remove whitespace.
    value = re.sub(r"\s+", "", value)

    if is_negative:
        value = f"-{value}"

    return value


def _try_numeric_conversion(
    series: pd.Series,
) -> tuple[pd.Series, int]:
    """
    Attempt numeric conversion.

    Returns:
        converted_series
        number_of_values_that_became_missing
    """

    cleaned = series.apply(_clean_numeric_string)

    original_non_missing = cleaned.notna()

    converted = pd.to_numeric(
        cleaned,
        errors="coerce",
    )

    newly_invalid = (
        original_non_missing
        & converted.isna()
    )

    return converted, int(newly_invalid.sum())


# ---------------------------------------------------------
# Main data quality engine
# ---------------------------------------------------------

def clean_dataset(
    df: pd.DataFrame,
) -> tuple[pd.DataFrame, dict]:
    """
    Diagnose and safely repair a dataframe.

    Returns:
        cleaned dataframe
        quality report
    """

    cleaned_df = df.copy()

    repairs: list[dict] = []
    remaining_issues: list[dict] = []

    original_rows = len(cleaned_df)
    original_columns = len(cleaned_df.columns)

    # -----------------------------------------------------
    # 1. Normalize column names
    # -----------------------------------------------------

    cleaned_column_names = []

    for column in cleaned_df.columns:

        if isinstance(column, str):
            new_column = column.strip()
        else:
            new_column = str(column).strip()

        cleaned_column_names.append(new_column)

    cleaned_df.columns = cleaned_column_names

    # -----------------------------------------------------
    # 2. Handle duplicate column names
    # -----------------------------------------------------

    duplicate_name_groups = {}

    for index, column in enumerate(cleaned_df.columns):
        normalized_name = re.sub(
            r"\.\d+$",
            "",
            str(column).strip().lower(),
        )

        duplicate_name_groups.setdefault(
            normalized_name,
            []
        ).append(index)


    columns_to_drop = []

    for normalized_name, indexes in duplicate_name_groups.items():

        if len(indexes) <= 1:
            continue

        first_index = indexes[0]
        first_column = cleaned_df.columns[first_index]

        for duplicate_index in indexes[1:]:

            duplicate_column = cleaned_df.columns[duplicate_index]

            same_values = cleaned_df[first_column].equals(
                cleaned_df[duplicate_column]
            )

            if same_values:

                columns_to_drop.append(
                    duplicate_column
                )

                repairs.append(
                    {
                        "type": "duplicate_column",
                        "column": duplicate_column,
                        "action": "removed",
                        "reason": (
                            f"Column contains the same values as "
                            f"'{first_column}'."
                        ),
                        "count": 1,
                    }
                )

            else:

                remaining_issues.append(
                    {
                        "type": "duplicate_column_name",
                        "column": duplicate_column,
                        "severity": "warning",
                        "message": (
                            f"'{duplicate_column}' has the same name "
                            f"as '{first_column}' but contains different "
                            "values. The column was retained."
                        ),
                    }
                )


    if columns_to_drop:
        cleaned_df = cleaned_df.drop(
            columns=columns_to_drop
        )

    # -----------------------------------------------------
    # 3. Normalize missing values and whitespace
    # -----------------------------------------------------

    for column in cleaned_df.columns:

        if cleaned_df[column].dtype == "object":

            original_series = cleaned_df[column].copy()

            cleaned_series = cleaned_df[column].apply(
                _normalize_missing_value
            )

            changed_count = int(
                (
                    original_series.astype("string")
                    != cleaned_series.astype("string")
                ).fillna(False).sum()
            )

            if changed_count > 0:

                repairs.append(
                    {
                        "type": "missing_value_normalization",
                        "column": column,
                        "action": "normalized",
                        "count": changed_count,
                    }
                )

            cleaned_df[column] = cleaned_series

    # -----------------------------------------------------
    # 4. Remove completely empty columns
    # -----------------------------------------------------

    empty_columns = [
        column
        for column in cleaned_df.columns
        if cleaned_df[column].isna().all()
    ]

    for column in empty_columns:

        repairs.append(
            {
                "type": "empty_column",
                "column": column,
                "action": "removed",
                "count": 1,
            }
        )

    if empty_columns:
        cleaned_df = cleaned_df.drop(
            columns=empty_columns
        )

    # -----------------------------------------------------
    # 5. Remove exact duplicate rows
    # -----------------------------------------------------

    duplicate_count = int(
        cleaned_df.duplicated().sum()
    )

    if duplicate_count > 0:

        cleaned_df = cleaned_df.drop_duplicates(
            keep="first"
        ).reset_index(drop=True)

        repairs.append(
            {
                "type": "duplicate_rows",
                "action": "removed",
                "count": duplicate_count,
            }
        )

    # -----------------------------------------------------
    # 6. Safely detect numeric-looking columns
    # -----------------------------------------------------

    NUMERIC_COLUMN_HINTS = {
        "revenue",
        "sales",
        "profit",
        "cost",
        "income",
        "expense",
        "price",
        "amount",
        "salary",
        "employees",
        "employee",
        "quantity",
        "units",
        "growth",
        "margin",
    }


    for column in cleaned_df.columns:
        series = cleaned_df[column]

        if not (series.dtype == "object" or pd.api.types.is_string_dtype(series)):
            continue

        non_missing = series.dropna()

        if len(non_missing) == 0:
            continue

        normalized_column_name = (
            str(column)
            .strip()
            .lower()
            .replace("_", " ")
            .replace("-", " ")
        )

        is_numeric_candidate = any(
            hint in normalized_column_name
            for hint in NUMERIC_COLUMN_HINTS
        )

        converted, newly_invalid = _try_numeric_conversion(series)

        valid_numeric_count = int(converted.notna().sum())
        total_non_missing = len(non_missing)

        numeric_ratio = (
            valid_numeric_count / total_non_missing
            if total_non_missing > 0
            else 0
        )

        if is_numeric_candidate or numeric_ratio >= 0.95:

            if newly_invalid > 0:
                cleaned_df[column] = converted

                repairs.append({
                    "type": "invalid_numeric_values",
                    "column": column,
                    "action": "converted_to_missing",
                    "count": newly_invalid,
                })

            else:
                cleaned_df[column] = converted

            repairs.append({
                "type": "numeric_normalization",
                "column": column,
                "action": "converted",
                "count": valid_numeric_count,
            })

    # -----------------------------------------------------
    # 7. Remaining missing values
    # -----------------------------------------------------

    for column in cleaned_df.columns:

        missing_count = int(
            cleaned_df[column].isna().sum()
        )

        if missing_count > 0:

            remaining_issues.append(
                {
                    "type": "missing_values",
                    "column": column,
                    "count": missing_count,
                    "severity": "warning",
                    "message": (
                        f"{missing_count} values remain missing "
                        f"in '{column}'."
                    ),
                }
            )

    # -----------------------------------------------------
    # 8. Calculate quality dimensions
    # -----------------------------------------------------

    total_cells = (
        cleaned_df.shape[0]
        * cleaned_df.shape[1]
    )

    missing_cells = int(
        cleaned_df.isna().sum().sum()
    )

    duplicate_rows_remaining = int(
        cleaned_df.duplicated().sum()
    )

    column_quality = {}

    for column in cleaned_df.columns:

        total_values = len(cleaned_df)

        missing_count = int(
            cleaned_df[column].isna().sum()
        )

        non_missing_count = (
            total_values - missing_count
        )

        coverage = (
            round(
                (non_missing_count / total_values) * 100,
                2,
            )
            if total_values > 0
            else 0.0
        )

        column_quality[column] = {
            "missing": missing_count,
            "non_missing": non_missing_count,
            "coverage": coverage,
        }

    if total_cells > 0:
        completeness = round(
            (
                1
                - missing_cells / total_cells
            )
            * 100,
            2,
        )
    else:
        completeness = 0.0

    if len(cleaned_df) > 0:
        uniqueness = round(
            (
                1
                - duplicate_rows_remaining
                / len(cleaned_df)
            )
            * 100,
            2,
        )
    else:
        uniqueness = 0.0

    invalid_numeric_count = sum(
        repair.get("count", 0)
        for repair in repairs
        if repair["type"] == "invalid_numeric_values"
    )

    valid_numeric_cells = 0

    for column in cleaned_df.columns:
        normalized_column_name = (
            str(column)
            .strip()
            .lower()
            .replace("_", " ")
            .replace("-", " ")
        )

        is_numeric_candidate = any(
            hint in normalized_column_name
            for hint in NUMERIC_COLUMN_HINTS
        )

        if is_numeric_candidate:
            valid_numeric_cells += int(
                cleaned_df[column].notna().sum()
            )

    numeric_candidate_values = (
        valid_numeric_cells + invalid_numeric_count
    )

    if numeric_candidate_values > 0:
        validity = round(
            (
                1
                - invalid_numeric_count / numeric_candidate_values
            ) * 100,
            2,
        )
    else:
        validity = 100.0

    # -----------------------------------------------------
    # Structural quality
    # -----------------------------------------------------

    structural_issue_count = sum(
        1
        for issue in remaining_issues
        if issue["type"] in {
            "duplicate_column_name",
        }
    )

    if structural_issue_count == 0:
        structural_quality = 100.0
    else:
        structural_quality = max(
            0.0,
            round(
                100
                - (
                    structural_issue_count
                    / max(len(cleaned_df.columns), 1)
                    * 100
                ),
                2,
            ),
        )

    quality_score = round(
        (
            completeness * 0.35
            + uniqueness * 0.20
            + validity * 0.35
            + structural_quality * 0.10
        ),
        2,
    )

    # -----------------------------------------------------
    # 9. Final report
    # -----------------------------------------------------

    quality_report = {
        "quality_score": quality_score,

        "missing_cells": missing_cells,

        "dimensions": {
            "completeness": completeness,
            "uniqueness": uniqueness,
            "validity": validity,
            "structural_quality": structural_quality,
        },

        "column_quality": column_quality,

        "before": {
            "rows": original_rows,
            "columns": original_columns,
        },

        "after": {
            "rows": len(cleaned_df),
            "columns": len(cleaned_df.columns),
        },

        "summary": {
            "repairs_applied": len(repairs),
            "remaining_issue_types": len(remaining_issues),
            "values_changed": sum(
                repair.get("count", 0)
                for repair in repairs
                if repair["type"] != "numeric_normalization"
            ),
            "values_remaining": sum(
                issue.get("count", 0)
                for issue in remaining_issues
            ),
        },

        "repairs": repairs,

        "remaining_issues": remaining_issues,

        "cleaned": len(repairs) > 0,
    }
    return cleaned_df, quality_report
