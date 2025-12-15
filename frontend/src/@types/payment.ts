export interface PlanProps {
    name: string;
    id: string;
    price: number;
    type: string;
    planId: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserDataProps {
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    birthday: string,
    password: string,
    address: {
        street: string,
        number: string,
        neighborhood: string,
        zipcode: string,
        city: string,
        complement: string,
        state: string
    }
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