import { ReactNode } from 'react'
import styles from './styles.module.scss'
import { FaBarcode, FaPix } from 'react-icons/fa6'
import { FaCreditCard } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

type PaymentMethod = 'pix' | 'credit-card' | 'billet'

interface PaymentMethodStepProps {
  selectedMethod: PaymentMethod
  allowedMethods?: PaymentMethod[]
  onSelectMethod: (method: PaymentMethod) => void
  onBack: () => void
  onContinue: () => void
}

interface PaymentOption {
  id: PaymentMethod
  name: string
  description: string
  badge?: string
  icon: IconType
}

const paymentOptions: PaymentOption[] = [
  /*{
        id: 'pix',
        name: 'Pix',
        description: 'Confirmação rápida após o pagamento',
        badge: 'Recomendado',
        icon: FaPix,
    },*/
  {
    id: 'credit-card',
    name: 'Cartão de crédito',
    description: 'Pagamento processado imediatamente',
    badge: 'Recomendado - 3 dias de trial',
    icon: FaCreditCard,
  },
  {
    id: 'billet',
    name: 'Pix ou Boleto bancário',
    description: 'Boleto pode ser pago por pix',
    icon: FaBarcode,
  },
]

export function PaymentMethodStep({
  selectedMethod,
  allowedMethods,
  onSelectMethod,
  onBack,
  onContinue,
}: PaymentMethodStepProps) {
  const methodsToShow = paymentOptions.filter((method) =>
    allowedMethods ? allowedMethods.includes(method.id) : true,
  )

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span>Forma de pagamento</span>

        <h1>Como deseja pagar?</h1>

        <p>Selecione uma opção para continuar com a assinatura.</p>
      </header>

      <div className={styles.options}>
        {methodsToShow.map((option) => {
          const isSelected = option.id === selectedMethod

          const Icon = option.icon

          return (
            <button
              key={option.id}
              type="button"
              className={[styles.option, isSelected ? styles.selected : ''].join(' ')}
              onClick={() => onSelectMethod(option.id)}
            >
              <span className={styles.icon}>
                <Icon size={18} />
              </span>

              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>
                  <strong>{option.name}</strong>

                  {option.badge && <span>{option.badge}</span>}
                </div>

                <p>{option.description}</p>
              </div>

              <span className={styles.radio} />
            </button>
          )
        })}
      </div>

      <div className={styles.notice}>
        <span>✓</span>

        <p>O acesso será liberado após a confirmação do pagamento.</p>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.back} onClick={onBack}>
          Voltar
        </button>

        <button type="button" className={styles.continue} onClick={onContinue}>
          Continuar
        </button>
      </div>
    </section>
  )
}
