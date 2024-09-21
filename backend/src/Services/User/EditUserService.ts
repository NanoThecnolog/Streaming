import { hash } from "bcrypt";
import prismaClient from "../../prisma";

interface EditUserRequest {
    id: string,
    name?: string,
    avatar?: string,
    password?: string,
    birthday?: Date

}


class EditUserService {
    async execute({ id, name, avatar, password, birthday }: EditUserRequest) {

        const userExiste = await prismaClient.user.findUnique({
            where: { id }
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
                birthday: birthday ?? userExiste.birthday
            }, select: {
                id: true,
                name: true,
                avatar: true,
                birthday: true

            }
        })
        return editUser;
    }
}

export { EditUserService }