import { BodyRequest, CustomerProps, ItemsProps, PaymentProps } from "../../../@types/billetSub";
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
    payment: PaymentProps,
    items: ItemsProps[]
}

export class CreateBilletSubService {


    async execute({ planId, payment, items }: BilletSubRequest) {
        const params = { id: planId }

        if (!payment.banking_billet || payment.credit_card) throw new Error("Método de pagamento ausente ou incorreto.")

        const body: BodyRequest = {
            items: items,
            payment: {
                banking_billet: {
                    expire_at: getFiveDaysLater(),
                    customer: payment.banking_billet.customer,
                }
            }
        }
        const subscription = efiPay.createOneStepSubscription(params, body)
        return subscription
    }
}