import Header from "@/components/Header";
import styles from './styles.module.scss'
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getCookieClient } from "@/services/cookieClient";
import Router from "next/router";
import { UserProps } from "@/@types/user";
import Head from "next/head";
import { serverStatus } from "@/services/verifyStatusServer";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { BiSolidEditAlt } from "react-icons/bi";
import Qrcode from "@/components/Qrcode";
import Avatar from "@/components/modals/Avatar";
import { cards } from "@/js/cards";
import { series } from "@/js/series";
import { SeriesProps } from "@/@types/series";
import { CardsProps } from "@/@types/Cards";
import EditarDados from "@/components/modals/EditarDados";
import { deleteCookies } from "@/services/deleteCookies";

export default function Me(status: { status: string }) {
    const [usuario, setUsuario] = useState<UserProps | null>(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [editarDados, setEditarDados] = useState(false)

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            Router.push('/login')
            return
        }
        setUsuario(user)
    }, [modalVisible, editarDados])


    function handleOpenModal() {
        setModalVisible(true)
    }
    function handleCloseModal() {
        setModalVisible(false)
    }
    function handleWatch(watch: SeriesProps | CardsProps) {
        if ('src' in watch) {
            const movie = new URLSearchParams({
                title: `${watch.title}`,
                subTitle: `${watch.subtitle}` || "",
                src: `${watch.src}`
            });
            const play: string = `/watch?${movie}`
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
    function closeEditarDados() {
        setEditarDados(false)
    }

    function handleLogout() {
        deleteCookies('flixnext');
        Router.push('/login');
    }


    return (
        <>
            <Head>
                <title>Minha Conta | FlixNext</title>
                <meta name="description" content="Página da conta do usuário" />
            </Head>
            <Header userAvatar={usuario?.avatar} status={status} />
            <article className={styles.container}>
                {usuario &&
                    <div className={styles.articleContainer}>
                        <aside className={styles.asideContainer}>
                            <div className={styles.avatar}>
                                <div className={styles.imgContainer}>
                                    <Image src={usuario?.avatar} alt="Avatar" width={150} height={150} />
                                    <div className={styles.editAvatar}>
                                        <button type="button" title="Mudar Avatar" onClick={handleOpenModal}><BiSolidEditAlt size={20} /></button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.asideInfo}>
                                <h2>{usuario.name}</h2>
                                <h3>{usuario.email}</h3>
                                <h3>Data de Aniversário
                                    <p>{usuario?.birthday && new Date(usuario.birthday).toLocaleDateString('pt-br', {
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
                        </aside>
                        <section className={styles.sectionContainer}>
                            <div className={styles.infoContainer}>
                                <h2 style={{ textAlign: 'center' }}>Sua Lista para assistir mais tarde</h2>
                                <div className={styles.watchLater}>
                                    <div className={styles.filmes}>
                                        <h4>Filmes</h4>
                                        <div className={styles.watchContainer}>
                                            {cards.filter(filme =>
                                                usuario?.myList?.length > 0 && usuario.myList.some(titulo => titulo.title === filme.title &&
                                                    (titulo.subtitle === filme.subtitle || titulo.subtitle === '' || filme.subtitle === '')
                                                )
                                            ).map((filme, index) => (
                                                <div title={`Assistir ${filme.title}`} key={index} className={styles.watch} onClick={() => handleWatch(filme)}>{filme.title} {filme.subtitle && <span>- {filme.subtitle}</span>}</div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.series}>
                                        <h4>Series</h4>
                                        <div className={styles.watchContainer}>
                                            {series.filter(serie =>
                                                usuario?.myList?.length && usuario.myList.some(titulo => titulo.title === serie.title &&
                                                    (titulo.subtitle === serie.subtitle || titulo.subtitle === '' || serie.subtitle === '')
                                                )
                                            ).map((serie, index) => (
                                                <div title={`Assistir ${serie.title}`} key={index} className={styles.watch} onClick={() => handleWatch(serie)}>{serie.title} {serie.subtitle && <span>- {serie.subtitle}</span>}</div>
                                            ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </article>
            {modalVisible && <Avatar handleCloseModal={handleCloseModal} />}
            {editarDados && <EditarDados handleClose={closeEditarDados} />}
            <Footer />
        </>

    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    async function fetchServerStatus() {
        const status = await serverStatus();
        return status
    }
    const status = await fetchServerStatus()
    return {
        props: {
            status
        }
    }
}