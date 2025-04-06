import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { AiOutlineBarcode } from "react-icons/ai";

interface BilletProps {
    setMethod: (method: string) => void
}
export default function PaymentBillet({ setMethod }: BilletProps) {
    const [billet, setBillet] = useState(false)

    useEffect(() => {
        if (billet) setMethod('billet')
        else setMethod('')
    }, [billet])
    const handleCheckBox = () => {
        setBillet(!billet)
    }
    return (
        <section className={styles.container}>
            <h2>Pagamento com Boleto bancário</h2>
            <div className={styles.billet}>
                <AiOutlineBarcode size={100} />
                <div className={styles.checkbox}>
                    <input
                        type="checkbox"
                        onChange={handleCheckBox}
                    />
                </div>
            </div>

        </section>
    )
}