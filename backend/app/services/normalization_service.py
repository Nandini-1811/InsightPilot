import re
import pandas as pd


def clean_numeric_value(value):

    if pd.isna(value):
        return value

    value = str(value).strip()

    # remove currency symbols
    value = value.replace("$", "")

    # remove commas
    value = value.replace(",", "")

    # remove percentage symbol
    value = value.replace("%", "")

    # remove spaces
    value = re.sub(r"\s+", "", value)

    return value



def normalize_dataset(df: pd.DataFrame):

    normalized_df = df.copy()


    # common missing values
    normalized_df.replace(
        [
            "",
            " ",
            "N/A",
            "n/a",
            "NA",
            "na",
            "-",
            "--",
            "null"
        ],
        pd.NA,
        inplace=True
    )


    for column in normalized_df.columns:

        if normalized_df[column].dtype == "object":

            normalized_df[column] = (
                normalized_df[column]
                .apply(clean_numeric_value)
            )


            converted = pd.to_numeric(
                normalized_df[column],
                errors="coerce"
            )


            # Only replace if conversion succeeded
            numeric_count = converted.notna().sum()
            original_count = normalized_df[column].notna().sum()


            if original_count > 0 and numeric_count / original_count > 0.7:
                normalized_df[column] = converted


    return normalized_df