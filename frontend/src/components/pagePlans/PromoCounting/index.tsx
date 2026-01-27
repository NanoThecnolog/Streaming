import { planValues, streamingPrices } from '@/utils/Variaveis'
import styles from './styles.module.scss'
import Link from 'next/link'
import { formatPrice } from '@/utils/UtilitiesFunctions'

export default function PromoCounting() {

    const total = streamingPrices.reduce((acc, s) => acc + s.price, 0)

    return (
        <section className={styles.container}>
            <h2>Quanto custa manter vários streamings?</h2>

            <p className={styles.intro}>
                Hoje, para acompanhar filmes e séries espalhados por diferentes plataformas,
                o custo mensal pode facilmente sair do controle.
            </p>

            <ul className={styles.streamingList}>
                {streamingPrices.map(streaming => (
                    <li key={streaming.name}>
                        <span>{streaming.name}</span>
                        <span>{formatPrice(streaming.price)}</span>
                    </li>
                ))}
            </ul>

            <div className={styles.total}>
                <p>
                    Gasto médio mensal: <strong>{formatPrice(total)}</strong>
                </p>
            </div>

            <div className={styles.divider} />

            <div className={styles.solution}>
                <p>
                    A FlixNext surge como uma alternativa mais simples, reunindo um acervo amplo
                    em um único ambiente.
                </p>

                <h3>
                    Acesso a partir de <span>{formatPrice(planValues.mensal)}/mês</span>
                </h3>

                <Link href="/planos/#escolher">
                    <button>Escolher um plano</button>
                </Link>
            </div>
        </section>

    )
}