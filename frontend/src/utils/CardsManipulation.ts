import { CardsProps } from "@/@types/Cards";
import { cards } from "@/data/cards";

/**
 * Retorna uma lista de cards relacionados a um determinado filme com base na similaridade do título e dos gêneros.
 * A função calcula uma pontuação para cada card, somando:
 * - 2 pontos se o título do card contém o título do filme de referência.
 * - Pontos equivalentes ao número de gêneros em comum, com um bônus de +1 se todos os gêneros coincidirem.
 * 
 * @param movie Objeto do tipo `CardsProps` representando o filme de referência.
 * @returns Um array contendo até 20 cards ordenados pela pontuação de similaridade em relação ao filme informado.
 */


export function getRelatedCards(movie: CardsProps) {
    if (movie) {
        const relatedCards = cards
            .filter(card => card.tmdbId !== movie.tmdbId)
            .map(card => {
                const titleMatch = card.title.toLowerCase().includes(movie.title.toLowerCase()) ? 2 : 0;
                const commonGenres = card.genero.filter((genre: string) => movie.genero.includes(genre)).length;
                const genreScore = commonGenres > 0 ? commonGenres + (commonGenres === movie.genero.length ? 1 : 0) : 0;

                return {
                    ...card,
                    score: titleMatch + genreScore,
                };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 20)
        return relatedCards
    }
}