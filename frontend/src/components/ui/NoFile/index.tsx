import { MdArrowOutward } from 'react-icons/md'
import styles from './styles.module.scss'

interface NoFileProps {
    type: string
}

export default function NoFile({ type }: NoFileProps) {
    return (
        <div className={styles.noFileContainer}>
            <div className={styles.noFileTextContent}>
                <h1>Ops... Algo de errado com o arquivo do {type === 'serie' ? 'episódio!' : 'filme!'}</h1>
                <h2>Clique na flag no canto superior direito para reportar o problema</h2>
            </div>
            <div className={styles.noFileArrow}>
                <div>
                    <MdArrowOutward size={80} />
                </div>
                <div>
                    <p>
                        Clique aqui para reportar!
                    </p>
                </div>
            </div>
        </div>
    )
}