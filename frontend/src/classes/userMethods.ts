import { toast } from "react-toastify";
import { UserProps } from "@/@types/user";
import { NewUserProps } from "@/@types/userTypes/signUp";
import { SetupAPIClient } from "@/services/api";

export class UserMethods {
    private client = new SetupAPIClient()

    public async signIn(email: string, password: string): Promise<UserProps | null> {
        try {
            const response = await this.client.api.post<UserProps>('/login', {
                email,
                password
            })
            const data = response.data
            return data
        } catch (err) {
            console.log("Erro ao autenticar usuário.", err)
            toast.error("Erro ao tentar realizar login. Verifique email e senha, e tente novamente!")
            return null
        }
    }
    public async signUp(user: NewUserProps) {
        const userData = {
            name: user.name,
            email: user.email,
            birthday: new Date(user.birthday).toISOString(),
            password: user.password
        }
        const response = await this.client.api.post('/user', userData)
        return response.data
    }
}

export const userMethod = new UserMethods()