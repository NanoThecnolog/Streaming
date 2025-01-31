import { CardsProps } from "@/@types/Cards";
import { SeriesProps } from "@/@types/series";
import { normalizing } from "./UtilitiesFunctions";

export const matches = (input: string, genre: string, streaming: string, faixa: string, item: CardsProps | SeriesProps): boolean => {
    const normalizedInput = normalizing(input)
    const normalizedTitle = normalizing(item.title).toLowerCase()
    const normalizedSubtitle = normalizing(item.subtitle).toLowerCase()
    const matchesTitle = !input || normalizedTitle.includes(normalizedInput) || normalizedSubtitle.includes(normalizedInput);
    const matchesGenre = !genre || item.genero.some((g) => g.toLowerCase() === genre.toLowerCase());
    const matchesStreaming = !streaming || item.genero.some((g) => g.toLowerCase() === streaming.toLowerCase());
    const matchesFaixa = !faixa || item.faixa.toLowerCase() === faixa.toLowerCase();
    return matchesTitle && matchesGenre && matchesStreaming && matchesFaixa;
}