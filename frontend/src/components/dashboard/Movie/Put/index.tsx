import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { toast } from 'react-toastify'
import { mongoService } from '@/classes/MongoContent'
import { classification } from '@/utils/Variaveis'
import { agp, gen, stm } from '@/utils/Genres'
import { CardsProps } from '@/@types/Cards'

interface PutProps {
    tmdbid?: number
}

export default function Put({ tmdbid }: PutProps) {
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState<number>()
    const [movieData, setMovieData] = useState<CardsProps>({
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
        lang: 'Dub',
        index: 0
    })
    const genres = [
        ...Object.values(gen),
        ...Object.values(agp),
        ...Object.values(stm)
    ]

    useEffect(() => {
        if (tmdbid) {
            const getMovie = async () => {
                const moviedb = await mongoService.findOneMovieById(tmdbid)
                if (moviedb) setMovieData(moviedb)
            }
            getMovie()
        }
    }, [tmdbid])

    async function searchMovie() {
        if (!id || id === 0) return
        const moviedb = await mongoService.findOneMovieById(id)
        debug.log(moviedb)
        if (moviedb) setMovieData(moviedb)
        else toast.warning('Filme não encontrado, verifique o id')
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (loading) return debug.log('calma q ta indo')
        setLoading(true)
        try {
            debug.log("movie data", movieData)
            if (!id) return toast.warning('tmdbid tá vazio, dá uma conferida meu nobre')
            const response = await mongoService.updateMovie(id, movieData)
            debug.log(response)
            toast.success("Filme Editado!")
        } catch (err) {
            toast.error("Erro ao editar esse filme, deu ruim em algum lugar!")
        } finally {
            setLoading(false)
        }
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        if (!movieData) return
        const { name, value } = e.target

        setMovieData(prev => ({
            ...prev,
            [name]: name === 'tmdbId' ? parseInt(value) : value,
        }))

    }
    function handleGenres(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setMovieData(prev => ({
            ...prev,
            genero: selectedOptions
        }));
    }
    return (
        <section className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.searchInput}>
                    <label htmlFor="id">Informe o ID do TMDB</label>
                    <input
                        type="number"
                        id='id'
                        value={id}
                        onChange={(e) => setId(Number(e.target.value))}
                    />
                </div>
                <button type='button' onClick={searchMovie}>buscar</button>
            </div>
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
                        <div className={styles.formItem}>
                            <label htmlFor="lang">Idioma</label>
                            <select
                                id="lang"
                                name='lang'
                                value={movieData.lang}
                                className={styles.selectLang}
                                onChange={handleChange}
                            >
                                <option key='Dub' value='Dub'>Dublado</option>
                                <option key='Leg' value='Leg'>Legendado</option>
                            </select>
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
                    <button type='submit'>Editar Filme</button>
                </div>
            </form>
        </section>
    )
}