import { apiTMDB } from '@/services/apiTMDB'
import { debug } from './DebugLogger'
import { TrailerProps } from '@/@types/trailer'
import { CollectionProps, ResultsProps } from '@/@types/collection'
import { TMDBEpisodes, TMDBSeries } from '@/@types/series'
import { CastProps } from '@/@types/movie/cast'
import { MovieTMDB } from '@/@types/Cards'

class TMDBService {
  private episodeDataCache = new Map<string, TMDBEpisodes[]>()
  /**
   * Método para chamada da API do TMDB. Parâmetro type distingue entre filmes e séries. Aceita o parametro imageType que determina o que deve ser buscado.
   * @param tmdbID ID do filme no TMDB
   * @param type movie (filme) | tv (serie)
   * @param imageType Tipo de imagem para busca -> backdrop imagem larga | poster: imagem alta
   * @param cast Booleano que define o retorno do elenco.
   * @param season Number que define o retorno do elenco de acordo com a season.
   * @returns Retorna o caminho da imagem, o objeto com as informações gerais do filme no TMDB, as informações sobre o elenco do filme ou série, ou null em caso de erro.
   */
  private async fetchTMDBData<T>(
    tmdbID: number,
    type: 'movie' | 'tv',
    imageType: 'backdrop' | 'poster' | 'details' = 'details',
    cast: boolean = false,
    season?: number,
  ): Promise<T | null> {
    if (tmdbID === 0) throw new Error('TMDBID inválido.')

    let endPoint = `/${type}/${tmdbID}`
    if (cast) {
      endPoint =
        season && season > 0
          ? `/${type}/${tmdbID}/season/${season}/credits`
          : `/${type}/${tmdbID}/credits`
    }

    try {
      const response = await apiTMDB.get(endPoint)

      if (type === 'movie') {
        if (imageType === 'backdrop')
          return `https://image.tmdb.org/t/p/original${response.data.backdrop_path}` as unknown as T
        if (imageType === 'poster')
          return `https://image.tmdb.org/t/p/w500${response.data.poster_path}` as unknown as T
        return response.data
      }
      return response.data
    } catch (err: any) {
      debug.error(`Erro ao buscar dados do ${type}`, err)
      return null
    }
  }
  /**
   * Busca detalhes de um filme.
   * @param tmdbID ID do filme no TMDB.
   * @returns Dados do filme ou null em caso de erro.
   */
  public async fetchMovieDetails(tmdbID: number): Promise<MovieTMDB | null> {
    return this.fetchTMDBData<MovieTMDB>(tmdbID, 'movie', 'details')
  }

  /**
   * Busca informações do elenco de um filme.
   * @param tmdbID ID do filme no TMDB.
   * @returns Dados do elenco ou null em caso de erro.
   */

  public async fetchMovieCast(tmdbID: number): Promise<CastProps | null> {
    return this.fetchTMDBData<CastProps>(tmdbID, 'movie', 'details', true)
  }
  /**
   * Busca a imagem de fundo de um filme.
   * @param tmdbID ID do filme no TMDB
   * @returns URL da imagem de fundo ou null em caso de erro
   */

  public async fetchMovieBackDrop(tmdbID: number): Promise<string | null> {
    return this.fetchTMDBData<string>(tmdbID, 'movie', 'backdrop')
  }
  /**
   * Busca a imagem do pôster de um filme.
   * @param tmdbID ID do filme no TMDB
   * @returns URL do pôster ou null em caso de erro
   */

  public async fetchMoviePoster(tmdbID: number): Promise<string | null> {
    return this.fetchTMDBData<string>(tmdbID, 'movie', 'poster')
  }

  /**
   * Busca detalhes de uma série.
   * @param tmdbID ID da série no TMDB.
   * @returns Dados da série ou null em caso de erro.
   */
  public async fetchSeriesDetails(tmdbID: number): Promise<TMDBSeries | null> {
    return this.fetchTMDBData<TMDBSeries>(tmdbID, 'tv', 'details')
  }

  /**
   * Busca informações do elenco de uma série.
   * @param tmdbID ID da série no TMDB.
   * @returns Dados do elenco ou null em caso de erro.
   */

  public async fetchSeriesCast(tmdbID: number): Promise<CastProps | null> {
    return this.fetchTMDBData<CastProps>(tmdbID, 'tv', 'details', true)
  }

  public async fetchSeriesAggregatedCast(tmdbID: number): Promise<CastProps | null> {
    if (tmdbID === 0) return null

    try {
      const response = await apiTMDB.get(`/tv/${tmdbID}/aggregate-credits`)
      return response.data
    } catch (err) {
      debug.error('Erro ao buscar elenco agregado da série', err)
      return null
    }
  }

  /**
   * Busca os dados sobre o elenco de uma temporada.
   * @param tmdbID ID da Série no TMDB
   * @param season número da season no TMDB
   * @returns Dados do elenco da série de acordo com o TMDB ou null em caso de erro
   */

  public async fetchSeriesCastBySeason(tmdbID: number, season: number): Promise<CastProps | null> {
    return this.fetchTMDBData<CastProps>(tmdbID, 'tv', 'details', true, season)
  }
  /**
   * Busca informações de um episódio.
   * @param tmdbID Id da serie no TMDB
   * @param season Número da Temporada do episódio
   * @returns Retorna um objeto com as informações do episódio.
   */

  public async fetchEpisodeData(tmdbID: number, season: number): Promise<TMDBEpisodes[] | null> {
    if (tmdbID === 0) return null

    const endPoint = `/tv/${tmdbID}/season/${season}`

    try {
      const response = await apiTMDB.get(endPoint)
      return response.data.episodes
    } catch (err) {
      debug.error('Erro ao buscar imagens dos episódios', err)
      return null
    }
  }

  /**
   * Busca os episódios de uma temporada com cache em memória por sessão.
   * Resultados válidos são cacheados; falhas retornam null e podem ser re-tentadas.
   */
  public async getEpisodeDataCached(
    tmdbID: number,
    season: number,
  ): Promise<TMDBEpisodes[] | null> {
    if (tmdbID === 0) return null

    const cacheKey = `${tmdbID}-${season}`
    const cached = this.episodeDataCache.get(cacheKey)

    if (cached) return cached

    const episodes = await this.fetchEpisodeData(tmdbID, season)

    if (episodes && episodes.length > 0) {
      this.episodeDataCache.set(cacheKey, episodes)
    }

    return episodes
  }

  /**
   * Busca dados de uma coleção de filmes.
   * @param name nome da coleção
   * @returns Retorna informações sobre a coleção
   */

  public async fetchCollection(name: string): Promise<ResultsProps[] | null> {
    try {
      const response = await apiTMDB<CollectionProps>(`/collection/${name}`)
      return response.data.results
    } catch (err) {
      debug.error('Erro ao buscar dados da coleção', err)
      return null
    }
  }
  /**
   * Busca os dados de trailers de uma série ou filme.
   * @param tmdbId id do título
   * @param type tipo do título: tv | movie
   * @returns retorna id do título e um array com os trailers disponíveis
   */

  public async fetchTrailer(tmdbId: number, type: 'tv' | 'movie'): Promise<TrailerProps | null> {
    try {
      const response = await apiTMDB<TrailerProps>(`/trailer/${type}/${tmdbId}`)
      return response.data
    } catch (err) {
      debug.error('Erro ao buscar o trailer.', err)
      return null
    }
  }

  /*async getTrendingMovies() {
        try {

        } catch (err) {
            debug.error("Erro ao buscar trendingMovies", err)
            return null
        }
    }*/
}

export const tmdb = new TMDBService()
