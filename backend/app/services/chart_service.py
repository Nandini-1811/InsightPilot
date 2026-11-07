import pandas as pd


def get_label_column(df: pd.DataFrame) -> tuple[str | None, str]:
    """
    Find the best human-readable column to use as the chart label.
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
        str(column).strip().lower(): column
        for column in df.columns
    }

    for candidate, display_name in candidates.items():
        if candidate in columns:
            return columns[candidate], display_name

    return None, "Record"


def get_metric_unit(metric: str) -> str:
    """
    Return the display unit for a metric.
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
    label_name: str,
    aggregation: str | None = "sum",
):
    """
    Build the complete chart response for one KPI.

    Additive metrics can be aggregated by the detected
    label column.

    Snapshot/non-additive metrics can skip aggregation.
    """

    if metric_column not in df.columns:
        return None

    working_df = df.copy()

    working_df[metric_column] = pd.to_numeric(
        working_df[metric_column],
        errors="coerce",
    )

    working_df = working_df.dropna(
        subset=[metric_column]
    )

    if working_df.empty:
        return None

    # -------------------------------------------------
    # Additive metrics
    # -------------------------------------------------

    if (
        label_column
        and label_column in working_df.columns
        and aggregation == "sum"
    ):
        working_df[label_column] = (
            working_df[label_column]
            .fillna("Unknown")
            .astype(str)
            .str.strip()
        )

        working_df.loc[
            working_df[label_column] == "",
            label_column,
        ] = "Unknown"

        chart_df = (
            working_df
            .groupby(
                label_column,
                as_index=False,
            )[metric_column]
            .sum()
            .rename(
                columns={
                    label_column: "name",
                    metric_column: "value",
                }
            )
        )

    # -------------------------------------------------
    # Non-additive metrics
    # -------------------------------------------------

    else:
        chart_df = pd.DataFrame(
            {
                "name": [
                    str(row[label_column])
                    if label_column
                    else f"Record {index + 1}"
                    for index, row in working_df.iterrows()
                ],
                "value": [
                    float(value)
                    for value in working_df[metric_column]
                ],
            }
        )

    if chart_df.empty:
        return None

    chart_df["value"] = pd.to_numeric(
        chart_df["value"],
        errors="coerce",
    )

    chart_df["value"] = chart_df["value"].astype(float)

    chart_df = (
        chart_df
        .dropna(subset=["value"])
        .sort_values(
            "value",
            ascending=False,
        )
        .reset_index(drop=True)
    )

    if chart_df.empty:
        return None

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

        "labelName": label_name,

        "valueKey": "value",

        "summary": {
            "total": round(
                values.sum(),
                2,
            ),

            "average": round(
                values.mean(),
                2,
            ),

            "highest": {
                "name": str(
                    highest_row["name"]
                ),
                "value": round(
                    float(highest_row["value"]),
                    2,
                ),
            },

            "lowest": {
                "name": str(
                    lowest_row["name"]
                ),
                "value": round(
                    float(lowest_row["value"]),
                    2,
                ),
            },

            "records": int(
                len(chart_df)
            ),

            "topPerformer": str(
                highest_row["name"]
            ),

            "unit": get_metric_unit(
                metric_column.lower()
            ),
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
    Generate chart-ready data for every detected KPI.
    """

    charts = {}

    label_column, label_name = get_label_column(df)

    metric_mapping = {
        "revenue": {
            "title": "Revenue",
            "aggregation": "sum",
        },
        "profit": {
            "title": "Profit",
            "aggregation": "sum",
        },
        "cost": {
            "title": "Cost",
            "aggregation": "sum",
        },
        "expenses": {
            "title": "Expenses",
            "aggregation": "sum",
        },
        "sales": {
            "title": "Sales",
            "aggregation": "sum",
        },
        "orders": {
            "title": "Orders",
            "aggregation": "sum",
        },
        "customers": {
            "title": "Customers",
            "aggregation": None,
        },
        "employees": {
            "title": "Employees",
            "aggregation": None,
        },
        "growth": {
            "title": "Growth",
            "aggregation": None,
        },
        "margin": {
            "title": "Margin",
            "aggregation": None,
        },
    }

    for metric_key, definition in metric_mapping.items():

        detected = detected_kpis.get(
            metric_key,
            [],
        )

        if not detected:
            continue

        metric_column = detected[0].get(
            "column"
        )

        if (
            not metric_column
            or metric_column not in df.columns
        ):
            continue

        metric_chart = build_metric_chart(
            df=df,
            metric_column=metric_column,
            metric_title=definition["title"],
            label_column=label_column,
            label_name=label_name,
            aggregation=definition["aggregation"],
        )

        if metric_chart:
            charts[metric_key] = metric_chart

    return charts