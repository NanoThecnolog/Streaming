import { AlertTriangle } from 'lucide-react'
import styles from './styles.module.scss'

interface CancelProps {
    handleConfirmCancel: () => void,
    handleShowCancelModal: () => void
}

export default function CancelSubModal({ handleConfirmCancel, handleShowCancelModal }: CancelProps) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <AlertTriangle size={42} className={styles.modalIcon} />

                <h2>Cancelar Assinatura?</h2>
                <p>
                    Essa ação é permanente. Após cancelar, sua assinatura será interrompida e você perderá o acesso ao plano no próximo ciclo.
                </p>

                <div className={styles.modalActions}>
                    <button className={styles.modalCancel} onClick={handleShowCancelModal}>
                        Fechar
                    </button>

                    <button className={styles.modalConfirm} onClick={handleConfirmCancel}>
                        Confirmar Cancelamento
                    </button>
                </div>
            </div>
        </div>
    )
}