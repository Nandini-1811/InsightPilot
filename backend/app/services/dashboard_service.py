def generate_dashboard_data(business_analysis):
    dashboard = {
        "kpi_cards": []
    }

    KPI_CONFIG = [
        ("revenue", "Revenue", "total", "currency"),
        ("profit", "Profit", "total", "currency"),
        ("sales", "Sales", "total", "number"),
        ("cost", "Cost", "total", "currency"),
        ("employees", "Employees", "average", "number"),
        ("growth", "Growth", "average", "percentage"),

        ("customer", "Customers", "unique_customers", "number"),
        ("product", "Products", "unique_products", "number"),
    ]

    for kpi, title, metric, value_format in KPI_CONFIG:

        if kpi not in business_analysis:
            continue

        if metric not in business_analysis[kpi]:
            continue

        dashboard["kpi_cards"].append(
            {
                "id": kpi,
                "title": title,
                "value": business_analysis[kpi][metric],
                "format": value_format,
            }
        )

    return dashboard