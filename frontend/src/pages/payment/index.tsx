import { useRouter } from 'next/router'
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

const loadingEfiPay = async () => {
    if (typeof window !== 'undefined') {
        const EfiPay = (await import("payment-token-efi")).default
        return EfiPay
    }
    return null
}

interface CreditCardProps {
    brand: string,
    number: string,
    cvv: string,
    expirationMonth: string,
    expirationYear: string,
    holderName: string,
    holderDocument: string,
}



export default function Payment() {
    const { user, subscription } = useFlix()

    //descomentar quando for implementar
    /*useEffect(() => {
        if (user || subscription)
            router.push('/me')
    }, [user, subscription])*/

    const router = useRouter()
    //const { user } = useFlix()
    const { id } = router.query
    const [isLoading, setIsLoading] = useState(false)
    const [plan, setPlan] = useState<PlanProps>()
    const [method, setMethod] = useState<'credit' | 'billet' | null>('billet')
    const [checked, setChecked] = useState(false)
    const [validation, setValidation] = useState<boolean>(true)
    const [confirmarSenha, setConfirmarSenha] = useState('')
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

        if (confirmarSenha != dataUser.password) {
            setValidation(false)
            return
        }
        if (!plan || !plan.planId) return debug.error("Plano inválido")


        /*if (method === "credit") {
            let token
            loadingEfiPay().then((EfiPay) => {
                if (EfiPay) {
                    token = getToken(EfiPay) //ta gerando token
                }
            })
            try {
                const response = await axios.post('/api/payment', {

                })
            } catch (err) {

            }
        }*/
        //logica para boleto
        // montagem do customer
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
            }
        }

        const payload = {
            planId: plan.planId,
            customer
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
            const subData = response.data.subscription.data
            const params = {
                pdf: subData.pdf.charge,
                pix: subData.pix.qrcode_image,
                barcode: subData.barcode
            }
            router.push(`/success?${new URLSearchParams(params).toString()}`)

        } catch (err) {
            toast.error("Erro ao criar assinatura!")
            debug.log("Erro ao chamar rota de pagamento", err)
        } finally {
            setIsLoading(false)
            //router.push('/success')
        }

    }

    /*const getToken = async (EfiPay: any) => {

        if (typeof window === 'undefined') return
        if (!credit || !credit?.expiration || credit.expiration.length !== 4) return
        const expirationMonth = expirationSlicer(credit.expiration).month
        const expirationYear = expirationSlicer(credit.expiration).year

        try {
            const result = await EfiPay.CreditCard
                .setAccount(process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID)
                .setEnvironment(process.env.NEXT_PUBLIC_EFI_ENV)
                .setCreditCardData({
                    brand: credit?.brand,
                    number: credit?.number,
                    cvv: credit?.cvv,
                    expirationMonth,
                    expirationYear,
                    holderName: credit.holderName ?? dataUser.nome,
                    holderDocument: dataUser.cpf,
                    reuse: false,
                })
                .getPaymentToken();
            if ("payment_token" in result && "card_mask" in result) {
                debug.log(`token: ${result.payment_token}`)
                debug.log(`mask: ${result.card_mask}`)
            }
        } catch (err) {
            debug.log("Erro ao gerar token", err)
        }
    }*/

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


    /*useEffect(() => {
        debug.log("Dados do user no context", user)
        if (user) setDataUser((prev) => ({
            ...prev,
            nome: user.name,
            email: user.email,
            birthday: user.birthday.toString(),
        }))
    }, [user])*/

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
                                <PaymentBillet setCheck={setChecked} check={checked} />
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

    return {
        props: {}
    }
}