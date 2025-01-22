
export interface BodyRequest {
    items: ItemsRequest[]
    shippings?: Array<{
        name: string;
        value: number;
        payee_code?: string;
    }>;
    metadata?: {
        custom_id?: string;
        notification_url?: string;
    };
    payment: PaymentRequest,
}
export interface ItemsRequest {
    name: string,
    value: number,//valor em centavos. ex: R$10,00 = 1000.
    amount: number
}

export interface PaymentRequest {
    banking_billet?: BilletRequest
    credit_card?: CreditRequest
}

export interface BilletRequest {
    customer: CustomerRequest;
    expire_at: string;
    discount?: {
        type: 'percentage' | 'currency';
        value: number;
    };
    conditional_discount?: {
        type: 'percentage' | 'currency';
        value: number;
        until_date: string;
    };
    configurations?: {
        fine?: number;
        interest?: {
            value: number;
            type: 'monthly' | 'daily';
        } | number;
    };
    message?: string;
}
export interface CreditRequest {
    customer: CustomerRequest;
    name: string,
    cpf: string,
    email: string,
    phone_number: string,
    birth: string
    payment_token: string,
    message?: string
    juridical_person?: {
        corporate_name: string,
        cnpj: string,
    }
    billing_address: {
        street: string,
        number: string
        neighborhood: string,
        zipcode: string
        city: string,
        complement?: string
        state: string
    }
}


export interface CustomerRequest {
    name?: string;
    cpf?: string;
    email: string;
    phone_number: string;
    birth: string;
    address?: {
        street: string;
        number: string;
        neighborhood: string;
        zipcode: string;
        city: string;
        complement?: string;
        state: string;
    };
    juridical_person?: {
        corporate_name: string;
        cnpj: string;
    };
}