export interface PlansEfiResponse {
    code: number;
    data: PlanEfiData[];
}

export interface PlanEfiData {
    plan_id: number;
    name: string;
    interval: number;
    repeats: number | null;
    created_at: string; // é string no payload recebido
}
