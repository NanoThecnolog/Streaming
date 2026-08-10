import { MouseEvent, useEffect } from 'react'
import { AlertTriangle, CalendarClock, LoaderCircle, X } from 'lucide-react'
import styles from './styles.module.scss'

interface CancelProps {
  handleConfirmCancel: () => void
  handleShowCancelModal: () => void
  cancelling: boolean
}

export default function CancelSubModal({
  handleConfirmCancel,
  handleShowCancelModal,
  cancelling,
}: CancelProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !cancelling) {
        handleShowCancelModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cancelling, handleShowCancelModal])

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !cancelling) {
      handleShowCancelModal()
    }
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={handleOverlayClick}>
      <section
        className={styles.modal}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cancel-subscription-title"
        aria-describedby="cancel-subscription-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <span className={styles.icon} aria-hidden="true">
            <AlertTriangle size={25} />
          </span>

          <div className={styles.heading}>
            <span>Ação de assinatura</span>
            <h2 id="cancel-subscription-title">Cancelar assinatura?</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleShowCancelModal}
            disabled={cancelling}
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </header>

        <div className={styles.content}>
          <p id="cancel-subscription-description">
            Sua assinatura deixará de ser renovada. Você continuará com acesso até o encerramento do
            período já contratado.
          </p>

          <div className={styles.notice}>
            <CalendarClock size={21} aria-hidden="true" />

            <div>
              <strong>Antes de continuar</strong>
              <span>
                Após o cancelamento, não serão geradas novas cobranças. Para voltar a assinar, será
                necessário escolher um plano novamente.
              </span>
            </div>
          </div>
        </div>

        <footer className={styles.actions}>
          <button
            type="button"
            className={styles.keepButton}
            onClick={handleShowCancelModal}
            disabled={cancelling}
          >
            Manter assinatura
          </button>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirmCancel}
            disabled={cancelling}
          >
            {cancelling && <LoaderCircle size={17} className={styles.spinner} aria-hidden="true" />}
            {cancelling ? 'Cancelando...' : 'Confirmar cancelamento'}
          </button>
        </footer>
      </section>
    </div>
  )
}
