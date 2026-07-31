def _get_column(detected_kpis, kpi):
    if detected_kpis.get(kpi):
        return detected_kpis[kpi][0]["column"]
    return None


def _calculate_numeric_statistics(df, column):
    return {
        "total": float(df[column].sum()),
        "average": float(df[column].mean()),
        "maximum": float(df[column].max()),
        "minimum": float(df[column].min())
    }


def _calculate_snapshot_statistics(df, column):
    return {
        "average": float(df[column].mean()),
        "maximum": float(df[column].max()),
        "minimum": float(df[column].min())
    }


def _calculate_percentage_statistics(df, column):
    return {
        "average": float(df[column].mean()),
        "maximum": float(df[column].max()),
        "minimum": float(df[column].min())
    }

def _calculate_customer_statistics(df, column):
    return {
        "total_customers": int(df[column].count()),
        "unique_customers": int(df[column].nunique()),
    }


def _calculate_product_statistics(df, column):
    return {
        "records": int(df[column].count()),
        "unique_products": int(df[column].nunique()),
        "duplicate_products": int(
            df[column].count() - df[column].nunique()
        )
    }

def _get_best_column(detected_kpis, kpi, priority_keywords=None):

    columns = detected_kpis.get(kpi, [])

    if not columns:
        return None

    if priority_keywords:
        for item in columns:
            column_lower = item["column"].lower()

            for keyword in priority_keywords:
                if keyword in column_lower:
                    return item["column"]

    return columns[0]["column"]

def analyze_business(df, detected_kpis):
    analysis = {}

    # Revenue
    revenue_col = _get_column(detected_kpis, "revenue")
    if revenue_col:
        analysis["revenue"] = _calculate_numeric_statistics(
            df,
            revenue_col
        )

    # Profit
    profit_col = _get_column(detected_kpis, "profit")
    if profit_col:
        analysis["profit"] = _calculate_numeric_statistics(
            df,
            profit_col
        )

    # Sales
    sales_cols = detected_kpis.get("sales")

    if sales_cols:
        sales_column = None

        for item in sales_cols:
            if "global" in item["column"].lower():
                sales_column = item["column"]
                break

        if not sales_column:
            sales_column = sales_cols[0]["column"]

        analysis["sales"] = _calculate_numeric_statistics(
            df,
            sales_column
        )

    # Cost
    cost_col = _get_column(detected_kpis, "cost")
    if cost_col:
        analysis["cost"] = _calculate_numeric_statistics(
            df,
            cost_col
        )

    # Employees
    employee_col = _get_column(detected_kpis, "employees")
    if employee_col:
        analysis["employees"] = _calculate_snapshot_statistics(
            df,
            employee_col
        )

    # Growth
    growth_col = _get_column(detected_kpis, "growth")
    if growth_col:
        analysis["growth"] = _calculate_percentage_statistics(
            df,
            growth_col
        )

    customer_col = _get_column(detected_kpis, "customer")
    if customer_col:
        analysis["customer"] = _calculate_customer_statistics(
            df,
            customer_col
        )

    product_col = _get_best_column(
        detected_kpis,
        "product",
        [
            "product id",
            "sku",
            "product",
            "item",
            "name"
        ]
    )
    if product_col:
        analysis["product"] = _calculate_product_statistics(
            df,
            product_col
        )

    return analysis