import Header from "@/components/Header";
import styles from './styles.module.scss'
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getUserCookieData, updateUserCookie } from "@/services/cookieClient";
import Router from "next/router";
import { UserProps } from "@/@types/user";
import Image from "next/image";
import { BiSolidEditAlt } from "react-icons/bi";
import Qrcode from "@/components/Qrcode";
import Avatar from "@/components/modals/Avatar";
import { cards } from "@/data/cards";
import { series } from "@/data/series";
import { SeriesProps } from "@/@types/series";
import { CardsProps } from "@/@types/Cards";
import EditarDados from "@/components/modals/EditarDados";
import { deleteCookies } from "@/services/cookieClient";
import { X } from "lucide-react";
import { removeWatchLater } from "@/services/handleWatchLater";
import { FaUserCircle } from "react-icons/fa";
import { WatchLaterProps } from "@/@types/watchLater";
import SEO from "@/components/SEO";
import Switch from "@/components/ui/Switch";
import { toast } from "react-toastify";
import { api } from "@/services/api";

export default function Me() {
    const [user, setUser] = useState<UserProps | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [editarDados, setEditarDados] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [watchLaterList, setWatchLaterList] = useState<WatchLaterProps[]>([])
    //console.log("user: ", user)

    useEffect(() => {
        getUserData()

    }, [modalVisible, editarDados])
    async function getUserData() {
        const userData = await getUserCookieData()
        if (!userData) {
            Router.push('/login')
            return
        }
        setUser(userData)
        handleWatchLater(userData)
    }

    function handleWatchLater(user: UserProps) {
        //const lista = await fetchWatchLater(user)
        const watchLaterOnStorage = localStorage.getItem('watchLaterList')
        setWatchLaterList(JSON.parse(watchLaterOnStorage as string))
    }

    function handleOpenModal() {
        setModalVisible(true)
    }
    function handleCloseModal() {
        setModalVisible(false)
    }

    function handleWatch(watch: SeriesProps | CardsProps) {
        if ('src' in watch) {
            const play: string = `/watch/${watch.tmdbId}`
            Router.push(play);
        } else if (watch.season?.[0]?.episodes?.[0]) {
            const ep = watch.season[0].episodes[0]
            const episode = new URLSearchParams({
                title: `${watch?.title}`,
                subtitle: `${watch?.subtitle}`,
                episode: `${ep.ep}`,
                src: `${ep.src}`,
                season: `${watch.season[0].s}`
            })
            const play: string = `/watch/serie?${episode}`
            Router.push(play)
        } else {
            console.log("Filme, Episódio ou temporada não encontrados")
        }
    }
    function openEditarDados() {
        setEditarDados(true)
    }
    async function closeEditarDados() {
        setEditarDados(false)
        if (!user) return Router.push('/login')
        //setCookieClient(user.id);
        await updateUserCookie();
    }

    function handleLogout() {
        deleteCookies('flixnext');
        document.cookie = `userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        localStorage.removeItem('flixnext');
        localStorage.removeItem('favoriteList');
        localStorage.removeItem('watchLaterList');
        //deleteCookies('userData');
        Router.push('/login');
    }

    async function handleRemove(title: string, subtitle?: string) {

        if (!user) return Router.push('/login')

        await removeWatchLater(user.id, title, subtitle)
        await updateUserCookie()
        handleWatchLater(user)
        await getUserData()

    }
    async function handleNews(newsletter: boolean) {
        try {
            setLoading(true)
            const user = await getUserCookieData();
            if (!user) {
                toast.error("Erro ao tentar editar dados do usuario.")
                return
            }
            const userData: Record<string, any> = {
                id: user.id,
                news: newsletter
            }

            const response = await api.put('/user', userData)
            const data = response.data;
            await updateUserCookie()

        } catch (err) {
            console.log("Erro ao alterar dados", err)
            toast.error("Erro ao alterar seus dados.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <SEO title="Minha Conta | FlixNext" description="Minha Conta. Altere seus dados e seu avatar!" />
            <Header />

            <article className={styles.container}>
                {
                    user ?
                        (<div className={styles.articleContainer}>
                            <aside className={styles.asideContainer}>
                                <div className={styles.avatar}>
                                    <div className={styles.imgContainer}>
                                        {user.avatar ? <Image src={user?.avatar} alt="Avatar" width={150} height={150} /> : <FaUserCircle size={150} />}
                                        <div className={styles.editAvatar}>
                                            <button type="button" title="Mudar Avatar" onClick={handleOpenModal}><BiSolidEditAlt size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.asideInfo}>
                                    <h2>{user.name}</h2>
                                    <h3>{user.email}</h3>
                                    <h3>Aniversário
                                        <p>{user?.birthday && new Date(user.birthday).toLocaleDateString('pt-br', {
                                            timeZone: 'UTC'
                                        })}</p>
                                    </h3>
                                </div>
                                <div className={styles.button}>
                                    <button type="button" onClick={openEditarDados}>Editar dados</button>
                                    <button type="button" onClick={handleLogout}>Sair</button>
                                </div>
                                <div className={styles.donate}>
                                    <h3>Torne-se um doador!!</h3>
                                    <Qrcode />
                                </div>
                                <div className={styles.newsletter}>
                                    <Switch checked={user.news} onChange={handleNews} />
                                    <h3>Receber Newsletters</h3>
                                </div>
                            </aside>
                            <section className={styles.sectionContainer}>
                                <div className={styles.infoContainer}>
                                    <h2 style={{ textAlign: 'center' }}>Sua Lista para assistir mais tarde</h2>
                                    <div className={styles.watchLater}>
                                        <div className={styles.filmes}>
                                            <h4>Filmes</h4>
                                            <div className={styles.watchContainer}>
                                                {
                                                    cards.filter(filme => watchLaterList &&
                                                        watchLaterList.length > 0 && watchLaterList.some(titulo => titulo.tmdbid === filme.tmdbId)
                                                    ).map((filme, index) => (
                                                        <div title={`Assistir ${filme.title}`} key={index} className={styles.watch}>
                                                            <span onClick={() => handleWatch(filme)}>
                                                                {filme.title}{filme.subtitle && <span> - {filme.subtitle}</span>}
                                                            </span>
                                                            <X onClick={() => handleRemove(filme.title, filme.subtitle)} /></div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.series}>
                                            <h4>Series</h4>
                                            <div className={styles.watchContainer}>
                                                {
                                                    series.filter(serie => watchLaterList &&
                                                        watchLaterList.length && watchLaterList.some(titulo => titulo.tmdbid === serie.tmdbID)
                                                    ).map((serie, index) => (
                                                        <div title={`Assistir ${serie.title}`} key={index} className={styles.watch}>
                                                            <span onClick={() => handleWatch(serie)}>
                                                                {serie.title} {serie.subtitle && <span>- {serie.subtitle}</span>}
                                                            </span>
                                                            <X onClick={() => handleRemove(serie.title, serie.subtitle)} /></div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>)
                        : "Carregando..."}
            </article>
            {modalVisible && <Avatar handleCloseModal={handleCloseModal} />
            }
            {editarDados && <EditarDados handleClose={closeEditarDados} />
            }
            <Footer />
        </>
    )
}