export interface UploadResponse {

    rows: number;

    columns: number;

    filename: string;

    data_quality: {
        quality_score: number;
        total_cells: number;
        missing_cells: number;
        duplicate_rows: number;
    };


    business_health: {
        overall_score: number;
        status: string;
        strengths: string[];
        warnings: string[];
    };


    dashboard: {
        kpi_cards: {
            id: string;
            title: string;
            value: number;
            format: string;
        }[];
    };


    insights: {
        type: string;
        title: string;
        message: string;
    }[];


    recommendations: {
        priority: string;
        area: string;
        message: string;
    }[];

}