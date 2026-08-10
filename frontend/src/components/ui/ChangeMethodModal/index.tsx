import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { toast } from '@/components/ui/Notifications'
import { MdClose, MdCreditCard, MdLock, MdReceiptLong } from 'react-icons/md'

import { CreditCardData } from '@/@types/payment'
import CreditCardFields from '@/components/ui/Pagamentos/CreditCardFields'
import { useFlix } from '@/contexts/FlixContext'
import { Validate } from '@/classes/validator'

import styles from './styles.module.scss'

type PaymentMethod = 'billet' | 'credit'

interface ChangeMethodPayload {
  action: 'change-method' | 'update-card'
  method: PaymentMethod
  paymentToken?: string
  cardMask?: string
}

interface ModalProps {
  closeModal: () => void
  before: PaymentMethod
  setNewMethod: (payload: ChangeMethodPayload) => Promise<void>
}

interface EfiTokenResult {
  payment_token: string
  card_mask: string
}

interface EfiCreditCardBuilder {
  setAccount: (accountId: string) => EfiCreditCardBuilder

  setEnvironment: (environment: string) => EfiCreditCardBuilder

  setCreditCardData: (data: CreditCardTokenData) => EfiCreditCardBuilder

  getPaymentToken: () => Promise<unknown>
}

interface EfiPaySDK {
  CreditCard: EfiCreditCardBuilder
}

interface CreditCardTokenData {
  brand: string
  number: string
  cvv: string
  expirationMonth: string
  expirationYear: string
  holderName: string
  holderDocument: string
  reuse: boolean
}

const isEfiTokenResult = (result: unknown): result is EfiTokenResult => {
  if (typeof result !== 'object' || result === null) {
    return false
  }

  const tokenResult = result as Partial<EfiTokenResult>

  return typeof tokenResult.payment_token === 'string' && typeof tokenResult.card_mask === 'string'
}

const normalizeDocument = (document: string): string => {
  return document.replace(/\D/g, '')
}

const initialCreditCard: CreditCardData = {
  brand: '',
  holderName: '',
  holderDocument: '',
  number: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
}

const ChangeMethodModal = ({ closeModal, before, setNewMethod }: ModalProps) => {
  const { user } = useFlix()

  const [creditCard, setCreditCard] = useState<CreditCardData>(initialCreditCard)

  const [submitting, setSubmitting] = useState(false)
  const [action, setAction] = useState<'change-method' | 'update-card'>(
    before === 'credit' ? 'update-card' : 'change-method',
  )

  const isFinish = true

  const newMethod: PaymentMethod =
    action === 'update-card' ? 'credit' : before === 'billet' ? 'credit' : 'billet'

  const methodContent = useMemo(() => {
    if (newMethod === 'credit') {
      return {
        title: action === 'update-card' ? 'Atualizar cartão' : 'Alterar para cartão de crédito',
        description:
          action === 'update-card'
            ? 'O novo cartão será utilizado nas próximas cobranças da assinatura.'
            : 'Uma nova recorrência será criada sem interromper o período de acesso atual.',
        buttonLabel: action === 'update-card' ? 'Atualizar cartão' : 'Alterar para cartão',
        Icon: MdCreditCard,
      }
    }

    return {
      title: 'Alterar para boleto bancário',
      description: 'As próximas cobranças serão emitidas por boleto bancário.',
      buttonLabel: 'Confirmar boleto',
      Icon: MdReceiptLong,
    }
  }, [action, newMethod])

  const { title, description, buttonLabel, Icon } = methodContent

  const accountCpf = normalizeDocument(user?.cpf ?? '')
  const normalizedHolderDocument = normalizeDocument(creditCard.holderDocument)
  const hasAccountPaymentData = accountCpf.length === 11 && Boolean(user?.phone_number)

  const hasValidCreditData = useMemo(() => {
    if (newMethod !== 'credit') return true
    return Validate.creditCard(creditCard)
  }, [creditCard, newMethod])

  const canSubmit = hasValidCreditData && (action === 'update-card' || hasAccountPaymentData)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, submitting])

  const loadEfiPay = async (): Promise<EfiPaySDK> => {
    const module = await import('payment-token-efi')

    return module.default as EfiPaySDK
  }

  const createCreditToken = async (): Promise<EfiTokenResult> => {
    if (!Validate.cpf(normalizedHolderDocument)) {
      throw new Error('Informe corretamente o CPF do titular do cartão.')
    }

    const accountId = process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID

    const environment = process.env.NEXT_PUBLIC_EFI_ENV

    if (!accountId || !environment) {
      throw new Error('A configuração de pagamento está indisponível.')
    }

    const EfiPay = await loadEfiPay()

    const result = await EfiPay.CreditCard.setAccount(accountId)
      .setEnvironment(environment)
      .setCreditCardData({
        brand: creditCard.brand,
        number: creditCard.number.replace(/\D/g, ''),
        cvv: creditCard.cvv.replace(/\D/g, ''),
        expirationMonth: creditCard.expiryMonth,
        expirationYear: creditCard.expiryYear,
        holderName: creditCard.holderName.trim(),
        holderDocument: normalizedHolderDocument,
        reuse: true,
      })
      .getPaymentToken()

    if (!isEfiTokenResult(result)) {
      throw new Error('Não foi possível validar o cartão.')
    }

    return result
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !submitting) {
      closeModal()
    }
  }

  const handleChangeMethod = async () => {
    if (submitting) return

    if (newMethod === 'credit' && !hasValidCreditData) {
      toast.warning('Preencha corretamente os dados do cartão.')

      return
    }

    setSubmitting(true)

    try {
      if (newMethod === 'credit') {
        const token = await createCreditToken()

        await setNewMethod({
          action,
          method: 'credit',
          paymentToken: token.payment_token,
          cardMask: token.card_mask,
        })
      } else {
        await setNewMethod({
          action: 'change-method',
          method: 'billet',
        })
      }

      toast.success('Forma de pagamento alterada com sucesso!')

      closeModal()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Não foi possível alterar a forma de pagamento.'

      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={handleOverlayClick}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-method-title"
        onMouseDown={(event) => {
          event.stopPropagation()
        }}
      >
        {isFinish ? (
          <>
            <header className={styles.header}>
              <div className={styles.heading}>
                <span className={styles.methodIcon}>
                  <Icon aria-hidden="true" />
                </span>

                <div>
                  <h2 id="change-method-title">{title}</h2>

                  <p>{description}</p>
                </div>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                aria-label="Fechar modal"
                disabled={submitting}
                onClick={closeModal}
              >
                <MdClose aria-hidden="true" />
              </button>
            </header>

            <div className={styles.content}>
              {before === 'credit' && (
                <div className={styles.methodChoice}>
                  <button
                    type="button"
                    className={action === 'update-card' ? styles.selectedChoice : ''}
                    onClick={() => setAction('update-card')}
                  >
                    Atualizar cartão
                  </button>
                  <button
                    type="button"
                    className={action === 'change-method' ? styles.selectedChoice : ''}
                    onClick={() => setAction('change-method')}
                  >
                    Alterar para boleto
                  </button>
                </div>
              )}

              {newMethod === 'credit' ? (
                <>
                  {action === 'change-method' && !hasAccountPaymentData && (
                    <div className={styles.warning} role="alert">
                      Cadastre CPF e telefone na conta antes de alterar o pagamento.
                    </div>
                  )}

                  <CreditCardFields
                    creditCard={creditCard}
                    onChange={setCreditCard}
                    idPrefix="change-payment"
                  />

                  <div className={styles.security}>
                    <MdLock aria-hidden="true" />

                    <span>
                      Os dados do cartão são enviados diretamente para a processadora de pagamentos.
                    </span>
                  </div>
                </>
              ) : (
                <div className={styles.billetNotice}>
                  <MdReceiptLong aria-hidden="true" />

                  <div>
                    <strong>Pagamento por boleto</strong>

                    <p>
                      Após a confirmação, as próximas cobranças da assinatura serão emitidas como
                      boleto bancário.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <footer className={styles.actions}>
              <button
                type="button"
                className={styles.cancelButton}
                disabled={submitting}
                onClick={closeModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                className={styles.confirmButton}
                disabled={submitting || !canSubmit}
                onClick={handleChangeMethod}
              >
                {submitting ? 'Alterando...' : buttonLabel}
              </button>
            </footer>
          </>
        ) : (
          <div className={styles.dev}>
            Função em desenvolvimento. Em breve você poderá alterar o método de pagamento da sua
            assinatura!
          </div>
        )}
      </section>
    </div>
  )
}

export default ChangeMethodModal
