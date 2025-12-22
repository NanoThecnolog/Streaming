import { Address } from '@/@types/efi/chargeEfi';
import { PlanProps } from '@/@types/payment';
import { CreateSubscriptionDto } from '@/@types/subscriptions/createSubscription';
import { debug } from '@/classes/DebugLogger';
import { Functions } from '@/classes/Functions';
import { Normalize } from '@/classes/Normalize';
import { Validate } from '@/classes/validator';
import { SetupAPIClient } from '@/services/api';
import { apiSub } from '@/services/apiSubManager';
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
        return res.status(400).json({ error: "Dados do cliente inválidos" })

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
        const address = customer.address

        if (!Validate.cpf(customer.cpf))
            return res.status(400).json({ message: "CPF inválido!" })

        const normalizeData = {
            name: Normalize.names(customer.name),
            birth: Functions.formatBirth(customer.birthday ?? ""),
            cpf: Normalize.cpf(customer.cpf),
            phone_number: Normalize.phone(customer.phone_number),
            cep: Normalize.cep(address.zipcode),
            state: Normalize.state(address.state)
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizeData.birth)) {
            return res.status(400).json({ message: "Data de nascimento no formato incorreto." })
        }
        const user = {
            name: normalizeData.name,
            address,
            phone_number: normalizeData.phone_number,
            cpf: normalizeData.cpf,
        }

        await client.api.put('/user', user)

        const expireAt = Functions.getFiveDaysLaterString()
        if (!expireAt)
            return res.status(500).json({ error: "Erro ao gerar data de vencimento." })

        //Construção do body
        const banking_billet = {
            customer: {
                name: normalizeData.name,
                cpf: normalizeData.cpf,
                email: customer.email,
                phone_number: normalizeData.phone_number,
                birth: normalizeData.birth,
                address: {
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    zipcode: normalizeData.cep,
                    city: address.city,
                    complement: address.complement ?? "",
                    state: normalizeData.state,
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

        //console.log(body)
        //console.log(body.payment.banking_billet.customer)
        const response = await apiSub.post('/subscription', body)

        return res.status(200).json({
            user,
            subscription: response.data
        })


        //return res.status(200).json({ body, user })
    } catch (err) {
        debug.log("Erro ao criar assinatura", err)
        return res.status(500).json({ message: "Erro ao criar assinatura" })
    }
}