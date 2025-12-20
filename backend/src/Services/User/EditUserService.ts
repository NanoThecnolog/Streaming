import { hash } from "bcrypt";
import prismaClient from "../../prisma";
import { address } from "@prisma/client";

interface EditUserRequest {
    id: string,
    name?: string,
    avatar?: string,
    password?: string,
    birthday?: Date,
    news?: boolean,
    cpf?: string,
    phone_number?: string,
    address?: address,
    donator?: boolean
}

class EditUserService {
    async execute({ id, name, avatar, password, birthday, news, cpf, phone_number, address }: EditUserRequest) {

        const userExiste = await prismaClient.user.findUnique({
            where: { id },
            include: { address: true }
        })
        if (!userExiste) throw new Error("Usuário não existe.")
        let passwordHash;
        if (password) {
            passwordHash = await hash(password, 8)
        }
        const editUser = await prismaClient.user.update({
            where: { id },
            data: {
                name: name ?? userExiste.name,
                avatar: avatar ?? userExiste.avatar,
                password: passwordHash ?? userExiste.password,
                birthday: birthday ?? userExiste.birthday,
                news: news ?? userExiste.news,
                cpf: cpf ?? userExiste.cpf,
                phone_number: phone_number ?? userExiste.phone_number,
                address: address
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
                        } : undefined
            }, select: {
                name: true,
                email: true,
                avatar: true,
                birthday: true,
                news: true,
                verified: true,
                donator: true,
                created_at: true,
                watchLater: true
            }
        })
        return editUser;
    }
}

export { EditUserService }