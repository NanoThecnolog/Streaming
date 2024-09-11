import { cards } from '@/js/cards'
import { CardsProps } from '@/@types/Cards';
import Card from '../Card';
import { useState } from 'react'
import { CiSearch } from "react-icons/ci";

interface SearchProps {
    handleOpenModal: () => void;
}

export default function Search({ handleOpenModal }: SearchProps) {
    const [inputSearch, setInputSearch] = useState<string>("")
    const [resultado, setResultado] = useState<CardsProps[] | null>(null)
    const [resultsVisible, setResultsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    function Search() {
        setLoading(true)
        try {
            const valueLower = inputSearch.toLowerCase();
            const searchResult: CardsProps[] = cards.filter(card =>
                card.title.toLowerCase().includes(valueLower) ||
                (card.subtitle && card.subtitle.toLowerCase().includes(valueLower)) ||
                card.genero.some(gen => gen.toLowerCase().includes(valueLower))
            )
            setResultado(searchResult);
        } finally {
            setLoading(false)
            setResultsVisible(true)
        }
    }
    return (
        <div className="search-area" id="buscar">
            <div className="search-area-content">
                <h2>Não achou o que procura?</h2>
                <p>Busque entre centenas de títulos a partir do nosso catálogo!</p>
                <div className="input-area">
                    <input
                        type="text"
                        placeholder="buscar Título..."
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <CiSearch size={35} color="#fff" onClick={() => Search} />
                </div>
            </div>
            {loading && (
                <div>
                    {/**Fazer a lógica pra mostrar o loading */}
                </div>
            )}
            {resultsVisible && resultado !== null && resultado.map((card, index) => (

                <div key={index} className="content-area-busca invisivel">
                    <h2 className="content-title">BUSCA</h2>
                    <div className="card-carousel" id="buscas">
                        <Card
                            modalWatchLater={handleOpenModal}
                            section={card.genero[0]}
                            card={card}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}