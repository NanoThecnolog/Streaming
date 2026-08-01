import prismaClient from '../../prisma';

export class EmailVerifyService {
    async execute(email: string) {
        const emailExist = await prismaClient.user.findUnique(
            {
                where: { email },
                select: {
                    name: true,
                    cpf: true,
                    birthday: true,
                    email: true,
                    address: true,
                    phone_number: true,
                    verified: true,
                    donator: true,
                    subscription: true,
                    created_at: true,
                }
            }
        )
        if (!emailExist) return {
            result: false,
            data: {}
        }

        return {
            result: true,
            data: emailExist
        }
    }
}