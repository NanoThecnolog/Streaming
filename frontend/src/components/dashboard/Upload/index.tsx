import { useState } from 'react';
import styles from './styles.module.scss'
import { apiManager } from '@/services/apiManager';
import { debug } from '@/classes/DebugLogger';
import { headers } from 'next/headers';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [id, setId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [url, setUrl] = useState()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFile(file);
            const tmdbID = file.name.split('.')[0]
            //debug.log(tmdbID)
            setId(tmdbID)
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor, selecione um arquivo.');
            return;
        }

        if (file.type !== 'video/x-matroska') {
            setMessage('Apenas arquivos .mkv são permitidos.');
            return;
        }
        if (!id) {
            setMessage('Erro ao pegar o id do trailer.')
            return
        }


        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        setUploading(true);
        setMessage('');

        debug.log(file)

        try {
            const response = await apiManager.post('/trailer/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const data = response.data;
            debug.log(data)

            if (data) {
                setMessage(`Upload feito com sucesso! ID: ${data.video.id}`);
            } else {
                setMessage(`Erro: ${data.message || 'Falha no upload.'}`);
            }
        } catch (err) {
            debug.error(err)
            setMessage('Erro ao enviar o vídeo.');
        } finally {
            setUploading(false);
        }
    };

    const getTrailerURL = async () => {
        try {
            const response = await apiManager.get('/trailer/696506')
            debug.log(response)

        } catch (err) {
            debug.error(err)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.title}>Enviar vídeo .mkv</h2>
                <input
                    type="file"
                    accept=".mkv"
                    onChange={handleFileChange}
                    className={styles.input}
                />
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className={styles.button}
                >
                    {uploading ? 'Enviando...' : 'Enviar'}
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
            <div>
                {<button onClick={getTrailerURL}>buscar video</button>
                }
                {<video src='https://srv770983.hstgr.cloud/content/trailer/696506' controls width="100%" />
                }
            </div>
        </>
    )
}