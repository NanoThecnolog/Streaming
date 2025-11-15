import { debug } from '@/classes/DebugLogger';
import { mongoService } from '@/classes/MongoContent';
//import { cards } from '@/data/cards';
//import { series } from '@/data/series';
import { google } from 'googleapis';
import pLimit from 'p-limit'

export interface ErrorProps {
    tmdbId: number,
    title: string,
    subtitle: string,
    src: string,
    season?: number,
    episode?: number
}

class Drive {
    private apiKey
    private limit = pLimit(20)
    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        if (this.apiKey) debug.error("Google Key não definida.")
    }

    public extractFileId(url: string): string | null {
        const match = url.match(/\/d\/(.*?)(\/|$)/);
        return match ? match[1] : null;
    }
    public async checkFile(fileId: string) {
        try {
            const drive = google.drive({ version: 'v3', auth: this.apiKey });

            const file = await drive.files.get({
                fileId,
                fields: 'id, name, mimeType, shared'
            });
            //debug.log("função checkdrivefile", file)

            return {
                code: 200,
                response: file.data
            }

        } catch (err: any) {
            if (err.response?.status === 404) {
                return {
                    code: 404,
                    message: '❌ Arquivo não encontrado ou não compartilhado!',
                    error: err.response
                };
            } else if (err.response?.status === 403) {
                return {
                    code: 403,
                    message: '🔒 Arquivo privado!',
                    error: err.response
                }
            } else {
                return {
                    code: err.response.status,
                    message: 'Erro desconhecido',
                    error: err
                }
            }
        }
    }

    public async verifyAllDataFiles() {
        let errors: (ErrorProps | null)[] = []
        let count = 0;
        const mongoMovies = await mongoService.fetchMovieData()
        const allChecks = mongoMovies.map(card =>
            this.limit(async () => {
                const id = this.extractFileId(card.src)
                if (!id) {
                    debug.error(`Erro com o id da url: ${card.src}, do card: ${card.tmdbId}`)
                    return null
                }

                try {
                    count++
                    debug.log(`testando o card ${card.tmdbId}`, count)
                    const result = await this.checkFile(id)
                    if (result?.code !== 200) {
                        debug.error(`Erro com o arquivo. ${card.tmdbId}`)
                        return {
                            tmdbId: card.tmdbId,
                            title: card.title,
                            subtitle: card.subtitle,
                            src: card.src
                        } as ErrorProps
                    }
                } catch (err) {
                    debug.error(`Erro com o arquivo: ${card.tmdbId}`, err)
                }

                return null
            })
        )
        const results = await Promise.allSettled(allChecks)

        results
            .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
            .forEach(r => {
                debug.error("Erro numa verificação: ", r.reason)
            })

        const filteredErrors = results
            .filter((r): r is PromiseFulfilledResult<ErrorProps | null> => r.status === 'fulfilled' && r.value !== null)
            .map(r => r.value)

        errors.push(...filteredErrors)
        debug.log(`Verificação concluída. ${count} arquivos testados.`)
        return errors;
    }

    public async verifySerieDataFiles() {
        let count = 0;
        const errors: (ErrorProps | null)[] = [];
        const mongoSeries = await mongoService.fetchSerieData();

        const allChecks = mongoSeries.flatMap((card) => {
            return card.season.flatMap((season) => {
                return season.episodes.map((episode) =>
                    this.limit(async () => {
                        const id = this.extractFileId(episode.src);
                        if (!id) {
                            debug.error(`Erro com o id da url ${card.tmdbID}`);
                            return null;
                        }
                        try {
                            count++;
                            debug.log(`testando ${episode.ep} da temporada ${season.s} da serie ${card.title}`, count)
                            const result = await this.checkFile(id);
                            if (result?.code !== 200) {
                                debug.error(`Erro com o arquivo. ${card.tmdbID}`);
                                return {
                                    tmdbId: card.tmdbID,
                                    title: card.title,
                                    subtitle: card.subtitle,
                                    season: season.s,
                                    src: episode.src,
                                    episode: episode.ep
                                } as ErrorProps;
                            }
                        } catch (err) {
                            debug.error(`Erro com o arquivo: ${card.tmdbID}`, err);
                        }

                        return null;
                    })
                );
            });
        });

        const results = await Promise.allSettled(allChecks);

        results
            .filter((r) => r.status === 'rejected')
            .forEach(r => {
                debug.error("Erro numa verificação: ", r.reason)
            })

        const filteredErrors = results
            .filter((r): r is PromiseFulfilledResult<ErrorProps | null> => r.status === 'fulfilled' && r.value !== null)
            .map(r => r.value)

        errors.push(...filteredErrors);

        debug.log(`Verificação concluída. ${count} arquivos testados. ${errors.length} Erros encontrados.`);
        return errors;
    }
}

export const drive = new Drive()