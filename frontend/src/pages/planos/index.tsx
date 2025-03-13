import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { apiSub } from "@/services/apiSubManager";
import { PlansProps } from "@/@types/plans";
import { calculateDiscount, debuglog, formatPrice } from "@/utils/UtilitiesFunctions";
import { useRouter } from "next/router";



export default function Donate() {
    const router = useRouter()
    const [plans, setPlans] = useState<PlansProps>()

    useEffect(() => {
        getPlans()
    }, [])

    async function getPlans() {
        try {
            const plans = await apiSub.get('/plan/list')
            const data: PlansProps = plans.data
            debuglog(data)
            setPlans(data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClick(id: string) {
        router.push(`/payment?id=${id}`)
    }

    return (
        <>
            <SEO title="Escolha seu Plano | FlixNext" description="Planos via boleto ou cartão de crédito" />
            <Header />
            <section className={styles.sectionContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <h1>Escolha o melhor plano para você</h1>
                    </div>
                    <div className={styles.plansContainer}>
                        {plans && plans.plan.length > 0 &&
                            plans.plan.sort((a, b) => a.price - b.price).map(p => {
                                let desconto;
                                if (p.type === 'anual') desconto = 10
                                else if (p.type === 'semestral' || p.type === 'trimestral') desconto = 5
                                else desconto = 0

                                return (
                                    <div className={styles.plan} key={p.planId}>
                                        <div className={styles.infoPlan}>
                                            <p className={styles.planName}>
                                                {p.name}
                                            </p>
                                            <p className={styles.planPrice}>
                                                {formatPrice(calculateDiscount(p.price, desconto))} {desconto > 0 &&
                                                    <p>{desconto}% de desconto</p>}
                                            </p>
                                            <p className={styles.planType}>
                                                Cobrança {p.type}
                                            </p>
                                        </div>
                                        <div className={styles.buttonContainer}>
                                            <button onClick={() => handleClick(p.id)}>Escolha seu plano</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}