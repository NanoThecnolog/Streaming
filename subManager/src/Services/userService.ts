import prismaClient from '../prisma';

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        const userExiste = await prismaClient.user.findUnique({
            where: { email }
        })
        if (userExiste) throw new Error("Email já em uso.")
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password_hash: password, // A senha deve ser criptografada antes de salvar
                subscription_status: 'inactive',
                subscription_start: new Date(),
                subscription_end: new Date(),
                payment_method: '',
                trial_used: false
            },
        });
        return user
    }
}

export { CreateUserService }