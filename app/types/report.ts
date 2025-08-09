export interface ReportContent {
    id: string;
    markdown: string;
}

export interface Quote {
    id: string;
    name: string;
    land: {
        dataLand: any,
        state: any
        insurance_amount: number
        validity: string
        crop: string
    };
    customer: {
        id: string;
        name: string;
    };

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface GetQuoteResponse {
    success: boolean;
    message: string;
    data: {
        reports: Quote[];
        total: number;
    };
}
