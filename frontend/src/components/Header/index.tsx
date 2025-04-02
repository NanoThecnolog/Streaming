import { FaListUl, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Router, { useRouter } from "next/router";
import styles from './styles.module.scss'
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AlignJustify, LucideLogOut, Search } from "lucide-react";
import { api } from "@/services/api";
import { useFlix } from "@/contexts/FlixContext";
import { parseCookies } from "nookies";
import { IoAddCircle, IoCreate } from "react-icons/io5";
import Fuse from 'fuse.js'
import { CardsProps } from "@/@types/Cards";
import debounce from "lodash.debounce";
import { SeriesProps } from "@/@types/series";
import { fuseConfig } from "@/utils/Variaveis";
import { debug } from "@/classes/DebugLogger";
import { apiSub } from "@/services/apiSubManager";
import { apiEmail } from "@/services/apiMessenger";
import { apiManager } from "@/services/apiManager";

export default function Header() {
    //refatorar esse componente
    const router = useRouter()
    const [searchInput, setSearchInput] = useState<string>('')
    const [relatedSearch, setRelatedSearch] = useState<(CardsProps | SeriesProps)[]>([])
    const [loading, setLoading] = useState(false)
    const [menuvisible, setMenuVisible] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [searchMobileVisible, setSearchMobileVisible] = useState<boolean>(false)
    const [serverWake, setServerWake] = useState<boolean>(false)
    const { user, setUser, signOut } = useFlix()
    const [initial, setInitial] = useState("-")
    //const [config, setConfig] = useState<{ dados: any[], chaves: string[], taxa: number } | null>(null)
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

    /*const fuse = useMemo(() =>
        new Fuse(config.dados, {
            keys: config.chaves,
            threshold: config.taxa
        }), [])*/

    useEffect(() => {
        if (!user) {
            const { 'flix-user': userCookie } = parseCookies()
            if (userCookie) setUser(JSON.parse(userCookie))
        }
    }, [])

    useEffect(() => {
        if (!user) return
        const inicial = user.name[0].toUpperCase()
        setInitial(inicial)
    }, [user])
    useEffect(() => {
        async function wakeUpServer() {
            const responses = await Promise.allSettled([
                api.get('/acordar'),
                apiSub.get('/'),
                apiEmail.get('/'),
                apiManager.get('/')
            ]);

            const [acordar, acordarManager, acordarMensageria, acordarContentManager] = responses;

            //debug.log(acordarMensageria);

            if (
                acordar.status === "fulfilled" &&
                acordar.value.status === 200 &&
                acordarManager.status === "fulfilled" &&
                acordarManager.value.data.code === 200 &&
                acordarMensageria.status === "fulfilled" &&
                acordarMensageria.value.data.code === 200 &&
                acordarContentManager.status === 'fulfilled' //&&
                //acordarContentManager.value.data.code === 200
            ) {
                setServerWake(true);
                debug.table({
                    Backend: acordar.value.data.status,
                    SubManager: acordarManager.value.data.message,
                    Mensageria: acordarMensageria.value.data.data.message,
                    //content: acordarContentManager.value.data.message
                });
            } else {
                setServerWake(false);
            }
        }
        wakeUpServer()
        const manterAcordado = setInterval(() => {
            wakeUpServer()
        }, 40000)
        return () => clearInterval(manterAcordado)
    }, [])

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
    function handleUserClick() {
        setModal(!modal)
        //Router.push('/me');
    }

    function handleClickHome(id: number) {
        if (id === 1) {
            setMenuVisible(!menuvisible)
        }
        if (id === 2) {
            setSearchMobileVisible(!searchMobileVisible)
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
                <Link href="/#filmes" className={styles.button_container}>
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
                            {relatedSearch.map((card, index) => <li style={{ cursor: loading ? "progress" : "pointer" }} key={index} onClick={() => handleRelatedSearchClick(card)}><CiSearch size={20} /> {card.title} {card.subtitle ? `- ${card.subtitle}` : ""}</li>)}
                        </ul>
                    }

                    <div className={styles.button_container} onClick={() => handleSearch(searchInput)}>
                        <h2><CiSearch size={35} color="#fff" /></h2>
                    </div>
                </form>

            </div>
            <div className={styles.right_nav}>
                <div className={styles.status}>
                    <div
                        className={styles.bolinha}
                        style={{ backgroundColor: serverWake ? '#007714' : '#d42c2c' }}
                    ></div>
                    <p>status</p>
                </div>
                <div onClick={handleUserClick}>
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
                    <Search onClick={() => handleClickHome(2)} />
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
                                        {relatedSearch.map((card, index) => <li style={{ cursor: loading ? "progress" : "pointer" }} key={index} onClick={() => handleRelatedSearchClick(card)}><CiSearch size={20} /> {card.title} {card.subtitle ? `- ${card.subtitle}` : ""}</li>)}
                                    </ul>
                                }
                            </form>
                        </>
                    }
                </div>
                <div className={styles.divider}></div>
                <div className={styles.dropdownIcon} onClick={handleUserClick}>
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
            </div>
        </div>
    )
}


