import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import {
    MdDashboard,
    MdLocalMovies,
    MdOutlineLiveTv,
} from 'react-icons/md'

import Header from '@/components/Header'
import MovieDash from '@/components/dashboard/Movie'
import TVDash from '@/components/dashboard/Tv'
import { SetupAPIClient } from '@/services/api'

import styles from './styles.module.scss'

type DashboardContentType = 'movie' | 'tv'

interface AccessResponse {
    access: boolean
    message: string
}

interface MenuItem {
    type: DashboardContentType
    label: string
    description: string
    icon: typeof MdLocalMovies
}

const MENU_ITEMS: MenuItem[] = [
    {
        type: 'movie',
        label: 'Filmes',
        description: 'Adicionar e editar filmes',
        icon: MdLocalMovies,
    },
    {
        type: 'tv',
        label: 'Séries',
        description: 'Gerenciar séries e episódios',
        icon: MdOutlineLiveTv,
    },
]

const isDashboardContentType = (
    value: unknown,
): value is DashboardContentType => {
    return value === 'movie' || value === 'tv'
}

const parseContentId = (value: string | string[] | undefined) => {
    const rawValue = Array.isArray(value) ? value[0] : value
    const parsedValue = Number(rawValue)

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
        return null
    }

    return parsedValue
}

const Dashboard = () => {
    const router = useRouter()

    const [type, setType] = useState<DashboardContentType>('movie')

    const contentId = useMemo(() => {
        return parseContentId(router.query.id)
    }, [router.query.id])

    useEffect(() => {
        if (!router.isReady) return

        const queryType = Array.isArray(router.query.type)
            ? router.query.type[0]
            : router.query.type

        if (isDashboardContentType(queryType)) {
            setType(queryType)
        }
    }, [router.isReady, router.query.type])

    const selectedMenuItem = MENU_ITEMS.find((item) => {
        return item.type === type
    })

    const handleTypeChange = async (
        selectedType: DashboardContentType,
    ) => {
        setType(selectedType)

        const nextQuery: Record<string, string> = {
            type: selectedType,
        }

        if (contentId) {
            nextQuery.id = String(contentId)
        }

        await router.replace(
            {
                pathname: router.pathname,
                query: nextQuery,
            },
            undefined,
            {
                shallow: true,
            },
        )
    }

    const renderDashboardContent = () => {
        if (type === 'movie') {
            return <MovieDash id={contentId ?? undefined} />
        }

        return <TVDash id={contentId ?? undefined} />
    }

    return (
        <>
            <Head>
                <title>Painel administrativo | FlixNext</title>

                <meta
                    name="description"
                    content="Painel administrativo do FlixNext"
                />

                <meta
                    name="robots"
                    content="noindex, nofollow, noarchive"
                />
            </Head>

            <Header />

            <main className={styles.container}>
                <header className={styles.pageHeader}>
                    <div className={styles.pageTitle}>
                        <span className={styles.pageIcon}>
                            <MdDashboard aria-hidden="true" />
                        </span>

                        <div>
                            <span className={styles.eyebrow}>
                                Administração
                            </span>

                            <h1>Painel de conteúdos</h1>

                            <p>
                                Cadastre, edite e organize o catálogo do
                                FlixNext.
                            </p>
                        </div>
                    </div>

                    <span className={styles.privateBadge}>
                        Acesso privado
                    </span>
                </header>

                <div className={styles.dashboardLayout}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <span>Gerenciamento</span>
                            <strong>Catálogo</strong>
                        </div>

                        <nav
                            className={styles.menuContainer}
                            aria-label="Tipos de conteúdo"
                        >
                            {MENU_ITEMS.map((item) => {
                                const Icon = item.icon
                                const isActive = item.type === type

                                return (
                                    <button
                                        key={item.type}
                                        type="button"
                                        className={`${styles.menuItem} ${isActive
                                                ? styles.active
                                                : ''
                                            }`}
                                        aria-current={
                                            isActive ? 'page' : undefined
                                        }
                                        onClick={() => {
                                            handleTypeChange(item.type)
                                        }}
                                    >
                                        <span
                                            className={styles.menuItemIcon}
                                        >
                                            <Icon aria-hidden="true" />
                                        </span>

                                        <span
                                            className={styles.menuItemContent}
                                        >
                                            <strong>{item.label}</strong>
                                            <small>
                                                {item.description}
                                            </small>
                                        </span>

                                        <span
                                            className={styles.activeIndicator}
                                            aria-hidden="true"
                                        />
                                    </button>
                                )
                            })}
                        </nav>
                    </aside>

                    <article className={styles.contentPanel}>
                        <header className={styles.contentHeader}>
                            <div>
                                <span className={styles.sectionLabel}>
                                    Catálogo
                                </span>

                                <h2>{selectedMenuItem?.label}</h2>

                                <p>
                                    {selectedMenuItem?.description}
                                </p>
                            </div>

                            {contentId && (
                                <div className={styles.contentId}>
                                    <span>ID do conteúdo</span>
                                    <strong>{contentId}</strong>
                                </div>
                            )}
                        </header>

                        <section
                            className={styles.componentContainer}
                            aria-label={`Gerenciamento de ${selectedMenuItem?.label ?? 'conteúdos'
                                }`}
                        >
                            {renderDashboardContent()}
                        </section>
                    </article>
                </div>
            </main>
        </>
    )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (
    context,
) => {
    const client = new SetupAPIClient(context)

    try {
        const response = await client.api.get<AccessResponse>(
            '/user/access',
        )

        if (!response.data.access) {
            return {
                redirect: {
                    destination: '/series',
                    permanent: false,
                },
            }
        }

        return {
            props: {},
        }
    } catch (error) {
        console.error(
            'Erro ao verificar acesso ao painel administrativo:',
            error,
        )

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
}