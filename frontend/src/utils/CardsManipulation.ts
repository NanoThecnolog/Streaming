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

const getRelatedItems = <T>(reference: T, items: T[], popularityById: ReadonlyMap<number, number>, config: RecommendationConfig<T>): RelatedCard<T>[] => {
    const { getId, getTitle, getGenres, limit = 20 } = config

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

            const isRelatedTitle = (
                itemTitle.includes(referenceTitle) ||
                referenceTitle.includes(itemTitle)
            )

            const titleScore = (() => {
                if (isSameTitle) return 20
                if (isRelatedTitle) return 15
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