// Set NEXT_PUBLIC_API_URL in Vercel (and in frontend/.env.local for local dev).
// It is read at build time, so redeploy the frontend after changing it.
const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"
).replace(/\/+$/, "");


// Read the backend's error message if there is one. Proxies (Railway, Vercel)
// can return an HTML error page, so a failed JSON parse must not hide the real failure.
async function readErrorDetail(response: Response): Promise<string | null> {
    try {
        const errorData = await response.json();
        return typeof errorData?.detail === "string" ? errorData.detail : null;
    } catch {
        return null;
    }
}


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
        throw new Error(
            (await readErrorDetail(response)) || "Failed to upload CSV"
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
            (await readErrorDetail(response)) || "Failed to generate AI summary"
        );
    }

    return await response.json();
}
