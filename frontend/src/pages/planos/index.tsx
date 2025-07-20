import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { PlansProps } from "@/@types/plans";
import { calculateDiscount, formatPrice } from "@/utils/UtilitiesFunctions";
import { useRouter } from "next/router";
import { debug } from "@/classes/DebugLogger";
import { desconto } from "@/utils/Variaveis";
import { useTMDB } from "@/contexts/TMDBContext";
import 'swiper/css';
import { flixFetcher } from "@/classes/Flixclass";
import axios from "axios";
import { mongoService } from "@/classes/MongoContent";
import { useFlix } from "@/contexts/FlixContext";
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import Prices from "@/components/pagePlans/PromoPrices";
import Carousel from "@/components/pagePlans/PromoCarousel";
import Streaming from "@/components/pagePlans/PromoStreamings";
import PromoFAQ from "@/components/pagePlans/PromoFaq";
import { GetServerSideProps } from "next";
import { MovieProps } from "@/components/dashboard/Movie/Create";


//plans: plans.data, movies, series, tmdbMovies: tmdbMovies.data, tmdbSeries: tmdbSeries.data
interface PagePlansProps {
    plans: PlansProps,
    movies: CardsProps[],
    series: SeriesProps[],
    tmdbMovies: MovieTMDB[],
    tmdbSeries: TMDBSeries[],
}
export default function PagePlans({ plans, movies, series, tmdbMovies, tmdbSeries }: PagePlansProps) {
    const router = useRouter()

    return (
        <>
            <SEO title="Escolha seu Plano | FlixNext" description="Planos a partir de R$10,99" />
            <Header />
            <main className={styles.mainPage} id="escolher">
                {
                    plans && <Prices plans={plans} />
                }
                <Carousel movies={tmdbMovies} series={tmdbSeries} />
                <Streaming />
                <PromoFAQ />
            </main>
            <Footer />
        </>
    )
}
//colocar perguntas frequêntes com informações sobre os planos
//melhorar a propaganda
//antes das perguntas frequentes colocar um comparativo de gasto
// se o cliente fosse contratar todos os streamings
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {

        const [plans, movies, series] = await Promise.all([
            await axios.get('https://flixnext.com.br/api/plan/list'),
            await mongoService.fetchMovieData(),
            await mongoService.fetchSerieData()
        ])
        const moviesToFetch = movies.slice(0, 20)
        const seriesToFetch = series.slice(0, 20)
        const tmdbMovies = await axios.post('https://flixnext.com.br/api/tmdb/all/movie', {
            movies: moviesToFetch
        })
        const tmdbSeries = await axios.post('https://flixnext.com.br/api/tmdb/all/tv', {
            series: seriesToFetch
        })
        return {
            props: {
                plans: plans.data, movies, series, tmdbMovies: tmdbMovies.data.data, tmdbSeries: tmdbSeries.data.data
            }
        }

    } catch (err) {
        console.log('Erro durante getServerSideProps', err)
        return {
            props: {}
        }
    }
}