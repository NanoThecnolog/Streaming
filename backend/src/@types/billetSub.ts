
export interface BodyRequest {
    items: ItemsProps[]
    shippings?: ShippingProps[];
    metadata?: MetadataProps;
    payment: PaymentProps,
}
export interface ItemsProps {
    name: string,
    value: number,//valor em centavos. ex: R$10,00 = 1000.
    amount: number
}
export interface ShippingProps {
    name: string,
    value: number;
    payee_code?: string;
}
export interface MetadataProps {
    custom_id?: string;
    notification_url?: string;
}

export interface PaymentProps {
    banking_billet?: BilletProps
    credit_card?: CreditProps
}

export interface BilletProps {
    customer: CustomerProps;
    expire_at: string;
    discount?: DiscountProps;
    conditional_discount?: ConditionalDiscountProps;
    configurations?: ConfigProps;
    message?: string;

}
export interface CreditProps {
    customer: CustomerProps;
    billing_address: BillingAddressProps;
    payment_token: string;
    discount?: DiscountProps;
    message?: string;
    trial_days?: number
}
export interface CustomerProps {
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
export interface DiscountProps {
    type: 'percentage' | 'currency';
    value: number;
}
export interface ConditionalDiscountProps {
    type: 'percentage' | 'currency';
    value: number;
    until_date: string;
}
export interface ConfigProps {
    fine?: number;
    interest?: {
        value: number;
        type: 'monthly' | 'daily';
    } | number;
}

export interface BillingAddressProps {
    street: string,
    number: string
    neighborhood: string,
    zipcode: string
    city: string,
    complement?: string
    state: string
}