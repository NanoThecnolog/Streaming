import styles from '@/styles/Watch.module.scss';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from 'lucide-react';
import { api } from "@/services/api";
import { getUserCookieData } from "@/services/cookieClient";
import HelpFlag from "@/components/Helpflag";
import HelpModal from "@/components/modals/HelpModal/index ";
import { UserProps } from "@/@types/user";
import SEO from "@/components/SEO";
import { cards } from '@/data/cards';
import { CardsProps } from '@/@types/Cards';

export default function Watch() {
    const router = useRouter()
    const { tmdbId } = router.query;
    const [movieData, setMovieData] = useState({ title: '', subtitle: '', src: '', tmdbId: 0 });
    const [user, setUser] = useState<UserProps>()
    const [visible, setVisible] = useState(false)

    const acordarServidor = useCallback(async () => {
        try {
            await api.get('/acordar')
        } catch (err) {
            console.error("Erro ao acordar o servidor", err)
        }
    }, [])
    useEffect(() => {
        acordarServidor();
        const manterAcordado = setInterval(acordarServidor, 40000);
        return () => clearInterval(manterAcordado)
    }, [acordarServidor])


    const userData = useCallback(async () => {
        const user = await getUserCookieData();
        if (!user) return router.push('/login');
        setUser(user)
    }, [router])

    useEffect(() => {
        userData()
    }, [userData])

    useEffect(() => {
        if (tmdbId) {
            const movie: CardsProps | undefined = cards.find(card => card.tmdbId === Number(tmdbId))
            if (!movie) return
            setMovieData({
                title: movie.title,
                subtitle: movie.subtitle ?? '',
                src: movie.src,
                tmdbId: movie.tmdbId
            })
        }
    }, [router, tmdbId])

    const handleBack = useCallback(() => {
        router.back()
    }, [router])

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

    function handleHelpModal() {
        setVisible(!visible)
    }

    return (
        <>
            <SEO title={`${movieData.title} - FlixNext`} description=" " />
            <div className={styles.container}>
                <div className={styles.movie}>
                    <div className={styles.movieName}>
                        <button onClick={handleBack} title="Voltar ao início" className={styles.buttonPreview}>
                            <ChevronLeft size={30} />
                        </button>
                        <h3>{movieData.title} {movieData.subtitle != "" && `- ${movieData.subtitle}`}</h3>
                    </div>
                    <div className={styles.flagContainer}>
                        <HelpFlag modalVisible={handleHelpModal} />
                    </div>
                    <div className={styles.iframe} id="iframe">
                        <iframe
                            title={movieData.title}
                            allowFullScreen
                            width="100%"
                            height="100%"
                            src={movieData.src}
                        />
                    </div>
                    {visible && (
                        <HelpModal
                            handleHelpModal={handleHelpModal}
                            userId={user?.id}
                            tmdbId={Number(tmdbId)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}