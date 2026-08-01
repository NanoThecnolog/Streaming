
import { SelectedPlan } from '@/pages/payment'
import styles from './styles.module.scss'
import { PlanProps } from '@/@types/payment'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/UtilitiesFunctions'

interface PlanStepProps {
    plans: PlanProps[]
    selectedPlan: PlanProps | null
    onSelectPlan: (plan: PlanProps) => void
    onBack: () => void
    onContinue: () => void
}

const plansContent: SelectedPlan[] = [
    {
        type: 'mensal',
        name: 'Plano mensal',
        description: 'Acesso completo por 30 dias',
        features: [
            'Acesso completo ao catálogo',
            'Filmes, séries e animações',
            'Continue assistindo de onde parou',
            'Atualizações frequentes no catálogo',
            'Cancelamento a qualquer momento',
        ],
    },
    {
        type: 'trimestral',
        name: 'Plano trimestral',
        description: 'Acesso completo por 3 meses',
        features: [
            'Acesso completo ao catálogo',
            'Filmes, séries e animações',
            'Continue assistindo de onde parou',
            'Menor custo mensal que o plano mensal',
            'Renovação a cada 3 meses',
        ],
    },
    {
        type: 'semestral',
        name: 'Plano semestral',
        description: 'Acesso completo por 6 meses',
        features: [
            'Acesso completo ao catálogo',
            'Filmes, séries e animações',
            'Continue assistindo de onde parou',
            'Mais economia no valor por mês',
            'Renovação a cada 6 meses',
        ],
    },
    {
        type: 'anual',
        name: 'Plano anual',
        description: 'Acesso completo por 12 meses',
        features: [
            'Acesso completo ao catálogo',
            'Filmes, séries e animações',
            'Continue assistindo de onde parou',
            'Melhor custo-benefício entre os planos',
            'Renovação a cada 12 meses',
        ],
    },
]



export function PlanStep({ plans, selectedPlan, onSelectPlan, onBack, onContinue }: PlanStepProps) {

    const periodLabel = {
        mensal: '/mês',
        trimestral: '/trimestre',
        semestral: '/semestre',
        anual: '/ano'
    } as const

    if (!selectedPlan) return null


    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span>Escolha seu acesso</span>

                <h1>Selecione o plano ideal</h1>

                <p>
                    Você poderá revisar todas as informações antes de
                    gerar o pagamento.
                </p>
            </header>

            <div className={styles.plans}>
                {plans.map((plan) => {
                    const isSelected =
                        selectedPlan.id === plan.id

                    const content = plansContent.find(content => content.type.toLowerCase() === plan.type.toLowerCase())

                    return (
                        <button
                            key={plan.id}
                            type="button"
                            className={[
                                styles.plan,
                                isSelected
                                    ? styles.selected
                                    : '',
                            ].join(' ')}
                            onClick={() => onSelectPlan(plan)}
                        >
                            <div className={styles.planHeader}>
                                <span
                                    className={styles.radio}
                                    aria-hidden="true"
                                />

                                <div>
                                    <strong>{plan.name}</strong>
                                    <p>{content?.description}</p>
                                </div>

                                <div className={styles.price}>
                                    <strong>
                                        {formatPrice(plan.price)}
                                    </strong>

                                    <span>
                                        {periodLabel[plan.type]}
                                    </span>
                                </div>
                            </div>

                            <ul>
                                {content?.features.map((feature) => (
                                    <li key={feature}>
                                        <span>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </button>
                    )
                })}
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.back}
                    onClick={onBack}
                >
                    Voltar
                </button>

                <button
                    type="button"
                    className={styles.continue}
                    onClick={onContinue}
                >
                    Continuar
                </button>
            </div>
        </section>
    )
}