import { toast } from "react-toastify";
import { UserProps } from "@/@types/user";
import { NewUserProps } from "@/@types/userTypes/signUp";
import { SetupAPIClient } from "@/services/api";
import { apiSub } from "@/services/apiSubManager";
import { SubDetailsResponseProps } from "@/@types/subscriptions/subDetails";
import { ChargeDetailResponse } from "@/@types/efi/chargeEfi";
import { SubDBResponse } from "@/@types/userTypes/subscriptionDBDetail";

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
            password: user.password,
            cpf: user.cpf,
            phone_number: user.phone_number,
            address: user.address
        }
        const response = await this.client.api.post('/user', userData)
        return response.data
    }

    async getSubscriptionDetails(id: number) {
        try {
            const response = await apiSub.get<SubDetailsResponseProps>(`/subscription/${id}`)
            return response.data
        } catch (err) {
            console.log("Erro ao buscar dados da assinatura", err)
            return null
        }
    }
    async getChargeDetails(id: number) {
        try {
            const response = await apiSub.get<ChargeDetailResponse>(`/charges/${id}`)
            return response.data
        } catch (err) {
            console.log("Erro ao buscar dados da cobrança", err)
            return null
        }
    }

    async getSubDBDetails(userId: string) {
        try {
            const response = await apiSub.get<SubDBResponse>(`/subscription/database/${userId}`)
            return response.data
        } catch (err) {
            console.log("Erro ao buscar detalhes da assinatura do usuário", err)
            return null
        }

    }
}

export const userMethod = new UserMethods()