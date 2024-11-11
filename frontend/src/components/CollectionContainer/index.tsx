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
        'O Cavaleiro das Trevas'
    ]
    useEffect(() => {
        if (cardPerContainer) {
            setCardsPerPage(cardPerContainer)
        }
    }, [cardPerContainer])


    useEffect(() => {
        fetchCollectionData()
    }, [])

    async function fetchCollectionData() {
        try {

            const promises = collectionsName.map(collection => fetchCollection(collection))
            const results = await Promise.all(promises)

            const resultados = results.filter((result): result is ResultsProps[] => result !== null).flat()
            //console.log("resultados: ", resultados)

            const colecao = new Set(collections.map(card => card.id))
            //console.log("colecao: ", colecao)

            const filtrados = resultados.filter(result => colecao.has(result.id))
            setResultados(filtrados)

        } catch (err) {
            console.error(err)
        }
    }
    function nextPage() {
        if (currentIndex + 1 < resultados.length) {
            if (currentIndex < currentIndex + cardsPerPage) {

            }
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