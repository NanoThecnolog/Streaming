import { useState } from 'react'
import valid from 'card-validator'
import { TbLock } from 'react-icons/tb'

import { CreditCardData } from '@/@types/payment'
import { brands } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface CreditCardFieldsProps {
  creditCard: CreditCardData
  onChange: (creditCard: CreditCardData) => void
  idPrefix?: string
}

const formatCpf = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)

  return numbers
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

const formatCardNumber = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

const CreditCardFields = ({
  creditCard,
  onChange,
  idPrefix = 'payment',
}: CreditCardFieldsProps) => {
  const [showCvv, setShowCvv] = useState(false)

  const updateField = (field: keyof CreditCardData, value: string) => {
    onChange({ ...creditCard, [field]: value })
  }

  const handleCardNumberChange = (value: string) => {
    const number = formatCardNumber(value)
    const brand = valid.number(number).card?.type ?? ''

    onChange({ ...creditCard, number, brand })
  }

  const Icon = creditCard.brand ? brands[creditCard.brand] : undefined
  const fieldId = (name: string) => `${idPrefix}-${name}`

  return (
    <fieldset className={styles.section}>
      <div className={styles.sectionHeader}>
        <legend>Dados do cartão</legend>

        <span>
          <TbLock size={15} />
          Ambiente protegido
        </span>
      </div>

      <div className={styles.fields}>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor={fieldId('card-number')}>Número do cartão</label>

          <div className={styles.inputWithIcon}>
            <input
              id={fieldId('card-number')}
              name="cardNumber"
              type="text"
              value={creditCard.number}
              onChange={(event) => handleCardNumberChange(event.target.value)}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={23}
              required
            />

            <span aria-hidden="true">{Icon ? <Icon /> : '▣'}</span>
          </div>
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor={fieldId('holder-name')}>Nome impresso no cartão</label>

          <input
            id={fieldId('holder-name')}
            name="holderName"
            type="text"
            value={creditCard.holderName}
            onChange={(event) => updateField('holderName', event.target.value.toUpperCase())}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            autoComplete="cc-name"
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor={fieldId('holder-document')}>CPF do titular do cartão</label>

          <input
            id={fieldId('holder-document')}
            name="holderDocument"
            type="text"
            value={creditCard.holderDocument}
            onChange={(event) => updateField('holderDocument', formatCpf(event.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            maxLength={14}
            required
          />

          <small>Informe o CPF da pessoa titular do cartão, não necessariamente o da conta.</small>
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('expiry-month')}>Mês de validade</label>

          <input
            id={fieldId('expiry-month')}
            name="expiryMonth"
            type="text"
            value={creditCard.expiryMonth}
            onChange={(event) =>
              updateField('expiryMonth', event.target.value.replace(/\D/g, '').slice(0, 2))
            }
            placeholder="MM"
            inputMode="numeric"
            autoComplete="cc-exp-month"
            maxLength={2}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('expiry-year')}>Ano de validade</label>

          <input
            id={fieldId('expiry-year')}
            name="expiryYear"
            type="text"
            value={creditCard.expiryYear}
            onChange={(event) =>
              updateField('expiryYear', event.target.value.replace(/\D/g, '').slice(0, 4))
            }
            placeholder="AAAA"
            inputMode="numeric"
            autoComplete="cc-exp-year"
            maxLength={4}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('cvv')}>Código de segurança</label>

          <div className={styles.passwordInput}>
            <input
              id={fieldId('cvv')}
              name="cvv"
              type={showCvv ? 'text' : 'password'}
              value={creditCard.cvv}
              onChange={(event) =>
                updateField('cvv', event.target.value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="CVV"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
              required
            />

            <button type="button" onClick={() => setShowCvv((current) => !current)}>
              {showCvv ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cardNotice}>
        <span>!</span>

        <p>
          Os dados do cartão serão utilizados somente para processar o pagamento. Eles não são
          armazenados em nossa plataforma.
        </p>
      </div>
    </fieldset>
  )
}

export default CreditCardFields
