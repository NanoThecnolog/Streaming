export interface PlanProps {
    name: string;
    id: string;
    price: number;
    type: "mensal" | "trimestral" | "semestral" | "anual";
    planId: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserDataProps {
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    //birthday: string,
    password: string,
    /*address: {
        street: string,
        number: string,
        neighborhood: string,
        zipcode: string,
        city: string,
        complement: string,
        state: string
    }*/
}
export interface CreditPayment {
    brand: string,
    number: string,
    cvv: string,
    expiration: string,
    expirationMonth: string,
    expirationYear: string,
    holderName: string,
    holderDocument: string,
    reuse: boolean,
    fullComplete: boolean
}

export type PaymentMethod =
    | 'pix'
    | 'credit-card'
    | 'billet'

export type ApiPaymentMethod =
    | 'credit'
    | 'billet'

export type PaymentStatus =
    | 'idle'
    | 'processing'
    | 'pending'
    | 'confirmed'
    | 'failed'

export interface PersonalData {
    name: string
    cpf: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

export interface CreditCardData {
    brand: string
    holderName: string
    number: string
    expiryMonth: string
    expiryYear: string
    cvv: string
}

export interface PaymentResponseData {
    subscription_id: number
    status: string
    barcode?: string

    pix?: {
        qrcode: string
        qrcode_image: string
    }

    link?: string
    billet_link?: string

    pdf?: {
        charge: string
    }

    expire_at?: string

    plan: {
        id: number
        interval: number
        repeats: number | null
    }

    charge: {
        id: number
        status: string
        parcel: number
        total: number
    }

    first_execution: string
    total: number

    payment:
    | 'credit_card'
    | 'banking_billet'
}

