import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { AiOutlineBarcode } from "react-icons/ai";
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { CreditPayment } from '@/@types/payment';

interface BilletProps {
    setMethod: (method: 'credit' | 'billet' | null) => void
    setCredit: React.Dispatch<React.SetStateAction<CreditPayment>>
    confirm: boolean
}
export default function PaymentBillet({ setMethod, setCredit, confirm }: BilletProps) {
    const [checked, setChecked] = useState(false)

    /*useEffect(() => {
        if (billet) setMethod('billet')
        else setMethod(null)
    }, [billet])*/
    /*const handleCheckBox = () => {
        setBillet(!billet)
    }*/
    return (
        <section className={styles.container}>
            <IoIosArrowBack
                onClick={() => { setMethod(null), setCredit(prev => ({ ...prev, fullComplete: false })) }}
                size={30}
                style={{ cursor: 'pointer' }}
                title='voltar'
            />
            <h2>Pagamento com Boleto bancário</h2>
            <div className={styles.billet}>
                <AiOutlineBarcode size={100} />
            </div>
            <p>Seu boleto será gerado após finalizar sua assinatura!</p>

            <div className={styles.aviso}>
                <label htmlFor="check">
                    <input type="checkbox" onChange={() => { setChecked(!checked), setCredit(prev => ({ ...prev, fullComplete: !confirm })) }} id="check" />
                    <p>Concordo com os Termos de Uso e Política de Privacidade.</p>
                </label>
                <p>
                    Ao marcar a caixa de seleção acima, você concorda com nossos <strong><Link href="/termos-de-uso" target='_blank' rel='noopener noreferrer'>Termos de Uso</Link></strong> e com nossa <strong><Link href="/privacidade" target='_blank' rel='noopener noreferrer'>Declaração de Privacidade</Link></strong> e confirma ter mais de 18 anos. A FlixNext renovará automaticamente sua assinatura e cobrará o preço da assinatura escolhida da sua forma de pagamento até você cancelar. Você pode cancelar quando quiser para evitar cobranças futuras.
                </p>
            </div>
        </section>
    )
}