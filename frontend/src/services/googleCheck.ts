import { debug } from '@/classes/DebugLogger';
import { mongoService } from '@/classes/MongoContent';
//import { cards } from '@/data/cards';
//import { series } from '@/data/series';
import { google } from 'googleapis';

export interface ErrorProps {
    tmdbId: number,
    title: string,
    subtitle: string,
    src: string,
    season?: number
}


export async function checkDriveFile(fileId: string) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!API_KEY) return debug.error("Variável de ambiente não definida")
    try {
        const drive = google.drive({ version: 'v3', auth: API_KEY });

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

export function extractFileId(url: string): string | null {
    const match = url.match(/\/d\/(.*?)(\/|$)/);
    return match ? match[1] : null;
}


export async function verifyAllDataFiles() {
    let errors: ErrorProps[] = []
    let count = 0;
    const mongoMovies = await mongoService.fetchMovieData()
    const requests = mongoMovies.map(async (card) => {
        const id = extractFileId(card.src)
        if (id) {

            try {
                count++;
                const result = await checkDriveFile(id)
                if (result?.code !== 200) {
                    debug.error(`Erro com o arquivo. ${card.tmdbId}`)
                    errors.push({
                        tmdbId: card.tmdbId,
                        title: card.title,
                        subtitle: card.subtitle,
                        src: card.src
                    })
                }
            } catch (err: any) {
                debug.error(`Erro com o arquivo: ${card.tmdbId}`, err)
            }

        } else {
            debug.log(`Erro com o id da url ${card.tmdbId}`)
        }
    })
    await Promise.allSettled(requests)
    debug.log(`Verificação concluída. ${count} arquivos testados.`)
    return errors;
}
export async function verifySerieDataFiles() {
    let errors: ErrorProps[] = []
    let count = 0;
    const mongoSeries = await mongoService.fetchSerieData()
    const requests = mongoSeries.map(async (card) => {
        const promiseSeasons = card.season.flatMap((season) => {
            return season.episodes.map(async (episode) => {
                const id = extractFileId(episode.src)
                if (id) {

                    try {
                        count++;
                        const result = await checkDriveFile(id)
                        if (result?.code !== 200) {
                            debug.error(`Erro com o arquivo. ${card.tmdbID}`)
                            errors.push({
                                tmdbId: card.tmdbID,
                                title: card.title,
                                subtitle: card.subtitle,
                                season: season.s,
                                src: episode.src
                            })
                        }
                    } catch (err: any) {
                        debug.error(`Erro com o arquivo: ${card.tmdbID}`, err)
                    }

                } else {
                    debug.error(`Erro com o id da url ${card.tmdbID}`)
                }
            })
        })
        return Promise.allSettled(promiseSeasons)
    })
    await Promise.allSettled(requests)
    debug.log(`Verificação concluída. ${count} arquivos testados.`)
    return errors;
}
/*testes
const driveUrl = 'https://drive.google.com/file/d/1r3xhEZkpcATQnPiGImc_guRay6tnfdTr/preview';
const fileId = extractFileId(driveUrl);

if (fileId) {
    checkDriveFile(fileId);
} else {
    console.log('❗ ID do arquivo não encontrado no link.');
}*/