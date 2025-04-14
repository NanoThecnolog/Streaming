import { toast } from "react-toastify";
import { api } from "@/services/api";
import { UserProps } from "@/@types/user";

export class UserMethods {

    public async signIn(email: string, password: string): Promise<UserProps | null> {
        try {
            const response = await api.post<UserProps>('/login', {
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
}

export const userMethod = new UserMethods()