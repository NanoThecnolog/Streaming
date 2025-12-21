import { PlanProps } from '@/@types/payment';
import { CreateSubscriptionDto } from '@/@types/subscriptions/createSubscription';
import { debug } from '@/classes/DebugLogger';
import { Functions } from '@/classes/Functions';
import { Normalize } from '@/classes/Normalize';
import { userMethod } from '@/classes/userMethods';
import { apiSub } from '@/services/apiSubManager';
import { NextApiRequest, NextApiResponse } from 'next';

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

        const normalizeData = {
            name: Normalize.names(customer.name),
            cpf: Normalize.cpf(customer.cpf),
            phone_number: Normalize.phone(customer.phone_number),
            zipcode: Normalize.cep(address.zipcode),
            state: Normalize.state(address.state)
        }

        //Criando usuário no backend Express
        const userToCreate = {
            name: normalizeData.name,
            email: customer.email,
            password: customer.password,
            cpf: normalizeData.cpf,
            phone_number: normalizeData.phone_number,
            birthday: customer.birthday,
            address: {
                street: address.street,
                number: address.number,
                zipcode: normalizeData.zipcode,
                state: normalizeData.state,
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
                name: normalizeData.name,
                cpf: normalizeData.cpf,
                email: customer.email,
                phone_number: normalizeData.phone_number,
                birth: customer.birthday,
                address: {
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    zipcode: normalizeData.zipcode,
                    city: address.city,
                    complement: address.complement ?? "",
                    state: normalizeData.state,
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


        //return res.status(200).json({ body, userToCreate })
    } catch (err) {
        debug.log("Erro ao criar assinatura", err)
        return res.status(500).json({ error: err, message: "Erro ao criar assinatura" })
    }
}