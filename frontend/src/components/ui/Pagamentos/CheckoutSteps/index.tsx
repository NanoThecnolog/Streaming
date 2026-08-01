
import { CheckoutStep } from '@/pages/payment'
import styles from './styles.module.scss'

interface CheckoutStepsProps {
    currentStep: CheckoutStep
}

interface StepItem {
    id: CheckoutStep
    label: string
}

const steps: StepItem[] = [
    {
        id: 'email',
        label: 'E-mail',
    },
    {
        id: 'plan',
        label: 'Plano',
    },
    {
        id: 'payment',
        label: 'Forma de pagamento',
    },
    {
        id: 'personal-data',
        label: 'Dados',
    },
    {
        id: 'confirmation',
        label: 'Confirmação',
    }
]

export function CheckoutSteps({
    currentStep,
}: CheckoutStepsProps) {
    const currentIndex = steps.findIndex(
        (step) => step.id === currentStep,
    )

    return (
        <nav
            className={styles.container}
            aria-label="Etapas da assinatura"
        >
            {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = index < currentIndex

                return (
                    <div
                        key={step.id}
                        className={styles.stepWrapper}
                    >
                        <div
                            className={[
                                styles.step,
                                isActive ? styles.active : '',
                                isCompleted ? styles.completed : '',
                            ].join(' ')}
                        >
                            <span className={styles.number}>
                                {isCompleted ? '✓' : index + 1}
                            </span>

                            <span className={styles.label}>
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <span
                                className={[
                                    styles.line,
                                    isCompleted
                                        ? styles.lineCompleted
                                        : '',
                                ].join(' ')}
                            />
                        )}
                    </div>
                )
            })}
        </nav>
    )
}