import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { agp, gen, stm } from '@/utils/Genres';
import { classification } from '@/utils/Variaveis';
import { debug } from '@/classes/DebugLogger';
import { toast } from 'react-toastify';
import { mongoService } from '@/classes/MongoContent';
import { tmdb } from '@/classes/TMDB';
import debounce from 'lodash.debounce';
import { minToHour } from '@/utils/UtilitiesFunctions';

export interface MovieProps {
    background: string,
    overlay: string,
    tmdbId: number,
    title: string,
    subtitle: string,
    description: string,
    faixa: string,
    src: string,
    duration: string,
    genero: string[],
    lang: "Dublado" | "Legendado",
}

export default function Create() {
    const [loading, setLoading] = useState(false)
    const [movieData, setMovieData] = useState<MovieProps>({
        background: '/fundo-largo.jpg',
        overlay: '/fundo-alto.jpg',
        tmdbId: 0,
        title: '',
        subtitle: '',
        description: '',
        faixa: 'L',
        src: '',
        duration: '',
        genero: [],
        lang: 'Dublado'
    })
    const genres = [
        ...Object.values(gen),
        ...Object.values(agp),
        ...Object.values(stm)
    ]
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (loading) return debug.log('calma q ta indo')
        setLoading(true)
        //debug.log(movieData)
        try {
            const response = await mongoService.createMovie(movieData)
            debug.log('Resposta da requisição: ', response)
            setMovieData(
                {
                    background: '/fundo-largo.jpg',
                    overlay: '/fundo-alto.jpg',
                    tmdbId: 0,
                    title: '',
                    subtitle: '',
                    description: '',
                    faixa: 'L',
                    src: '',
                    duration: '',
                    genero: [],
                    lang: 'Dublado'
                }
            )
            toast.success("Ae bobão, filme adicionado!")
        } catch (err) {
            toast.error("Erro ao adicionar filme, vai ver oq aconteceu!")
        } finally {
            setLoading(false)
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setMovieData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleGenres(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setMovieData(prev => ({
            ...prev,
            genero: selectedOptions
        }));
    }

    useEffect(() => {
        const getTMDBDetails = debounce(async () => {
            const dataTMDB = await tmdb.fetchMovieDetails(movieData.tmdbId)
            debug.log('Dados do filme: ', dataTMDB)
            if (!dataTMDB) return
            setMovieData(prev => ({
                ...prev,
                title: dataTMDB.title,
                description: dataTMDB.overview,
                duration: minToHour(dataTMDB.runtime),
                genero: dataTMDB.genres.map(gen => gen.name)
            }))
        }, 2000)
        if (movieData.tmdbId && movieData.tmdbId > 0) getTMDBDetails()
    }, [movieData.tmdbId])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
                <div>
                    <div className={styles.formItem}>
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            value={movieData?.title || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="subtitle">Subtítulo</label>
                        <input
                            type="text"
                            id="subtitle"
                            name='subtitle'
                            value={movieData.subtitle || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            rows={4}
                            id="description"
                            name='description'
                            value={movieData.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="tmdbid">TMDBID</label>
                        <input
                            type="number"
                            id="tmdbid"
                            className={styles.tmdbid}
                            name='tmdbId'
                            value={movieData.tmdbId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="faixa">Faixa</label>
                        <select
                            id="faixa"
                            name='faixa'
                            value={movieData.faixa}
                            className={styles.selectFaixa}
                            onChange={handleChange}
                        >
                            {classification.map(faixa =>
                                <option key={faixa.etaria} value={faixa.etaria}>{faixa.etaria}</option>
                            )}
                        </select>
                        <span className={styles.chosenFaixa}>faixa escolhida: {movieData?.faixa}</span>
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="src">Link</label>
                        <input
                            type="url"
                            id="src"
                            placeholder='https://example.com'
                            name='src'
                            value={movieData.src || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="duration">Duração</label>
                        <input
                            type="text"
                            id="duration"
                            placeholder='00h 00m'
                            className={styles.duration}
                            name='duration'
                            value={movieData.duration || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formItem}>
                    <label htmlFor="genres">Gênero</label>
                    <select
                        id='genres'
                        multiple
                        value={movieData.genero}
                        onChange={handleGenres}
                    >
                        {genres.map(gen =>
                            <option key={gen} value={gen}>{gen}</option>
                        )}
                    </select>
                    <p>Gêneros selecionados</p>
                    <p>{movieData.genero.join(', ')}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button type='submit'>Adicionar Filme</button>
            </div>
        </form>
    )
}