import { fetchCollection } from '@/services/fetchTMDBData'
import styles from './styles.module.scss'
import { ResultsProps } from '@/@types/collection'
import { useEffect, useState } from 'react'
import CardCollection from './CardCollection'
import { collections } from '@/js/collections'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { useRouter } from 'next/router'

interface CollectionProps {
    cardPerContainer: number
}

export default function CollectionContainer({ cardPerContainer }: CollectionProps) {
    const router = useRouter()
    const [resultados, setResultados] = useState<ResultsProps[]>([])
    const [cardsPerPage, setCardsPerPage] = useState(cardPerContainer)
    const [currentIndex, setCurrentIndex] = useState(0)
    const collectionsName: string[] = [
        'harry potter',
        'missão impossível',
        'pânico',
        'divergente',
        'vingadores',
        'O Cavaleiro das Trevas',
        'O Senhor dos Anéis'
    ]
    useEffect(() => {
        if (cardPerContainer) {
            setCardsPerPage(cardPerContainer)
        }
    }, [cardPerContainer])


    useEffect(() => {
        fetchCollectionData()
    }, [])

    /**
 * Faz a requisição de dados das coleções, realizando as seguintes etapas:
 * 
 * 1. Mapeia os nomes das coleções da constante `collectionsName` e executa uma função de busca para cada nome.
 * 2. Filtra os resultados da requisição, descartando os valores `null`, e os organiza em um único array.
 * 3. Cria um `Set` contendo os IDs das coleções a partir da constante importada `collections`.
 * 4. Filtra os resultados da requisição, mantendo apenas os objetos cujo ID esteja presente no `Set` de IDs.
 * 5. Atualiza o estado `resultados` com os dados filtrados.
 * 
 * Em caso de erro, a função captura e exibe o erro no console.
 */

    async function fetchCollectionData() {
        try {
            const resultados = (await Promise.all(collectionsName.map(fetchCollection)))
                .flat()
                .filter((result): result is ResultsProps => result !== null)

            const colecaoIds = new Set(collections.map(({ id }) => id))
            setResultados(resultados.filter(({ id }) => colecaoIds.has(id)))
        } catch (err) {
            console.error(err)
        }
    }
    function nextPage() {
        if (currentIndex + 1 < resultados.length) {

            setCurrentIndex(currentIndex + 1)
        }
    }
    function prevPage() {
        if (currentIndex - 1 >= 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }
    function handleClick(collection: ResultsProps) {
        const collectionString = JSON.stringify(collection)
        router.push(`/colecao?collection=${collectionString}`)
    }
    return (
        <div className={styles.content_area}>
            <div className={styles.content_title}>
                <h3>
                    Coleções
                </h3>
            </div>
            <div className={styles.card_carousel}>
                <button className={styles.beforeButton} onClick={prevPage} disabled={currentIndex === 0}>
                    <MdNavigateBefore size={30} />
                </button>
                <button className={styles.nextButton} onClick={nextPage} disabled={currentIndex + cardsPerPage >= resultados.length}>
                    <MdNavigateNext size={30} />
                </button>
                <div className={styles.cardContainer}>
                    {resultados && resultados.slice(currentIndex, currentIndex + cardsPerPage).map(collection => (
                        <div className={styles.card} key={collection.id} onClick={() => handleClick(collection)}>
                            <CardCollection card={collection} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}