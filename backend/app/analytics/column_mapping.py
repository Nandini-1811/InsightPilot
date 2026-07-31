COLUMN_MAPPINGS = {
    "revenue": [
        "revenue",
        "sales amount",
        "total revenue",
        "revenue (usd millions)"
    ],
    "profit": [
        "profit",
        "net profit"
    ],
    "sales": [
        "sales",
        "orders"
    ],
    "cost": [
        "cost",
        "expense"
    ],
    "employees": [
        "employees",
        "employee count"
    ],
    "date": [
        "date",
        "order date"
    ]
}

ALIAS_TO_CANONICAL = {
    alias: canonical
    for canonical, aliases in COLUMN_MAPPINGS.items()
    for alias in aliases
}


def map_columns(df):
    rename_columns = {}

    for column in df.columns:
        normalized = column.strip().lower()

        canonical = ALIAS_TO_CANONICAL.get(normalized)

        if canonical:
            rename_columns[column] = canonical

    return df.rename(columns=rename_columns)