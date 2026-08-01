
import { SelectedPlan } from '@/pages/payment'
import styles from './styles.module.scss'
import { PlanProps } from '@/@types/payment'
import { useEffect, useState } from 'react'
import { debug } from '@/classes/DebugLogger'
import { formatPrice } from '@/utils/UtilitiesFunctions'

interface OrderSummaryProps {
    plan: PlanProps | null
    email: string
}

export function OrderSummary({
    plan,
    email,
}: OrderSummaryProps) {

    const [features, setFeatures] = useState<string[]>([])

    useEffect(() => {
        debug.log("plano no sumario", plan)
        if (!plan) return
        const feats = content.find((c) => c.type.toLowerCase() === plan.type.toLowerCase())
        if (!feats) return
        setFeatures(feats.features)
    }, [plan])

    const content = [
        {
            type: 'mensal',
            features: [
                'Catálogo completo',
                'Filmes e séries',
                'Continue assistindo',
                'Cancele quando quiser',
            ],
        },
        {
            type: 'trimestral',
            features: [
                'Todos os benefícios do mensal',
                'Menor preço por mês',
                'Renovação a cada 3 meses',
                'Cancele quando quiser',
            ],
        },
        {
            type: 'semestral',
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
            features: [
                'Acesso completo ao catálogo',
                'Filmes, séries e animações',
                'Continue assistindo de onde parou',
                'Melhor custo-benefício entre os planos',
                'Renovação a cada 12 meses',
            ],
        }

    ]
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span>Resumo</span>
                <h2>Sua assinatura</h2>
            </header>

            <div className={styles.plan}>
                <div>
                    <strong>{plan?.name}</strong>
                    <span>Acesso Completo ao catálogo</span>
                </div>

                <strong>
                    {plan && formatPrice(plan.price)}
                </strong>
            </div>

            <div className={styles.details}>
                <div>
                    <span>E-mail</span>

                    <strong>
                        {email || 'Ainda não informado'}
                    </strong>
                </div>

                <div>
                    <span>Renovação</span>
                    <strong>Automática</strong>
                </div>

                <div>
                    <span>Cancelamento</span>
                    <strong>A qualquer momento</strong>
                </div>
            </div>

            <div className={styles.total}>
                <div>
                    <span>Total</span>
                    <small>Valor da primeira cobrança</small>
                </div>

                <strong>
                    {plan && formatPrice(plan.price)}
                </strong>
            </div>

            <ul className={styles.benefits}>
                {features.map((feature, index) => (
                    <li key={index}>
                        <span>✓</span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className={styles.safe}>
                <span>✓</span>

                <div>
                    <strong>Pagamento seguro</strong>
                    <p>
                        Seus dados são enviados por conexão
                        criptografada.
                    </p>
                </div>
            </div>
        </section>
    )
}