/*import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'
import { debug } from '@/classes/DebugLogger'
import PlanCard from '@/components/ui/PlanCard'
import User from '@/components/PaymentSteps/User'
import PaymentBillet from '@/components/PaymentSteps/billet'
import { CreditPayment, PlanProps, UserDataProps } from '@/@types/payment'
import axios from 'axios'
import PaymentLoader from '@/components/ui/PaymentLoader'
import { toast } from 'react-toastify'
import { useFlix } from '@/contexts/FlixContext'
import { Functions } from '@/classes/Functions'
import { Validate } from '@/classes/validator'
import { Normalize } from '@/classes/Normalize'
import { GetServerSideProps } from 'next'
import SelectPayment from '@/components/PaymentSteps'


import { apiEmail } from '@/services/apiMessenger'



export default function Payment() {
    const { user, subscription } = useFlix()

    //descomentar quando for implementar
    /*useEffect(() => {
        if (user || subscription)
            router.push('/me')
    }, [user, subscription])*/

/*const router = useRouter()
const { id } = router.query
const [isLoading, setIsLoading] = useState(false)
const [plan, setPlan] = useState<PlanProps>()
const [method, setMethod] = useState<'credit' | 'billet' | null>(null)
const [checked, setChecked] = useState(false)
const [validation, setValidation] = useState<boolean>(true)
const [confirmarSenha, setConfirmarSenha] = useState('')
const [creditToken, setCreditToken] = useState<string>('')

const [dataUser, setDataUser] = useState<UserDataProps>(
    {
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        birthday: '',
        password: '',
        address: {
            street: "",
            number: "",
            neighborhood: "",
            zipcode: "",
            city: "",
            complement: "",
            state: "",
        },
    }
)

const getPlans = async () => {
    try {
        const plans = await axios.get('/api/plan/list')
        const data: PlanProps[] = plans.data
        const plan = data.find(p => p.id === id)
        setPlan(plan)
    } catch (err) {
        debug.error("Erro ao buscar planos", err)
    }
}



const handleForm = async (e: FormEvent) => {
    e.preventDefault()

    if (!method) {
        debug.log("método não definido")
        toast.warning('Método de pagamento não definido.')
        return
    }

    if (confirmarSenha != dataUser.password) {
        toast.warning('Confirme a senha. Elas devem ser idênticas.')
        setValidation(false)
        return
    }
    if (!plan || !plan.planId) return debug.error("Plano inválido")

    const validations = [
        {
            valid: Validate.fullName(dataUser.nome),
            message: 'Nome inválido! O nome precisa ter nome e sobrenome'
        },
        {
            valid: Validate.email(dataUser.email),
            message: 'Email inválido. Tente novamente ou entre em contato conosco!'
        },
        {
            valid: Validate.cpf(dataUser.cpf),
            message: 'CPF inválido. Tente novamente ou entre em contato conosco!'
        },
        {
            valid: Validate.phone(dataUser.telefone),
            message: 'Telefone precisa ser no formato DDD+Número (21991234567)'
        },
        {
            valid: Validate.password(dataUser.password),
            message: 'A senha precisa ter mais de 6 caracteres, maiúsculas, minúsculas, numeros e caracteres especiais'
        },
        {
            valid: Validate.cep(dataUser.address.zipcode),
            message: 'Cep inválido. Verifique e tente novamente!'
        },

    ]

    for (const { valid, message } of validations) {
        if (!valid) {
            toast.error(message)
            return
        }
    }


    // montagem do customer
    const customer = {
        name: Normalize.names(dataUser.nome),
        email: dataUser.email,
        cpf: Normalize.cpf(dataUser.cpf),
        phone_number: Normalize.phone(dataUser.telefone),
        birthday: dataUser.birthday,
        password: dataUser.password,
        address: {
            street: dataUser.address.street,
            number: dataUser.address.number,
            neighborhood: dataUser.address.neighborhood,
            zipcode: Normalize.cep(dataUser.address.zipcode),
            city: dataUser.address.city,
            state: Normalize.state(dataUser.address.state),
            complement: dataUser.address.complement
        },
        payment_token: ''
    }

    if (method === 'credit')
        customer.payment_token = creditToken

    const payload = {
        planId: plan.planId,
        customer,
        method
    }

    debug.log(payload)
    setIsLoading(true)
    try {
        debug.log("Dados do customer", customer)
        const response = await axios.post('/api/payment', payload)
        debug.log("Assinatura criada", response.data)
        if (response.data?.subscription) {
            debug.log("Assinatura criada com sucesso!")
        }
        toast.success("Assinatura criada com sucesso!")
        if (method === 'billet') {
            const subData = response.data.subscription.data
            const params = {
                pdf: subData.pdf.charge,
                pix: subData.pix.qrcode_image,
                barcode: subData.barcode
            }
            router.push(`/success?${new URLSearchParams(params).toString()}`)
        } else {
            router.push(`/success/credit`)
        }

    } catch (err) {
        toast.error("Erro ao criar assinatura! Tente novamente mais tarde ou entre em contato com o suporte.", { autoClose: false })
        debug.log("Erro ao chamar rota de pagamento", err)
        //adicionar envio de aviso por email de que a tentativa de criar uma conta falhou.
    } finally {
        setIsLoading(false)
        //router.push('/success')
    }
}



useEffect(() => {
    const getAddressInfo = async () => {
        if (dataUser.address.zipcode.length === 8) {
            const data = await Functions.getAddress(dataUser.address.zipcode)
            if (!data || data.erro) {
                setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: "", street: "", city: "", state: "" } }))
                return
            }
            setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: data.bairro, street: data.logradouro, city: data.localidade, state: data.estado } }))
        }
    }
    getAddressInfo()
}, [dataUser.address.zipcode])

useEffect(() => {
    if (id) {
        getPlans()
    }
}, [id])

useEffect(() => {
    debug.log(method)
}, [method])

if (!router.isReady) return <></>

return (
    <>
        <SEO title='Finalizando Assinatura | FlixNext' description='' />
        <Header />
        <main className={styles.mainPage}>
            <article className={styles.articleContainer}>
                <section className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleForm}>
                        <User
                            data={dataUser}
                            setDataUser={setDataUser}
                            senha={confirmarSenha}
                            confirmarSenha={setConfirmarSenha}
                            valid={validation}
                        />
                        <div className={styles.paymentContainer}>
                            {
                                //<PaymentBillet setCheck={setChecked} check={checked} />
                            }
                            <SelectPayment method={setMethod} checked={setChecked} setToken={setCreditToken} />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                type='submit'
                                disabled={checked ? false : true}
                                className={`${checked ? '' : styles.disabled}`}
                            >
                                Finalizar Assinatura
                            </button>
                        </div>
                    </form>
                </section>
            </article>
            <aside className={styles.asideContainer}>
                {plan && (
                    <PlanCard plan={plan} method={method} />
                )}
            </aside>
        </main>
        <Footer />
        {isLoading && <PaymentLoader />}
    </>
)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

const { req } = ctx

const token = req.cookies['flix-token']

if (token) {
    console.log('token encontrado')
    return {
        redirect: {
            destination: '/me',
            permanent: false
        }
    }
}

try {
    debug.log("Enviando...")
    const sendingNotification = await apiEmail.post('notification/access/paymentpage')
    debug.log("email notificação de acesso a pagina de pagamentos enviado", sendingNotification)
    return {
        props: {}
    }
} catch (err) {
    debug.log("Erro ao enviar notificação de acesso a pagina de pagamentos", err)
    return {
        props: {}
    }
}
}*/

import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'

export default function OldPayment() {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}></main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}
