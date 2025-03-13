import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { apiSub } from '@/services/apiSubManager'
import { PlansProps } from '@/@types/plans'
import { debuglog, formatPrice } from '@/utils/UtilitiesFunctions'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Footer from '@/components/Footer'
import { desconto } from '@/utils/Variaveis'

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
                debuglog(plan)
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
                    <h2>Forma de Pagamento</h2>
                    <section className={styles.payOptions}>
                        <div className={styles.methodButton}><button>Boleto</button></div>
                        <div className={styles.methodButton}><button>Cartão</button></div>
                    </section>
                    <section className={styles.formContainer}>
                        <div>
                            <form>

                                <div className={styles.userData}>
                                    <h4>Dados do Usuário</h4>
                                    <label htmlFor="nome">
                                        Nome
                                        <input type="text" id='nome' />
                                    </label>
                                    <label htmlFor="cpf">
                                        CPF
                                        <input type="text" id='cpf' />
                                    </label>
                                    <label htmlFor="phone">
                                        Telefone
                                        <input type="tel" id='phone' />
                                    </label>
                                </div>
                                <div className={styles.userAddress}>
                                    <h4>Endereço</h4>
                                    <label htmlFor="street">
                                        Logradouro
                                        <input type="text" id='street' />
                                    </label>
                                    <label htmlFor="number">
                                        Número
                                        <input type="number" id='number' />
                                    </label>
                                    <label htmlFor="neighborhood">
                                        Bairro
                                        <input type="text" id='neighborhood' />
                                    </label>
                                    <label htmlFor="zipconde">
                                        CEP
                                        <input type="number" id='zipcode' />
                                    </label>
                                    <label htmlFor="city">
                                        Cidade
                                        <input type="text" id='city' />
                                    </label>
                                    <label htmlFor="complement">
                                        Complemento
                                        <input type="text" id='complement' />
                                    </label>
                                    <label htmlFor="state">
                                        Estado
                                        <input type="text" id='state' />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </section>

                </article>
                <aside className={styles.asideContainer}>
                    {
                        plan &&
                        <div>
                            <h2>{plan.name}</h2>
                            <h4>{formatPrice(plan.price)}</h4>
                            {desconto[plan.type] > 0 && <p>{desconto[plan.type]}%</p>}
                            <p>Tipo de cobrança: recorrente {plan.type}</p>
                        </div>
                    }
                </aside>
            </main>
            <Footer />
        </>
    )
}