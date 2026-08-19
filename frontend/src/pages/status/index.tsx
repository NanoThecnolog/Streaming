import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useTMDB } from '@/contexts/TMDBContext'
import { platformFeatures, statusMessages } from '@/config/statusPage'
import { statusVerify } from '@/utils/UtilitiesFunctions'
import { getLatestEpisodeDateKey, useLatestEpisodes } from '@/hooks/useLatestEpisodes'

import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { apiSub } from '@/services/apiSubManager'

interface StatusPageProps {
  services: {
    platform: boolean
    accounts: boolean
    subscriptions: boolean
    communications: boolean
    catalog: boolean
  }
  checkedAt: string
}

const serviceLabels: Record<keyof StatusPageProps['services'], string> = {
  platform: 'Plataforma',
  accounts: 'Contas e acesso',
  subscriptions: 'Assinaturas e pagamentos',
  communications: 'Comunicações',
  catalog: 'Serviço de catálogo',
}

const formatDate = (value: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export default function StatusPage({ services, checkedAt }: StatusPageProps) {
  const { allData, serieData, isLoadingMovies, isLoadingSeries, movieError, seriesError } =
    useTMDB()
  const { groups: episodeGroups } = useLatestEpisodes()
  const seriesById = useMemo(
    () => new Map(serieData.map((serie) => [serie.id, serie])),
    [serieData],
  )
  const availableEpisodeGroups = episodeGroups.filter((group) => seriesById.has(group.tmdbID))

  const serviceEntries = Object.entries(services) as Array<
    [keyof StatusPageProps['services'], boolean]
  >
  const infrastructureOperational = serviceEntries.every(([, operational]) => operational)
  const catalogLoading = isLoadingMovies || isLoadingSeries
  const catalogError = Boolean(movieError || seriesError)
  const platformOperational = infrastructureOperational && !catalogError
  const activeMessages = statusMessages.filter((message) => message.active)
  const activeFeatures = platformFeatures.filter((feature) => feature.active)

  debug.log(serviceEntries)

  return (
    <>
      <Head>
        <title>Status da plataforma | FlixNext</title>
        <meta
          name="description"
          content="Acompanhe a disponibilidade da plataforma, do catálogo e as novidades da FlixNext."
        />
      </Head>

      <Header />

      <main className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Central de status</span>
          <h1>
            {platformOperational
              ? 'Tudo funcionando normalmente'
              : 'Alguns serviços requerem atenção'}
          </h1>
          <p>
            Consulte a disponibilidade da plataforma, o carregamento do catálogo e nossas
            atualizações mais recentes.
          </p>

          <div
            className={`${styles.overallStatus} ${platformOperational ? styles.online : styles.issue}`}
          >
            <span aria-hidden="true" />
            {platformOperational ? 'Plataforma operacional' : 'Instabilidade identificada'}
          </div>

          <small>
            Última verificação:{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'medium',
              timeZone: 'America/Sao_Paulo',
            }).format(new Date(checkedAt))}
          </small>
        </section>

        <section className={styles.section} aria-labelledby="services-title">
          <div className={styles.sectionHeading}>
            <div>
              <span>Disponibilidade</span>
              <h2 id="services-title">Status dos serviços</h2>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            {serviceEntries.map(([service, operational]) => (
              <article className={styles.serviceCard} key={service}>
                <div>
                  <strong>{serviceLabels[service]}</strong>
                  <small>{operational ? 'Operacional' : 'Indisponível'}</small>
                </div>
                <span
                  className={`${styles.signal} ${operational ? styles.online : styles.issue}`}
                  aria-label={operational ? 'Operacional' : 'Indisponível'}
                />
              </article>
            ))}

            <article className={styles.serviceCard}>
              <div>
                <strong>Filmes</strong>
                <small>
                  {movieError
                    ? 'Falha no carregamento'
                    : isLoadingMovies
                      ? 'Carregando catálogo'
                      : `${allData.length} títulos disponíveis`}
                </small>
              </div>
              <span
                className={`${styles.signal} ${movieError ? styles.issue : catalogLoading ? styles.loading : styles.online}`}
              />
            </article>

            <article className={styles.serviceCard}>
              <div>
                <strong>Séries</strong>
                <small>
                  {seriesError
                    ? 'Falha no carregamento'
                    : isLoadingSeries
                      ? 'Carregando catálogo'
                      : `${serieData.length} títulos disponíveis`}
                </small>
              </div>
              <span
                className={`${styles.signal} ${seriesError ? styles.issue : isLoadingSeries ? styles.loading : styles.online}`}
              />
            </article>
          </div>
        </section>

        {activeMessages.length > 0 && (
          <section className={styles.section} aria-labelledby="messages-title">
            <div className={styles.sectionHeading}>
              <div>
                <span>Comunicados</span>
                <h2 id="messages-title">Mural de avisos</h2>
              </div>
            </div>

            <div className={styles.messageList}>
              {activeMessages.map((message) => (
                <article
                  className={`${styles.messageCard} ${styles[message.tone]}`}
                  key={message.id}
                >
                  <div>
                    <strong>{message.title}</strong>
                    <time dateTime={message.publishedAt}>{formatDate(message.publishedAt)}</time>
                  </div>
                  <p>{message.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="features-title">
          <div className={styles.sectionHeading}>
            <div>
              <span>O que há de novo</span>
              <h2 id="features-title">Novas funcionalidades</h2>
            </div>
          </div>

          {activeFeatures.length > 0 ? (
            <Swiper
              className={styles.featureSwiper}
              spaceBetween={16}
              slidesPerView={3}
              watchOverflow
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {activeFeatures.map((feature) => (
                <SwiperSlide key={feature.id} className={styles.featureSlide}>
                  <article className={styles.featureCard}>
                    <time dateTime={feature.publishedAt}>{formatDate(feature.publishedAt)}</time>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    {feature.highlights && (
                      <ul>
                        {feature.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className={styles.emptyState}>
              <strong>Nenhuma novidade por enquanto</strong>
              <p>As próximas atualizações da plataforma serão apresentadas aqui.</p>
            </div>
          )}
        </section>

        <section className={`${styles.section} ${styles.episodesSection}`}>
          <div className={styles.sectionHeading}>
            <div>
              <span>Catálogo</span>
              <h2>Últimos episódios adicionados</h2>
            </div>
          </div>
          {availableEpisodeGroups.length > 0 ? (
            <div className={styles.episodeGrid}>
              {availableEpisodeGroups.map((group) => {
                const tmdbSerie = seriesById.get(group.tmdbID)!
                const episodes = [...group.episodeNumbers].sort((a, b) => a - b)
                const episodeLabel =
                  episodes.length === 1
                    ? `Episódio ${episodes[0]}`
                    : `Episódios ${episodes.join(', ')}`

                return (
                  <Link
                    className={styles.episodeCard}
                    href={`/series/serie/${group.tmdbID}`}
                    key={`${group.tmdbID}-${group.seasonNumber}-${getLatestEpisodeDateKey(group.addedAt)}`}
                  >
                    <div className={styles.poster}>
                      {tmdbSerie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${tmdbSerie.poster_path}`}
                          alt=""
                          width={88}
                          height={132}
                        />
                      ) : (
                        <span aria-hidden="true">FX</span>
                      )}
                    </div>
                    <div>
                      <time dateTime={group.addedAt}>
                        {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(
                          new Date(group.addedAt),
                        )}
                      </time>
                      <h3>{tmdbSerie.name}</h3>
                      <p>
                        Temporada {group.seasonNumber} · {episodeLabel}
                      </p>
                      {group.language && <small>{group.language}</small>}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <strong>Nenhum episódio recente encontrado</strong>
              <p>As próximas adições ao catálogo serão apresentadas aqui.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<StatusPageProps> = async () => {
  const frontend = process.env.NEXT_PUBLIC_WEBSITE_LINK
  const backend = process.env.NEXT_PUBLIC_RENDER
  const subManager = process.env.NEXT_PUBLIC_SUBMANAGER_URL
  const mensageria = process.env.NEXT_PUBLIC_MENSAGERIA
  const content = process.env.NEXT_PUBLIC_CONTENT_MANAGER_URL

  const requests = await Promise.allSettled([
    axios.get(`${frontend}/api/awake`, { timeout: 3000 }),
    axios.get(`${backend}/acordar`, { timeout: 3000 }),
    apiSub.get(`${subManager}/`, { timeout: 15000 }),
    axios.get(`${mensageria}`, { timeout: 13000 }),
    axios.get(`${content}`, { timeout: 5000 }),
  ])
  const [platform, accounts, subscriptions, communications, catalog] = requests

  return {
    props: {
      services: {
        platform: Boolean(statusVerify(platform)),
        accounts: Boolean(statusVerify(accounts)),
        subscriptions: Boolean(statusVerify(subscriptions)),
        communications: Boolean(statusVerify(communications)),
        catalog: Boolean(statusVerify(catalog)),
      },
      checkedAt: new Date().toISOString(),
    },
  }
}
