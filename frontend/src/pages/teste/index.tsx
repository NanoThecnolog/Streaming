//import { verifyAllDataFiles } from '@/services/googleCheck';
import { apiGoogle } from '@/services/apiGoogle'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { ErrorProps } from '@/services/googleCheck';
import { useEffect, useState } from 'react';
import { mongoService } from '@/classes/MongoContent';
import { useFlix } from '@/contexts/FlixContext';
import { CardsProps } from '@/@types/Cards';
import { SeriesProps } from '@/@types/series';
import { SetupAPIClient } from '@/services/api';
import { GetServerSideProps } from 'next';

export default function TestPage() {
    const [errors, setErrors] = useState<ErrorProps[] | null>(null)
    const [type, setType] = useState<`movie` | `tv`>()
    const [loading, setLoading] = useState(false)
    const { movies, setMovies, series, setSeries } = useFlix()
    //const [card, setCard] = useState<CardsProps>()

    async function verify(type: 'movie' | 'tv') {
        setType(type)
        if (loading) return
        setLoading(true)
        try {
            const verificar = await apiGoogle.get(`/verify?type=${type}`)
            const errors = verificar.data.data;

            debug.log(errors)
            setErrors(errors)
        } catch (err) {
            debug.error(err)
        } finally {
            setLoading(false)
        }
    }
    const downloadErrors = (errors: ErrorProps[]) => {
        const formatado = JSON.stringify(errors, null, 2)
        const blob = new Blob([formatado], { type: 'text/plain' })
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob)
        link.download = `errors_${type}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    const fetchData = async () => {
        const results = await Promise.allSettled([
            await mongoService.fetchMovieData(),
            await mongoService.fetchSerieData()
        ])
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const data = result.value

                index === 0 ? setMovies(data as CardsProps[]) : setSeries(data as SeriesProps[])
                //index === 0 ? debug.log('Filmes', data) : debug.log('Series', data)
            } else {
                const error = result.reason
                index === 0 ? debug.error('Erro ao buscar filme:', error) : debug.error('Erro ao buscar série', error)
            }
        })
    }
    useEffect(() => {
        debug.log(movies)
        const card = movies.find((card) => card.tmdbId === 635910)
        //setCard(card)
        if (!card) return debug.log("erro pra definir card")
    }, [movies])

    return (
        <div className={styles.container}>
            <div>
                <h1>Página de testes</h1>
                <button onClick={() => verify(`movie`)}>{loading ? 'Testando...' : 'Testar filmes'}</button>
                <button onClick={() => verify(`tv`)}>{loading ? 'Testando...' : 'Testar series'}</button>
                {errors && errors.length > 0 ? <button onClick={() => downloadErrors(errors)}>baixar Erros</button> : ''}

                <button onClick={() => fetchData()}>buscar dados no banco</button>

                <div className={styles.mongo}>
                    <div className={styles.mongoContainer}>
                        <h2>Filmes</h2>
                        {movies && movies.sort((a, b) => b.index - a.index).map((movie, index) => (
                            <div key={index}>
                                {movie.title}
                            </div>
                        ))}
                    </div>
                    <div className={styles.mongoContainer}>
                        <h2>Series</h2>
                        {series && series.sort((a, b) => b.index - a.index).map((serie, index) => (
                            <div key={index}>
                                {serie.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const client = new SetupAPIClient(ctx)

    try {
        const response = await client.api.get('/user/access')
        const data: { access: boolean, message: string } = response.data
        debug.log(data)
        if (!data.access) return {
            redirect: {
                destination: '/series',
                permanent: false
            }
        }

        return {
            props: {}
        }
    } catch (err) {
        console.log('Error getting access for user', err)

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
}