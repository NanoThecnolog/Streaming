import prismaClient from "../../prisma";

class ListUserService {
    async execute() {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                watchLater: true,
                donator: true,
                avatar: true,
                verified: true
            }
        });

        return users
    }
}
export { ListUserService }