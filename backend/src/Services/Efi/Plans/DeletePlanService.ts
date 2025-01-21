import { efiPay } from "../EfiPay"

interface DeletePlanRequest {
    id: number
}
export class DeletePlanService {
    /**
     * Cancela um plano de assinatura.
     * @param param0 id do plano
     * @returns Retorna o código do resultado da requisição.
     */
    async execute({ id }: DeletePlanRequest) {
        if (!id) throw new Error("Id do plano não fornecido.")
        try {
            const plan = await efiPay.deletePlan({ id })
            return plan
        } catch (err: any) {
            throw new Error(err)
        }
    }
}