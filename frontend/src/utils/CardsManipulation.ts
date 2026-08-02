import { CardsProps, MovieTMDB } from '@/@types/Cards'
import { SeriesProps, TMDBSeries } from '@/@types/series'

type RelatedCard<T> = T & {
    score: number
}

type RecommendationConfig<T> = {
    getId: (item: T) => number
    getTitle: (item: T) => string
    getGenres: (item: T) => string[]
    limit?: number
}

const HERO_GENRES = new Set([
    'dc',
    'marvel',
    'super heroi',
])

const TITLE_STOP_WORDS = new Set([
    'a',
    'as',
    'o',
    'os',
    'de',
    'da',
    'das',
    'do',
    'dos',
    'e',
    'em',
    'um',
    'uma',
    'the',
    'of',
    'and',
])

const normalizeText = (value: string): string => {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const getTitleKeywords = (title: string): Set<string> => {
    const words = normalizeText(title).split(' ')

    return new Set(
        words.filter(word => (
            word.length >= 3 &&
            !TITLE_STOP_WORDS.has(word)
        )),
    )
}

const getPopularityWeight = (popularity: number): number => {
    if (popularity <= 0) return 0

    return Math.min(Math.log10(popularity + 1), 2)
}

const getRelatedItems = <T>(
    reference: T,
    items: T[],
    popularityById: ReadonlyMap<number, number>,
    config: RecommendationConfig<T>,
): RelatedCard<T>[] => {
    const {
        getId,
        getTitle,
        getGenres,
        limit = 20,
    } = config

    const referenceId = getId(reference)
    const referenceTitle = normalizeText(getTitle(reference))
    const referenceKeywords = getTitleKeywords(referenceTitle)

    const referenceGenres = getGenres(reference).map(normalizeText)
    const referenceGenreSet = new Set(referenceGenres)
    const referenceFirstGenre = referenceGenres[0]

    return items
        .filter(item => getId(item) !== referenceId)
        .map(item => {
            const itemId = getId(item)
            const itemTitle = normalizeText(getTitle(item))
            const itemKeywords = getTitleKeywords(itemTitle)
            const itemGenres = getGenres(item).map(normalizeText)

            const isSameTitle = itemTitle === referenceTitle

            const isRelatedTitle = (
                itemTitle.includes(referenceTitle) ||
                referenceTitle.includes(itemTitle)
            )

            const matchingKeywords = [...referenceKeywords]
                .filter(keyword => itemKeywords.has(keyword))
                .length

            const sharedGenres = itemGenres.filter(genre => (
                referenceGenreSet.has(genre)
            ))

            const allReferenceGenresMatch = (
                referenceGenres.length > 0 &&
                sharedGenres.length === referenceGenres.length
            )

            const firstGenreMatches = (
                referenceFirstGenre !== undefined &&
                itemGenres[0] === referenceFirstGenre
            )

            const heroGenreMatches = sharedGenres.filter(genre => (
                HERO_GENRES.has(genre)
            )).length

            const popularity = popularityById.get(itemId) ?? 0

            const keywordCoverage = referenceKeywords.size > 0
                ? matchingKeywords / referenceKeywords.size
                : 0

            const containsFullTitle = (
                itemTitle.includes(referenceTitle) ||
                referenceTitle.includes(itemTitle)
            )

            const titleScore = (() => {
                if (isSameTitle) return 20
                if (containsFullTitle) return 15
                if (keywordCoverage === 1) return 12
                if (keywordCoverage >= 0.75) return 9
                if (keywordCoverage >= 0.5) return 6
                if (matchingKeywords > 0) return 3

                return 0
            })()

            const genreScore = (
                sharedGenres.length * 2 +
                (allReferenceGenresMatch ? 2 : 0) +
                (firstGenreMatches ? 1 : 0) +
                (heroGenreMatches * 2)
            )

            const similarityScore = titleScore + genreScore
            const popularityScore = getPopularityWeight(popularity)

            return {
                ...item,
                score: similarityScore + popularityScore,
                similarityScore,
            }
        })
        .filter(item => item.similarityScore > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ similarityScore, ...item }) => item as RelatedCard<T>)
}


const createPopularityMap = (
    items: Array<{ id: number; popularity?: number }>,
): Map<number, number> => {
    return new Map(
        items.map(item => [
            item.id,
            item.popularity ?? 0,
        ]),
    )
}

export const getRelatedCards = (
    movie: CardsProps,
    movies: CardsProps[],
    allData: MovieTMDB[],
): RelatedCard<CardsProps>[] => {
    if (!movie || !movies?.length) return []

    return getRelatedItems(
        movie,
        movies,
        createPopularityMap(allData ?? []),
        {
            getId: item => item.tmdbId,
            getTitle: item => item.title,
            getGenres: item => item.genero ?? [],
        },
    )
}

export const getRelatedSerieCards = (
    serie: SeriesProps,
    series: SeriesProps[],
    allData: TMDBSeries[],
): RelatedCard<SeriesProps>[] => {
    if (!serie || !series?.length) return []

    return getRelatedItems(
        serie,
        series,
        createPopularityMap(allData ?? []),
        {
            getId: item => item.tmdbID,
            getTitle: item => item.title,
            getGenres: item => item.genero ?? [],
        },
    )
}

export const filterCards = <T extends CardsProps | SeriesProps>(
    items: T[],
    section: string,
): T[] => {
    const normalizedSection = normalizeText(section)

    return items.filter(item => (
        item.genero?.some(genre => (
            normalizeText(genre) === normalizedSection
        ))
    ))
}






/*import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { SeriesProps, TMDBSeries } from "@/@types/series";

/**
 * Retorna uma lista de cards relacionados a um determinado filme com base na similaridade do título, dos gêneros e da popularidade no TMDB.
 * 
 * A função calcula uma pontuação para cada card, somando:
 * - 3 pontos se o título do card contém o título do filme de referência.
 * - 2 pontos se pelo menos uma palavra-chave do título do filme de referência estiver presente no título do card.
 * - Pontos equivalentes ao número de gêneros em comum, com um bônus de +1 se todos os gêneros coincidirem.
 * - 1 ponto extra se o primeiro gênero do card for o mesmo do filme de referência.
 * - Um peso de popularidade baseado nos dados do TMDB, normalizado entre 0 e 2, calculado como `Math.min(popularity / 100, 2)`.
 * 
 * @param movie Objeto do tipo `CardsProps` representando o filme de referência.
 * @param allData Array contendo os dados de filmes do TMDB.
 * @returns Um array contendo até 20 cards ordenados pela pontuação de similaridade em relação ao filme informado.
 *


export function getRelatedCards(movie: CardsProps, movies: CardsProps[], allData: MovieTMDB[]) {
    if (!movie || !allData) return []

    const relatedCards = movies
        .filter(card => card.tmdbId !== movie.tmdbId)
        .map(card => {
            //match por titulo inteiro, se for igual recebe 7 (3 é o original)
            const titleMatch = card.title.toLowerCase().includes(movie.title.toLowerCase()) ? 5 : 0;
            //match por palavras contidas no titulo, se conter alguma palavra recebe 1
            const titleKeyWords = movie.title.toLowerCase().split(" ");
            const titleKeyMatch = titleKeyWords.some(word => card.title.toLowerCase().includes(word)) ? 1 : 0;
            //match por genero, recebe a quantidade de generos iguais
            const commonGenres = card.genero.filter((genre: string) => movie.genero.includes(genre)).length;
            //recebe a quantidade de genero iguais + 2 se tiver todos iguais
            const genreScore = commonGenres > 0
                ? commonGenres + (commonGenres === movie.genero.length
                    ? 2
                    : commonGenres < movie.genero.length ? 1 : 0)
                : 0;
            //recebe 1 ponto se o primeiro genero for igual
            const firstGenreMatchScore = commonGenres > 0
                ? (movie.genero[0] === card.genero[0]
                    ? 1 : 0)
                : 0;
            // recebe 2 pontos se os dois possuem genero dc, marvel ou super heroi
            const sharedGenres = card.genero.filter((gen: string) => movie.genero.includes(gen))
            const heroGenres = ['dc', 'marvel', 'super herói']
            const pointsPerShared = sharedGenres.length > 0
                ? sharedGenres.reduce((acc, genre) => {
                    if (heroGenres.includes(genre)) acc += 2
                    return acc
                }, 0)
                : 0


            // compara a popularidade do filme no TMDB
            const cardData = allData.find(mov => mov.id === card.tmdbId)
            const cardPopularity = cardData?.popularity || 0;
            //quanto mais popular, mais nota ganha (escala de 0 - 2)
            const popularityWeight = Math.min(cardPopularity / 100, 2)
            const score = Number((titleMatch + titleKeyMatch + genreScore + firstGenreMatchScore + popularityWeight + pointsPerShared).toFixed(3))

            return {
                ...card,
                score,
            };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 20)
    return relatedCards
}

export function getRelatedSerieCards(serie: SeriesProps, series: SeriesProps[], allData: TMDBSeries[]) {
    //debug.log(serie, series, allData)
    if (!serie || !allData) return []

    const relatedCards = series
        .filter(card => card.tmdbID !== serie.tmdbID)
        .map(card => {
            //match por titulo inteiro, se for igual recebe 3
            const titleMatch = card.title.toLowerCase().includes(serie.title.toLowerCase()) ? 3 : 0
            //match por palavras contidas no titulo, se conter alguma palavra recebe 1
            const titleKeyWords = serie.title.toLowerCase().split(" ")
            const titleKeyMatch = titleKeyWords.some(word => card.title.toLowerCase().includes(word)) ? 1 : 0
            //match por genero, recebe a quantidade de generos iguais
            const commonGenres = card.genero.filter((genre: string) => serie.genero.includes(genre)).length
            //recebe a quantidade de genero iguais + 2 se tiver todos iguais
            const genreScore = commonGenres > 0 ? commonGenres + (commonGenres === serie.genero.length ? 2
                : commonGenres < serie.genero.length ? 1 : 0) : 0
            //recebe 1 ponto se os primeiros generos forem iguais
            const firstGenreMatchScore = commonGenres > 0 ? (serie.genero[0] === card.genero[0] ? 0 : 0) : 0

            // recebe 2 pontos se os dois possuem genero dc, marvel ou super heroi
            const sharedGenres = card.genero.filter((gen: string) => serie.genero.includes(gen))
            const heroGenres = ['dc', 'marvel', 'super herói']
            const pointsPerShared = sharedGenres.length > 0
                ? sharedGenres.reduce((acc, genre) => {
                    if (heroGenres.includes(genre)) acc += 2
                    return acc
                }, 0)
                : 0

            // compara a popularidade do filme no TMDB
            const cardData = allData.find(mov => mov.id === card.tmdbID)
            const cardPopularity = cardData?.popularity || 0
            //quanto mais popular, mais nota ganha (escala de 0 - 2)
            const popularityWeight = Math.min(cardPopularity / 100, 2)
            const score = Number((titleMatch + titleKeyMatch + genreScore + firstGenreMatchScore + popularityWeight + pointsPerShared).toFixed(3))

            return {
                ...card,
                score,
            };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 20)
    return relatedCards
}


export function filterCards<T extends CardsProps | SeriesProps>(items: T[], section: string): T[] {
    return items.filter(item => item.genero.some(gen => gen.toLowerCase() === section.toLowerCase()))
}*/