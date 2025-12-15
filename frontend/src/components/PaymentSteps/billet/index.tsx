import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { AiOutlineBarcode } from "react-icons/ai";
import Link from 'next/link';

interface PaymentProps {
    setCheck: (e: boolean) => void
    check: boolean
}

export default function PaymentBillet({ setCheck, check }: PaymentProps) {


    const handleCheck = () => {
        setCheck(!check)
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Pagamento com Boleto bancário</h2>
            </div>
            <div className={styles.billet}>
                <AiOutlineBarcode size={100} />
            </div>
            <p>Seu boleto será gerado após finalizar sua assinatura!</p>

            <div className={styles.aviso}>
                <label htmlFor="check">
                    <input
                        type="checkbox"
                        onChange={handleCheck}
                        id="check"
                        checked={check}
                    />
                    <p>Concordo com os Termos de Uso e Política de Privacidade.</p>
                </label>
                <p>
                    Ao marcar a caixa de seleção acima, você concorda com nossos <strong><Link href="/termos-de-uso" target='_blank' rel='noopener noreferrer'>Termos de Uso</Link></strong> e com nossa <strong><Link href="/privacidade" target='_blank' rel='noopener noreferrer'>Declaração de Privacidade</Link></strong> e confirma ter mais de 18 anos. A FlixNext renovará automaticamente sua assinatura e cobrará o preço da assinatura escolhida da sua forma de pagamento até você cancelar. Você pode cancelar quando quiser para evitar cobranças futuras.
                </p>
            </div>
        </section>
    )
}