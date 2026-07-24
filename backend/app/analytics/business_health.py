def calculate_business_health(detected_kpis, data_quality):

    strengths = []
    warnings = []

    scores = {
        "data_quality": data_quality["quality_score"]
    }

    overall_score = data_quality["quality_score"]

    if overall_score >= 80:
        status = "Healthy"
    elif overall_score >= 60:
        status = "Moderate"
    else:
        status = "Critical"

    if data_quality["quality_score"] == 100:
        strengths.append("Dataset has excellent quality.")
    else:
        warnings.append("Dataset contains missing values or duplicates.")

    return {
        "overall_score": overall_score,
        "status": status,
        "scores": scores,
        "strengths": strengths,
        "warnings": warnings
    }