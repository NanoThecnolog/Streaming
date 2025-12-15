import { Address } from '@/@types/efi/chargeEfi';
import { PlanProps } from '@/@types/payment';
import { CreateSubscriptionDto } from '@/@types/subscriptions/createSubscription';
import { debug } from '@/classes/DebugLogger';
import { Functions } from '@/classes/Functions';
import { Validate } from '@/classes/validator';
import { SetupAPIClient } from '@/services/api';
import { apiSub } from '@/services/apiSubManager';
import { normalizeName, normalizeState } from '@/utils/UtilitiesFunctions';
import { JwtPayload, verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export interface EditUserRequest {
    id: string,
    name?: string,
    avatar?: string,
    password?: string,
    birthday?: Date,
    news?: boolean,
    cpf?: string,
    phone_number?: string,
    address?: Address,
    donator?: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const data = req.body
    if (!data.customer || !data.customer.address)
        return res.status(400).json({ error: "Dadis do cliente inválidos" })

    const token = req.cookies['flix-token']
    if (!token) {
        return res.status(401).json({ error: 'Token não encontrado!' })
    }
    const client = new SetupAPIClient({ req })

    try {
        const decoded = verify(token, process.env.SECRET_JWT as string) as JwtPayload
        const userId = decoded.sub
        if (!userId)
            return res.status(401).json({ error: "ID do usuário não encontrado" })

        //busca de planos
        const plans = await apiSub.get<PlanProps[]>('/plans/database')
        //console.log(plans.data)

        const planData = plans.data.find(p => p.planId === data.planId)
        //console.log(planData)

        if (!planData) return res.status(400).json({ message: "Plano não encontrado" })



        const customer = data.customer
        const safeName = normalizeName(customer.name)
        const safeBirth = Functions.formatBirth(customer.birthday ?? "")
        if (!/^\d{4}-\d{2}-\d{2}$/.test(safeBirth)) {
            return res.status(400).json({ message: "Data de nascimento no formato incorreto." })
        }

        const address = customer.address
        const user = {
            name: safeName,
            address,
            phone_number: customer.phone_number,
            cpf: customer.cpf,
        }
        if (!Validate.cpf(user.cpf))
            return res.status(400).json({ message: "CPF inválido!" })

        await client.api.put('/user', user)

        const expireAt = Functions.getFiveDaysLaterString()
        if (!expireAt)
            return res.status(500).json({ error: "Erro ao gerar data de vencimento." })

        //Construção do body
        const banking_billet = {
            customer: {
                name: safeName,
                cpf: customer.cpf,
                email: customer.email,
                phone_number: customer.phone_number,
                birth: safeBirth,
                address: {
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    zipcode: address.zipcode,
                    city: address.city,
                    complement: address.complement ?? "",
                    state: normalizeState(address.state ?? ""),
                }
            },
            expire_at: expireAt,
        }

        const body: CreateSubscriptionDto = {
            planId: planData.planId,
            items: [
                {
                    name: planData.name,
                    value: planData.price,
                    amount: 1
                }],
            metadata: {
                custom_id: userId, //ID do usuario no banco de dados
                notification_url: process.env.NOTIFICATION_URL
            },
            payment: {
                banking_billet
            }
        }

        console.log(body)
        console.log(body.payment.banking_billet.customer)
        const response = await apiSub.post('/subscription', body)

        return res.status(200).json({
            user,
            subscription: response.data
        })


        //return res.status(200).json({ message: "ok" })
    } catch (err) {
        debug.log("Erro ao criar assinatura", err)
        return res.status(500).json({ message: "Erro ao criar assinatura" })
    }
}