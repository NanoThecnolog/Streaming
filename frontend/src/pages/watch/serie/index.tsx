import Head from "next/head"
import Router, { useRouter } from "next/router"
import styles from '@/styles/Watch.module.scss'
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { getUserCookieData } from "@/services/cookieClient"
import NextEpisode from "@/components/ui/NextEpisode"
import PrevEpisode from "@/components/ui/PreviousEpisode"
import SEO from "@/components/SEO"
import { series } from "@/js/series"


export default function WatchSerie() {
    const router = useRouter()
    const { title, subtitle, episode, src, season } = router.query
    const [episodio, setEpisodio] = useState({ title: "", subtitle: "", episode: 0, src: "", season: 0 })

    useEffect(() => {
        async function acordarServidor() {
            try {
                const wakeup = await api.get('/acordar');
                return wakeup
            } catch (err) {
                return err
            }
        }
        acordarServidor();
        const manterAcordado = setInterval(() => {
            acordarServidor()
        }, 40000);
        return () => clearInterval(manterAcordado)
    }, [])

    useEffect(() => {
        if (title && subtitle && src && episode && season) {

            setEpisodio({
                title: Array.isArray(title) ? title[0] : title,
                subtitle: Array.isArray(subtitle) ? subtitle[0] : subtitle,
                episode: Array.isArray(episode) ? parseInt(episode[0]) : parseInt(episode),
                src: src as string,
                season: Array.isArray(season) ? parseInt(season[0]) : parseInt(season),

            })
        }

    }, [router, title, subtitle, src, episode])

    useEffect(() => {
        const userData = async () => {
            const user = await getUserCookieData();
            if (!user) return Router.push('/login');
        }
        userData()
    }, [])

    function handleBack() {
        const serie = series.find(serie => serie.title === title && serie.subtitle === subtitle)
        Router.push(`/series/serie/${serie?.tmdbID}`)
    }
    useEffect(() => {
        function rightClickBlock(event: MouseEvent) { event.preventDefault(); }

        // Impede atalhos de ferramentas de desenvolvedor
        function openConsoleBlock(event: KeyboardEvent) {
            const blockedKeys = ['F12', 'I', 'C', 'J', 'U']
            if (
                blockedKeys.includes(event.key) ||
                (event.ctrlKey && event.shiftKey && blockedKeys.includes(event.key)) ||
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
    return (
        <>
            <SEO title={`Episódio ${episode} - ${title} ${subtitle != '' && `- ${subtitle}`} | FlixNext`} description=" " />
            {src ? (
                <div className={styles.container}>
                    <div className={styles.movie}>
                        <div className={styles.movieName}>
                            <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                                <ChevronLeft size={30} />
                            </button>
                            <h3>{episodio.title} {episodio.subtitle != "" && `- ${episodio.subtitle}`} - Temporada {episodio.season} Episódio {episodio.episode}</h3>
                        </div>
                        <div className={styles.iframe}>
                            <iframe
                                title={episodio.title}
                                allowFullScreen
                                width="100%"
                                height="100%"
                                src={episodio.src}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <PrevEpisode
                                title={episodio.title}
                                subtitle={episodio.subtitle}
                                season={episodio.season}
                                episode={episodio.episode}
                            />
                            <NextEpisode
                                title={episodio.title}
                                subtitle={episodio.subtitle}
                                season={episodio.season}
                                episode={episodio.episode}
                            />
                        </div>
                    </div>
                </div>
            )
                : "Carregando..."}

        </>
    )
}