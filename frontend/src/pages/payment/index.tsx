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
import PaymentStage from '@/components/PaymentSteps/payment'

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

export default function Payment() {
    const router = useRouter()
    const { user } = useFlix()
    const { id } = router.query
    const [plan, setPlan] = useState<PlanProps>()
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
        })

    useEffect(() => {
        if (id) {
            debug.log("ID recebido", id)
            getPlans()
            if (plan) {
                debug.log(plan)
            }
        }
    }, [id])

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
                            <PaymentStage />
                            <div className={styles.payOptions}>
                                <button type='submit' className={styles.methodButton}>
                                    Escolher Forma de Pagamento
                                </button>
                            </div>
                        </form>
                    </section>
                </article>

                <aside className={styles.asideContainer}>
                    {plan && (
                        <PlanCard plan={plan} />
                    )}
                </aside>
            </main>

            <Footer />
        </>
    )
}