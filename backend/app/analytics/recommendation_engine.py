def generate_recommendations(
    business_analysis,
    business_validation
):

    recommendations = []


    # -------------------------
    # Revenue recommendations
    # -------------------------

    revenue = business_analysis.get("revenue")

    if revenue:

        average = revenue.get("average")
        maximum = revenue.get("maximum")

        if average and maximum:

            if maximum > average * 5:
                recommendations.append({
                    "priority": "high",
                    "area": "revenue",
                    "message": (
                        "A few records are generating significantly higher "
                        "revenue. Analyze top performers and replicate their strategy."
                    )
                })

            else:
                recommendations.append({
                    "priority": "medium",
                    "area": "revenue",
                    "message": (
                        "Revenue data is available. Monitor trends and "
                        "identify opportunities for growth."
                    )
                })


    # -------------------------
    # Sales recommendations
    # -------------------------

    sales = business_analysis.get("sales")

    if sales:

        average = sales.get("average")

        if average:

            recommendations.append({
                "priority": "medium",
                "area": "sales",
                "message": (
                    "Analyze products or categories contributing most "
                    "to sales performance."
                )
            })


    # -------------------------
    # Profit recommendations
    # -------------------------

    profit = business_analysis.get("profit")

    if profit:

        recommendations.append({
            "priority": "high",
            "area": "profit",
            "message": (
                "Monitor profitability and review cost drivers "
                "affecting margins."
            )
        })


    # -------------------------
    # Customer recommendations
    # -------------------------

    customer = business_analysis.get("customer")

    if customer:

        recommendations.append({
            "priority": "medium",
            "area": "customer",
            "message": (
                "Customer data is available. Add transaction data "
                "to understand customer value and purchasing behavior."
            )
        })


    # -------------------------
    # Product recommendations
    # -------------------------

    product = business_analysis.get("product")

    if product:

        duplicates = product.get("duplicate_products", 0)

        if duplicates > 0:

            recommendations.append({
                "priority": "medium",
                "area": "product",
                "message": (
                    "Duplicate products were detected. Review the product "
                    "catalog for better data accuracy."
                )
            })

        else:

            recommendations.append({
                "priority": "low",
                "area": "product",
                "message": (
                    "Product catalog is clean. Analyze product performance "
                    "with sales data for deeper insights."
                )
            })


    # -------------------------
    # No analysis possible
    # -------------------------

    if not business_validation.get("can_analyze"):

        recommendations.append({
            "priority": "high",
            "area": "data",
            "message": (
                "Add business metrics such as revenue, sales, customers, "
                "or products to generate recommendations."
            )
        })


    return recommendations