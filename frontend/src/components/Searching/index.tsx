import { cards } from '@/js/cards'
import { CardsProps } from '@/@types/Cards';
import Card from '../Card';
import { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import styles from './styles.module.scss'
import Image from 'next/image';
import Router from 'next/router';

interface SearchProps {
    handleOpenModal?: () => void;
}

export default function Search({ handleOpenModal }: SearchProps) {
    const [inputSearch, setInputSearch] = useState<string>("")
    const [resultado, setResultado] = useState<CardsProps[] | null>(null)
    const [resultsVisible, setResultsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleSearch(input: string) {
        const search = new URLSearchParams({ input: input });
        Router.push(`/search?${search.toString()}`);
    }
    return (
        <div className={styles.search_area}>
            <Image
                fill
                className={styles.image_Background}
                alt="FlixNext Busca"
                quality={35}
                sizes="100%"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F4839516.jpg&f=1&nofb=1&ipt=2e79e5199ed621f753a3ae7976946a4b8e950b904d2c0bf12ee1eb70107c8c0c&ipo=images"
            />
            <div className={styles.overlay_image}></div>
            <div className={styles.search_area_content}>
                <h2>Não achou o que procura?</h2>
                <p>Busque entre centenas de filmes a partir do nosso catálogo!</p>
                <div className={styles.input_area}>
                    <input
                        type="text"
                        placeholder="buscar Filme..."
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <CiSearch size={35} color="#242424" onClick={() => handleSearch(inputSearch)} />
                </div>
            </div>
        </div>
    )
}