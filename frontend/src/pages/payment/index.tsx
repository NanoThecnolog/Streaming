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
import valid from 'card-validator'
import SelectPayment from '@/components/PaymentSteps'

export interface PlanProps {
    name: string;
    id: string;
    price: number;
    type: string;
    planId: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserDataProps {
    nome: string,
    cpf: string,
    telefone: string,
    address: {
        street: string,
        number: string,
        neighborhood: string,
        zipcode: string,
        city: string,
        complement: string,
        state: string
    }
}
export interface CreditPayment {
    brand: string,
    number: string,
    cvv: string,
    expiration: string,
    holderName: string,
    holderDocument: string,
    reuse: boolean,
}

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
    const [method, setMethod] = useState<string | null>(null)
    const [validation, setValidation] = useState()
    const [dataUser, setDataUser] = useState<UserDataProps>(
        {
            nome: "",
            cpf: "",
            telefone: "",
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
    const [credit, setCredit] = useState<CreditPayment>(
        {
            brand: "",
            number: "",
            cvv: "",
            expiration: "",
            holderName: "",
            holderDocument: "",
            reuse: true
        }
    )

    useEffect(() => {
        if (id) {
            debug.log("ID recebido", id)
            getPlans()
            if (plan) {
                debug.log(plan)
            }
        }
    }, [id])



    /*useEffect(() => {
        loadingEfiPay().then((EfiPay) => {
            if (EfiPay) {
                return testetoken(EfiPay)
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

    return (
        <>
            <SEO title='Finalizando Assinatura | FlixNext' description='' />
            <Header />
            <main className={styles.mainPage}>
                <article className={styles.articleContainer}>
                    <section className={styles.formContainer}>
                        <form className={styles.form}>
                            <User data={dataUser} setDataUser={setDataUser} />
                            <div className={styles.paymentContainer}>
                                {method === null ? <SelectPayment method={setMethod} />
                                    : method === 'credit' ? <PaymentCredit credit={credit} setCredit={setCredit} />
                                        : method === 'billet' && <PaymentBillet setMethod={setMethod} />
                                }
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