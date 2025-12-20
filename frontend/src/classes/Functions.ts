import axios from "axios";
import { debug } from "./DebugLogger";
import { CepSearchError, CepSearchingResponse } from "@/@types/cepSearchingResponse";

export class Functions {
    static getFiveDaysLaterDate = (): Date => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5);
        return currentDate;
    }
    static getFiveDaysLaterString(): string {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5);
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(currentDate.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    static async getAddress(zipcode: string): Promise<CepSearchingResponse | null> {
        try {
            const response = await axios.get<(CepSearchingResponse)>(`https://viacep.com.br/ws/${zipcode}/json/`)
            const data = response.data
            if (data.erro) {
                debug.error('CEP nao encontrado')
                return null
            }

            debug.log('CEP encontrado', data)
            return data
        } catch (err) {
            debug.error('Erro ao buscar o endereço através do cep', err)
            return null
        }
    }

    static formatBirth(date: string | Date): string {
        const d = new Date(date)

        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }
}
