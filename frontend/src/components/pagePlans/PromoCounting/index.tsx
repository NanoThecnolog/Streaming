import { streamingPrices } from '@/utils/Variaveis'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function PromoCounting() {

    const total = streamingPrices.reduce((acc, s) => acc + s.price, 0)

    return (
        <section className={styles.container}>
            <h2>Quanto você gasta com Streaming?</h2>
            <ul className={styles.streamingList}>
                {streamingPrices.map(streaming => (
                    <li key={streaming.name}>
                        <span>{streaming.name}</span>
                        <span>R$ {streaming.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.total}>
                <p>Total por mês: <strong>R$ {total.toFixed(2)}</strong></p>
            </div>
            <div className={styles.divider} />
            <div className={styles.solution}>
                <p>Você pode ter acesso a tudo isso em um só lugar</p>
                <h3>A partir de <span>R$10.99/mês</span></h3>
                <Link href='/planos/#escolher'>
                    <button>Assine agora!</button>
                </Link>
            </div>
        </section>
    )
}