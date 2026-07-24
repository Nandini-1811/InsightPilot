import pandas as pd

def profile_dataset(df: pd.DataFrame):
    profile = {
        "rows" : len(df),
        "columns" : len(df.columns),
        "missing_values": int(df.isnull().sum().sum()),
        "duplicate_rows": int(df.duplicated().sum()),
        "memory_usage_kb" : round(df.memory_usage(deep=True).sum()/1024,2),
        "column_types" : {}
    }

    for column in df.columns:
        profile["column_types"][column] = str(df[column].dtype)

    return profile
