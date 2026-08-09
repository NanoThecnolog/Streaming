import { PlanProps } from '@/@types/payment'
import { CreateSubscriptionDto } from '@/@types/subscriptions/createSubscription'
import { NewUserProps, SignUpMethodResponse } from '@/@types/userTypes/signUp'
import { debug } from '@/classes/DebugLogger'
import { Functions } from '@/classes/Functions'
import { Normalize } from '@/classes/Normalize'
import { userMethod } from '@/classes/userMethods'
import { apiSub } from '@/services/apiSubManager'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

type CheckoutMethod = 'billet' | 'credit'

interface CheckoutAddress {
  street: string
  number: string
  neighborhood: string
  zipcode: string
  city: string
  complement?: string
  state: string
}

interface CheckoutCustomer {
  name: string
  email: string
  password: string
  cpf: string
  phone_number: string
  birthday: string
  payment_token?: string
  address: CheckoutAddress
}

interface CheckoutRequest {
  planId: string
  method: CheckoutMethod
  customer: CheckoutCustomer
}

interface NormalizedCheckout {
  customer: CheckoutCustomer & {
    name: string
    cpf: string
    phone_number: string
  }
}

function normalizeCheckout(data: CheckoutRequest): NormalizedCheckout {
  const { customer } = data

  return {
    customer: {
      ...customer,
      name: Normalize.names(customer.name),
      cpf: Normalize.cpf(customer.cpf),
      phone_number: Normalize.phone(customer.phone_number),
    },
  }
}

function buildUserPayload(checkout: NormalizedCheckout) {
  const { customer } = checkout

  return {
    name: customer.name,
    email: customer.email,
    password: customer.password,
    cpf: customer.cpf,
    phone_number: customer.phone_number,
  }
}

function buildPayment(
  method: CheckoutMethod,
  checkout: NormalizedCheckout,
): CreateSubscriptionDto['payment'] {
  const { customer } = checkout

  const customerBase = {
    name: customer.name,
    cpf: customer.cpf,
    email: customer.email,
    phone_number: customer.phone_number,
    //donate: false
  }

  if (method === 'billet') {
    return {
      banking_billet: {
        customer: customerBase,
        expire_at: Functions.getFiveDaysLaterString(),
      },
    }
  }

  if (!customer.payment_token) {
    throw new Error('Token do cartão não informado')
  }

  //customerBase.donate = true

  return {
    credit_card: {
      customer: customerBase,
      payment_token: customer.payment_token,
      trial_days: 3,
      /*billing_address:
                addressBase,*/
    },
  }
}

function buildSubscriptionPayload({
  plan,
  userPayload,
  method,
  checkout,
}: {
  plan: PlanProps
  userPayload: NewUserProps
  method: CheckoutMethod
  checkout: NormalizedCheckout
}): CreateSubscriptionDto {
  const url = process.env.NOTIFICATION_URL
  if (!url) debug.log('url de notificação não definida')
  return {
    user: userPayload,
    planId: plan.planId,

    items: [
      {
        name: plan.name,
        value: plan.price,
        amount: 1,
      },
    ],

    metadata: {
      custom_id: '',
      notification_url: process.env.NOTIFICATION_URL,
    },

    payment: buildPayment(method, checkout),
  }
}

async function findPlan(planId: string): Promise<PlanProps | null> {
  const response = await apiSub.get<PlanProps>(`/plans/database/${planId}`)

  debug.log('plano buscado', planId, response.data)
  return response.data
}

function isValidCheckoutBody(body: unknown): body is CheckoutRequest {
  if (!body || typeof body !== 'object') return false

  const data = body as Partial<CheckoutRequest>

  return Boolean(
    data.planId && data.customer && data.method && ['billet', 'credit'].includes(data.method),
  )
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])

    return res.status(405).json({
      message: `Método ${req.method} não permitido`,
    })
  }

  if (!isValidCheckoutBody(req.body)) {
    return res.status(422).json({
      message: 'Dados do checkout inválidos',
    })
  }

  try {
    const data = req.body
    const plan = await findPlan(data.planId)

    if (!plan)
      return res.status(404).json({
        message: 'Plano não encontrado',
      })

    const checkout = normalizeCheckout(data)

    const userPayload = buildUserPayload(checkout)

    //const createdUser = await userMethod.signUp(userPayload)
    /*const createdUser: SignUpMethodResponse = {
            systemNotify: "",
            userNotify: "",
            user: {
                cpf: '00000000012',
                name: 'nome teste',
                email: 'email@teste.com',
                id: '123teste',
                phone_number: '21999995555',
            }
        }*/

    //const userId = createdUser?.user?.id
    //const userId = '123teste'

    /*if (!userId) {
            debug.error('API de usuários não retornou um ID')

            return res.status(502).json({
                message:
                    'Não foi possível criar a conta',
            })
        }*/

    const subscriptionPayload = buildSubscriptionPayload({
      plan,
      userPayload,
      method: data.method,
      checkout,
    })

    debug.log('Criando assinatura', {
      user: userPayload,
      planId: plan.planId,
      method: data.method,
    })

    const subscriptionResponse = await apiSub.post('/subscription', subscriptionPayload)

    return res.status(201).json({
      user: subscriptionResponse.data.user,
      subscription: subscriptionResponse.data.subscription,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      debug.error('Erro de comunicação no checkout', {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
        meta: error.response?.data?.error?.meta ?? '',
      })

      return res.status(502).json({
        message: 'Não foi possível concluir o checkout',
        error: error.response?.data,
      })
    }

    debug.error('Erro interno no checkout', error)

    return res.status(500).json({
      message: 'Erro interno ao concluir o checkout',
    })
  }
}

/*type PaymentMethod = 'billet' | 'credit'

interface PaymentRequestBody {
    planId: string
    method: PaymentMethod
    customer: {
        name: string
        email: string
        password: string
        cpf: string
        phone_number: string
        birthday: string
        payment_token?: string
        address: {
            street: string
            number: string
            neighborhood: string
            zipcode: string
            city: string
            complement?: string
            state: string
        }
    }
}

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
    */ /*

try {
//busca de planos
const { data: planData } = await apiSub.get<PlanProps>(`/plans/database/${data.planId}`)
//console.log(plans.data)

//const planData = plans.data.find(p => p.planId === data.planId)
//console.log(planData)

if (!planData) return res.status(400).json({ message: "Plano não encontrado" })

const customer = data.customer
const address = customer.address
const method: 'billet' | 'credit' = data.method

const normalizeData = {
name: Normalize.names(customer.name),
cpf: Normalize.cpf(customer.cpf),
phone_number: Normalize.phone(customer.phone_number),
zipcode: Normalize.cep(address.zipcode),
state: Normalize.state(address.state)
}

//Construção do body
const customerBase = {
name: normalizeData.name,
cpf: normalizeData.cpf,
email: customer.email,
phone_number: normalizeData.phone_number,
birth: customer.birthday
}
//COnstrução do endereço
const addressBase = {
street: address.street,
number: address.number,
neighborhood: address.neighborhood,
zipcode: normalizeData.zipcode,
city: address.city,
complement: address.complement ?? '',
state: normalizeData.state,
}
//construção do objeto payment com as configs de pagamento
const payment =
method === 'billet'
? {
banking_billet: {
customer: {
...customerBase,
address: addressBase
},
expire_at: Functions.getFiveDaysLaterString() ?? ''
},
}
: {
credit_card: {
customer: customerBase,
payment_token: customer.payment_token,
billing_address: addressBase
}
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
custom_id: '123', //ID do novo usuario no banco de dados será passado em produção
notification_url: process.env.NOTIFICATION_URL
},
payment
}

const isProduction = process.env.NODE_ENV === 'production';

//condicionando a criação de usuário no backend Express
if (isProduction) {
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

const createUser = await userMethod.signUp(userToCreate)
const newUserId: string = createUser?.user?.id
if (!newUserId) return res.status(500).json({ message: "Falha ao criar usuário" })

//passando o id do usuário criado
body.metadata!.custom_id = newUserId

debug.log("body enviado pra api de assinaturas", body)
const createSub = await apiSub.post('/subscription', body)
debug.log('resultado da criação de usuario', createUser)

//autenticando usuário no sistema pra ele já ficar logado
//É melhor deixar o frontend chamar rota de login, pra realizar o login por lá após a criação/confirmação de pagamento.
await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_LINK}/api/login`, {
email: customer.email,
password: customer.password
})

return res.status(200).json({
user: createUser,
subscription: createSub.data
})
}
else {
const createSub = await apiSub.post('/subscription', body)

return res.status(200).json({
user: null,
subscription: createSub.data
})
/*console.log("billing_address do body", body.payment.credit_card?.billing_address)
return res.status(200).json({
status: 'ok'
})*/ /*
}


//return res.status(200).json({ body, userToCreate })
} catch (err) {
debug.log("Erro ao criar assinatura", err)
return res.status(500).json({message: "Erro ao criar assinatura" })
}
}*/
