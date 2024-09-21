import Header from "@/components/Header";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './styles.module.scss'
import { CardsProps } from "@/@types/Cards";
import { cards } from "@/js/cards";
import Link from "next/link";
import { FaInfoCircle, FaPlay, FaRegClock, FaStar } from "react-icons/fa";
import Card from "@/components/Card";
import { getCookieClient } from "@/services/cookieClient";
import { UserProps } from "@/@types/user";

export default function Search() {
    const router = useRouter();
    const [movie, setMovie] = useState<string>();
    const [searchCards, setSearchCards] = useState<CardsProps[]>()
    const [cardPerContainer, setCardPerContainer] = useState<number>(5)
    const [width, setWidth] = useState<number>()
    const [usuario, setUsuario] = useState<UserProps | null>(null)

    useEffect(() => {
        if (router.isReady) {
            const { input } = router.query;
            setMovie(input as string)
        }
        if (movie && movie !== '') {
            searchingMovie(movie);
        }

    }, [router.isReady, router.query, movie])

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            //console.log(width)
            setWidth(width)

            //ajustar os breakpoints depois
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
        const user = getCookieClient();
        if (!user) {
            Router.push('/login')
            return
        }
        setUsuario(user)
    }, [])

    function searchingMovie(movie: string) {
        const filteredCards = cards.filter((card) => card.title.toLowerCase().includes(movie.toLowerCase()));
        setSearchCards(filteredCards)
        console.log(filteredCards)
    }

    return (
        <>
            <Header userAvatar={usuario?.avatar} />
            <div className={styles.title}>
                <h2>Resultados da busca:</h2>
            </div>
            <div className={styles.container}>

                {searchCards ? searchCards?.map((card, index) =>
                    <Card
                        key={index}
                        card={card}
                    />
                ) : "Carregando..."}

            </div>
        </>
    )
}