export interface SubDetailsResponseProps {
    code: number;
    data: {
        subscription_id: number;
        value: number;
        status: string;
        custom_id: string | null;
        notification_url: string | null;
        payment_method: string | null;
        next_execution: string | null;
        next_expire_at: string | null;
        plan: {
            plan_id: number;
            name: string;
            interval: number;
            repeats: number | null;
        };
        occurrences: number;
        created_at: string;
        history: {
            charge_id: number;
            status: string;
            created_at: string;
        }[];
    };
}