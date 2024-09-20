import prismaClient from "../../prisma";

interface EditUserRequest {
    id: string,
    name?: string,
    avatar?: string,

}


class EditUserService {
    async execute({ id, name, avatar }: EditUserRequest) {

    }
}

export { EditUserService }