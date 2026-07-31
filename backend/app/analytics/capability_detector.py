from app.analytics.kpi_keywords import KPI_KEYWORDS


def detect_kpis(df):

    detected_kpis = {
        kpi: []
        for kpi in KPI_KEYWORDS
    }

    columns_lower = [
        column.strip().lower()
        for column in df.columns
    ]


    for column in df.columns:

        column_lower = column.strip().lower()


        # -------------------------
        # Customer Detection
        # -------------------------

        if column_lower in [
            "customer_id",
            "customerid"
        ]:
            detected_kpis["customer"].append({
                "column": column,
                "dtype": str(df[column].dtype)
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
                    "brand"
                ]
            )
        ):
            detected_kpis["customer"].append({
                "column": column,
                "dtype": str(df[column].dtype)
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
            "sku"
        ]:
            detected_kpis["product"].append({
                "column": column,
                "dtype": str(df[column].dtype)
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
                    "sku"
                ]
            )
        ):
            detected_kpis["product"].append({
                "column": column,
                "dtype": str(df[column].dtype)
            })
            continue



        # -------------------------
        # Other KPI Detection
        # -------------------------

        for kpi, keywords in KPI_KEYWORDS.items():

            if kpi in [
                "customer",
                "product"
            ]:
                continue


            if any(
                keyword in column_lower
                for keyword in keywords
            ):

                detected_kpis[kpi].append({
                    "column": column,
                    "dtype": str(df[column].dtype)
                })

                break


    return detected_kpis