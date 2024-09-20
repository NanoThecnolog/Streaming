import prismaClient from "../../prisma";

interface ActiveRequest {
    email: string
}

class ActiveUserService {
    async execute({ email }: ActiveRequest) {

    }
}

export { ActiveUserService }