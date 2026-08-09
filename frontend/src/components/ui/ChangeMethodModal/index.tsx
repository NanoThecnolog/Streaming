import { MouseEvent, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { MdClose, MdCreditCard, MdLock, MdReceiptLong } from 'react-icons/md'

import { CreditPayment } from '@/@types/payment'
import PaymentCredit from '@/components/PaymentSteps/paymentCredit'
import { useFlix } from '@/contexts/FlixContext'
import { expirationSlicer } from '@/utils/UtilitiesFunctions'

import styles from './styles.module.scss'

type PaymentMethod = 'billet' | 'credit'

interface ChangeMethodPayload {
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

const ChangeMethodModal = ({ closeModal, before, setNewMethod }: ModalProps) => {
  const { user } = useFlix()

  const [credit, setCredit] = useState<CreditPayment | null>(null)

  const [submitting, setSubmitting] = useState(false)

  const isFinish = false

  const newMethod: PaymentMethod = before === 'billet' ? 'credit' : 'billet'

  const methodContent = useMemo(() => {
    if (newMethod === 'credit') {
      return {
        title: 'Alterar para cartão de crédito',
        description: 'Preencha os dados do cartão que será usado nas próximas cobranças.',
        buttonLabel: 'Salvar novo cartão',
        Icon: MdCreditCard,
      }
    }

    return {
      title: 'Alterar para boleto bancário',
      description: 'As próximas cobranças serão emitidas por boleto bancário.',
      buttonLabel: 'Confirmar boleto',
      Icon: MdReceiptLong,
    }
  }, [newMethod])

  const { title, description, buttonLabel, Icon } = methodContent

  const cpf = normalizeDocument(user?.cpf ?? '')

  const hasValidCreditData = useMemo(() => {
    if (newMethod !== 'credit') return true
    if (!credit) return false

    return Boolean(
      credit.brand &&
      credit.number?.replace(/\D/g, '').length >= 13 &&
      credit.cvv?.replace(/\D/g, '').length >= 3 &&
      credit.expiration?.replace(/\D/g, '').length === 4 &&
      credit.holderName?.trim().length >= 3 &&
      cpf.length === 11,
    )
  }, [credit, cpf, newMethod])

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
    if (!credit) {
      throw new Error('Preencha os dados do cartão.')
    }

    if (cpf.length !== 11) {
      throw new Error('O CPF do titular não está cadastrado corretamente.')
    }

    const accountId = process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID

    const environment = process.env.NEXT_PUBLIC_EFI_ENV

    if (!accountId || !environment) {
      throw new Error('A configuração de pagamento está indisponível.')
    }

    const expiration = credit.expiration.replace(/\D/g, '')

    if (expiration.length !== 4) {
      throw new Error('Informe uma validade válida.')
    }

    const { month: expirationMonth, year: expirationYear } = expirationSlicer(expiration)

    const EfiPay = await loadEfiPay()

    const result = await EfiPay.CreditCard.setAccount(accountId)
      .setEnvironment(environment)
      .setCreditCardData({
        brand: credit.brand,
        number: credit.number.replace(/\D/g, ''),
        cvv: credit.cvv.replace(/\D/g, ''),
        expirationMonth,
        expirationYear,
        holderName: credit.holderName.trim(),
        holderDocument: cpf,
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
          method: 'credit',
          paymentToken: token.payment_token,
          cardMask: token.card_mask,
        })
      } else {
        await setNewMethod({
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
              {newMethod === 'credit' ? (
                <>
                  {!user?.cpf && (
                    <div className={styles.warning} role="alert">
                      Cadastre seu CPF antes de adicionar um cartão.
                    </div>
                  )}

                  <PaymentCredit credit={credit} setCredit={setCredit} />

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
                disabled={submitting || !hasValidCreditData}
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
