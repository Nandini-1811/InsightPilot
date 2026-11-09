import pandas as pd

from app.services.data_quality_service import clean_dataset


df = pd.DataFrame(
    {
        " Company ": [
            "Google",
            "Apple",
            "Microsoft",
            "Amazon",
            "Amazon",
        ],
        "Revenue": [
            "$200",
            "1,500",
            "N/A",
            "2,000",
            "2,000",
        ],
        "Profit": [
            "$50",
            "$300",
            "$invalid",
            "$500",
            "$500",
        ],
        "Employees": [
            "100",
            "200",
            "300",
            "400",
            "400",
        ],
        "Notes": [
            "Good",
            "N/A",
            "",
            "Unknown",
            "Good",
        ],
    }
)


print("\n========== ORIGINAL DATA ==========\n")
print(df)


cleaned_df, quality_report = clean_dataset(df)


print("\n========== CLEANED DATA ==========\n")
print(cleaned_df)


print("\n========== QUALITY REPORT ==========\n")
print(quality_report)

print("\n========== COLUMN QUALITY ==========\n")

for column, quality in quality_report["column_quality"].items():
    print(
        f"{column}: "
        f"{quality['coverage']}% coverage, "
        f"{quality['missing']} missing"
    )

from app.analytics.capability_detector import detect_kpis


detected_kpis = detect_kpis(cleaned_df)


print("\n========== DETECTED KPIs ==========\n")

for kpi, columns in detected_kpis.items():
    print(f"{kpi}: {columns}")


from app.analytics.business_validation import validate_business_capability


business_validation = validate_business_capability(
    detected_kpis, 
    quality_report["column_quality"],
)


print("\n========== BUSINESS CAPABILITY ==========\n")
print(business_validation)


