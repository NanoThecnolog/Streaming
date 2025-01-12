import axios from "axios"
import { MovieTMDB } from "@/@types/Cards"
import { TMDBSeries } from "@/@types/series";
import { TMDBEpisodes } from "@/@types/series"
import { apiTMDB } from "./apiTMDB";
import { CollectionProps, ResultsProps } from "@/@types/collection";
import { CastProps } from "@/@types/cast";
import { useState } from "react";
import { useTMDB } from "@/contexts/TMDBContext";

const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN;


if (!tmdbToken) {
    console.log("Variável de ambiente TMDB não definida")
}

/**
 * Função de centralização de lógica para chamada à API do TMDB. Parâmetro type distingue entre filmes e séries. Aceita o parametro imageType que determina o que deve ser buscado.
 * @param tmdbID ID do filme no TMDB
 * @param type movie (filme) | tv (serie)
 * @param imageType Tipo de imagem para busca -> backdrop imagem larga | poster: imagem alta
 * @param cast Booleano que define o retorno do elenco.
 * @returns Retorna o caminho da imagem, o objeto com as informações gerais do filme no TMDB, as informações sobre o elenco do filme ou série, ou null em caso de erro.
 */
async function fetchTMDBData<T>(tmdbID: number, type: 'movie' | 'tv', imageType: 'backdrop' | 'poster' | 'details' = 'details', cast: boolean = false): Promise<T | null> {
    if (!tmdbToken || tmdbID === 0) throw new Error("TMDBID ou TMDBToken inválidos.");

    const baseUrl = type === 'movie' ? 'https://api.themoviedb.org/3/movie/' : 'https://api.themoviedb.org/3/tv/';
    const language = 'pt-BR';
    //const endPoint = `${baseUrl}${tmdbID}?language=${language}${imageType !== 'details' ? '/images' : ''}`;    
    let endPoint2 = `/${type}/${tmdbID}`;
    if (cast) {
        endPoint2 = `/${type}/${tmdbID}/credits`;
    }


    try {
        const response = await apiTMDB.get(endPoint2);

        if (type === 'movie') {
            if (imageType === 'backdrop') {
                return `https://image.tmdb.org/t/p/original${response.data.backdrop_path}` as unknown as T
            } else if (imageType === 'poster') {
                return `https://image.tmdb.org/t/p/original${response.data.poster_path}` as unknown as T
            } else {
                return response.data; // Retorna dados do filme
            }
        } else { // type === 'tv'
            return response.data; // Retorna dados da série
        }
    } catch (err: any) {
        console.error(`Erro ao buscar ${type === 'movie' ? (imageType === 'details' ? 'dados do filme' : `${imageType} do filme`) : 'dados da série'}`, err?.response?.data?.error);
        return null;
    }
}

/**
 * Busca a imagem de fundo do filme a partir do ID do TMDB.
 * @param tmdbID ID do filme no TMDB
 * @returns URL da imagem de fundo ou null em caso de erro
 */
export async function fetchTMDBBackDrop(tmdbID: number): Promise<string | null> {
    return fetchTMDBData<string>(tmdbID, 'movie', 'backdrop');
}

/**
 * Busca os detalhes do filme a partir do ID do TMDB.
 * @param tmdbID ID do filme no TMDB
 * @returns Dados do filme ou null em caso de erro
 */
export async function fetchTMDBMovie(tmdbID: number): Promise<MovieTMDB | null> {
    return fetchTMDBData<MovieTMDB>(tmdbID, 'movie', 'details');
}
export async function fetchTMDBMovieCast(tmdbID: number): Promise<CastProps | null> {
    return fetchTMDBData<CastProps>(tmdbID, 'movie', 'details', true);
}

/**
 * Busca a imagem do pôster do filme a partir do ID do TMDB.
 * @param tmdbID ID do filme no TMDB
 * @returns URL do pôster ou null em caso de erro
 */
export async function fetchTMDBPoster(tmdbID: number): Promise<string | null> {
    return fetchTMDBData<string>(tmdbID, 'movie', 'poster');
}

/**
 * Busca os detalhes da série a partir do ID do TMDB.
 * @param tmdbID ID da série no TMDB
 * @returns Dados da série ou null em caso de erro
 */
export async function fetchTMDBSeries(tmdbID: number): Promise<TMDBSeries | null> {
    return fetchTMDBData<TMDBSeries>(tmdbID, 'tv', 'details');
}

/**
 * Busca informações do episódio (id, nome, overview, still_path, vote_average)
 * @param tmdbID Id do episódio no TMDB
 * @param season Número da Temporada do episódio
 * @returns Retorna um objeto com as informações do episódio.
 */

export async function fetchEpisodeData(tmdbID: number, season: number): Promise<TMDBEpisodes[] | null> {
    const tmdbToken = process.env.NEXT_PUBLIC_TMDB_TOKEN
    if (!tmdbToken) {
        console.warn("Variável de ambiente TMDB não definida.")
        return null
    }
    if (tmdbID === 0) return null
    const tmdbUrl = 'https://api.themoviedb.org/3/tv/'
    const language = 'pt-BR'
    const endPoint = `${tmdbUrl}${tmdbID}/season/${season}?language=${language}`

    try {
        const response = await axios.get(endPoint, {
            headers: {
                Authorization: `Bearer ${tmdbToken}`
            }
        })
        return response.data.episodes
    } catch (err) {
        console.error("Erro ao buscar imagens dos episódios", err)
        return null
    }
}

export async function fetchCollection(name: string): Promise<ResultsProps[] | null> {
    try {
        const response = await apiTMDB<CollectionProps>(`/collection/${name}`)
        return response.data.results
    } catch (err) {
        console.error("Erro ao buscar dados da coleção")
        return null
    }
}