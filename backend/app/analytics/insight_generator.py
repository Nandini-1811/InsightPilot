import pandas as pd


def _safe_value(value):
    """
    Prevent None / NaN values from breaking insight generation.
    """
    if value is None or pd.isna(value):
        return 0.0

    return float(value)


def _data_quality_insight(data_quality):

    if data_quality["quality_score"] == 100:
        return {
            "type": "success",
            "title": "Excellent Data Quality",
            "message": (
                "No missing values or duplicate rows were detected. "
                "Your dataset is ready for analysis."
            )
        }

    return {
        "type": "warning",
        "title": "Missing Data Detected",
        "message": (
            f"Your dataset contains {data_quality['missing_cells']} "
            "missing values which may affect the analysis."
        )
    }


def _numeric_summary_insight(title, metric_name, stats):

    total = _safe_value(stats.get("total"))
    average = _safe_value(stats.get("average"))

    if total == 0 and average == 0:
        return {
            "type": "warning",
            "title": title,
            "message": (
                f"{metric_name.capitalize()} data was detected, "
                "but meaningful numeric values were unavailable."
            )
        }

    return {
        "type": "success",
        "title": title,
        "message": (
            f"Total {metric_name} is {total:,.2f} "
            f"with an average of {average:,.2f} per record."
        )
    }


def _snapshot_summary_insight(title, metric_name, stats):

    average = _safe_value(stats.get("average"))
    minimum = _safe_value(stats.get("minimum"))
    maximum = _safe_value(stats.get("maximum"))

    return {
        "type": "info",
        "title": title,
        "message": (
            f"Average {metric_name} is {average:,.2f}. "
            f"It ranges from {minimum:,.2f} "
            f"to {maximum:,.2f}."
        )
    }


def _growth_summary_insight(stats):

    average = _safe_value(stats.get("average"))
    minimum = _safe_value(stats.get("minimum"))
    maximum = _safe_value(stats.get("maximum"))

    return {
        "type": "info",
        "title": "Growth Overview",
        "message": (
            f"Average growth is {average:.2f}% "
            f"with values ranging from {minimum:.2f}% "
            f"to {maximum:.2f}%."
        )
    }


def generate_insight(data_quality, business_analysis):

    insights = []

    # Data Quality
    insights.append(
        _data_quality_insight(data_quality)
    )


    # Revenue
    revenue = business_analysis.get("revenue")

    if revenue:
        insights.append(
            _numeric_summary_insight(
                "Revenue Overview",
                "revenue",
                revenue
            )
        )


    # Profit
    profit = business_analysis.get("profit")

    if profit:
        insights.append(
            _numeric_summary_insight(
                "Profit Overview",
                "profit",
                profit
            )
        )


    # Sales
    sales = business_analysis.get("sales")

    if sales:
        insights.append(
            _numeric_summary_insight(
                "Sales Overview",
                "sales",
                sales
            )
        )


    # Cost
    cost = business_analysis.get("cost")

    if cost:
        insights.append(
            _numeric_summary_insight(
                "Cost Overview",
                "cost",
                cost
            )
        )


    # Employees
    employees = business_analysis.get("employees")

    if employees:
        insights.append(
            _snapshot_summary_insight(
                "Employee Overview",
                "employee count",
                employees
            )
        )


    # Growth
    growth = business_analysis.get("growth")

    if growth:
        insights.append(
            _growth_summary_insight(growth)
        )


    return insights