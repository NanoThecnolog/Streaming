import { FaRegFlag } from 'react-icons/fa'
import styles from './styles.module.scss'

interface HelpProps {
  modalVisible: () => void
}

export default function HelpFlag({ modalVisible }: HelpProps) {
  return (
    <button
      type="button"
      className={styles.helpButton}
      onClick={modalVisible}
      title="Informar um problema"
      aria-label="Informar um problema com este conteúdo"
    >
      <FaRegFlag aria-hidden="true" />
    </button>
  )
}
