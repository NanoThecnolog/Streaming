import { useMemo } from 'react'
import { useRouter } from 'next/router'
import {
    FiCheck,
    FiCreditCard,
    FiShield,
} from 'react-icons/fi'

import { PlanProp } from '@/@types/plans'
import { formatPrice } from '@/utils/UtilitiesFunctions'
import { desconto } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface PricesProps {
    plans: PlanProp[]
    setPlanSelected?: (planId: number) => void
}

type PlanType = 'mensal' | 'trimestral' | 'semestral' | 'anual'

interface PlanMetadata {
    months: number
    periodLabel: string
    description: string
}

const recommendedPlan: PlanType = 'semestral'

const hiddenProductionPlanId =
    'b7c7a2d4-9b6c-4f9c-9b0e-123456789abc'

const planMetadata: Record<PlanType, PlanMetadata> = {
    mensal: {
        months: 1,
        periodLabel: 'Cobrança mensal',
        description: 'Flexibilidade para começar sem compromisso.',
    },
    trimestral: {
        months: 3,
        periodLabel: 'Cobrança a cada 3 meses',
        description: 'Mais economia para aproveitar por mais tempo.',
    },
    semestral: {
        months: 6,
        periodLabel: 'Cobrança a cada 6 meses',
        description: 'O melhor equilíbrio entre preço e duração.',
    },
    anual: {
        months: 12,
        periodLabel: 'Cobrança anual',
        description: 'A maior economia para o ano inteiro.',
    },
}

const benefits = [
    'Acesso ao catálogo completo',
    'Mais de 800 filmes e séries',
    'Conteúdos raros e difíceis de encontrar',
    'Novos títulos adicionados frequentemente',
    'Experiência sem anúncios invasivos',
    'Suporte humano todos os dias',
]

const isPlanType = (type: string): type is PlanType => {
    return type in planMetadata
}

const Prices = ({
    plans,
    setPlanSelected,
}: PricesProps) => {
    const router = useRouter()

    const visiblePlans = useMemo(() => {
        return [...plans]
            .filter((plan) => {
                if (process.env.NODE_ENV !== 'production') {
                    return true
                }

                return plan.id !== hiddenProductionPlanId
            })
            .sort((firstPlan, secondPlan) => {
                const firstType = isPlanType(firstPlan.type)
                    ? planMetadata[firstPlan.type]
                    : null

                const secondType = isPlanType(secondPlan.type)
                    ? planMetadata[secondPlan.type]
                    : null

                const firstMonthlyPrice = firstType
                    ? firstPlan.price / firstType.months
                    : firstPlan.price

                const secondMonthlyPrice = secondType
                    ? secondPlan.price / secondType.months
                    : secondPlan.price

                return firstMonthlyPrice - secondMonthlyPrice
            })
    }, [plans])

    const handlePlanSelection = async (plan: PlanProp) => {
        if (setPlanSelected) {
            setPlanSelected(plan.planId)

            await router.push(
                {
                    pathname: router.pathname,
                    query: router.query,
                    hash: 'form',
                },
                undefined,
                {
                    shallow: true,
                    scroll: true,
                },
            )

            return
        }

        await router.push({
            pathname: '/payment',
            query: {
                id: plan.planId,
            },
        })
    }

    if (visiblePlans.length === 0) {
        return (
            <div className={styles.emptyState}>
                <strong>Nenhum plano disponível no momento</strong>

                <p>
                    Tente novamente dentro de alguns instantes.
                </p>
            </div>
        )
    }

    return (
        <div className={styles.prices}>
            <div
                className={styles.plansGrid}
                aria-label="Planos de assinatura disponíveis"
            >
                {visiblePlans.map((plan) => {
                    const type = isPlanType(plan.type)
                        ? plan.type
                        : 'mensal'

                    const metadata = planMetadata[type]
                    const monthlyPrice =
                        plan.price / metadata.months

                    const discount = desconto[type] ?? 0
                    const isRecommended =
                        type === recommendedPlan

                    return (
                        <article
                            key={plan.id}
                            className={`${styles.planCard} ${isRecommended
                                ? styles.recommendedCard
                                : ''
                                }`}
                        >
                            {isRecommended && (
                                <div className={styles.recommendedBadge}>
                                    Mais recomendado
                                </div>
                            )}

                            <div className={styles.planHeader}>
                                <div>
                                    <p className={styles.planPeriod}>
                                        Plano {type}
                                    </p>

                                    <h3>{plan.name}</h3>
                                </div>

                                {discount > 0 && (
                                    <span className={styles.discount}>
                                        Economize {discount}%
                                    </span>
                                )}
                            </div>

                            <p className={styles.description}>
                                {metadata.description}
                            </p>

                            <div className={styles.price}>


                                <strong>
                                    {formatPrice(monthlyPrice)}
                                </strong>

                                <span className={styles.pricePeriod}>
                                    /mês
                                </span>
                            </div>

                            <p className={styles.billing}>
                                {metadata.periodLabel} de{' '}
                                <strong>
                                    {formatPrice(plan.price)}
                                </strong>
                            </p>

                            <div className={styles.divider} />

                            <ul className={styles.benefits}>
                                {benefits.map((benefit) => (
                                    <li key={benefit}>
                                        <span className={styles.check}>
                                            <FiCheck aria-hidden="true" />
                                        </span>

                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className={styles.selectButton}
                                onClick={() =>
                                    handlePlanSelection(plan)
                                }
                                aria-label={`Escolher o plano ${plan.name}`}
                            >
                                Escolher este plano
                            </button>
                        </article>
                    )
                })}
            </div>

            <div className={styles.securityNotice}>
                <span>
                    <FiShield aria-hidden="true" />
                    Pagamento protegido
                </span>

                <span>
                    <FiCreditCard aria-hidden="true" />
                    Cancele quando quiser
                </span>
            </div>
        </div>
    )
}

export default Prices