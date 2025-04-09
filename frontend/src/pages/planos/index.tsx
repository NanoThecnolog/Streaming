import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { PlansProps } from "@/@types/plans";
import { calculateDiscount, formatPrice } from "@/utils/UtilitiesFunctions";
import { useRouter } from "next/router";
import { debug } from "@/classes/DebugLogger";
import { desconto, faqPlans, swiperBreakpoints } from "@/utils/Variaveis";
import { useTMDB } from "@/contexts/TMDBContext";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";
import { flixFetcher } from "@/classes/Flixclass";
import { SiAppletv, SiHbo, SiNetflix, SiParamountplus, SiPrimevideo, SiStarz, SiSky } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import Spinner from "@/components/ui/Loading/spinner";
import Link from "next/link";
import Questions from "@/components/Questions";
import axios from "axios";
import { mongoService } from "@/classes/MongoContent";
import { useFlix } from "@/contexts/FlixContext";
import { MovieTMDB } from "@/@types/Cards";
import { TMDBSeries } from "@/@types/series";



export default function Donate() {
    const router = useRouter()
    const [plans, setPlans] = useState<PlansProps>()
    const { allData, serieData, setAllData, setSerieData } = useTMDB()
    const { movies, setMovies, series, setSeries } = useFlix()
    const [moviesToShow, setMoviesToShow] = useState<MovieTMDB[]>()
    const [seriesToShow, setSeriesToShow] = useState<TMDBSeries[]>()

    //const seriesToShow = serieData.slice(0, 20)
    //const moviesToShow = allData.slice(0, 20)

    useEffect(() => {
        async function fetchMoviesMongoDB() {
            const response = await mongoService.fetchMovieData()
            if (response.length > 0) setMovies(response)
        }
        if (movies.length === 0) fetchMoviesMongoDB()
    }, [movies])
    useEffect(() => {
        async function fetchSeriesMongoDB() {
            const response = await mongoService.fetchSerieData()
            if (response.length > 0) setSeries(response)
        }
        if (series.length === 0) fetchSeriesMongoDB()
    }, [series])

    async function getPlans() {
        try {
            const plans = await axios.get('/api/plan/list')
            const data: PlansProps = plans.data
            debug.log(data)
            setPlans(data)
        } catch (err) {
            debug.error(err)
        }
    }

    useEffect(() => {
        getPlans()
    }, [])

    useEffect(() => {
        if (allData.length === 0) {
            debug.warn("chamando 1")
            const cards = movies.sort((a, b) => b.index - a.index).slice(0, 20)
            flixFetcher.fetchMovieData(setAllData, cards)
            if (serieData.length === 0) {
                debug.warn("Chamando 2")
                flixFetcher.fetchSerieData(setSerieData)
            }
        } else if (serieData.length === 0) {
            debug.warn("Chamando 3")
            flixFetcher.fetchSerieData(setSerieData)
        }

    }, [movies, allData, serieData, setAllData, setSerieData])

    function handleClick(id: string) {
        router.push(`/payment?id=${id}`)
    }
    function handlePrice(price: number, planType: string) {
        switch (planType) {
            case 'mensal':
                return formatPrice(calculateDiscount(price, desconto[planType]))
            case 'trimestral':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 3)
            case 'semestral':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 6)
            case 'anual':
                return formatPrice(calculateDiscount(price, desconto[planType]) / 12)
        }

    }

    return (
        <>
            <SEO title="Escolha seu Plano | FlixNext" description="Planos a partir de R$10,99" />
            <Header />
            <main className={styles.mainPage} id="escolher">
                <section className={styles.sectionContainer}>
                    <div className={styles.contentContainer}>
                        <div className={styles.title}>
                            <h1>Escolha o melhor plano para você</h1>
                        </div>
                        {
                            plans ?
                                <div className={styles.plansContainer}>
                                    {
                                        plans.plan.length > 0 && plans.plan.sort((a, b) => a.price - b.price).map(p => (
                                            <div className={styles.plan} key={p.planId}>
                                                <div className={styles.infoPlan}>
                                                    <div className={styles.planDetails}>
                                                        <p className={styles.planName}>
                                                            {p.name}
                                                        </p>
                                                        <p className={styles.planPrice}>
                                                            {handlePrice(p.price, p.type)}/mês
                                                        </p>
                                                        {desconto[p.type] > 0 && <p className={styles.priceDiscount}>{desconto[p.type]}% OFF</p>}
                                                        <p className={styles.planType}>
                                                            Plano <span>{p.type}</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <ul>
                                                            <li>Filmes e Séries raros</li>
                                                            <li>Solicitação de novos conteúdos</li>
                                                            <li>Mais de 500 títulos disponíveis</li>
                                                            <li>suporte 24/7</li>
                                                            <li>Novos conteúdos toda semana</li>
                                                            <li>Cancele quando quiser</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className={styles.buttonContainer}>
                                                    <button onClick={() => handleClick(p.id)}>Escolha seu plano</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> : <div className={styles.loader}>
                                    <Spinner />
                                </div>
                        }
                    </div>
                </section>
                <section className={styles.contentPromoContainer}>
                    <div className={styles.textContent}>
                        <h2>Conteúdo exclusivo</h2>
                        <h4>Na FlixNext você encontra filmes e séries que não acha em nenhum outro lugar</h4>
                    </div>
                    {allData.length > 0 && serieData.length > 0 ?
                        <>
                            <div className={styles.cardContainer}>
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    spaceBetween={10}
                                    loop={true}
                                    breakpoints={swiperBreakpoints}
                                >
                                    {allData.slice(0, 20).map(movie => {
                                        const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        return (
                                            <SwiperSlide key={movie.id}>
                                                <div className={styles.card}>
                                                    <img src={url} alt={movie.title} />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}

                                </Swiper>
                            </div>
                            <div className={styles.cardContainer}>
                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    navigation
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    spaceBetween={10}
                                    loop={true}
                                    breakpoints={swiperBreakpoints}
                                >
                                    {serieData.slice(0, 20).map(serie => {
                                        const url = `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                                        return (
                                            <SwiperSlide key={serie.id}>
                                                <div className={styles.card}>
                                                    <img src={url} alt={serie.name} />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </>
                        : <div className={styles.loader}>
                            <Spinner />
                        </div>
                    }
                    <div className={styles.buttonActionContainer}>
                        <Link href="/planos/#escolher">
                            <button>
                                Escolher plano
                            </button>
                        </Link>
                    </div>
                </section>
                <section className={styles.contentPromoContainer}>
                    <div className={styles.content}>
                        <h2>Tudo em um só lugar</h2>
                        <p>Assista aos conteúdos dos streamings mais famosos num só lugar</p>
                        <div className={styles.streamBrand}>
                            <div className={`${styles.logo} ${styles.netflix}`}>
                                <SiNetflix />
                                <p>Netflix</p>
                            </div>
                            <div className={`${styles.logo} ${styles.hbo}`}>
                                <SiHbo />
                                <p>HBO MAX</p>
                            </div>
                            <div className={`${styles.logo} ${styles.prime}`}>
                                <SiPrimevideo />
                                <p>Prime Video</p>
                            </div>
                            <div className={`${styles.logo} ${styles.disney}`}>
                                <TbBrandDisney />
                                <p>Disney+</p>
                            </div>
                            <div className={`${styles.logo} ${styles.sky}`}>
                                <SiSky />
                                <p>Sky+</p>
                            </div>
                            <div className={`${styles.logo} ${styles.apple}`}>
                                <SiAppletv />
                                <p>Apple TV+</p>
                            </div>
                            <div className={`${styles.logo} ${styles.paramount}`}>
                                <SiParamountplus />
                                <p>Paramount+</p>
                            </div>
                            <div className={`${styles.logo} ${styles.globo}`}>
                                <p>globo<span>play</span></p>
                            </div>
                            <div className={`${styles.logo} ${styles.starz}`}>
                                <SiStarz />
                            </div>
                        </div>
                        <div className={styles.buttonActionContainer}>
                            <Link href="/planos/#escolher">
                                <button>
                                    Escolher plano
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className={styles.faqContainer}>
                    <div className={styles.faq}>
                        <div className={styles.title}>
                            <h1>perguntas frequentes</h1>
                        </div>
                        <div className={styles.questionsContainer}>
                            {faqPlans.map((item, index) => (
                                <Questions
                                    key={index}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
//colocar perguntas frequêntes com informações sobre os planos
//melhorar a propaganda
//antes das perguntas frequentes colocar um comparativo de gasto
// se o cliente fosse contratar todos os streamings