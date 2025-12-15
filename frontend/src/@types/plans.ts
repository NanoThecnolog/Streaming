export interface PlansProps {
    code: number,
    plan: PlanProp[]
}
export interface PlanProp {
    name: string;
    id: string;
    price: number;
    type: string;
    planId: number;
    created_at: string;
    updated_at: Date;
}
