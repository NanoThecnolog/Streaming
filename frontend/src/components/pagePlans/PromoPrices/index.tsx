import Spinner from '@/components/ui/Loading/spinner'
import styles from './styles.module.scss'
import { calculateDiscount, formatPrice } from '@/utils/UtilitiesFunctions'
import { desconto } from '@/utils/Variaveis'
import { PlanProp, PlansProps } from '@/@types/plans'
import { useRouter } from 'next/navigation'

interface PricesProps {
    plans: PlanProp[];
    setPlanSelected?: (e: number) => void
}

export default function Prices({ plans, setPlanSelected }: PricesProps) {

    const router = useRouter()

    function handlePrice(price: number, planType: string) {
        switch (planType) {
            case 'mensal':
                return formatPrice(price)
            case 'trimestral':
                return formatPrice(price / 3)
            case 'semestral':
                return formatPrice(price / 6)
            case 'anual':
                return formatPrice(price / 12)
        }
    }
    function handleClick(id: string) {
        if (setPlanSelected) {
            router.push('/me/assinatura/user#form')
        } else {
            router.push(`/payment?id=${id}`)
        }
    }

    const handlePlanClick = (id: number) => {
        if (setPlanSelected)
            setPlanSelected(id)
    }
    return (
        <>

            <section className={styles.sectionContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <h1>Escolha o melhor plano para você</h1>
                    </div>
                    {
                        plans ?
                            <div className={styles.plansContainer}>
                                {
                                    plans.length > 0 && plans.sort((a, b) => a.price - b.price).filter(plan => plan.id !== "b7c7a2d4-9b6c-4f9c-9b0e-123456789abc").map(p => (
                                        <div
                                            className={`${styles.plan}
                                            ${p.type === "semestral" && styles.border}`}
                                            key={p.planId}
                                            onClick={() => handlePlanClick(p.planId)}
                                        >
                                            {p.type === "semestral" && <div className={styles.recomended}>Mais Recomendado</div>}
                                            <div className={styles.infoPlan}>
                                                <div className={styles.planDetails}>
                                                    <p className={styles.planName}>
                                                        {p.name}
                                                    </p>
                                                    <p className={styles.planPrice}>
                                                        {handlePrice(p.price, p.type)}/mês
                                                    </p>
                                                    {desconto[p.type] > 0 ? <p className={styles.priceDiscount}>{desconto[p.type]}% OFF</p> : <p className={styles.priceDiscount}></p>}
                                                    <p className={styles.planType}>
                                                        Plano <span>{p.type}</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <ul>
                                                        <li>Acesso a filmes e séries raros</li>
                                                        <li>Mais de 800 títulos disponíveis, incluindo obras difíceis de encontrar</li>
                                                        <li>Atualizações frequentes com novos conteúdos</li>
                                                        <li>Plataforma estável, organizada e sem anúncios invasivos</li>
                                                        <li>Suporte humano e direto, todos os dias</li>
                                                        <li>Cancele sua assinatura quando quiser, sem burocracia</li>
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
        </>
    )
}