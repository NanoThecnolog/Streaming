import { ChangeEvent, FormEvent, useMemo, useState } from 'react'

import styles from './styles.module.scss'
import { CreditCardData, PaymentMethod, PersonalData } from '@/@types/payment'
import { Validate } from '@/classes/validator'
import CreditCardFields from '@/components/ui/Pagamentos/CreditCardFields'

interface PersonalDataStepProps {
  data: PersonalData
  creditCard: CreditCardData
  paymentMethod: PaymentMethod
  onDataChange: (data: PersonalData) => void
  onCreditCardChange: (data: CreditCardData) => void
  onBack: () => void
  onContinue: () => void

  isProcessing: boolean
  paymentError: string | null
  requirePassword?: boolean
}

const paymentLabels: Record<PaymentMethod, string> = {
  pix: 'Pix',
  billet: 'Boleto bancário',
  'credit-card': 'Cartão de crédito',
}

const formatCpf = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)

  return numbers
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11)

  if (numbers.length <= 2) {
    return numbers
  }

  if (numbers.length <= 7) {
    return numbers.replace(/^(\d{2})(\d+)/, '($1) $2')
  }

  return numbers.replace(/^(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3')
}

export function PersonalDataStep({
  data,
  creditCard,
  paymentMethod,
  requirePassword = true,
  onDataChange,
  onCreditCardChange,
  onBack,
  onContinue,
  isProcessing,
  paymentError,
}: PersonalDataStepProps) {
  const isCreditCard = paymentMethod === 'credit-card'
  const personalDataIsValid = Validate.personalData(data)
  const creditCardIsValid = Validate.creditCard(creditCard)

  const [showPassword, setShowPassword] = useState(false)

  const passwordRequirements = useMemo(() => {
    const password = data.password
    const confirmation = data.confirmPassword

    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      matches: password.length > 0 && password === confirmation,
    }
  }, [data.password, data.confirmPassword])

  const passwordIsValid = Object.values(passwordRequirements).every(Boolean)

  //const canContinue = personalDataIsValid && requirePassword ? passwordIsValid && (!isCreditCard || creditCardIsValid) && !isProcessing : (!isCreditCard || creditCardIsValid) && !isProcessing
  const canContinue =
    personalDataIsValid &&
    (!requirePassword || passwordIsValid) &&
    (!isCreditCard || creditCardIsValid) &&
    !isProcessing

  const updatePersonalData = (field: keyof PersonalData, value: string) => {
    onDataChange({ ...data, [field]: value })
  }

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    updatePersonalData('cpf', formatCpf(event.target.value))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canContinue) return
    onContinue()
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    updatePersonalData('phoneNumber', formatPhone(event.target.value))
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Dados do pagamento</span>

        <h1>
          {isCreditCard ? 'Informe os dados do titular e do cartão' : 'Informe os dados do titular'}
        </h1>

        <p>Os dados serão utilizados para identificar o pagamento e criar sua assinatura.</p>
      </header>

      <div className={styles.paymentMethod}>
        <div>
          <span>Forma de pagamento</span>

          <strong>{paymentLabels[paymentMethod]}</strong>
        </div>

        <button type="button" onClick={onBack}>
          Alterar
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.section}>
          <legend>Dados pessoais</legend>

          <div className={styles.fields}>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="name">Nome completo</label>

              <input
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={(event) => updatePersonalData('name', event.target.value)}
                placeholder="Nome completo"
                autoComplete="name"
                required
              />

              <small>Informe o nome do titular do CPF.</small>
            </div>

            <div className={`${styles.field}`}>
              <label htmlFor="cpf">CPF</label>

              <input
                id="cpf"
                name="cpf"
                type="text"
                value={data.cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                inputMode="numeric"
                maxLength={14}
                required
              />
            </div>
            <div className={`${styles.field}`}>
              <label htmlFor="phoneNumber">Telefone celular</label>

              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={15}
                required
              />

              <small>Informe o celular com DDD.</small>
            </div>
            {requirePassword && (
              <>
                <div className={styles.field}>
                  <label htmlFor="password">Senha</label>

                  <div className={styles.passwordInput}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={data.password}
                      onChange={(event) => updatePersonalData('password', event.target.value)}
                      placeholder="Mínimo de 8 caracteres"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button type="button" onClick={() => setShowPassword((current) => !current)}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="confirmPassword">Confirme a senha</label>

                  <div className={styles.passwordInput}>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={data.confirmPassword}
                      onChange={(event) =>
                        updatePersonalData('confirmPassword', event.target.value)
                      }
                      placeholder="Digite a senha novamente"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>

                  {data.confirmPassword && data.password !== data.confirmPassword && (
                    <small className={styles.error}>As senhas não coincidem.</small>
                  )}
                </div>
                <ul className={styles.requirements}>
                  <Requirement
                    valid={passwordRequirements.length}
                    label="Pelo menos 8 caracteres"
                  />

                  <Requirement valid={passwordRequirements.uppercase} label="Uma letra maiúscula" />

                  <Requirement valid={passwordRequirements.lowercase} label="Uma letra minúscula" />

                  <Requirement valid={passwordRequirements.number} label="Um número" />

                  <Requirement valid={passwordRequirements.matches} label="As senhas são iguais" />
                </ul>
              </>
            )}
          </div>
        </fieldset>

        {isCreditCard && <CreditCardFields creditCard={creditCard} onChange={onCreditCardChange} />}

        {!isCreditCard && (
          <div className={styles.notice}>
            <span>i</span>

            <p>
              {paymentMethod === 'pix'
                ? 'O QR Code Pix será gerado depois da validação dos dados.'
                : 'O boleto e a linha digitável serão gerados depois da validação dos dados.'}
            </p>
          </div>
        )}
        {
          //Erro no pagamento:
          //{paymentError}
          paymentError && (
            <div className={styles.paymentError}>
              Erro ao processar pagamento. Fale conosco através do email suporte@flixnext.com.br
            </div>
          )
        }

        <div className={styles.actions}>
          <button type="button" className={styles.back} onClick={onBack} disabled={isProcessing}>
            Voltar
          </button>

          <button type="submit" className={styles.continue} disabled={!canContinue}>
            {isProcessing
              ? 'Processando...'
              : paymentMethod === 'credit-card'
                ? 'Confirmar'
                : 'Confirmar e gerar pagamento'}
          </button>
        </div>
      </form>
    </section>
  )
}

interface RequirementProps {
  valid: boolean
  label: string
}

function Requirement({ valid, label }: RequirementProps) {
  return (
    <li className={valid ? styles.requirementValid : ''}>
      <span aria-hidden="true">{valid ? '✓' : '○'}</span>

      {label}
    </li>
  )
}
