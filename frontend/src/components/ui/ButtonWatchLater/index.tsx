import { FiCheck, FiLoader, FiPlus } from 'react-icons/fi'

import styles from './styles.module.scss'

interface WatchLaterProps {
  onClick: () => void
  loading: boolean
  onWatchLater: boolean
}

export default function WatchLaterContainer({ onClick, loading, onWatchLater }: WatchLaterProps) {
  const label = loading ? 'Atualizando...' : onWatchLater ? 'Na minha lista' : 'Minha lista'

  const actionLabel = onWatchLater ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'

  return (
    <div className={styles.buttonWatchLater}>
      <button
        type="button"
        className={[styles.button, onWatchLater ? styles.active : ''].filter(Boolean).join(' ')}
        onClick={onClick}
        disabled={loading}
        aria-label={loading ? label : actionLabel}
        aria-pressed={onWatchLater}
        aria-busy={loading}
      >
        {loading ? (
          <FiLoader className={styles.loadingIcon} aria-hidden="true" />
        ) : onWatchLater ? (
          <FiCheck aria-hidden="true" />
        ) : (
          <FiPlus aria-hidden="true" />
        )}

        <span aria-live="polite">{label}</span>
      </button>
    </div>
  )
}
