import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { apiSub } from '@/services/apiSubManager'
import { PlansProps } from '@/@types/plans'
import { calculateDiscount, formatPrice } from '@/utils/UtilitiesFunctions'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'
import { desconto } from '@/utils/Variaveis'
import { debug } from '@/classes/DebugLogger'

export interface PlanProps {
    name: string;
    id: string;
    price: number;
    type: string;
    planId: number;
    created_at: Date;
    updated_at: Date;
}

export default function Payment() {
    const router = useRouter()
    const { id } = router.query
    const [plan, setPlan] = useState<PlanProps>()

    useEffect(() => {
        if (id) {
            console.log("ID recebido", id)
            getPlans()
            if (plan) {
                debug.log(plan)
            }
        }
    }, [id])

    async function getPlans() {
        try {
            const plans = await apiSub.get('/plan/list')
            const data: PlansProps = plans.data
            const plan = data.plan.find(p => p.id === id)
            setPlan(plan)
        } catch (err) {
            console.log(err)
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
                            <div className={styles.userData}>
                                <h4>Dados do Usuário</h4>
                                <label htmlFor="nome">
                                    Nome
                                    <input type="text" id="nome" />
                                </label>
                                <label htmlFor="cpf">
                                    CPF
                                    <input type="text" id="cpf" />
                                </label>
                                <label htmlFor="phone">
                                    Telefone
                                    <input type="tel" id="phone" />
                                </label>
                            </div>

                            <div className={styles.userAddress}>
                                <h4>Endereço</h4>
                                <div className={styles.addressGrid}>
                                    <label htmlFor="street">
                                        Logradouro
                                        <input type="text" id="street" />
                                    </label>
                                    <label htmlFor="number">
                                        Número
                                        <input type="number" id="number" />
                                    </label>
                                    <label htmlFor="neighborhood">
                                        Bairro
                                        <input type="text" id="neighborhood" />
                                    </label>
                                    <label htmlFor="zipcode">
                                        CEP
                                        <input type="text" id="zipcode" />
                                    </label>
                                    <label htmlFor="city">
                                        Cidade
                                        <input type="text" id="city" />
                                    </label>
                                    <label htmlFor="complement">
                                        Complemento
                                        <input type="text" id="complement" />
                                    </label>
                                    <label htmlFor="state">
                                        Estado
                                        <input type="text" id="state" />
                                    </label>
                                </div>
                            </div>
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
                        <div className={styles.planCard}>
                            <h2>{plan.name}</h2>
                            <div>
                                <h4>{formatPrice(calculateDiscount(plan.price, desconto[plan.type]))}</h4>
                                {desconto[plan.type] > 0 && <p className={styles.discount}>{desconto[plan.type]}% OFF</p>}
                            </div>

                            <p>Tipo de cobrança: {plan.type}</p>
                        </div>
                    )}
                </aside>
            </main>

            <Footer />
        </>
    )
}