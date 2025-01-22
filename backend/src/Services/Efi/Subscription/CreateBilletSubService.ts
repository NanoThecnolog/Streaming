import { BodyRequest, CustomerRequest } from "../../../@types/billetSub";
import { getFiveDaysLater } from "../../../Utils/Date";
import { efiPay } from "../EfiPay";


/*
        ciclo de vida de assinatura com cartão
            dados do usuario (nome, telefone, endereço completo, etc)
            dados do cartão (gerar um payment_token no frontend e enviar pro backend na requisição)
                identificação de bandeira, informações de parcelamento, token de pagamento, mascara do cartão
*/
interface BilletSubRequest {
    planId: number,
    customer: CustomerRequest,
    item: {
        name: string,
        value: number,
        amount: number// quantidade
    }[]
}

export class CreateBilletSubService {


    async execute({ planId, customer, item }: BilletSubRequest) {
        const params = { id: planId }
        const body: BodyRequest = {
            items: item,
            payment: {
                banking_billet: {
                    expire_at: getFiveDaysLater(),
                    customer
                }
            }
        }
        /*const body: BodyRequest = {
            items: [
                {
                    name: "Plano Mensal",
                    value: 799,
                    amount: 0
                },
            ],
            payment: {
                banking_billet: {
                    expire_at: getFiveDaysLater(),
                    customer: {
                        name: 'Ericsson Gomes',
                        email: 'contato@ericssongomes.com',
                        cpf: '14510752784',
                        birth: '1994-01-15',
                        phone_number: '21966296556'
                    }
                }
            }
        }*/
        const subscription = efiPay.createOneStepSubscription(params, body)
        return subscription
    }
}