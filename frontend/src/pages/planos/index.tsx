import axios from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import {
    FiCheck,
    FiChevronDown,
    FiMonitor,
    FiShield,
    FiSmartphone,
} from 'react-icons/fi'

import { MovieTMDB } from '@/@types/Cards'
import { PlanProp } from '@/@types/plans'
import { TMDBSeries } from '@/@types/series'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import Carousel from '@/components/pagePlans/PromoCarousel'
import PromoCounting from '@/components/pagePlans/PromoCounting'
import PromoFAQ from '@/components/pagePlans/PromoFaq'
import Prices from '@/components/pagePlans/PromoPrices'
import Streaming from '@/components/pagePlans/PromoStreamings'
import { mongoService } from '@/classes/MongoContent'

import 'swiper/css'
import styles from './styles.module.scss'

interface PagePlansProps {
    plans: PlanProp[]
    tmdbMovies: MovieTMDB[]
    tmdbSeries: TMDBSeries[]
}

const benefits = [
    'Filmes e séries em um só lugar',
    'Assista em diferentes dispositivos',
    'Planos flexíveis e sem fidelidade',
]

const PagePlans = ({
    plans,
    tmdbMovies,
    tmdbSeries,
}: PagePlansProps) => {
    const hasPlans = plans.length > 0

    return (
        <>
            <SEO
                title="Planos de assinatura | FlixNext"
                description="Escolha o plano ideal e assista aos seus filmes e séries favoritos no FlixNext."
            />

            {//<Header />
            }

            <main className={styles.mainPage}>
                <section className={styles.hero}>
                    <div
                        className={styles.heroBackground}
                        aria-hidden="true"
                    />

                    <div className={styles.heroOverlay} aria-hidden="true" />

                    <div className={styles.heroContent}>
                        <span className={styles.eyebrow}>
                            Entretenimento do seu jeito
                        </span>

                        <h1>
                            Seus filmes e séries favoritos.
                            <span> Um plano para cada momento.</span>
                        </h1>

                        <p className={styles.heroDescription}>
                            Escolha a assinatura que combina com você e tenha
                            acesso ao catálogo FlixNext de onde estiver.
                        </p>

                        <ul className={styles.benefits}>
                            {benefits.map((benefit) => (
                                <li key={benefit}>
                                    <span>
                                        <FiCheck aria-hidden="true" />
                                    </span>

                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <div className={styles.heroActions}>
                            <Link
                                href="#escolher"
                                className={styles.primaryAction}
                            >
                                Ver planos
                            </Link>

                            <Link
                                href="/catalogo"
                                className={styles.secondaryAction}
                            >
                                Explorar catálogo
                            </Link>
                        </div>

                        <p className={styles.paymentNotice}>
                            Pagamento seguro · Cancele quando quiser
                        </p>
                    </div>

                    <Link
                        href="#escolher"
                        className={styles.scrollIndicator}
                        aria-label="Ir para os planos disponíveis"
                    >
                        <span>Conheça os planos</span>
                        <FiChevronDown aria-hidden="true" />
                    </Link>
                </section>

                <section
                    id="escolher"
                    className={styles.plansSection}
                    aria-labelledby="plans-title"
                >
                    <div className={styles.sectionHeading}>
                        <span>Planos FlixNext</span>

                        <h2 id="plans-title">
                            Escolha a melhor opção para você
                        </h2>

                        <p>
                            Compare os benefícios e escolha por quanto tempo
                            deseja aproveitar o catálogo.
                        </p>
                    </div>

                    {hasPlans ? (
                        <Prices plans={plans} />
                    ) : (
                        <div className={styles.unavailable}>
                            <strong>Planos temporariamente indisponíveis</strong>

                            <p>
                                Não foi possível carregar os planos agora.
                                Tente novamente em alguns instantes.
                            </p>
                        </div>
                    )}
                </section>

                <section
                    className={styles.devicesSection}
                    aria-labelledby="devices-title"
                >
                    <div className={styles.devicesContent}>
                        <div className={styles.devicesText}>
                            <span>Assista como preferir</span>

                            <h2 id="devices-title">
                                Sua diversão acompanha você
                            </h2>

                            <p>
                                Continue assistindo aos seus conteúdos
                                favoritos em diferentes dispositivos. *Em breve aplicativo para TVs*
                            </p>
                        </div>

                        <div className={styles.deviceList}>
                            <article>
                                <FiMonitor aria-hidden="true" />
                                <strong>No seu Computador</strong>
                                <span>Uma experiência feita para telas grandes.</span>
                            </article>

                            <article>
                                <FiSmartphone aria-hidden="true" />
                                <strong>No celular</strong>
                                <span>Seu catálogo sempre ao seu alcance.</span>
                            </article>

                            <article>
                                <FiShield aria-hidden="true" />
                                <strong>Com segurança</strong>
                                <span>Pagamento protegido e acesso individual.</span>
                            </article>
                        </div>
                    </div>
                </section>

                {(tmdbMovies.length > 0 || tmdbSeries.length > 0) && (
                    <section className={styles.catalogSection}>
                        <Carousel
                            movies={tmdbMovies}
                            series={tmdbSeries}
                        />
                    </section>
                )}

                <Streaming />
                <PromoCounting />
                <PromoFAQ />
            </main>

            <Footer />
        </>
    )
}

export default PagePlans

export const getServerSideProps: GetServerSideProps<
    PagePlansProps
> = async () => {
    try {
        const [plansResponse, movies, series] = await Promise.all([
            axios.get<PlanProp[]>(
                'https://flixnext.com.br/api/plan/list',
            ),
            mongoService.fetchMovieData(),
            mongoService.fetchSerieData(),
        ])

        const moviesToFetch = movies.slice(0, 20)
        const seriesToFetch = series.slice(0, 20)

        const [tmdbMoviesResponse, tmdbSeriesResponse] =
            await Promise.all([
                axios.post(
                    'https://flixnext.com.br/api/tmdb/all/movie',
                    {
                        movies: moviesToFetch,
                    },
                ),
                axios.post(
                    'https://flixnext.com.br/api/tmdb/all/tv',
                    {
                        series: seriesToFetch,
                    },
                ),
            ])

        return {
            props: {
                plans: plansResponse.data ?? [],
                tmdbMovies:
                    tmdbMoviesResponse.data?.data ?? [],
                tmdbSeries:
                    tmdbSeriesResponse.data?.data ?? [],
            },
        }
    } catch (error) {
        console.error(
            'Erro ao carregar a página de planos:',
            error,
        )

        return {
            props: {
                plans: [],
                tmdbMovies: [],
                tmdbSeries: [],
            },
        }
    }
}