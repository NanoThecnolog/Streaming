import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AiOutlineBarcode } from 'react-icons/ai'
import Link from 'next/link'

interface PaymentProps {
  setCheck: (e: boolean) => void
}

export default function PaymentBillet({ setCheck }: PaymentProps) {
  const handleCheck = (e: boolean) => {
    setCheck(e)
  }

  return (
    <section className={styles.container}>
      <div className={styles.billet}>
        <AiOutlineBarcode size={100} />
      </div>
      <p>Seu boleto será gerado após finalizar sua assinatura!</p>

      <div className={styles.aviso}>
        <label htmlFor="checkBillet">
          <input type="checkbox" onChange={(e) => handleCheck(e.target.checked)} id="checkBillet" />
          <p>Concordo com os Termos de Uso e Política de Privacidade.</p>
        </label>
        <p>
          Ao marcar a caixa de seleção acima, você concorda com nossos{' '}
          <strong>
            <Link href="/termos-de-uso" target="_blank" rel="noopener noreferrer">
              Termos de Uso
            </Link>
          </strong>{' '}
          e com nossa{' '}
          <strong>
            <Link href="/privacidade" target="_blank" rel="noopener noreferrer">
              Declaração de Privacidade
            </Link>
          </strong>{' '}
          e confirma ter mais de 18 anos. A FlixNext renovará automaticamente sua assinatura e
          cobrará o preço da assinatura escolhida da sua forma de pagamento até você cancelar. Você
          pode cancelar quando quiser para evitar cobranças futuras.
        </p>
      </div>
    </section>
  )
}
