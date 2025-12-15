import { PlansEfiResponse } from '@/@types/efi/plansEfi';
import { PlanProps } from '@/@types/payment';
import { PlansProps } from '@/@types/plans';
import { CreateSubscriptionDto } from '@/@types/subscriptions/createSubscription';
import { debug } from '@/classes/DebugLogger';
import { Functions } from '@/classes/Functions';
import { userMethod } from '@/classes/userMethods';
import { apiSub } from '@/services/apiSubManager';
import { normalizeState } from '@/utils/UtilitiesFunctions';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import EfiPay from 'payment-token-efi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const data = req.body
    /*
    brand: "visa",
                number: "4485785674290087",
                cvv: "123",
                expirationMonth: "05",
                expirationYear: "2031",
                holderName: "Gorbadoc Oldbuck",
                holderDocument: "94271564656",
                reuse: false,
    */

    try {
        //busca de planos
        const plans = await apiSub.get<PlanProps[]>('/plans/database')
        //console.log(plans.data)

        const planData = plans.data.find(p => p.planId === data.planId)
        //console.log(planData)

        if (!planData) return res.status(400).json({ message: "Plano não encontrado" })

        const customer = data.customer
        const address = customer.address

        //Criando usuário no backend Express
        const userToCreate = {
            name: customer.name,
            email: customer.email,
            password: customer.password,
            cpf: customer.cpf,
            phone_number: customer.phone_number,
            birthday: customer.birthday,
            address: {
                street: address.street,
                number: address.number,
                zipcode: address.zipcode,
                state: normalizeState(address.state),
                city: address.city,
                neighborhood: address.neighborhood,
                complement: address.complement ?? ""
            }
        }

        //console.log(userToCreate)

        const createUser = await userMethod.signUp(userToCreate)
        const newUserId = createUser?.user?.id

        //console.log(newUserId)

        if (!newUserId) return res.status(500).json({ message: "Falha ao criar usuário" })

        //const newUserId = "123abc"
        //Construção do body
        const banking_billet = {
            customer: {
                name: customer.name,
                cpf: customer.cpf,
                email: customer.email,
                phone_number: customer.phone_number,
                birth: customer.birthday,
                address: {
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    zipcode: address.zipcode,
                    city: address.city,
                    complement: address.complement ?? "",
                    state: normalizeState(address.state),
                }
            },
            expire_at: Functions.getFiveDaysLaterString() ?? "",
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
                custom_id: newUserId, //ID do novo usuario no banco de dados
                notification_url: process.env.NOTIFICATION_URL
            },
            payment: {
                banking_billet
            }
        }

        console.log(body)
        const response = await apiSub.post('/subscription', body)

        return res.status(200).json({
            user: createUser,
            subscription: response.data
        })


        //return res.status(200).json({ message: "ok" })
    } catch (err) {
        debug.log("Erro ao criar assinatura", err)
        return res.status(500).json({ error: err, message: "Erro ao criar assinatura" })
    }
}