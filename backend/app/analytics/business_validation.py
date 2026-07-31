REQUIRED_METRICS = [
    "revenue",
    "sales",
    "profit",
    "cost"
]


def validate_business_capability(detected_kpis):

    validation = {
        "can_analyze": False,
        "available_modules": [],
        "missing_metrics": [],
        "warnings": []
    }


    # -------------------------
    # Detect available modules
    # -------------------------

    if detected_kpis.get("revenue"):
        validation["available_modules"].append(
            "revenue_analysis"
        )

    if detected_kpis.get("sales"):
        validation["available_modules"].append(
            "sales_analysis"
        )

    if detected_kpis.get("profit"):
        validation["available_modules"].append(
            "profit_analysis"
        )

    if detected_kpis.get("customer"):
        validation["available_modules"].append(
            "customer_analysis"
        )

    if detected_kpis.get("product"):
        validation["available_modules"].append(
            "product_analysis"
        )


    # -------------------------
    # Missing business metrics
    # -------------------------

    for metric in REQUIRED_METRICS:
        if not detected_kpis.get(metric):
            validation["missing_metrics"].append(
                metric
            )


    # -------------------------
    # Overall capability
    # -------------------------

    if validation["available_modules"]:
        validation["can_analyze"] = True

    else:
        validation["warnings"].append(
            "Dataset does not contain analyzable business metrics."
        )


    # -------------------------
    # Warnings
    # -------------------------

    if "revenue" in validation["missing_metrics"]:
        validation["warnings"].append(
            "Revenue based insights cannot be generated."
        )

    if "sales" in validation["missing_metrics"]:
        validation["warnings"].append(
            "Sales performance analysis cannot be generated."
        )

    if "profit" in validation["missing_metrics"]:
        validation["warnings"].append(
            "Profitability analysis cannot be generated."
        )


    return validation