import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { isDiceBearAvatar } from '@/utils/diceBear'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import debounce from 'lodash.debounce'
import { AlignJustify, Film, Home, Search, Tv, UserRound, X } from 'lucide-react'
import { parseCookies } from 'nookies'

import { CardsProps } from '@/@types/Cards'
import { SeriesProps } from '@/@types/series'
import { useFlix } from '@/contexts/FlixContext'
import { useTMDB } from '@/contexts/TMDBContext'
import { fuseConfig } from '@/utils/Variaveis'
import { uniqueKey } from '@/utils/UtilitiesFunctions'

import DropdownMenuModal from '../ui/DropdownMenuModal'

import styles from './styles.module.scss'

type SearchItem = CardsProps | SeriesProps
type OpenPanel = 'navigation' | 'search' | 'profile' | null

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/movies', label: 'Filmes', icon: Film },
  { href: '/series', label: 'Séries', icon: Tv },
] as const

const SEARCH_LIMIT = 8
const SCROLL_THRESHOLD = 80
const SCROLL_DELTA = 6

const isSeries = (item: SearchItem): item is SeriesProps => {
  return 'tmdbID' in item
}

export default function Header() {
  const router = useRouter()
  const { user, setUser, signOut } = useFlix()
  const { allData, serieData } = useTMDB()

  const [searchInput, setSearchInput] = useState('')
  const [relatedSearch, setRelatedSearch] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const lastScrollRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  const userInitial = user?.name?.trim().charAt(0).toUpperCase() || '?'
  const hasSearchResults = searchInput.trim().length > 0 && relatedSearch.length > 0

  const posterById = useMemo(() => {
    const posters = new Map<number, string | null>()

    allData.forEach((item) => posters.set(item.id, item.poster_path ?? null))
    serieData.forEach((item) => posters.set(item.id, item.poster_path ?? null))

    return posters
  }, [allData, serieData])

  useEffect(() => {
    let active = true

    const createSearchIndex = async (): Promise<void> => {
      const config = await fuseConfig()

      if (!active) return

      setFuse(
        new Fuse<SearchItem>(config.dados as SearchItem[], {
          keys: config.chaves,
          threshold: config.taxa,
        }),
      )
    }

    createSearchIndex().catch((error) => {
      console.error('Não foi possível carregar o índice de busca:', error)
    })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (user) return

    const userCookie = parseCookies()['flix-user']
    if (!userCookie) return

    try {
      setUser(JSON.parse(userCookie))
    } catch (error) {
      console.error('Cookie de usuário inválido:', error)
    }
  }, [setUser, user])

  useEffect(() => {
    const handleScroll = (): void => {
      if (animationFrameRef.current !== null) return

      animationFrameRef.current = window.requestAnimationFrame(() => {
        const currentScroll = Math.max(window.scrollY, 0)
        const delta = currentScroll - lastScrollRef.current

        if (currentScroll <= SCROLL_THRESHOLD) {
          setIsCompact(false)
        } else if (Math.abs(delta) >= SCROLL_DELTA) {
          setIsCompact(delta > 0)
        }

        lastScrollRef.current = currentScroll
        animationFrameRef.current = null
      })
    }

    lastScrollRef.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const closePanels = (): void => {
      setOpenPanel(null)
      setRelatedSearch([])
      setIsNavigating(false)
    }

    const startNavigation = (): void => setIsNavigating(true)

    router.events.on('routeChangeStart', startNavigation)
    router.events.on('routeChangeComplete', closePanels)
    router.events.on('routeChangeError', closePanels)

    return () => {
      router.events.off('routeChangeStart', startNavigation)
      router.events.off('routeChangeComplete', closePanels)
      router.events.off('routeChangeError', closePanels)
    }
  }, [router.events])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent): void => {
      if (openPanel && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenPanel(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpenPanel(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openPanel])

  const searchRelated = useMemo(
    () =>
      debounce((value: string, searchIndex: Fuse<SearchItem> | null) => {
        const normalizedValue = value.trim()

        if (!normalizedValue || !searchIndex) {
          setRelatedSearch([])
          return
        }

        setRelatedSearch(
          searchIndex.search(normalizedValue, { limit: SEARCH_LIMIT }).map((result) => result.item),
        )
      }, 250),
    [],
  )

  useEffect(() => {
    searchRelated(searchInput, fuse)

    return () => searchRelated.cancel()
  }, [fuse, searchInput, searchRelated])

  const togglePanel = useCallback((panel: Exclude<OpenPanel, null>): void => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }, [])

  const handleSearchChange = (value: string): void => {
    setSearchInput(value)
  }

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const input = searchInput.trim()
    if (!input || isNavigating) return

    await router.push({
      pathname: '/search',
      query: { input },
    })
  }

  const handleResultClick = async (item: SearchItem): Promise<void> => {
    if (isNavigating) return

    setIsNavigating(true)
    setSearchInput('')
    setRelatedSearch([])

    const path = isSeries(item) ? `/series/serie/${item.tmdbID}` : `/movie/${item.tmdbId}`

    try {
      await router.push(path)
    } finally {
      setIsNavigating(false)
    }
  }

  const isActiveRoute = (href: string): boolean => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  const renderSearchResults = (mobile = false) => {
    if (!hasSearchResults) return null

    return (
      <ul
        className={mobile ? styles.mobileResults : styles.searchResults}
        aria-label="Resultados sugeridos"
      >
        {relatedSearch.map((item) => {
          const tmdbId = isSeries(item) ? item.tmdbID : item.tmdbId
          const posterPath = posterById.get(tmdbId)

          return (
            <li key={uniqueKey(item, 'header-search')}>
              <button type="button" disabled={isNavigating} onClick={() => handleResultClick(item)}>
                {!mobile && (
                  <span className={styles.resultPoster}>
                    {posterPath ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w154${posterPath}`}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <Film size={22} aria-hidden="true" />
                    )}
                  </span>
                )}

                <span className={styles.resultContent}>
                  <strong>{item.title}</strong>
                  {item.subtitle && <small>{item.subtitle}</small>}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isCompact ? styles.compact : ''}`}
      data-navigating={isNavigating}
    >
      <div className={styles.desktopHeader}>
        <Link href="/" className={styles.brand} aria-label="FlixNext — início">
          <span className={styles.brandFlix}>FLiX</span>
          <span className={styles.brandNext}>NEXT</span>
        </Link>

        <nav className={styles.navigation} aria-label="Navegação principal">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActiveRoute(item.href) ? styles.active : ''}
              aria-current={isActiveRoute(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form className={styles.searchForm} onSubmit={handleSearchSubmit} role="search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={searchInput}
            placeholder="Buscar filme ou série"
            aria-label="Buscar filme ou série"
            autoComplete="off"
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          {searchInput && (
            <button
              type="button"
              className={styles.clearSearch}
              aria-label="Limpar busca"
              onClick={() => setSearchInput('')}
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
          {renderSearchResults()}
        </form>

        <div className={styles.profileArea}>
          <button
            type="button"
            className={styles.profileButton}
            aria-label={user ? 'Abrir menu do perfil' : 'Abrir opções da conta'}
            aria-expanded={openPanel === 'profile'}
            onClick={() => togglePanel('profile')}
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt=""
                width={40}
                height={40}
                unoptimized={isDiceBearAvatar(user.avatar)}
              />
            ) : user ? (
              <span>{userInitial}</span>
            ) : (
              <UserRound size={23} aria-hidden="true" />
            )}
          </button>

          {openPanel === 'profile' && <DropdownMenuModal user={user} signOut={signOut} />}
        </div>
      </div>

      <nav className={styles.mobileNavigation} aria-label="Navegação mobile">
        <Link href="/" className={isActiveRoute('/') ? styles.active : ''} aria-label="Início">
          <Home size={23} aria-hidden="true" />
          <span>Início</span>
        </Link>

        <button
          type="button"
          className={openPanel === 'navigation' ? styles.active : ''}
          aria-label="Abrir navegação"
          aria-expanded={openPanel === 'navigation'}
          onClick={() => togglePanel('navigation')}
        >
          <AlignJustify size={23} aria-hidden="true" />
          <span>Explorar</span>
        </button>

        <button
          type="button"
          className={openPanel === 'search' ? styles.active : ''}
          aria-label="Abrir busca"
          aria-expanded={openPanel === 'search'}
          onClick={() => togglePanel('search')}
        >
          <Search size={23} aria-hidden="true" />
          <span>Buscar</span>
        </button>

        <button
          type="button"
          className={openPanel === 'profile' ? styles.active : ''}
          aria-label="Abrir perfil"
          aria-expanded={openPanel === 'profile'}
          onClick={() => togglePanel('profile')}
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt=""
              width={25}
              height={25}
              unoptimized={isDiceBearAvatar(user.avatar)}
            />
          ) : user ? (
            <span className={styles.mobileInitial}>{userInitial}</span>
          ) : (
            <UserRound size={23} aria-hidden="true" />
          )}
          <span>Perfil</span>
        </button>

        {openPanel === 'navigation' && (
          <div className={styles.mobilePanel}>
            {NAVIGATION_ITEMS.slice(1).map((item) => {
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <Icon size={19} aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}

        {openPanel === 'search' && (
          <div className={`${styles.mobilePanel} ${styles.mobileSearchPanel}`}>
            <form onSubmit={handleSearchSubmit} role="search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={searchInput}
                placeholder="Buscar filme ou série"
                aria-label="Buscar filme ou série"
                autoFocus
                autoComplete="off"
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            </form>
            {renderSearchResults(true)}
          </div>
        )}

        {openPanel === 'profile' && (
          <div className={`${styles.mobilePanel} ${styles.mobileProfilePanel}`}>
            <DropdownMenuModal user={user} signOut={signOut} />
          </div>
        )}
      </nav>
    </header>
  )
}
