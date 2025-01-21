import { efiPay } from "../EfiPay"

interface ListPlanRequest {
  name?: string,
  limit?: number,
  offset?: number
}

export class ListPlanService {
  /**
   * Lista os planos existentes.
   * @param name retorna resultados a partir da procura pelo nome do plano cadastrado previamente.
   * @param limit: limite máximo de registros de resposta.
   * @param offset: determina a partir de qual registro a busca será realizada.
   * @returns Returna uma lista com os planos cadastrados.
   */
  async execute({ name, limit = 20, offset = 0 }: ListPlanRequest) {
    try {
      const params = {
        name,
        limit,
        offset
      }
      const listarPlanos = efiPay.listPlans(params)
      return listarPlanos
    } catch (err: any) {
      throw new Error(err)
    }
  }
}