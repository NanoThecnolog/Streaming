import { FaListUl, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Router, { useRouter } from "next/router";
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AlignJustify, LucideLogOut, Search } from "lucide-react";
import { useFlix } from "@/contexts/FlixContext";
import { parseCookies } from "nookies";
import { IoAddCircle, IoCreate } from "react-icons/io5";
import Fuse from 'fuse.js'
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import debounce from "lodash.debounce";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import { fuseConfig } from "@/utils/Variaveis";
import { debug } from "@/classes/DebugLogger";
import { useTMDB } from "@/contexts/TMDBContext";
import { uniqueKey } from "@/utils/UtilitiesFunctions";
import Notifications from "../Notifications";

export default function Header() {
    //refatorar esse componente
    const router = useRouter()
    const [searchInput, setSearchInput] = useState<string>('')
    const [relatedSearch, setRelatedSearch] = useState<(CardsProps | SeriesProps)[]>([])
    const [loading, setLoading] = useState(false)
    const [menuvisible, setMenuVisible] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [searchMobileVisible, setSearchMobileVisible] = useState<boolean>(false)
    const [dropModal, setDropModal] = useState(false)
    const [serverWake, setServerWake] = useState<boolean>(false)
    const { user, setUser, signOut } = useFlix()
    const { allData, serieData } = useTMDB()
    const [initial, setInitial] = useState("-")
    const [fuse, setFuse] = useState<Fuse<any> | null>(null)

    useEffect(() => {
        async function loadConfig() {
            const configData = await fuseConfig()
            //setConfig(configData)
            setFuse(new Fuse(configData.dados, {
                keys: configData.chaves,
                threshold: configData.taxa
            }))
        }
        loadConfig()
    }, [])

    useEffect(() => {
        if (!user) {
            const { 'flix-user': userCookie } = parseCookies()
            if (userCookie) {
                //debug.log("user no useEffect", JSON.parse(userCookie))
                setUser(JSON.parse(userCookie))
            }
        }
        //debug.log("user no else do useEffect", user)
    }, [user])

    useEffect(() => {
        if (!user) return
        //debug.log(user)
        const inicial = user.name[0].toUpperCase()
        setInitial(inicial)
    }, [user])

    useEffect(() => {
        if (loading) document.body.style.cursor = "progress"
        else document.body.style.cursor = "default"
        return () => {
            document.body.style.cursor = "default"
        }
    }, [loading])

    const handleSearchRelated = useMemo(() =>
        debounce((text: string) => {
            if (text.length > 0 && fuse) {
                const related = fuse.search(text).map((result) => result.item)
                setRelatedSearch(related)
            } else {
                setRelatedSearch([])
            }
        }, 200), [fuse]
    )
    async function handleRelatedSearchClick(card: CardsProps | SeriesProps) {
        debug.log("chamando")
        setLoading(true)
        try {
            setSearchInput("")
            setRelatedSearch([])
            if ("season" in card) await router.push(`/series/serie/${card.tmdbID}`)
            else await router.push(`/movie/${card.tmdbId}`)
        } finally {
            setLoading(false)
        }
    }

    function handleSearch(input: string) {
        const search = new URLSearchParams({ input: input });
        Router.push(`/search?${search.toString()}`);
    }


    function handleClickHome(id: number) {
        if (id === 1) {
            setMenuVisible(!menuvisible)
            setDropModal(false)
            setSearchMobileVisible(false)
        }
        if (id === 2) {
            setSearchMobileVisible(!searchMobileVisible)
            if (searchInput) {
                setSearchInput('')
                setRelatedSearch([])
            }
            setDropModal(false)
            setMenuVisible(false)
        }
        if (id === 3) {
            setDropModal(!dropModal)
            setSearchMobileVisible(false)
            setMenuVisible(false)
        }
        if (id === 4) {
            setModal(!modal)
        }
    }
    return (
        <div className={styles.header}>
            <div className={styles.brand} onClick={() => Router.push('/')}>
                <h1 className={styles.red}>FLiX</h1>
                <h1 className={styles.white}>NEXT</h1>
            </div>
            <div className={styles.main_nav}>
                <Link href="/" className={styles.button_container}>
                    <h2>INÍCIO</h2>
                </Link>
                <Link href="/movies" className={styles.button_container}>
                    <h2>FILMES</h2>
                </Link>
                <Link href="/series" className={styles.button_container}>
                    <h2>SERIES</h2>
                </Link>
                <form className={styles.formContainer} onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput); }}>
                    <input
                        value={searchInput}
                        onChange={(e) => { setSearchInput(e.target.value), handleSearchRelated(e.target.value) }}
                        placeholder="buscar filme ou série"
                        className={styles.searchInput}
                    />
                    {relatedSearch.length > 0 &&
                        <ul className={styles.relatedUi}>
                            {relatedSearch.map((card, index) => {
                                let tmdbData: MovieTMDB | TMDBSeries | null;
                                if ('tmdbId' in card) {
                                    tmdbData = allData.find((db) => card.tmdbId === db.id) || null
                                } else {
                                    tmdbData = serieData.find((db) => card.tmdbID === db.id) || null
                                }
                                return (
                                    <li style={{ cursor: loading ? "progress" : "pointer" }}
                                        key={uniqueKey(card, 'search')}
                                        onClick={() => handleRelatedSearchClick(card)}
                                    >
                                        <div className={styles.item}>
                                            {tmdbData ? <img
                                                src={`https://image.tmdb.org/t/p/w400${tmdbData.poster_path}`}
                                                alt="Poster"
                                                className={styles.imgSearch}
                                            />
                                                : <span>Imagem não carregada</span>
                                            }
                                            <h4>
                                                {card.title} {card.subtitle ? `- ${card.subtitle}` : ""}
                                            </h4>
                                        </div>
                                        <div className={styles.divider}></div>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    }
                    <div className={styles.button_container} onClick={() => handleSearch(searchInput)}>
                        <h2><CiSearch size={35} color="#fff" /></h2>
                    </div>
                </form>
            </div>
            <div className={styles.right_nav}>
                <Notifications moviesTMDB={allData} seriesTMDB={serieData} />
                <div onClick={() => handleClickHome(4)}>
                    {
                        user?.avatar ? (
                            <div className={styles.avatarImage} title="Meu Perfil">
                                <Image src={user.avatar} alt="avatar" width={45} height={45} />
                            </div>
                        ) : user ?
                            <div className={styles.avatarLetter}>
                                <span>{initial}</span>
                            </div> :
                            <FaUserCircle size={35} color="#fff" className={styles.loginIcon} />
                    }
                </div>
            </div>
            {
                modal &&
                <div className={styles.dropdownModal}>
                    {user ?
                        <ul>
                            <Link href="/me"><li><FaUserCircle size={20} />Minha Conta</li></Link>
                            <Link href="/watchlater"><li><FaListUl size={20} />Minha Lista</li></Link>
                            {
                                //<Link href="/request"><li><IoAddCircle size={20} />Solicitar Filme/Série</li></Link>
                            }
                            <li onClick={signOut}><LucideLogOut size={20} />Sair</li>
                        </ul>
                        :
                        <ul>
                            <Link href="/login"><li><FaSignInAlt size={20} />Entrar</li></Link>
                            <Link href="/planos"><li><IoCreate size={20} />Assinar</li></Link>
                        </ul>
                    }
                </div>
            }
            <div className={styles.dropdown}>
                <div className={styles.dropdownIcon} onClick={() => handleClickHome(1)}>
                    <AlignJustify />
                    {menuvisible &&
                        <div className={styles.dropdownMenu}>
                            <button type="button" onClick={() => Router.push('/')}>filmes</button>
                            <div className={styles.divider}></div>
                            <button type="button" onClick={() => Router.push('/series')}>series</button>
                        </div>
                    }
                </div>
                <div className={styles.divider}></div>
                <div className={styles.dropdownIcon}>
                    <div className={styles.searchIcon} onClick={() => handleClickHome(2)} >
                        <Search />
                    </div>
                    {searchMobileVisible &&
                        <>
                            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput) }} className={styles.searchInputModal}>
                                <div>
                                    <input
                                        value={searchInput}
                                        onChange={(e) => { setSearchInput(e.target.value), handleSearchRelated(e.target.value) }}
                                        placeholder="Procure seu filme"
                                        className={styles.searchInput}
                                    />
                                </div>
                                <div>
                                    <Search onClick={() => handleSearch(searchInput)} />
                                </div>
                                {relatedSearch.length > 0 &&
                                    <ul className={styles.relatedUiModal}>
                                        {relatedSearch.map((card, index) =>
                                            <li style={{
                                                cursor: loading ? "progress" : "pointer"
                                            }}
                                                key={index}
                                                onClick={() => handleRelatedSearchClick(card)}
                                            >
                                                <span className={styles.title}>
                                                    {card.title}
                                                    <span className={styles.subtitle}>{card.subtitle ? ` - ${card.subtitle}` : ""}</span>
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                }
                            </form>
                        </>
                    }
                </div>
                <div className={styles.divider}></div>
                <div className={styles.dropdownIcon} onClick={() => handleClickHome(3)}>
                    {
                        user?.avatar ? (
                            <div className={styles.dropdownAvatarImage} title="Meu Perfil">
                                <Image src={user.avatar} alt="avatar" width={35} height={35} />
                            </div>
                        ) : user ?
                            <div className={styles.avatarLetter}>
                                <span>{initial}</span>
                            </div> :
                            <FaUserCircle size={35} className={styles.loginIcon} />
                    }
                </div>
                {
                    dropModal &&
                    <div className={styles.dropModal}>
                        {user ?
                            <ul>
                                <Link href="/me"><li><FaUserCircle size={20} />Minha Conta</li></Link>
                                <Link href="/watchlater"><li><FaListUl size={20} />Minha Lista</li></Link>
                                <Link href="/request"><li><IoAddCircle size={20} />Solicitar Filme/Série</li></Link>
                                <li onClick={signOut}><LucideLogOut size={20} />Sair</li>
                            </ul>
                            :
                            <ul>
                                <Link href="/login"><li><FaSignInAlt size={20} />Entrar</li></Link>
                                <Link href="/signup"><li><IoCreate size={20} />Criar Conta</li></Link>
                            </ul>
                        }
                    </div>
                }
            </div>
        </div>
    )
}


