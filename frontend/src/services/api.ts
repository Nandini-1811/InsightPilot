const API_BASE_URL = "http://127.0.0.1:8000";


export async function uploadCSV(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${API_BASE_URL}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );


    if (!response.ok) {
        throw new Error(
            "Failed to upload CSV"
        );
    }


    return await response.json();
}


export async function generateAISummary(data: any) {

    const response = await fetch(
        `${API_BASE_URL}/ai/summary`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );


    if (!response.ok) {
        throw new Error(
            "Failed to generate AI summary"
        );
    }


    return await response.json();
}