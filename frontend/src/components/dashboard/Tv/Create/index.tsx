import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { mongoService } from '@/classes/MongoContent'
import { toast } from 'react-toastify'
import { classification } from '@/utils/Variaveis'
import { agp, gen, stm } from '@/utils/Genres'
import { Episodes, Seasons } from '@/@types/series'
import debounce from 'lodash.debounce'
import { tmdb } from '@/classes/TMDB'

export interface TVProps {
    background: string,
    overlay: string,
    tmdbID: number,
    title: string,
    subtitle: string,
    description: string,
    genero: string[],
    faixa: string,
    season: Seasons[]
    news?: "season" | "episode" | "news"

}

export default function CreateTV() {
    const [loading, setLoading] = useState(false)
    const [serieData, setSerieData] = useState<TVProps>({
        background: '/fundo-largo.jpg',
        overlay: '/fundo-alto.jpg',
        tmdbID: 0,
        title: '',
        subtitle: '',
        description: '',
        genero: [],
        faixa: 'L',
        season: [],
    })

    const genres = [
        ...Object.values(gen),
        ...Object.values(agp),
        ...Object.values(stm)
    ]

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        debug.log(serieData)
        if (loading) return debug.log('calma q ta indo')
        setLoading(true)
        //debug.log(movieData)
        try {
            const response = await mongoService.createSerie(serieData)
            debug.log('Resposta da requisição: ', response)
            setSerieData(
                {
                    background: '/fundo-largo.jpg',
                    overlay: '/fundo-alto.jpg',
                    tmdbID: 0,
                    title: '',
                    subtitle: '',
                    description: '',
                    faixa: 'L',
                    genero: [],
                    season: []
                }
            )
            toast.success("Ae bobão, série adicionada!")
        } catch (err) {
            toast.error("Erro ao adicionar série, vai ver oq aconteceu!")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSerieData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddSeason = () => {
        setSerieData((prev) => ({
            ...prev,
            season: [
                ...prev.season,
                { s: prev.season.length + 1, lang: "Dublado", episodes: [{ ep: 1, src: "", duration: "" }] },
            ],
        }))
    }
    const handleRemoveSeason = (seasonIndex: number) => {
        const updateSeasons = serieData.season.filter((_, i) => i !== seasonIndex)
        setSerieData((prev) => ({ ...prev, season: updateSeasons }))
    }

    const handleAddEpisode = (seasonIndex: number) => {
        const updatedSeasons = [...serieData.season];
        updatedSeasons[seasonIndex].episodes.push({
            ep: updatedSeasons[seasonIndex].episodes.length + 1,
            src: "",
            duration: "",
        })
        setSerieData((prev) => ({ ...prev, season: updatedSeasons }))
    }
    const handleRemoveEpisode = (seasonIndex: number, episodeIndex: number) => {
        const updatedSeasons = [...serieData.season]
        updatedSeasons[seasonIndex].episodes = updatedSeasons[seasonIndex].episodes.filter((_, i) => i !== episodeIndex)
        setSerieData((prev) => ({ ...prev, season: updatedSeasons }))
    }

    const handleSeasonChange = <K extends keyof Seasons>(
        seasonIndex: number,
        field: K,
        value: any
    ) => {
        const updatedSeasons = [...serieData.season];
        updatedSeasons[seasonIndex][field] = value;
        setSerieData((prev) => ({ ...prev, season: updatedSeasons }));
    };

    const handleEpisodeChange = <K extends keyof Episodes>(
        seasonIndex: number,
        episodeIndex: number,
        field: K,
        value: Episodes[K]
    ) => {
        const updatedSeasons = [...serieData.season];
        updatedSeasons[seasonIndex].episodes[episodeIndex][field] = value;
        setSerieData((prev) => ({ ...prev, season: updatedSeasons }));
    };

    const handleGenres = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSerieData(prev => ({
            ...prev,
            genero: selectedOptions
        }));
    }

    useEffect(() => {
        const getTMDBData = debounce(async () => {
            const dataTMDB = await tmdb.fetchSeriesDetails(serieData.tmdbID)
            if (!dataTMDB) return
            setSerieData(prev => ({
                ...prev,
                title: dataTMDB.name,
                description: dataTMDB.overview,
                genero: dataTMDB.genres.map(gen => gen.name)
            }))
        }, 2000)
        if (serieData.tmdbID && serieData.tmdbID > 0) getTMDBData()
    }, [serieData.tmdbID])
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
                            value={serieData.title || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="subtitle">Subtítulo</label>
                        <input
                            type="text"
                            id="subtitle"
                            name='subtitle'
                            value={serieData.subtitle || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            rows={4}
                            id="description"
                            name='description'
                            value={serieData.description || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="tmdbID">TMDBID</label>
                        <input
                            type="number"
                            id="tmdbid"
                            className={styles.tmdbid}
                            name='tmdbID'
                            value={serieData.tmdbID}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label htmlFor="faixa">Faixa</label>
                        <select
                            id="faixa"
                            name='faixa'
                            value={serieData.faixa}
                            className={styles.selectFaixa}
                            onChange={handleChange}
                        >
                            {classification.map(faixa =>
                                <option key={faixa.etaria} value={faixa.etaria}>{faixa.etaria}</option>
                            )}
                        </select>
                        <span className={styles.chosenFaixa}>faixa escolhida: {serieData?.faixa}</span>
                    </div>
                    <div className={styles.formItem}>
                        <h2 className="text-lg font-semibold">Temporadas</h2>
                        {serieData.season.map((season, seasonIndex) => (
                            <div key={seasonIndex} className={styles.seasonForm}>
                                <div>
                                    <label htmlFor='seasonNumber'>
                                        Nº Temporada:
                                    </label>
                                    <input
                                        id='seasonNumber'
                                        className={styles.seasonNumber}
                                        type="number"
                                        value={season.s}
                                        onChange={(e) =>
                                            handleSeasonChange(seasonIndex, "s", Number(e.target.value))
                                        }
                                    />
                                    <label htmlFor='lang'>
                                        Idioma:
                                    </label>
                                    <select
                                        id='lang'
                                        className={styles.seasonLang}
                                        value={season.lang}
                                        onChange={(e) =>
                                            handleSeasonChange(seasonIndex, "lang", e.target.value)
                                        }
                                    >
                                        <option value="Dublado">Dublado</option>
                                        <option value="Legendado">Legendado</option>
                                    </select>
                                </div>
                                <div className={styles.buttonSeason}>
                                    <button
                                        onClick={() => handleRemoveSeason(seasonIndex)}
                                    >
                                        Remover temporada
                                    </button>
                                </div>

                                <h3 className="text-md mt-2">Episódios</h3>
                                {season.episodes.map((episode, episodeIndex) => (
                                    <>
                                        <div key={episodeIndex} className={styles.episodeForm}>
                                            <label htmlFor='epNumber'>
                                                Nº Episódio:
                                            </label>
                                            <input
                                                id='epNumber'
                                                className={styles.episodeNumber}
                                                type="number"
                                                value={episode.ep}
                                                onChange={(e) =>
                                                    handleEpisodeChange(
                                                        seasonIndex,
                                                        episodeIndex,
                                                        "ep",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                            <label htmlFor='epSrc'>
                                                Link:
                                            </label>
                                            <input
                                                id='epSrc'
                                                type="text"
                                                value={episode.src}
                                                onChange={(e) =>
                                                    handleEpisodeChange(
                                                        seasonIndex,
                                                        episodeIndex,
                                                        "src",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label htmlFor='epDuration'>
                                                Duração:
                                            </label>
                                            <input
                                                id='epDuration'
                                                type="text"
                                                value={episode.duration}
                                                onChange={(e) =>
                                                    handleEpisodeChange(
                                                        seasonIndex,
                                                        episodeIndex,
                                                        "duration",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={styles.buttonEpisode}>
                                            <button
                                                onClick={() =>
                                                    handleRemoveEpisode(seasonIndex, episodeIndex)
                                                }
                                                className="text-red-500"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </>
                                ))}
                                <div className={styles.buttonEpisode}>
                                    <button type='button' onClick={() => handleAddEpisode(seasonIndex)}>+ Episódio</button>
                                </div>
                            </div>
                        ))}
                        <div className={styles.buttonSeason}>
                            <button type="button" onClick={handleAddSeason}>+ Temporada</button>
                        </div>

                    </div>
                </div>

                <div className={styles.formItem}>
                    <label htmlFor="genres">Gênero</label>
                    <select
                        id='genres'
                        multiple
                        value={serieData.genero}
                        onChange={handleGenres}
                    >
                        {genres.map(gen =>
                            <option key={gen} value={gen}>{gen}</option>
                        )}
                    </select>
                    <p>Gêneros selecionados</p>
                    <p>{serieData.genero.join(', ')}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button type='submit'>Adicionar Série</button>
            </div>
        </form>
    )
}