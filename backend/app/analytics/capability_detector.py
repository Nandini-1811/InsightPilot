from app.analytics.kpi_keywords import KPI_KEYWORDS


def detect_kpis(df, column_mapping=None):
    """
    Detect business KPIs using the semantic column mapping.

    column_mapping should look like:

        {
            "Revenue": "revenue",
            "Employee Count": "employees"
        }

    The original DataFrame column names are preserved.
    """

    detected_kpis = {
        kpi: []
        for kpi in KPI_KEYWORDS
    }

    column_mapping = column_mapping or {}

    columns_lower = [
        str(column).strip().lower()
        for column in df.columns
    ]

    for column in df.columns:

        column_lower = str(column).strip().lower()

        # -------------------------
        # Customer Detection
        # -------------------------

        if column_lower in [
            "customer_id",
            "customerid",
            "customer id",
        ]:
            detected_kpis["customer"].append({
                "column": column,
                "dtype": str(df[column].dtype),
            })
            continue

        if (
            column_lower == "id"
            and "name" in columns_lower
            and not any(
                x in columns_lower
                for x in [
                    "price",
                    "stock",
                    "category",
                    "brand",
                ]
            )
        ):
            detected_kpis["customer"].append({
                "column": column,
                "dtype": str(df[column].dtype),
            })
            continue

        # -------------------------
        # Product Detection
        # -------------------------

        if column_lower in [
            "product",
            "product_id",
            "product_name",
            "item",
            "sku",
        ]:
            detected_kpis["product"].append({
                "column": column,
                "dtype": str(df[column].dtype),
            })
            continue

        if (
            column_lower == "name"
            and any(
                x in columns_lower
                for x in [
                    "price",
                    "stock",
                    "category",
                    "brand",
                    "sku",
                ]
            )
        ):
            detected_kpis["product"].append({
                "column": column,
                "dtype": str(df[column].dtype),
            })
            continue

        # -------------------------
        # Semantic Mapping
        # -------------------------

        canonical_kpi = column_mapping.get(column)

        if canonical_kpi:
            detected_kpis[canonical_kpi].append({
                "column": column,
                "dtype": str(df[column].dtype),
            })

    return detected_kpis