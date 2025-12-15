import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { useEffect, useState } from 'react'
import valid from 'card-validator'
import Link from 'next/link'
import { CreditPayment } from '@/@types/payment'
import { FaCcDinersClub, FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { CardNumberVerification } from 'card-validator/dist/card-number'
import { SiAmericanexpress } from 'react-icons/si'
import { IoIosArrowBack } from "react-icons/io";

interface PaymentProps {
    credit: CreditPayment | null | undefined,
    setCredit: React.Dispatch<React.SetStateAction<CreditPayment | null | undefined>>
    setMethod: React.Dispatch<React.SetStateAction<"credit" | "billet" | null>>
}

export default function PaymentCredit({ credit, setCredit, setMethod }: PaymentProps) {
    const [brand, setBrand] = useState<string | null>(null)
    const [validExpiration, setValidExpiration] = useState<boolean | null>(null)
    const [validCVV, setValidCVV] = useState<boolean | null>(null)
    const [validationStatus, setValidationStatus] = useState<CardNumberVerification | null>(null)
    const [checked, setChecked] = useState(false)

    const initialCredit = {
        brand: '',
        number: '',
        cvv: '',
        expiration: '',
        expirationMonth: '',
        expirationYear: '',
        holderName: '',
        holderDocument: '',
        reuse: false,
        fullComplete: false
    }

    const bandeiras: Record<string, JSX.Element> = {
        'mastercard': <FaCcMastercard size={40} />,
        'visa': <FaCcVisa size={40} />,
        'maestro': <FaCcMastercard size={40} />,
        'diners-club': <FaCcDinersClub size={40} />,
        'american-express': <SiAmericanexpress size={40} />,
    }
    const formatExpiration = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 4)
        return cleaned
    }
    const formatDisplay = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 4);
        if (cleaned.length === 0) return ''
        if (value.length <= 2) return cleaned
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        if (name === 'holderName') {
            setCredit(prev => ({ ...(prev ?? initialCredit), holderName: value }))
        }
        setCredit(prev => {
            const safePrev = prev ?? initialCredit
            return {
                ...safePrev,
                [name]: name === 'expiration' ? formatExpiration(value) : value,
            }

        })
    }
    useEffect(() => {
        if (credit?.number) {
            const cardValidation = valid.number(credit.number)
            setValidationStatus(cardValidation)
            debug.log(cardValidation)
        }
    }, [credit])
    useEffect(() => {
        if (brand) setCredit(prev => ({ ...(prev ?? initialCredit), brand }))
    }, [brand])
    useEffect(() => {
        if (!checked) {
            if (credit?.fullComplete !== false) {
                setCredit(prev => ({ ...(prev ?? initialCredit), fullComplete: false }))
            }
            return
        }
        const isComplete =
            credit?.number?.length === 16 &&
            credit?.expiration?.length === 4 &&
            credit?.cvv?.length === 3
        if (credit?.fullComplete !== isComplete)
            setCredit(prev => {
                const safePrev = prev ?? initialCredit
                return {
                    ...safePrev, fullComplete: true
                }
            })
        else setCredit(prev => {
            const safePrev = prev ?? initialCredit
            return {
                ...safePrev, fullComplete: false
            }
        })
    }, [checked, credit?.number, credit?.expiration, credit?.cvv])


    return (
        <section className={styles.container}>
            <div className={styles.headerContainer}>
                <IoIosArrowBack onClick={() => setMethod(null)} size={30} style={{ cursor: 'pointer' }} title='voltar' />
                <h2 className={styles.title}>Pagamento Cartão de Crédito</h2>
            </div>
            <div className={styles.form}>
                <div className={styles.input}>
                    <label htmlFor="card-name">Nome do Titular</label>
                    <input
                        id='card-name'
                        type="text"
                        required
                        placeholder='Nome do Titular como está no cartão'
                        value={credit?.holderName ?? ""}
                        onChange={handleChange}
                        name='holderName'
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="card-number">Número do Cartão</label>
                    <div className={styles.brandContainer}>
                        <input
                            type="text"
                            id="card-number"
                            className={styles.numberInput}
                            maxLength={19}
                            placeholder="1234 5678 9101 1121"
                            required
                            value={credit?.number ?? ''}
                            name='number'
                            onChange={handleChange}
                        />
                        <div className={styles.brand}>
                            {brand && bandeiras[brand]}
                        </div>
                    </div>
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
                            value={formatDisplay(credit?.expiration || "")}
                            onChange={handleChange}
                        />
                        {credit?.expiration !== '' && validExpiration !== null && validExpiration == false &&
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
                            value={credit?.cvv ?? ""}
                            onChange={handleChange}
                        />
                        {
                            credit?.cvv !== '' && validCVV !== null && validCVV == false &&
                            <div>
                                <p>cvv invalido!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.aviso}>
                <label htmlFor="check">
                    <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} id="check" />
                    <p>Concordo com os Termos de Uso e Política de Privacidade.</p>
                </label>
                <p>
                    Ao marcar a caixa de seleção acima, você concorda com nossos <strong><Link href="/termos-de-uso" target='_blank' rel='noopener noreferrer'>Termos de Uso</Link></strong> e com nossa <strong><Link href="/privacidade" target='_blank' rel='noopener noreferrer'>Declaração de Privacidade</Link></strong> e confirma ter mais de 18 anos. A FlixNext renovará automaticamente sua assinatura e cobrará o preço da assinatura escolhida da sua forma de pagamento até você cancelar. Você pode cancelar quando quiser para evitar cobranças futuras.
                </p>
            </div>
        </section>
    )
}