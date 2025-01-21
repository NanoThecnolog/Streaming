import { efiPay } from "../EfiPay"


interface CreatePlanRequest {
    name: string,
    interval: number,
    repeats?: number
}

export class CreatePlanService {
    async execute({ name, repeats, interval = 1 }: CreatePlanRequest) {
        if (!name) throw new Error("Nome do Plano não enviado.")
        const params = {}
        const body = {
            name,
            repeats,
            interval,
        }

        try {
            const createSub = efiPay.createPlan(params, body)
            return createSub
        } catch (err) {
            throw new Error(`Erro ao criar plano: ${err}`)
        }
    }
}