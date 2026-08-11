import Link from 'next/link'
import { IconType } from 'react-icons'
import {
  SiAppletv,
  SiHbo,
  SiNetflix,
  SiParamountplus,
  SiPrimevue,
  SiSky,
  SiStarz,
} from 'react-icons/si'
import { TbBrandDisney } from 'react-icons/tb'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

import styles from './styles.module.scss'
import { FaAmazon } from 'react-icons/fa'

type BrandTheme = 'netflix' | 'hbo' | 'prime' | 'disney' | 'sky' | 'apple' | 'paramount' | 'starz'

interface StreamingBrand {
  name: string
  icon: IconType
  theme: BrandTheme
}

const streamingBrands: StreamingBrand[] = [
  {
    name: 'Netflix',
    icon: SiNetflix,
    theme: 'netflix',
  },
  {
    name: 'HBO Max',
    icon: SiHbo,
    theme: 'hbo',
  },
  {
    name: 'Prime Video',
    icon: FaAmazon,
    theme: 'prime',
  },
  {
    name: 'Disney+',
    icon: TbBrandDisney,
    theme: 'disney',
  },
  {
    name: 'Sky+',
    icon: SiSky,
    theme: 'sky',
  },
  {
    name: 'Apple TV+',
    icon: SiAppletv,
    theme: 'apple',
  },
  {
    name: 'Paramount+',
    icon: SiParamountplus,
    theme: 'paramount',
  },
  {
    name: 'Starz',
    icon: SiStarz,
    theme: 'starz',
  },
]

const highlights = [
  'Um único catálogo para explorar',
  'Filmes e séries difíceis de encontrar',
  'Novos conteúdos adicionados regularmente',
]

const Streaming = () => {
  return (
    <section className={styles.streamingSection} aria-labelledby="streaming-title">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.textContent}>
          <span className={styles.eyebrow}>Tudo em um só lugar</span>

          <h2 id="streaming-title">
            Menos tempo procurando.
            <span> Mais tempo assistindo.</span>
          </h2>

          <p className={styles.description}>
            Explore um catálogo organizado com filmes e séries encontrados em diferentes serviços de
            streamings.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((highlight) => (
              <li key={highlight}>
                <span>
                  <FiCheck aria-hidden="true" />
                </span>

                {highlight}
              </li>
            ))}
          </ul>

          <Link href="/planos/#escolher" className={styles.action}>
            Escolher um plano
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.brands} aria-label="Plataformas e distribuidoras">
          {streamingBrands.map((brand) => {
            const Icon = brand.icon

            return (
              <article key={brand.name} className={`${styles.brandCard} ${styles[brand.theme]}`}>
                <Icon aria-hidden="true" />

                <span>{brand.name}</span>
              </article>
            )
          })}

          <article className={`${styles.brandCard} ${styles.globoplay}`}>
            <strong aria-hidden="true">
              globo<span>play</span>
            </strong>

            <span>Globoplay</span>
          </article>
        </div>
      </div>

      <p className={styles.disclaimer}>
        As marcas exibidas pertencem aos seus respectivos proprietários e são apresentadas apenas
        como referência.
      </p>
    </section>
  )
}

export default Streaming
