//import { verifyAllDataFiles } from '@/services/googleCheck';
import { apiGoogle } from '@/services/apiGoogle'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'
import { ErrorProps } from '@/services/googleCheck';
import { useState } from 'react';

export default function TestPage() {
    const env = process.env.NEXT_PUBLIC_DEBUG
    const [errors, setErrors] = useState<ErrorProps[] | null>(null)
    const [type, setType] = useState<`movie` | `tv`>()
    const [loading, setLoading] = useState(false)

    async function verify(type: 'movie' | 'tv') {
        setType(type)
        if (loading) return
        setLoading(true)
        try {
            const verificar = await apiGoogle.get(`/verify?type=${type}`)
            const errors = verificar.data.data;

            debug.log(errors)
            setErrors(errors)
        } catch (err) {
            debug.error(err)
        } finally {
            setLoading(false)
        }
    }
    const downloadErrors = (errors: ErrorProps[]) => {
        const formatado = JSON.stringify(errors, null, 2)
        const blob = new Blob([formatado], { type: 'text/plain' })
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob)
        link.download = `errors_${type}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Página de testes</h1>
                {
                    env === 'development' &&
                    <>
                        <button onClick={() => verify(`movie`)}>{loading ? 'Testando...' : 'Testar filmes'}</button>
                        <button onClick={() => verify(`tv`)}>{loading ? 'Testando...' : 'Testar series'}</button>
                        {errors && errors.length > 0 ? <button onClick={() => downloadErrors(errors)}>baixar Erros</button> : ''}
                    </>
                }
            </div>
        </div>
    )
}