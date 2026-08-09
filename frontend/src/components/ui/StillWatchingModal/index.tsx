import { Pause, Play, X } from 'lucide-react'
import styles from './styles.module.scss'

interface StillWatchingModalProps {
  title?: string
  onContinue: () => void
  onStop: () => void
}

const StillWatchingModal = ({ title, onContinue, onStop }: StillWatchingModalProps) => {
  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="still-watching-title"
        aria-describedby="still-watching-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Fechar e sair da reprodução"
          onClick={onStop}
        >
          <X size={22} />
        </button>

        <div className={styles.iconContainer}>
          <Pause size={34} strokeWidth={1.8} />
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Reprodução de {title} pausada</span>

          <h2 id="still-watching-title" className={styles.title}>
            Tem alguém assistindo?
          </h2>

          <p id="still-watching-description" className={styles.description}>
            {/*title
                            ? `A reprodução de “${title}” foi pausada porque não detectamos nenhuma interação recente.`
                            : 'A reprodução foi pausada porque não detectamos nenhuma interação recente.'
                        */}
          </p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.continueButton} onClick={onContinue} autoFocus>
            <Play size={19} fill="currentColor" />
            Continuar assistindo
          </button>

          <button type="button" className={styles.stopButton} onClick={onStop}>
            Não, é hora de ler um livro
          </button>
        </div>
      </section>
    </div>
  )
}

export default StillWatchingModal
