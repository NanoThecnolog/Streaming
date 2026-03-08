import argon2 from "argon2"
import { compare } from "bcrypt"


export class SecurityService {
    private static pepper = process.env.PEPPER as string

    private static applyPepper = (pass: string): string => {
        return `${pass}${this.pepper}`
    }

    static hash = async (pass: string): Promise<string> => {
        const peppered = this.applyPepper(pass)

        return argon2.hash(peppered, {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4
        })
    }
    static verify = async (pass: string, hash: string): Promise<{ success: boolean, rehash?: string }> => {
        const isArgon = hash.startsWith('$argon2')
        console.log("hash verificado", hash)
        if (isArgon) {
            console.log("hash argon detectado")
            const verificando = await argon2.verify(hash, this.applyPepper(pass))
            console.log("resultado da verificação", verificando)
            return { success: verificando }
        }
        console.log("hash com bcrypt")

        const isBcrypt = await compare(pass, hash)
        if (!isBcrypt) {
            console.log("senha errada")
            return { success: false }
        }

        const rehash = await this.hash(pass)

        return {
            success: true,
            rehash
        }
    }
}