import { capitalize } from '@/utils/UtilitiesFunctions'
import styles from './styles.module.scss'
import { gen, stm } from '@/utils/Genres';
import { classification } from '@/utils/Variaveis';

interface FilterProps {
    title: string | null,
    genre: string | null,
    streaming: string | null,
    faixa: string | null

    setTitle: (e: string) => void;
    setGenre: (e: string) => void;
    setStreaming: (e: string) => void;
    setFaixa: (e: string) => void;

    handleFilter: () => void;
}

export default function Filter({ title, genre, streaming, faixa, setTitle, setGenre, setStreaming, setFaixa, handleFilter }: FilterProps) {
    const generos = Object.values(gen)
    const streamings = Object.values(stm)
    /*const faixas = [
        "L",
        "10",
        "A12",
        "A14",
        "A16",
        "18"
    ]*/
    const faixas = classification.map((c) => c.etaria)

    return (
        <div className={styles.container}>
            <form onSubmit={(e) => { e.preventDefault(); handleFilter }}>
                <div className={styles.filter}>
                    <label htmlFor="title">Nome</label>
                    <input
                        id="title"
                        type="text"
                        value={title || ''}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label htmlFor="Genre">Gênero</label>
                    <select
                        id='Genre'
                        title='Genero'
                        value={genre || ''}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value={''}>Selecionar</option>
                        {generos.map((gen, index) =>
                            <option key={index} value={gen}>{capitalize(gen)}</option>
                        )}
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="Company">Streaming</label>
                    <select
                        id='Company'
                        title='Streaming'
                        value={streaming || ''}
                        onChange={(e) => setStreaming(e.target.value)}
                    >
                        <option value={''}>Selecionar</option>
                        {streamings.map((strm, index) =>
                            <option key={index} value={strm}>{capitalize(strm)}</option>
                        )}
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="faixa">Faixa</label>
                    <select
                        id='faixa'
                        title='Faixa'
                        value={faixa || ''}
                        onChange={(e) => setFaixa(e.target.value)}
                    >
                        <option value={''}>Selecionar</option>
                        {faixas.map((fx, index) =>
                            <option key={index} value={fx}>{fx}</option>
                        )}
                    </select>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleFilter}>
                        Buscar
                    </button>
                </div>
            </form>
        </div>
    )
}