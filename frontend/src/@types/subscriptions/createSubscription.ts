export interface PixDto {
    expires_in: number;
}


export interface CreditCardDto {
    customer: {
        name: string;
        cpf: string;
        email: string;
        phone_number: string;
        birth: string | Date;
        address: {
            street: string;
            number: string;
            neighborhood: string;
            zipcode: string;
            city: string;
            complement?: string;
            state: string;
        };
    };
    installments: number;
    capture: boolean;
    billing_address: {
        street: string;
        number: string;
        neighborhood: string;
        zipcode: string;
        city: string;
        complement?: string;
        state: string;
    };
    card: {
        number: string;
        holder_name: string;
        exp_month: string;
        exp_year: string;
        cvv: string;
    };
}


export interface BankingBilletDto {
    customer: {
        name: string;
        cpf: string;
        email: string;
        phone_number: string;
        birth: string | Date;
        address: {
            street: string;
            number: string;
            neighborhood: string;
            zipcode: string;
            city: string;
            complement?: string;
            state: string;
        };
    };
    expire_at: string;
}


export interface CreateSubscriptionDto {
    planId: number;

    items: Array<{
        name: string;
        value: number;
        amount: number;
        marketplace?: {
            payee_code: string;
            percentage?: number;
        };
    }>;

    shippings?: Array<{
        name: string;
        value: number;
        payee_code?: string;
    }>;

    metadata?: {
        custom_id?: string;
        notification_url?: string;
    };

    payment: {
        banking_billet: BankingBilletDto;
        credit_card?: CreditCardDto;
        pix?: PixDto;
    };
}
