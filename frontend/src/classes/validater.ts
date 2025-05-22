import { blockedDomains, fakePatterns } from "@/utils/Variaveis";


export class Validate {
    private emailRegex: RegExp
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    }

    public email(email: string): boolean {

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
}