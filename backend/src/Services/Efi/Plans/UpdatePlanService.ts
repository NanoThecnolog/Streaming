import { efiPay } from "../EfiPay"

interface UpdatePlanRequest {
    id: number
    name: string
}

export class UpdatePlanService {
    /**
     * Função que permite alterar o nome de um plano existente.
     * @param param0 Objeto com id do plano e novo nome
     * @returns Retorna o código do resultado da requisição.
     */
    async execute({ id, name }: UpdatePlanRequest) {
        if (!name || !id) throw new Error("Nome ou ID do plano não definido.")
        const params = { id }
        const body = { name }
        try {
            const plan = efiPay.updatePlan(params, body)
            return plan
        } catch (err) {
            throw new Error(`Erro ao tentar atualizar dados do plano. ${err}`)
        }
    }
}