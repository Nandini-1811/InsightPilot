CAPABILITY_DEFINITIONS = {
    "revenue_analysis": {
        "label": "Revenue Analysis",
        "required": ["revenue"],
        "description": "Analyze revenue totals and performance.",
    },
    "profit_analysis": {
        "label": "Profit Analysis",
        "required": ["profit"],
        "description": "Analyze profit totals and performance.",
    },
    "sales_analysis": {
        "label": "Sales Analysis",
        "required": ["sales"],
        "description": "Analyze sales and order activity.",
    },
    "cost_analysis": {
        "label": "Cost Analysis",
        "required": ["cost"],
        "description": "Analyze business costs and expenses.",
    },
    "workforce_analysis": {
        "label": "Workforce Analysis",
        "required": ["employees"],
        "description": "Analyze workforce size and employee metrics.",
    },
    "growth_analysis": {
        "label": "Growth Analysis",
        "required": ["growth"],
        "description": "Analyze growth rates and changes.",
    },
    "customer_analysis": {
        "label": "Customer Analysis",
        "required": ["customer"],
        "description": "Analyze customers and customer activity.",
    },
    "product_analysis": {
        "label": "Product Analysis",
        "required": ["product"],
        "description": "Analyze products and product performance.",
    },
    "trend_analysis": {
        "label": "Trend Analysis",
        "required": ["date"],
        "description": "Analyze performance over time.",
    },
}


def _get_kpi_quality(detected_kpis, column_quality):
    kpi_quality = {}

    for kpi, columns in detected_kpis.items():
        if not columns:
            continue

        best_coverage = 0.0

        for item in columns:
            column = item["column"]

            quality = column_quality.get(column)

            if quality:
                best_coverage = max(
                    best_coverage,
                    quality["coverage"],
                )

        kpi_quality[kpi] = best_coverage

    return kpi_quality


def validate_business_capability(detected_kpis, column_quality):

    kpi_quality = _get_kpi_quality(
        detected_kpis,
        column_quality,
    )

    capabilities = []
    available_modules = []
    partial_modules = []
    missing_capabilities = []

    for capability_name, definition in CAPABILITY_DEFINITIONS.items():

        required = definition["required"]

        missing = [
            kpi
            for kpi in required
            if kpi not in kpi_quality
        ]

        coverage_values = [
            kpi_quality[kpi]
            for kpi in required
            if kpi in kpi_quality
        ]

        if missing:
            status = "unavailable"

        else:
            coverage = min(coverage_values)

            if coverage >= 95:
                status = "available"
            elif coverage >= 50:
                status = "partial"
            else:
                status = "unusable"

        capability = {
            "name": capability_name,
            "label": definition["label"],
            "status": status,
            "required": required,
            "missing": missing,
            "coverage": (
                min(coverage_values)
                if coverage_values
                else 0.0
            ),
            "description": definition["description"],
        }

        capabilities.append(capability)

        if status == "available":
            available_modules.append(capability_name)

        elif status == "partial":
            partial_modules.append(capability_name)

        else:
            missing_capabilities.append(capability_name)

        

    analyzable_modules = (
        available_modules + partial_modules
    )

    return {
        "can_analyze": len(analyzable_modules) > 0,

        "available_modules": available_modules,

        "partial_modules": partial_modules,

        "missing_capabilities": missing_capabilities,

        "capabilities": capabilities,

        "detected_kpis": sorted(kpi_quality.keys()),

        "analysis_coverage": {
            "available": len(available_modules),
            "partial": len(partial_modules),
            "total": len(CAPABILITY_DEFINITIONS),
            "percentage": round(
                (
                    len(analyzable_modules)
                    / len(CAPABILITY_DEFINITIONS)
                ) * 100,
                2,
            ),
        },
    }