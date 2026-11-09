import math

import pandas as pd


def _get_column(detected_kpis, kpi):
    """
    Return the first detected source column for a KPI.
    """

    if detected_kpis.get(kpi):
        return detected_kpis[kpi][0]["column"]

    return None


def _safe_float(value):
    """
    Convert numeric values to plain Python floats.

    Returns None for missing or NaN values.
    """

    if value is None:
        return None

    if isinstance(value, float) and math.isnan(value):
        return None

    return float(value)


def _calculate_numeric_statistics(
    df,
    column,
):
    """
    Calculate basic statistics for a numeric business metric.

    The original DataFrame is NOT modified.
    """

    numeric_series = pd.to_numeric(
        df[column],
        errors="coerce",
    )

    valid_values = numeric_series.dropna()

    if valid_values.empty:
        return {
            "total": None,
            "average": None,
            "maximum": None,
            "minimum": None,
        }

    return {
        "total": _safe_float(
            valid_values.sum()
        ),
        "average": _safe_float(
            valid_values.mean()
        ),
        "maximum": _safe_float(
            valid_values.max()
        ),
        "minimum": _safe_float(
            valid_values.min()
        ),
    }


def _calculate_snapshot_statistics(
    df,
    column,
):
    """
    Calculate statistics for snapshot-style metrics,
    such as employee count.
    """

    numeric_series = pd.to_numeric(
        df[column],
        errors="coerce",
    )

    valid_values = numeric_series.dropna()

    if valid_values.empty:
        return {
            "average": None,
            "maximum": None,
            "minimum": None,
        }

    return {
        "average": _safe_float(
            valid_values.mean()
        ),
        "maximum": _safe_float(
            valid_values.max()
        ),
        "minimum": _safe_float(
            valid_values.min()
        ),
    }


def _calculate_percentage_statistics(
    df,
    column,
):
    """
    Calculate statistics for percentage-style metrics,
    such as growth rate.
    """

    numeric_series = pd.to_numeric(
        df[column],
        errors="coerce",
    )

    valid_values = numeric_series.dropna()

    if valid_values.empty:
        return {
            "average": None,
            "maximum": None,
            "minimum": None,
        }

    return {
        "average": _safe_float(
            valid_values.mean()
        ),
        "maximum": _safe_float(
            valid_values.max()
        ),
        "minimum": _safe_float(
            valid_values.min()
        ),
    }


def _calculate_customer_statistics(
    df,
    column,
):
    """
    Calculate customer record and uniqueness statistics.
    """

    valid_values = df[column].dropna()

    return {
        "total_customers": int(
            valid_values.count()
        ),
        "unique_customers": int(
            valid_values.nunique()
        ),
    }


def _calculate_product_statistics(
    df,
    column,
):
    """
    Calculate product record and uniqueness statistics.
    """

    valid_values = df[column].dropna()

    records = int(
        valid_values.count()
    )

    unique_products = int(
        valid_values.nunique()
    )

    return {
        "records": records,
        "unique_products": unique_products,
    }


def _get_best_column(
    detected_kpis,
    kpi,
    priority_keywords=None,
):
    """
    Select the most appropriate column when
    multiple columns were detected for a KPI.
    """

    columns = detected_kpis.get(kpi, [])

    if not columns:
        return None

    if priority_keywords:
        for item in columns:
            column_name = str(
                item["column"]
            ).lower()

            for keyword in priority_keywords:
                if keyword in column_name:
                    return item["column"]

    return columns[0]["column"]


def _calculate_profit_margin(
    df,
    revenue_column,
    profit_column,
):
    """
    Calculate overall profit margin.

    Formula:

        Profit Margin =
            Total Profit / Total Revenue * 100
    """

    revenue = pd.to_numeric(
        df[revenue_column],
        errors="coerce",
    )

    profit = pd.to_numeric(
        df[profit_column],
        errors="coerce",
    )

    valid = (
        revenue.notna()
        & profit.notna()
        & (revenue != 0)
    )

    if not valid.any():
        return None

    total_revenue = revenue[valid].sum()
    total_profit = profit[valid].sum()

    if total_revenue == 0:
        return None

    margin = (
        total_profit
        / total_revenue
        * 100
    )

    return {
        "value": _safe_float(margin),
        "formula": "profit / revenue * 100",
        "revenue": _safe_float(
            total_revenue
        ),
        "profit": _safe_float(
            total_profit
        ),
    }


def _calculate_cost_revenue_ratio(
    df,
    revenue_column,
    cost_column,
):
    """
    Calculate cost as a percentage of revenue.

    Formula:

        Cost / Revenue * 100
    """

    revenue = pd.to_numeric(
        df[revenue_column],
        errors="coerce",
    )

    cost = pd.to_numeric(
        df[cost_column],
        errors="coerce",
    )

    valid = (
        revenue.notna()
        & cost.notna()
        & (revenue != 0)
    )

    if not valid.any():
        return None

    total_revenue = revenue[valid].sum()
    total_cost = cost[valid].sum()

    if total_revenue == 0:
        return None

    ratio = (
        total_cost
        / total_revenue
        * 100
    )

    return {
        "value": _safe_float(ratio),
        "formula": "cost / revenue * 100",
        "revenue": _safe_float(
            total_revenue
        ),
        "cost": _safe_float(
            total_cost
        ),
    }


def _calculate_per_unit_metric(
    numerator,
    denominator,
    formula,
):
    """
    Calculate a ratio between an aggregated business
    metric and a meaningful business unit.

    Returns None when the denominator is unavailable
    or zero.
    """

    if numerator is None:
        return None

    if denominator is None:
        return None

    if denominator == 0:
        return None

    return {
        "value": _safe_float(
            numerator / denominator
        ),
        "formula": formula,
        "numerator": _safe_float(
            numerator
        ),
        "denominator": _safe_float(
            denominator
        ),
    }


def analyze_business(
    df,
    detected_kpis,
):
    """
    Perform deterministic business analysis.

    This layer calculates facts from the dataset.
    It does NOT use AI and does NOT make subjective
    business-health judgments.

    Derived metrics are only calculated when the
    required source data is available.
    """

    analysis = {}
    derived_metrics = {}

    # -------------------------------------------------
    # Revenue
    # -------------------------------------------------

    revenue_col = _get_column(
        detected_kpis,
        "revenue",
    )

    if revenue_col:
        analysis["revenue"] = (
            _calculate_numeric_statistics(
                df,
                revenue_col,
            )
        )

    # -------------------------------------------------
    # Profit
    # -------------------------------------------------

    profit_col = _get_column(
        detected_kpis,
        "profit",
    )

    if profit_col:
        analysis["profit"] = (
            _calculate_numeric_statistics(
                df,
                profit_col,
            )
        )

    # -------------------------------------------------
    # Sales
    # -------------------------------------------------

    sales_cols = detected_kpis.get(
        "sales"
    )

    if sales_cols:
        sales_column = None

        for item in sales_cols:
            column_name = str(
                item["column"]
            ).lower()

            if "global" in column_name:
                sales_column = item["column"]
                break

        if not sales_column:
            sales_column = sales_cols[0][
                "column"
            ]

        analysis["sales"] = (
            _calculate_numeric_statistics(
                df,
                sales_column,
            )
        )

    # -------------------------------------------------
    # Cost
    # -------------------------------------------------

    cost_col = _get_column(
        detected_kpis,
        "cost",
    )

    if cost_col:
        analysis["cost"] = (
            _calculate_numeric_statistics(
                df,
                cost_col,
            )
        )

    # -------------------------------------------------
    # Employees
    # -------------------------------------------------

    employee_col = _get_column(
        detected_kpis,
        "employees",
    )

    if employee_col:
        analysis["employees"] = (
            _calculate_snapshot_statistics(
                df,
                employee_col,
            )
        )

    # -------------------------------------------------
    # Growth
    # -------------------------------------------------

    growth_col = _get_column(
        detected_kpis,
        "growth",
    )

    if growth_col:
        analysis["growth"] = (
            _calculate_percentage_statistics(
                df,
                growth_col,
            )
        )

    # -------------------------------------------------
    # Customers
    # -------------------------------------------------

    customer_col = _get_column(
        detected_kpis,
        "customer",
    )

    if customer_col:
        analysis["customer"] = (
            _calculate_customer_statistics(
                df,
                customer_col,
            )
        )

    # -------------------------------------------------
    # Products
    # -------------------------------------------------

    product_col = _get_best_column(
        detected_kpis,
        "product",
        [
            "product id",
            "sku",
            "product",
            "item",
            "name",
        ],
    )

    if product_col:
        analysis["product"] = (
            _calculate_product_statistics(
                df,
                product_col,
            )
        )

    # -------------------------------------------------
    # Derived Metrics
    # -------------------------------------------------

    # Profit Margin
    #
    # Formula:
    # Profit / Revenue * 100

    if revenue_col and profit_col:
        profit_margin = (
            _calculate_profit_margin(
                df,
                revenue_col,
                profit_col,
            )
        )

        if profit_margin:
            derived_metrics[
                "profit_margin"
            ] = profit_margin

    # Cost / Revenue
    #
    # Formula:
    # Cost / Revenue * 100

    if revenue_col and cost_col:
        cost_revenue_ratio = (
            _calculate_cost_revenue_ratio(
                df,
                revenue_col,
                cost_col,
            )
        )

        if cost_revenue_ratio:
            derived_metrics[
                "cost_revenue_ratio"
            ] = cost_revenue_ratio

    # Revenue / Employee
    #
    # Employees are treated as a snapshot metric.
    # Therefore we use average observed employees,
    # rather than summing employee values across rows.

    if revenue_col and employee_col:
        revenue_statistics = analysis.get(
            "revenue"
        )

        employee_statistics = analysis.get(
            "employees"
        )

        if (
            revenue_statistics
            and employee_statistics
        ):
            revenue_per_employee = (
                _calculate_per_unit_metric(
                    revenue_statistics.get(
                        "total"
                    ),
                    employee_statistics.get(
                        "average"
                    ),
                    "total revenue / average employees",
                )
            )

            if revenue_per_employee:
                derived_metrics[
                    "revenue_per_employee"
                ] = revenue_per_employee

    # Profit / Employee
    #
    # Uses total profit divided by average
    # observed employees.

    if profit_col and employee_col:
        profit_statistics = analysis.get(
            "profit"
        )

        employee_statistics = analysis.get(
            "employees"
        )

        if (
            profit_statistics
            and employee_statistics
        ):
            profit_per_employee = (
                _calculate_per_unit_metric(
                    profit_statistics.get(
                        "total"
                    ),
                    employee_statistics.get(
                        "average"
                    ),
                    "total profit / average employees",
                )
            )

            if profit_per_employee:
                derived_metrics[
                    "profit_per_employee"
                ] = profit_per_employee

    # Revenue / Customer
    #
    # Uses unique customers because the same
    # customer may appear across multiple records.

    if revenue_col and customer_col:
        revenue_statistics = analysis.get(
            "revenue"
        )

        customer_statistics = analysis.get(
            "customer"
        )

        if (
            revenue_statistics
            and customer_statistics
        ):
            revenue_per_customer = (
                _calculate_per_unit_metric(
                    revenue_statistics.get(
                        "total"
                    ),
                    customer_statistics.get(
                        "unique_customers"
                    ),
                    "total revenue / unique customers",
                )
            )

            if revenue_per_customer:
                derived_metrics[
                    "revenue_per_customer"
                ] = revenue_per_customer

    # Revenue / Product
    #
    # Uses unique products rather than the number
    # of product records.

    if revenue_col and product_col:
        revenue_statistics = analysis.get(
            "revenue"
        )

        product_statistics = analysis.get(
            "product"
        )

        if (
            revenue_statistics
            and product_statistics
        ):
            revenue_per_product = (
                _calculate_per_unit_metric(
                    revenue_statistics.get(
                        "total"
                    ),
                    product_statistics.get(
                        "unique_products"
                    ),
                    "total revenue / unique products",
                )
            )

            if revenue_per_product:
                derived_metrics[
                    "revenue_per_product"
                ] = revenue_per_product

    if derived_metrics:
        analysis[
            "derived_metrics"
        ] = derived_metrics

    return analysis