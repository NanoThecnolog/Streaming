import prismaClient from "../../prisma";

class ListUserService {
    async execute() {
        const users = await prismaClient.user.findMany();

        return users
    }
}
export { ListUserService }