import re
import pandas as pd

def clean_numeric_value(value):
    if pd.isna(value):
        return value
    value = str(value).strip()

    value = value.replace("$","")
    value = value.replace(",","")
    value = value.replace("%","")

    value = re.sub(r"\s+","",value)

    return value



def normalize_dataset(df : pd.DataFrame):
    normalized_df = df.copy()

    #Replace common null values
    normalized_df.replace(
        [""," ","N/A","n/a","NA","-","--"],
        pd.NA,
        inplace=True
    )

    for column in normalized_df.columns:
        if normalized_df[column].dtype == "object":
            normalized_df[column] = normalized_df[column].apply(clean_numeric_value)
            normalized_df[column] = pd.to_numeric(
                normalized_df[column],
                errors="ignore"
            )


    return normalized_df