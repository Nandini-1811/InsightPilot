def calculate_analysis_readiness(
    detected_kpis,
    data_quality,
    business_validation,
):
    """
    Evaluate how much meaningful business analysis
    the uploaded dataset can support.

    Analysis Readiness answers:

        "What can InsightPilot reliably analyze
        from this dataset?"

    It does not determine whether the underlying
    business is healthy or unhealthy.
    """

    strengths = []
    warnings = []

    # =========================================================
    # 1. DATA QUALITY
    # =========================================================

    quality_score = data_quality.get(
        "quality_score",
        0,
    )

    quality_dimensions = data_quality.get(
        "dimensions",
        {},
    )

    # =========================================================
    # 2. BUSINESS CAPABILITY
    # =========================================================

    available_modules = business_validation.get(
        "available_modules",
        [],
    )

    partial_modules = business_validation.get(
        "partial_modules",
        [],
    )

    missing_capabilities = business_validation.get(
        "missing_capabilities",
        [],
    )

    capabilities = business_validation.get(
        "capabilities",
        [],
    )

    # =========================================================
    # 3. ANALYSIS COVERAGE
    # =========================================================

    total_capabilities = (
        len(available_modules)
        + len(partial_modules)
        + len(missing_capabilities)
    )

    if total_capabilities > 0:
        analysis_coverage = round(
            (
                len(available_modules)
                + (0.5 * len(partial_modules))
            )
            / total_capabilities
            * 100,
            2,
        )
    else:
        analysis_coverage = 0.0

    # =========================================================
    # 4. DETERMINE ANALYSIS STATUS
    # =========================================================

    if len(available_modules) == 0 and len(partial_modules) == 0:
        status = "Insufficient Data"

    elif (
        len(available_modules) >= 3
        and analysis_coverage >= 50
    ):
        status = "Broad Analysis"

    elif (
        len(available_modules) >= 1
        or len(partial_modules) >= 1
    ):
        status = "Limited Analysis"

    else:
        status = "Insufficient Data"

    # =========================================================
    # 5. DATA QUALITY STRENGTHS
    # =========================================================

    completeness = quality_dimensions.get(
        "completeness",
        0,
    )

    uniqueness = quality_dimensions.get(
        "uniqueness",
        0,
    )

    validity = quality_dimensions.get(
        "validity",
        0,
    )

    if completeness >= 95:
        strengths.append(
            "Dataset has high completeness."
        )
    elif completeness >= 80:
        strengths.append(
            "Most dataset values are present."
        )

    if uniqueness >= 95:
        strengths.append(
            "Dataset has good row uniqueness."
        )

    if validity >= 95:
        strengths.append(
            "Dataset values are largely valid and usable."
        )
    elif validity >= 80:
        strengths.append(
            "Most values can be used for analysis."
        )

    # =========================================================
    # 6. BUSINESS CAPABILITY STRENGTHS
    # =========================================================

    if available_modules:
        strengths.append(
            f"{len(available_modules)} business "
            "analysis capabilities are fully available."
        )

    if partial_modules:
        strengths.append(
            f"{len(partial_modules)} business "
            "analysis capabilities are partially available."
        )

    # =========================================================
    # 7. WARNINGS
    # =========================================================

    if quality_score < 80:
        warnings.append(
            "Data quality issues may affect the reliability "
            "of some analysis."
        )

    if partial_modules:
        warnings.append(
            "Some business metrics contain missing values, "
            "so related analysis is only partially supported."
        )

    if missing_capabilities:
        warnings.append(
            f"{len(missing_capabilities)} business analysis "
            "capabilities are unavailable because required "
            "data was not detected."
        )

    # =========================================================
    # 8. ANALYSIS CONFIDENCE
    # =========================================================

    if analysis_coverage >= 70 and quality_score >= 90:
        confidence = "High"

    elif analysis_coverage >= 40 and quality_score >= 75:
        confidence = "Medium"

    else:
        confidence = "Low"


    supported_analysis = []
    partial_analysis = []
    unavailable_analysis = []
    limitations = []

    for capability in capabilities:
        capability_status = capability.get("status")
        description = capability.get("description")
        label = capability.get("label")

        if capability_status == "available":
            supported_analysis.append({
                "label": label,
                "description": description,
            })

        elif capability_status == "partial":
            partial_analysis.append({
                "label": label,
                "description": description,
                "coverage": capability.get("coverage", 0),
            })

            limitations.append(
                f"{label} is only partially supported because "
                "some required values are missing."
            )

        elif capability_status == "unavailable":
            unavailable_analysis.append({
                "label": label,
                "description": description,
            })

            limitations.append(
                f"{label} is unavailable because the required "
                "data was not detected."
            )

    # =========================================================
    # 9. FINAL RESPONSE
    # =========================================================

    return {
        "status": status,

        "analysis_coverage": analysis_coverage,

        "confidence": confidence,

        "capabilities": {
            "available": len(available_modules),
            "partial": len(partial_modules),
            "unavailable": len(missing_capabilities),
            "total": total_capabilities,
        },

        "detected_kpis": sorted(
            [
                kpi
                for kpi, columns in detected_kpis.items()
                if columns
            ]
        ),

        "supported_analysis": supported_analysis,

        "partial_analysis": partial_analysis,

        "unavailable_analysis": unavailable_analysis,

        "limitations": limitations,


        "strengths": strengths,

        "warnings": warnings,
    }