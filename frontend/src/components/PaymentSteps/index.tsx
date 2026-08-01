import { FaCreditCard } from 'react-icons/fa'
import styles from './styles.module.scss'
import { AiOutlineBarcode } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import PaymentCredit from './paymentCredit'
import { useEffect, useState } from 'react'
import { CreditPayment } from '@/@types/payment'
import PaymentBillet from './billet'

interface SelectProps {
    method: (string: 'credit' | 'billet' | null) => void
    checked: (a: boolean) => void,
    setToken: (s: string) => void
}
type PaymentType = 'credit' | 'billet' | null

export default function SelectPayment({ method, checked, setToken }: SelectProps) {
    const [paymentType, setPaymentType] = useState<PaymentType>(null)
    const [credit, setCredit] = useState<CreditPayment | null>(null)
    const [billetCheck, setBilletCheck] = useState<boolean>(false)

    useEffect(() => {
        if (paymentType === null) {
            method(null)
            checked(false)
        }

        const canProceed =
            (paymentType === 'billet' && billetCheck === true) ||
            (paymentType === 'credit' && credit !== null)

        if (canProceed) method(paymentType)
        //else method(null)
    }, [paymentType, credit, billetCheck])



    const handleSelect = (type: PaymentType) => {
        setPaymentType(prev => (prev === type ? null : type))
        method(type)
    }
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div
                    className={styles.header}
                    onClick={() => handleSelect('credit')}
                >
                    <div className={styles.method}>
                        <h4>Pagar com cartão</h4>
                        <FaCreditCard size={22} />
                    </div>
                    <IoIosArrowDown
                        className={`
                            ${styles.arrow} ${paymentType === 'credit'
                                ? styles.open : ''
                            }`}
                    />
                </div>
                <div
                    className={`
                        ${styles.dropdown}
                        ${paymentType === 'credit' ? styles.open : ''}
                    `}
                >
                    <PaymentCredit credit={credit} setCredit={setCredit} check={checked} setToken={setToken} />
                </div>
            </div>
            <div className={styles.item}>
                <div
                    className={styles.header}
                    onClick={() => handleSelect('billet')}
                >
                    <div className={styles.method}>
                        <h4>Pagar no boleto</h4>
                        <AiOutlineBarcode size={22} />
                    </div>
                    <IoIosArrowDown
                        className={`${styles.arrow} ${paymentType === 'billet' ? styles.open : ''}`}
                    />
                </div>
                <div
                    className={`${styles.dropdown} ${paymentType === 'billet' ? styles.open : ''
                        }`}
                >
                    <PaymentBillet setCheck={checked} />
                </div>
            </div>
        </div>
    )
}