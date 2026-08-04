import pandas as pd


def _get_column(detected_kpis, kpi):
    if detected_kpis.get(kpi):
        return detected_kpis[kpi][0]["column"]
    return None


def generate_derived_fields(df, detected_kpis):
    derived_df = df.copy()

    revenue_col = _get_column(detected_kpis, "revenue")
    employee_col = _get_column(detected_kpis, "employees")

    # Revenue per employee
    if revenue_col and employee_col:

        # Ensure numeric calculation
        derived_df[revenue_col] = pd.to_numeric(
            derived_df[revenue_col],
            errors="coerce"
        )

        derived_df[employee_col] = pd.to_numeric(
            derived_df[employee_col],
            errors="coerce"
        )

        valid_rows = (
            derived_df[revenue_col].notna()
            &
            derived_df[employee_col].notna()
            &
            (derived_df[employee_col] != 0)
        )

        derived_df.loc[
            valid_rows,
            "revenue_per_employee"
        ] = (
            derived_df.loc[valid_rows, revenue_col]
            /
            derived_df.loc[valid_rows, employee_col]
        )

    return derived_df