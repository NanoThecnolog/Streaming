import Spinner from '@/components/ui/Loading/spinner'
import styles from './styles.module.scss'
import { calculateDiscount, formatPrice } from '@/utils/UtilitiesFunctions'
import { desconto } from '@/utils/Variaveis'
import { PlansProps } from '@/@types/plans'
import { useRouter } from 'next/navigation'

interface PricesProps {
    plans: PlansProps;
}

export default function Prices({ plans }: PricesProps) {

    const router = useRouter()

    function handlePrice(price: number, planType: string) {
        switch (planType) {
            case 'mensal':
                return formatPrice(calculateDiscount(price, desconto[planType]))
            case 'trimestral':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 3)
            case 'semestral':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 6)
            case 'anual':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 12)
        }
    }
    function handleClick(id: string) {
        router.push(`/payment?id=${id}`)
    }
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.title}>
                    <h1>Escolha o melhor plano para você</h1>
                </div>
                {
                    plans ?
                        <div className={styles.plansContainer}>
                            {
                                plans.plan.length > 0 && plans.plan.sort((a, b) => a.price - b.price).map(p => (
                                    <div className={styles.plan} key={p.planId}>
                                        <div className={styles.infoPlan}>
                                            <div className={styles.planDetails}>
                                                <p className={styles.planName}>
                                                    {p.name}
                                                </p>
                                                <p className={styles.planPrice}>
                                                    {handlePrice(p.price, p.type)}/mês
                                                </p>
                                                {desconto[p.type] > 0 && <p className={styles.priceDiscount}>{desconto[p.type]}% OFF</p>}
                                                <p className={styles.planType}>
                                                    Plano <span>{p.type}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li>Filmes e Séries raros</li>
                                                    <li>Solicitação de novos conteúdos</li>
                                                    <li>Mais de 500 títulos disponíveis</li>
                                                    <li>suporte 24/7</li>
                                                    <li>Novos conteúdos toda semana</li>
                                                    <li>Cancele quando quiser</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={styles.buttonContainer}>
                                            <button onClick={() => handleClick(p.id)}>Escolha seu plano</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> : <div className={styles.loader}>
                            <Spinner />
                        </div>
                }
            </div>
        </section>
    )
}