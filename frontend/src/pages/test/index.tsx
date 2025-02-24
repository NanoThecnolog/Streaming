import styles from './styles.module.scss'
import { apiGoogle } from '@/services/apiGoogle';

export default function TestPage() {

    async function handleClick() {
        alert('Parabéns, você sabe clicar num botão....')
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Página de testes</h1>
                <button onClick={handleClick}>Testar</button>
            </div>
        </div>
    )
}