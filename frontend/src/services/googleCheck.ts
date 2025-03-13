import { debuglog } from '@/utils/UtilitiesFunctions';
import { google } from 'googleapis';

export async function checkDriveFile(fileId: string) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!API_KEY) return console.log("Variável de ambiente não definida")
    try {
        const drive = google.drive({ version: 'v3', auth: API_KEY });

        const file = await drive.files.get({
            fileId,
            fields: 'id, name, mimeType, shared'
        });
        debuglog("função checkdrivefile", file)

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
/*testes
const driveUrl = 'https://drive.google.com/file/d/1r3xhEZkpcATQnPiGImc_guRay6tnfdTr/preview';
const fileId = extractFileId(driveUrl);

if (fileId) {
    checkDriveFile(fileId);
} else {
    console.log('❗ ID do arquivo não encontrado no link.');
}*/