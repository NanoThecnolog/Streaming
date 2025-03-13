export interface PlansProps {
    count: number,
    plan: {
        name: string;
        id: string;
        price: number;
        type: string;
        planId: number;
        created_at: Date;
        updated_at: Date;
    }[]
}