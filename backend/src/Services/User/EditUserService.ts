import prismaClient from "../../prisma";
import { address } from "@prisma/client";
import { AuthSessionService } from './AuthSessionService'
import { notifyAccountSecurityChange } from '../../Utils/securityNotification'
import { SecurityService } from '../../classes/security'

interface EditUserRequest {
    id: string,
    name?: string,
    avatar?: string,
    password?: string,
    //birthday?: Date,
    news?: boolean,
    cpf?: string,
    phone_number?: string,
    //address?: address,
    donator?: boolean,
    /*access?: boolean*/
}

const validateAvatarUrl = (avatar?: string): void => {
    if (!avatar) return

    let url: URL
    try {
        url = new URL(avatar)
    } catch {
        throw new Error('URL do avatar inválida.')
    }

    const allowedStyles = new Set([
        'lorelei',
        'lorelei-neutral',
        'notionists',
        'notionists-neutral',
        'open-peeps',
        'pixel-art',
        'pixel-art-neutral',
        'identicon',
        'shapes',
        'thumbs',
        'adventurer',
    ])
    const params = [...url.searchParams.entries()]
    const hasInvalidParam = params.some(
        ([key, value]) =>
            !/^[a-z][a-zA-Z0-9]{0,49}$/.test(key) ||
            value.length > 250 ||
            !/^[a-zA-Z0-9#.,_:+-]+$/.test(value),
    )
    const [, version, style, format] = url.pathname.split('/')
    const isValid =
        url.protocol === 'https:' &&
        url.hostname === 'api.dicebear.com' &&
        version === '10.x' &&
        allowedStyles.has(style) &&
        format === 'svg' &&
        !url.username &&
        !url.password &&
        !url.hash &&
        Boolean(url.searchParams.get('seed')) &&
        params.length <= 100 &&
        !hasInvalidParam &&
        avatar.length <= 2000

    if (!isValid) throw new Error('Avatar não permitido.')
}

class EditUserService {
    async execute({ id, name, avatar, password, /*birthday,*/ news, cpf, phone_number, /*address, access*/ }: EditUserRequest) {

        const userExiste = await prismaClient.user.findUnique({
            where: { id },
            include: { address: true }
        })
        if (!userExiste) throw new Error("Usuário não existe.")
        validateAvatarUrl(avatar)
        let passwordHash;
        if (password) {
            passwordHash = await SecurityService.hash(password)
        }
        const editUser = await prismaClient.user.update({
            where: { id },
            data: {
                name: name ?? userExiste.name,
                avatar: avatar ?? userExiste.avatar,
                password: passwordHash ?? userExiste.password,
                //birthday: birthday ?? userExiste.birthday,
                news: news ?? userExiste.news,
                cpf: cpf ?? userExiste.cpf,
                phone_number: phone_number ?? userExiste.phone_number,
                /*access: access ?? userExiste.access,*/
                /*address: address
                    ? userExiste.address
                        ? {
                            update: {
                                street: address.street,
                                number: address.number,
                                neighborhood: address.neighborhood,
                                city: address.city,
                                state: address.state,
                                complement: address.complement,
                                zipcode: address.zipcode
                            }
                        } : {
                            create: {
                                street: address.street,
                                number: address.number,
                                neighborhood: address.neighborhood,
                                city: address.city,
                                state: address.state,
                                complement: address.complement,
                                zipcode: address.zipcode
                            }
                        } : undefined*/
            }, select: {
                name: true,
                email: true,
                avatar: true,
                //birthday: true,
                news: true,
                verified: true,
                donator: true,
                created_at: true,
                watchLater: true
            }
        })
        if (password) {
            await AuthSessionService.revokeAllForUser(id)
            await notifyAccountSecurityChange(editUser, 'Senha da conta alterada')
        }
        return editUser;
    }
}

export { EditUserService }
