import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { apiSub } from '@/services/apiSubManager'
import { PlansProps } from '@/@types/plans'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'
import { debug } from '@/classes/DebugLogger'
import PlanCard from '@/components/ui/PlanCard'
import User from '@/components/PaymentSteps/User'
import { useFlix } from '@/contexts/FlixContext'
import PaymentCredit from '@/components/PaymentSteps/payment'
import PaymentBillet from '@/components/PaymentSteps/billet'
import SelectPayment from '@/components/PaymentSteps'
import { CreditPayment, PlanProps, UserDataProps } from '@/@types/payment'
import axios from 'axios'
import { getDate } from '@/utils/UtilitiesFunctions'



const loadingEfiPay = async () => {
    if (typeof window !== 'undefined') {
        const EfiPay = (await import("payment-token-efi")).default
        return EfiPay
    }
    return null
}

export default function Payment() {
    const router = useRouter()
    const { user } = useFlix()
    const { id } = router.query
    const [plan, setPlan] = useState<PlanProps>()
    const [method, setMethod] = useState<'credit' | 'billet' | null>(null)
    const [validation, setValidation] = useState<boolean>(true)
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [dataUser, setDataUser] = useState<UserDataProps>(
        {
            nome: "",
            cpf: "",
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
    const getAddress = async () => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${dataUser.address.zipcode}/json/`)
            const data = response.data
            if (data.erro) {
                debug.error('CEP nao encontrado')
            }
            else {
                debug.log('CEP encontrado', data)
                setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: data.bairro, street: data.logradouro, city: data.localidade, state: data.estado } }))
            }
        } catch (err) {
            debug.error('Erro ao buscar o endereço através do cep', err)
        }
    }
    useEffect(() => {
        if (dataUser.address.zipcode.length === 8) getAddress()
    }, [dataUser.address.zipcode])

    const [credit, setCredit] = useState<CreditPayment>(
        {
            brand: "",
            number: "",
            cvv: "",
            expiration: "",
            holderName: "",
            holderDocument: "",
            reuse: true,
            fullComplete: false,
        }
    )

    useEffect(() => {
        if (id) {
            //debug.log("ID recebido", id)
            getPlans()
            if (plan) {
                debug.log(plan)
            }
        }
    }, [id])

    /*useEffect(() => {
        loadingEfiPay().then((EfiPay) => {
            if (EfiPay) {
                return getToken(EfiPay)
            }
        })
    }, [])*/



    async function getToken(EfiPay: any) {
        if (typeof window === 'undefined') return
        try {
            const result = await EfiPay.CreditCard
                .setAccount("8c778309766503063ff66562194ea757")
                .setEnvironment("sandbox")
                .setCreditCardData({
                    brand: "visa",
                    number: "4485785674290087",
                    cvv: "123",
                    expirationMonth: "05",
                    expirationYear: "2031",
                    holderName: "Gorbadoc Oldbuck",
                    holderDocument: "94271564656",
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
    }

    async function getPlans() {
        try {
            const plans = await apiSub.get('/pay/plan/list')
            const data: PlansProps = plans.data
            const plan = data.plan.find(p => p.id === id)
            setPlan(plan)
        } catch (err) {
            debug.error("Erro ao buscar planos", err)
        }
    }

    const handleForm = async () => {
        if (confirmarSenha != dataUser.password) {
            setValidation(false)
            return
        }
    }

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
                                {method === null ? <SelectPayment method={setMethod} />
                                    : method === 'credit' ? <PaymentCredit setMethod={setMethod} credit={credit} setCredit={setCredit} />
                                        : method === 'billet' && <PaymentBillet setMethod={setMethod} confirm={credit.fullComplete} setCredit={setCredit} />
                                }
                            </div>
                            <div className={styles.buttonContainer}>
                                <button
                                    type='submit'
                                    disabled={method == null || !credit.fullComplete}
                                    className={`${method == null || !credit.fullComplete ? styles.disabled : ''}`}
                                >
                                    Iniciar Assinatura
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
        </>
    )
}