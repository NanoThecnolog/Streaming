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
import { desconto } from "@/utils/Variaveis";
import { useTMDB } from "@/contexts/TMDBContext";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";



export default function Donate() {
    const router = useRouter()
    const [plans, setPlans] = useState<PlansProps>()
    const { allData, serieData } = useTMDB()

    const series = serieData.slice(0, 20)
    const movies = allData.slice(0, 20)

    const breakpoints = {
        400: { slidesPerView: 2 },
        568: { slidesPerView: 2 },
        620: { slidesPerView: 3 },
        830: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1250: { slidesPerView: 6 },
        1440: { slidesPerView: 7 },
        1650: { slidesPerView: 8 },
        1810: { slidesPerView: 9 },
    }

    useEffect(() => {
        getPlans()
    }, [])

    async function getPlans() {
        try {
            const plans = await apiSub.get('/plan/list')
            const data: PlansProps = plans.data
            debug.log(data)
            setPlans(data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClick(id: string) {
        router.push(`/payment?id=${id}`)
    }

    return (
        <>
            <SEO title="Escolha seu Plano | FlixNext" description="Planos via boleto ou cartão de crédito" />
            <Header />
            <section className={styles.sectionContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <h1>Escolha o melhor plano para você</h1>
                    </div>
                    <div className={styles.plansContainer}>
                        {plans && plans.plan.length > 0 &&
                            plans.plan.sort((a, b) => a.price - b.price).map(p => (
                                <div className={styles.plan} key={p.planId}>
                                    <div className={styles.infoPlan}>
                                        <p className={styles.planName}>
                                            {p.name}
                                        </p>
                                        <p className={styles.planPrice}>
                                            {formatPrice(calculateDiscount(p.price, desconto[p.type]))}
                                        </p>
                                        {desconto[p.type] > 0 && <p className={styles.priceDiscount}>{desconto[p.type]}% OFF</p>}
                                        <p className={styles.planType}>
                                            Plano {p.type}
                                        </p>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <button onClick={() => handleClick(p.id)}>Escolha seu plano</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            {
                allData.length > 0 && serieData.length > 0 &&
                <section className={styles.contentContainer}>
                    <div className={styles.textContent}>
                        <h2>Aqui na FlixNext você tem acesso aos filmes e séries variados</h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            spaceBetween={10}
                            loop={true}
                            breakpoints={breakpoints}
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
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            spaceBetween={10}
                            loop={true}
                            breakpoints={breakpoints}
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
                </section>
            }

            <Footer />
        </>
    )
}
//colocar perguntas frequêntes com informações sobre os planos
//melhorar a propaganda