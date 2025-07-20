import { FaCreditCard } from 'react-icons/fa'
import styles from './styles.module.scss'
import { AiOutlineBarcode } from 'react-icons/ai'

interface SelectProps {
    method: (string: 'credit' | 'billet' | null) => void
}

export default function SelectPayment({ method }: SelectProps) {
    return (
        <div className={styles.container}>
            <div className={styles.item} onClick={() => method('credit')}>
                <h2>
                    Pagar com cartão
                </h2>
                <FaCreditCard size={100} />
            </div>
            <div className={styles.item} onClick={() => method('billet')}>
                <h2>
                    Pagar no boleto
                </h2>
                <AiOutlineBarcode size={100} />
            </div>
        </div>
    )
}