from app.analytics.kpi_keywords import KPI_KEYWORDS

def detect_kpis(df):

    detected_kpis = {
        kpi : [] for kpi in KPI_KEYWORDS
    }

    for column in df.columns:
        column_lower  = column.lower()

        for kpi,keywords in KPI_KEYWORDS.items():
            matched = False
            for keyword in keywords:
                if keyword in column_lower:
                    detected_kpis[kpi].append({
                        "column" : column,
                        "dtype" : str(df[column].dtype)
                    })
                    matched = True
                    break

            if matched:
                break

    return detected_kpis