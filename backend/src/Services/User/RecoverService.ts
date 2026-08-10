import prismaClient from "../../prisma";
import { JwtPayload, verify } from "jsonwebtoken";
import { AuthSessionService } from './AuthSessionService'
import { createHash } from 'crypto'
import { notifyAccountSecurityChange } from '../../Utils/securityNotification'
import { SecurityService } from '../../classes/security'



export class RecoverService {
    async execute(token: string, newPassword: string) {

        const secret = process.env.SECRET_JWT
        if (!secret) return
        const decoded = verify(token, secret) as JwtPayload
        const userId = decoded.userId;
        const userExiste = await prismaClient.user.findUnique({
            where: { id: userId }
        })

        if (!userExiste) throw new Error("Usuário não encontrado.")
        const currentPasswordVersion = createHash('sha256').update(userExiste.password).digest('hex')
        if (!decoded.passwordVersion || decoded.passwordVersion !== currentPasswordVersion) {
            throw new Error('Link de recuperação inválido ou já utilizado.')
        }
        const currentPassword = await SecurityService.verify(newPassword, userExiste.password)
        if (currentPassword.success) throw new Error("Senha igual a anterior")
        const passwordHash = await SecurityService.hash(newPassword)
        const updateUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                password: passwordHash
            }
        })
        await AuthSessionService.revokeAllForUser(userId)
        await notifyAccountSecurityChange(updateUser, 'Senha redefinida por recuperação de conta')
        return {
            id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
        }
    }
}
