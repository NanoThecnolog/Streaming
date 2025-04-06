import { CreditPayment } from '@/pages/payment'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { useEffect, useState } from 'react'
import valid from 'card-validator'
import { Divide } from 'lucide-react'

interface PaymentProps {
    credit: CreditPayment,
    setCredit: React.Dispatch<React.SetStateAction<CreditPayment>>
}

export default function PaymentCredit({ credit, setCredit }: PaymentProps) {
    const [brand, setBrand] = useState<string | null>(null)
    const [validExpiration, setValidExpiration] = useState<boolean | null>(null)
    const [validCVV, setValidCVV] = useState<boolean | null>(null)
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target

        if (name === 'number') {
            const validation = valid.number(value)
            if (validation.card) setBrand(validation.card.type)
            else setBrand(null)
        }
        if (name === 'expiration') {
            const expiration = valid.expirationDate(value)
            if (!expiration.isValid) setValidExpiration(expiration.isValid)
            else setValidExpiration(true)
        }
        if (name === 'cvv') {
            const cvv = valid.cvv(value, [3, 4])
            if (!cvv.isValid) setValidCVV(cvv.isValid)
            else setValidCVV(true)
        }

        setCredit((prev: CreditPayment) => ({
            ...prev,
            [name]: value,
        }))
    }
    useEffect(() => {
        //
        if (credit.number) {
            const cardValidation = valid.number(credit.number)
            debug.log(cardValidation)
        }
    }, [credit])
    return (
        <section className={styles.container}>
            <h2>Pagamento com Cartão de Crédito</h2>
            <div className={styles.form}>
                <div className={styles.input}>
                    <label htmlFor="card-number">Número do Cartão</label>
                    <input
                        type="text"
                        id="card-number"
                        className={styles.numberInput}
                        maxLength={19}
                        placeholder="1234 5678 9101 1121"
                        required
                        value={credit.number}
                        name='number'
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.input}>
                        <label htmlFor="expiry-date">Validade</label>
                        <input
                            type="text"
                            id="expiry-date"
                            className={styles.expireInput}
                            maxLength={5}
                            placeholder="MM/AA"
                            required
                            name='expiration'
                            value={credit.expiration}
                            onChange={handleChange}
                        />
                        {credit.expiration !== '' && validExpiration !== null && validExpiration == false &&
                            <div>
                                Data inválida!
                            </div>
                        }
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            className={styles.cvvInput}
                            maxLength={3}
                            placeholder="123"
                            required
                            name='cvv'
                            value={credit.cvv}
                            onChange={handleChange}
                        />
                        {
                            credit.cvv !== '' && validCVV !== null && validCVV == false &&
                            <div>
                                <p>cvv invalido!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}