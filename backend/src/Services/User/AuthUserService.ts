import { compare } from "bcrypt";
import prismaClient from "../../prisma";
import { AppError } from '../../Utils/AppErrorExtend'
import { SecurityService } from "../../classes/security";
import { AuthSessionService } from './AuthSessionService'
import { TrustedDeviceService } from './TrustedDeviceService'
import { DeviceVerificationService } from './DeviceVerificationService'

interface LoginContext {
    userAgent?: string
    ipAddress?: string
    deviceToken?: string
    replaceDeviceId?: string
}

class AuthUserService {
    async execute(email: string, password: string, context: LoginContext = {}) {
        const userExiste = await prismaClient.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                avatar: true,
                watchLater: true,
                password: true,
                email: true,
            }
        })
        if (!userExiste) throw new AppError("Email ou senha incorreto.", 401)

        //nova validação com argon2
        const isValid = await SecurityService.verify(password, userExiste.password)
        if (!isValid.success)
            throw new AppError("Email ou senha incorreto.", 401)

        if (isValid.rehash) {
            await prismaClient.user.update({
                where: { id: userExiste.id },
                data: {
                    password: isValid.rehash
                },
            })
        }


        const device = await TrustedDeviceService.findExisting({
            userId: userExiste.id,
            deviceToken: context.deviceToken,
            userAgent: context.userAgent,
            ipAddress: context.ipAddress,
        })
        if (!device) {
            await TrustedDeviceService.checkCapacity(userExiste.id, context.replaceDeviceId)
            return DeviceVerificationService.create({
                userId: userExiste.id,
                name: userExiste.name,
                email: userExiste.email,
                userAgent: context.userAgent,
                ipAddress: context.ipAddress,
                replaceDeviceId: context.replaceDeviceId,
            })
        }

        const token = await AuthSessionService.create({
            userId: userExiste.id,
            deviceId: device.id,
            userAgent: context.userAgent,
            ipAddress: context.ipAddress,
        })
        /*const watchLaterList = await prismaClient.watchLater.findMany({
            where: {
                userId: userExiste.id
            }
        })*/

        return {
            id: userExiste.id,
            name: userExiste.name,
            avatar: userExiste.avatar,
            watchLater: userExiste.watchLater,
            token: token,
            deviceToken: device.token,
            //donator: userExiste.donator
        }
    }
}

export { AuthUserService }
