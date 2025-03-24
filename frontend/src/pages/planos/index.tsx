import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { apiSub } from "@/services/apiSubManager";
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



export default function Donate() {
    const router = useRouter()
    const [plans, setPlans] = useState<PlansProps>()
    const { allData, serieData, setAllData, setSerieData } = useTMDB()

    const series = serieData.slice(0, 20)
    const movies = allData.slice(0, 20)

    async function getPlans() {
        try {
            const plans = await apiSub.get('/pay/plan/list')
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
            flixFetcher.fetchMovieData(setAllData)
            if (serieData.length === 0) {
                debug.warn("Chamando 2")
                flixFetcher.fetchSerieData(setSerieData)
            }
        } else if (serieData.length === 0) {
            debug.warn("Chamando 3")
            flixFetcher.fetchSerieData(setSerieData)
        }

    }, [allData, serieData, setAllData, setSerieData])

    function handleClick(id: string) {
        router.push(`/payment?id=${id}`)
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
                        <div className={styles.plansContainer}>
                            {
                                plans && plans.plan.length > 0 ? plans.plan.sort((a, b) => a.price - b.price).map(p => (
                                    <div className={styles.plan} key={p.planId}>
                                        <div className={styles.infoPlan}>
                                            <div className={styles.planDetails}>
                                                <p className={styles.planName}>
                                                    {p.name}
                                                </p>
                                                <p className={styles.planPrice}>
                                                    {formatPrice(calculateDiscount(p.price, desconto[p.type]))}
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
                                )) : <div className={styles.loader}>
                                    <Spinner />
                                </div>
                            }
                        </div>
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
                                    {movies.map(movie => {
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
                                    {series.map(serie => {
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