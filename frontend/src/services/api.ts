const API_BASE_URL =
    "http://127.0.0.1:8000";


export async function uploadCSV(file: File) {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    const response = await fetch(
        `${API_BASE_URL}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.detail || "Failed to upload CSV"
        );
    }

    return await response.json();
}


export async function generateAISummary(analysisData: any) {

    const response = await fetch(
        `${API_BASE_URL}/ai/summary`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                business_health: analysisData.business_health,
                business_analysis: analysisData.business_analysis,
                business_validation: analysisData.business_validation,
                detected_kpis: analysisData.detected_kpis,
                insights: analysisData.insights,
                recommendations: analysisData.recommendations,
            }),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to generate AI summary"
        );
    }

    return await response.json();
}