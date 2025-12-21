import { blockedDomains, fakePatterns } from "@/utils/Variaveis";


export class Validate {
    private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    private static phoneRegex = /^21\d{9}$/

    static email(email: string): boolean {
        if (!this.emailRegex.test(email)) return false

        const enviroment = process.env.NEXT_PUBLIC_DEBUG
        const [user, dom] = email.split('@')

        if (enviroment === 'production') {
            if (blockedDomains.includes(dom.toLowerCase())) return false
        }

        if (user.length < 3 || dom.length < 5) return false
        if (fakePatterns.some(p => user.toLowerCase().includes(p))) return false

        return true
    }
    public samePassword(pass1: string, pass2: string) {
        return pass1 === pass2
    }

    static fullName(name: string): boolean {
        const parts = name.trim().split(' ')
        return parts.length >= 2 && parts.every(p => p.length >= 2)
    }

    static cpf(cpf: string): boolean {
        const cleaned = cpf.replace(/\D/g, '')

        if (cleaned.length !== 11) return false
        if (/^(\d)\1{10}$/.test(cleaned)) return false

        let sum = 0
        for (let i = 0; i < 9; i++)
            sum += Number(cleaned[i]) * (10 - i)

        let firstDigit = (sum * 10) % 11
        if (firstDigit === 10) firstDigit = 0
        if (firstDigit !== Number(cleaned[9])) return false

        sum = 0
        for (let i = 0; i < 10; i++)
            sum += Number(cleaned[i]) * (11 - i)

        let secondDigit = (sum * 10) % 11
        if (secondDigit === 10) secondDigit = 0

        return secondDigit === Number(cleaned[10])
    }
    static phone(phone: string): boolean {
        return this.phoneRegex.test(phone)
    }

    static cep(cep: string): boolean {
        return /^\d{8}$/.test(cep)
    }
    static password(password: string): boolean {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password)
    }
}