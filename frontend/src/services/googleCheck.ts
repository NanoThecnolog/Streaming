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
    reason?: string
}

class Drive {
    private apiKey
    private limit = pLimit(20)
    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        if (!this.apiKey) debug.error("Google Key não definida.")
    }

    private decodeLink(link: string) {
        return decodeURIComponent(Array.isArray(link) ? link.join('/') : link)
    }

    private extractFileId(url: string): string | null {
        const decodedUrl = this.decodeLink(url)
        const match = decodedUrl.match(/\/d\/(.*?)(\/|$)/);
        return match ? match[1] : null;
    }

    public async checkFile(url: string) {
        const drive = google.drive({
            version: 'v3',
            auth: this.apiKey
        });
        const id = this.extractFileId(url)
        if (!id) throw new Error('Erro ao extrair id do arquivo')

        try {
            const { data } = await drive.files.get({
                fileId: id,
                fields: 'id, name, mimeType, shared'
            });
            //debug.log("função checkdrivefile", file)

            return {
                code: 200,
                shared: data.shared ?? false,
                response: data
            }

        } catch (err: any) {
            const status = err?.response?.status

            if (status === 404)
                throw new DriveFileError('FILE_NOT_FOUND')

            if (status === 403)
                throw new DriveFileError('FILE_PRIVATE')

            throw new DriveFileError('GOOGLE_DRIVE_ERROR')
        }
    }

    public async verifyAllDataFiles() {
        //let errors: (ErrorProps | null)[] = []
        //let count = 0;
        const mongoMovies = await mongoService.fetchMovieData()

        const allChecks = mongoMovies.map(card =>
            this.limit(async (): Promise<ErrorProps | null> => {
                try {
                    //count++
                    debug.log(`testando o card ${card.tmdbId}`)
                    await this.checkFile(card.src)
                    return null
                    /*
                    if (result?.code !== 200) {
                        debug.error(`Erro com o arquivo. ${card.tmdbId}`)
                        return {
                            tmdbId: card.tmdbId,
                            title: card.title,
                            subtitle: card.subtitle,
                            src: card.src
                        } as ErrorProps
                    }
                     */
                } catch (err: any) {
                    const reason = err?.message ?? 'UNKNOWN_ERROR'

                    debug.error(`Erro com o arquivo: ${card.tmdbId}`, reason)

                    return {
                        tmdbId: card.tmdbId,
                        title: card.title,
                        subtitle: card.subtitle,
                        src: card.src,
                        reason
                    }
                }
            })
        )

        const results = await Promise.all(allChecks)

        const errors = results.filter(
            (item): item is ErrorProps => item !== null
        )

        /*
        results
            .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
            .forEach(r => {
                debug.error("Erro numa verificação: ", r.reason)
            })

        const filteredErrors = results
            .filter((r): r is PromiseFulfilledResult<ErrorProps | null> => r.status === 'fulfilled' && r.value !== null)
            .map(r => r.value)

        errors.push(...filteredErrors)
        */
        debug.log(`Verificação concluída. ${results.length} arquivos testados. ${errors.length} erros encontrados`)
        return errors;
    }

    public async verifySerieDataFiles() {
        const mongoSeries = await mongoService.fetchSerieData()

        const checks = mongoSeries.flatMap(card =>
            card.season.flatMap(season =>
                season.episodes.map(episode =>
                    this.limit(async (): Promise<ErrorProps | null> => {
                        try {
                            await this.checkFile(episode.src)
                            return null
                        } catch (err: any) {
                            const reason = err?.message ?? 'UNKNOWN_ERROR'

                            debug.error(
                                `Erro no episódio ${episode.ep} | T${season.s} | ${card.title}`,
                                reason
                            )

                            return {
                                tmdbId: card.tmdbID,
                                title: card.title,
                                subtitle: card.subtitle,
                                season: season.s,
                                episode: episode.ep,
                                src: episode.src,
                                reason
                            }
                        }
                    })
                )
            )
        )

        const results = await Promise.all(checks)

        const errors = results.filter(
            (item): item is ErrorProps => item !== null
        )

        debug.log(
            `Verificação concluída. ${results.length} arquivos testados. ${errors.length} erros encontrados.`
        )

        return errors
        /*let count = 0;
        const errors: (ErrorProps | null)[] = [];
        const mongoSeries = await mongoService.fetchSerieData();

        const allChecks = mongoSeries.flatMap((card) => {
            return card.season.flatMap((season) => {
                return season.episodes.map((episode) =>
                    this.limit(async () => {

                        try {
                            count++;
                            debug.log(`testando ${episode.ep} da temporada ${season.s} da serie ${card.title}`, count)
                            const result = await this.checkFile(episode.src);
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
        return errors;*/
    }
}

export const drive = new Drive()

class DriveFileError extends Error {
    constructor(public readonly code: 'FILE_PRIVATE' | 'FILE_NOT_FOUND' | 'GOOGLE_DRIVE_ERROR') {
        super(code)
    }
}