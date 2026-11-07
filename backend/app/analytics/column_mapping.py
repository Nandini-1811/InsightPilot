COLUMN_MAPPINGS = {
    "revenue": [
        "revenue",
        "sales amount",
        "total revenue",
        "revenue (usd millions)",
    ],
    "profit": [
        "profit",
        "net profit",
    ],
    "sales": [
        "sales",
        "orders",
    ],
    "cost": [
        "cost",
        "expense",
    ],
    "employees": [
        "employees",
        "employee count",
    ],
    "date": [
        "date",
        "order date",
    ],
}


ALIAS_TO_CANONICAL = {
    alias: canonical
    for canonical, aliases in COLUMN_MAPPINGS.items()
    for alias in aliases
}


def map_columns(df):
    """
    Map columns to semantic meanings without renaming them.

    Example:
        'Revenue' -> 'revenue'
        'Employee Count' -> 'employees'

    The original DataFrame column names are preserved.
    """

    column_mapping = {}

    for column in df.columns:
        normalized = str(column).strip().lower()

        canonical = ALIAS_TO_CANONICAL.get(normalized)

        if canonical:
            column_mapping[column] = canonical

    return column_mapping