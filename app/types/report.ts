export interface ReportContent {
    id: string;
    markdown: string;
}

export interface Report {
    id: string;
    name: string;
    user_id: string | null;
    created_at: string; // ISO timestamp
    updated_at: string;
    deleted_at: string | null;
    content: ReportContent | null;
}

export interface GetReportsResponse {
    success: boolean;
    message: string;
    data: {
        reports: Report[];
        total: number;
    };
}
