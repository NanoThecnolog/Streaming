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
        if (isArgon)
            return { success: await argon2.verify(hash, this.applyPepper(pass)) }

        const isBcrypt = await compare(pass, hash)
        if (!isBcrypt)
            return { success: false }

        const rehash = await this.hash(this.applyPepper(pass))

        return {
            success: true,
            rehash
        }
    }
}