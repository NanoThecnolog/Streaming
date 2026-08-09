import { useEffect } from 'react'
import Link from 'next/link'
import { FiAlertTriangle, FiCheck, FiHelpCircle, FiX } from 'react-icons/fi'

import { useFlix } from '@/contexts/FlixContext'
import { formatPrice } from '@/utils/UtilitiesFunctions'
import { planValues } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface WarningModalProps {
  open: boolean
  onClose: () => void
}

export const WarningModal = ({ open, onClose }: WarningModalProps) => {
  const { subscription } = useFlix()

  const plansUrl = subscription ? '/me/escolher-plano' : '/planos'

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick} role="presentation">
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="warning-modal-title"
        aria-describedby="warning-modal-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar aviso"
        >
          <FiX />
        </button>

        <header className={styles.header}>
          <div className={styles.icon}>
            <FiAlertTriangle />
          </div>

          <div>
            <span className={styles.eyebrow}>Conteúdo exclusivo</span>

            <h2 id="warning-modal-title">Você precisa de um plano ativo</h2>
          </div>
        </header>

        <div className={styles.content}>
          <p id="warning-modal-description" className={styles.primaryText}>
            Ative sua assinatura para assistir ao conteúdo e aproveitar todos os recursos da
            plataforma.
          </p>

          <div className={styles.planCard}>
            <div className={styles.priceContent}>
              <span>Planos a partir de</span>

              <strong>{formatPrice(planValues.mensal)}</strong>
            </div>

            <ul className={styles.benefits}>
              <li>
                <FiCheck />
                Acesso ao catálogo completo
              </li>

              <li>
                <FiCheck />
                Continue assistindo de onde parou
              </li>

              <li>
                <FiCheck />
                Lista de favoritos e recomendações
              </li>
            </ul>
          </div>

          <div className={styles.paymentNotice}>
            <FiHelpCircle />

            <p>
              Pagamento por cartão de crédito ou boleto bancário, com opção de pagamento via Pix. O
              valor contribui com a manutenção e os custos operacionais da plataforma.
            </p>
          </div>

          {!subscription && (
            <p className={styles.availability}>O número de contas ativas pode ser limitado.</p>
          )}

          <p className={styles.support}>
            Precisa de ajuda? Entre em contato pelo e-mail{' '}
            <a href="mailto:suporte@flixnext.com.br">suporte@flixnext.com.br</a>
          </p>
        </div>

        <footer className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.secondaryButton}>
            Agora não
          </button>

          <Link href={plansUrl} className={styles.primaryButton}>
            {subscription ? 'Ativar um plano' : 'Conhecer os planos'}
          </Link>
        </footer>
      </section>
    </div>
  )
}
