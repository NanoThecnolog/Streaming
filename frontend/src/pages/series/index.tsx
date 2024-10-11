import Header from "@/components/Header";
import TopSerie from "@/components/seriesComponents/Top serie";
import styles from './styles.module.scss'
import CardSerieContainer from "@/components/seriesComponents/CardSerieContainer";
import { useEffect, useState } from "react";
import Search from "@/components/Searching";
import Footer from "@/components/Footer";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";

export default function Series(status: { status: string }) {
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)

    const divisaoPorGenero = [
        "ação",
        "comédia",
        "suspense",
        "ficção científica",
        "drama",
        "fantasia",
        "animação",
        "netflix",
        "hbo",
        "prime video",
        "dc",
    ]

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;

            if (width < 780) {
                setCardPerContainer(1)
            } else if (width < 1100) {
                setCardPerContainer(2)
            } else if (width < 1480) {
                setCardPerContainer(3)
            } else if (width < 1650) {
                setCardPerContainer(4)
            } else {
                setCardPerContainer(5)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        const rightClickBlock = (event: MouseEvent) => {
            event.preventDefault();
        };
        // Impede atalhos de ferramentas de desenvolvedor
        const openConsoleBlock = (event: KeyboardEvent) => {
            if (
                event.key === 'F12' ||
                (event.ctrlKey && event.shiftKey && event.key === 'I') ||
                (event.ctrlKey && event.shiftKey && event.key === 'C') ||
                (event.ctrlKey && event.shiftKey && event.key === 'J') ||
                (event.ctrlKey && event.key === 'U')
            ) {
                event.preventDefault();
            }
        };
        document.addEventListener('contextmenu', rightClickBlock);
        document.addEventListener('keydown', openConsoleBlock);
        return () => {
            document.removeEventListener('contextmenu', rightClickBlock);
            document.removeEventListener('keydown', openConsoleBlock);
        };
    }, []);
    function handleOpenModalWatchLater(title: string, subTitle?: string) {
        //setMovieTitle(title)
        if (subTitle && subTitle !== "") {
            //setMovieSubTitle(subTitle)
        }
        //setVisible(true)
    }
    return (
        <>
            <Head>
                <title>FlixNext - Series</title>
                <meta name="description" content="Series para maratonar" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.content}>
                    <Header status={status} />
                    <TopSerie />
                    <div className={styles.mid}>
                        {divisaoPorGenero.map((sec, index) => (
                            <div key={index}>
                                <CardSerieContainer
                                    handleOpenModal={handleOpenModalWatchLater}
                                    section={sec}
                                    cardPerContainer={cardPerContainer}
                                />
                                {index === 1 && cardPerContainer >= 2 && <Search />}
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            </main>
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