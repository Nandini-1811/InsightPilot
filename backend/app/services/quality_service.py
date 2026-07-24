import pandas as pd

def calculate_quality_score(df:pd.DataFrame):
    total_cells = df.shape[0] * df.shape[1]
    missing_cells = int(df.isnull().sum().sum())
    duplicate_rows = int(df.duplicated().sum())

    if(total_cells == 0):
        quality_score = 0
    else:
        missing_percentage = (missing_cells/total_cells) * 100
        duplicate_percentage = (duplicate_rows / len(df)) * 100 if len(df) > 0 else 0

        quality_score = 100 - missing_percentage - duplicate_percentage
        quality_score = round(max(0,quality_score),2)

    return {
        "quality_score" : quality_score,
        "total_cells" : total_cells,
        "missing_cells" : missing_cells,
        "duplicate_rows" : duplicate_rows
    }