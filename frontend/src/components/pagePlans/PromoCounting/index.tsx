import Link from 'next/link'
import { FiArrowRight, FiCheck, FiTrendingDown } from 'react-icons/fi'

import { formatPrice } from '@/utils/UtilitiesFunctions'
import { planValues, streamingPrices } from '@/utils/Variaveis'

import styles from './styles.module.scss'

const PromoCounting = () => {
  const streamingTotal = streamingPrices.reduce((total, streaming) => total + streaming.price, 0)

  const monthlyPlanPrice = planValues.mensal
  const monthlySavings = Math.max(streamingTotal - monthlyPlanPrice, 0)

  const savingsPercentage =
    streamingTotal > 0 ? Math.round((monthlySavings / streamingTotal) * 100) : 0

  return (
    <section className={styles.comparisonSection} aria-labelledby="comparison-title">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.eyebrow}>Compare os valores</span>

        <h2 id="comparison-title">
          Vários streamings.
          <span> Uma conta cada vez maior.</span>
        </h2>

        <p>
          Assinar diferentes plataformas para acompanhar filmes e séries pode representar um custo
          significativo todos os meses.
        </p>
      </div>

      <div className={styles.comparison}>
        <article className={styles.streamingCard}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.cardLabel}>Assinaturas separadas</span>

              <h3>Principais streamings</h3>
            </div>

            <span className={styles.serviceCount}>{streamingPrices.length} serviços</span>
          </div>

          <ul className={styles.streamingList}>
            {streamingPrices.map((streaming) => (
              <li key={streaming.name}>
                <span>{streaming.name}</span>

                <strong>{formatPrice(streaming.price)}</strong>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <span>Estimativa mensal</span>

            <strong>{formatPrice(streamingTotal)}</strong>
          </div>

          <p className={styles.priceNotice}>
            Valores baseados nos preços informados na comparação e sujeitos a alterações pelas
            plataformas.
          </p>
        </article>

        <div className={styles.versus} aria-hidden="true">
          <span>ou</span>
        </div>

        <article className={styles.flixnextCard}>
          <div className={styles.savingsBadge}>
            <FiTrendingDown aria-hidden="true" />
            Até {savingsPercentage}% de diferença
          </div>

          <span className={styles.cardLabel}>Uma alternativa mais simples</span>

          <h3>FlixNext</h3>

          <p className={styles.description}>
            Um catálogo amplo e organizado em um único ambiente, sem precisar alternar entre
            diferentes serviços.
          </p>

          <div className={styles.price}>
            <span>A partir de</span>

            <div>
              <strong>{formatPrice(monthlyPlanPrice)}</strong>

              <small>/mês</small>
            </div>
          </div>

          <div className={styles.savings}>
            <FiTrendingDown aria-hidden="true" />

            <p>
              Diferença de até
              <strong> {formatPrice(monthlySavings)} por mês</strong>
            </p>
          </div>

          <ul className={styles.benefits}>
            <li>
              <FiCheck aria-hidden="true" />
              Catálogo reunido em um só lugar
            </li>

            <li>
              <FiCheck aria-hidden="true" />
              Uma única assinatura
            </li>

            <li>
              <FiCheck aria-hidden="true" />
              Planos para diferentes períodos
            </li>
          </ul>

          <Link href="/planos/#escolher" className={styles.action}>
            Ver planos disponíveis
            <FiArrowRight aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>
  )
}

export default PromoCounting
