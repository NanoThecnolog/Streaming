import { efiPay } from "../EfiPay";

type BodyRequest = {
    items: Array<{
        name: string;
        value: number;
        amount: number;
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
        banking_billet?: {
            customer: {
                name?: string;
                cpf?: string;
                email?: string;
                phone_number?: string;
                birth?: string;
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
            };
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
    }
}

export class CreateBilletSubService {


    async execute() {
        const params = { id: 0 }
        /*const body: BodyRequest = {
            items: [
                {
                    name: "",
                    value: 0,
                    amount: 0
                },
            ],
            shippings: [
                {
                    name: "",
                    value: 0,
                    payee_code: ""
                }
            ],
            
        }

        /*
        ciclo de vida de assinatura com cartão
            dados do usuario (nome, telefone, endereço completo, etc)
            dados do cartão (gerar um payment_token no frontend e enviar pro backend na requisição)
                identificação de bandeira, informações de parcelamento, token de pagamento, mascara do cartão
        */
        //const subscription = efiPay.createOneStepSubscription(params, body)
    }
}