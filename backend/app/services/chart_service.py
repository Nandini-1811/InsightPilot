import pandas as pd


def get_label_column(df: pd.DataFrame) -> tuple[str | None, str]:
    """
    Returns:
    (actual_column_name, display_name)
    """

    candidates = {
        "company": "Company",
        "name": "Company",
        "product": "Product",
        "category": "Category",
        "brand": "Brand",
        "customer": "Customer",
        "industry": "Industry",
        "region": "Region",
        "city": "City",
        "state": "State",
        "country": "Country",
        "headquarters": "Headquarters",
    }

    columns = {
        column.lower(): column
        for column in df.columns
    }

    for candidate, display_name in candidates.items():
        if candidate in columns:
            return columns[candidate], display_name

    return None, "Record"


def get_metric_unit(metric: str) -> str:
    """
    Display unit for each KPI.
    """

    units = {
        "revenue": "currency",
        "profit": "currency",
        "cost": "currency",
        "expenses": "currency",
        "sales": "number",
        "orders": "number",
        "customers": "number",
        "employees": "number",
        "growth": "percentage",
        "margin": "percentage",
    }

    return units.get(metric, "number")


def build_metric_chart(
    df: pd.DataFrame,
    metric_column: str,
    metric_title: str,
    label_column: str | None,
):
    """
    Builds the complete chart response for a KPI.
    """

    rows = []

    for index, row in df.iterrows():

        value = row[metric_column]

        if pd.isna(value):
            continue

        label = (
            str(row[label_column])
            if label_column
            else f"Record {index + 1}"
        )

        rows.append(
            {
                "name": label,
                "value": float(value),
            }
        )

    if not rows:
        return None

    chart_df = (
        pd.DataFrame(rows)
        .sort_values("value", ascending=False)
        .reset_index(drop=True)
    )

    values = chart_df["value"]

    highest_row = chart_df.iloc[0]
    lowest_row = chart_df.iloc[-1]

    dataset = chart_df.to_dict("records")

    return {
        "id": metric_column,

        "title": metric_title,

        "displayName": metric_title,

        "defaultChart": "bar",

        "defaultFilter": "top10",

        "availableCharts": [
            "bar",
            "line",
            "area",
            "pie",
        ],

        "labelKey": "name",

        "valueKey": "value",

        "summary": {
            "total": round(values.sum(), 2),

            "average": round(values.mean(), 2),

            "highest": {
                "label": highest_row["name"],
                "value": round(highest_row["value"], 2),
            },

            "lowest": {
                "label": lowest_row["name"],
                "value": round(lowest_row["value"], 2),
            },

            "records": len(chart_df),

            "topPerformer": highest_row["name"],

            "unit": get_metric_unit(metric_column),
        },

        "charts": {

            "bar": {
                "xKey": "name",
                "yKey": "value",
                "data": dataset,
            },

            "line": {
                "xKey": "name",
                "yKey": "value",
                "data": dataset,
            },

            "area": {
                "xKey": "name",
                "yKey": "value",
                "data": dataset,
            },

            "pie": {
                "nameKey": "name",
                "valueKey": "value",
                "data": dataset,
            },
        },
    }


def generate_chart_data(
    df: pd.DataFrame,
    detected_kpis: dict,
):
    """
    Generates chart-ready data for every detected KPI.

    Backend responsibilities:
    - Detect available KPIs
    - Generate summary statistics
    - Return complete datasets
    - Support multiple chart types

    Frontend responsibilities:
    - Top 5 / Top 10 / Top 20 / All
    - Chart switching
    - Metric switching
    - Animations
    """

    charts = {}

    label_column, _ = get_label_column(df)

    metric_mapping = {

        "revenue": "Revenue",

        "profit": "Profit",

        "cost": "Cost",

        "expenses": "Expenses",

        "sales": "Sales",

        "orders": "Orders",

        "customers": "Customers",

        "employees": "Employees",

        "growth": "Growth",

        "margin": "Margin",
    }

    for metric_key, metric_title in metric_mapping.items():

        if (
            detected_kpis.get(metric_key)
            and metric_key in df.columns
        ):

            metric_chart = build_metric_chart(
                df=df,
                metric_column=metric_key,
                metric_title=metric_title,
                label_column=label_column,
            )

            if metric_chart:
                charts[metric_key] = metric_chart

    return charts