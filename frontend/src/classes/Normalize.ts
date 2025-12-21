import { stateMap } from "@/utils/Variaveis"

export class Normalize {
    static onlyNumbers(value?: string, maxLength?: number): string {
        if (!value) return ''
        const cleaned = value.replace(/\D/g, '')
        return maxLength ? cleaned.slice(0, maxLength) : cleaned
    }

    static cpf(cpf?: string): string {
        return this.onlyNumbers(cpf, 11)
    }

    static cep(cep?: string): string {
        return this.onlyNumbers(cep, 8)
    }
    static state(uf?: string): string {
        if (!uf) return "";
        const cleaned = uf.trim().toLowerCase();


        if (/^[A-Z]{2}$/i.test(uf)) {
            return uf.toUpperCase();
        }

        return stateMap[cleaned] ?? "";
    }

    static phone(phone?: string): string {
        return this.onlyNumbers(phone, 11)
    }

    static names(name?: string): string {
        return name?.trim().replace(/\s+/g, ' ') ?? ''
    }
}
