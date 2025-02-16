import { cards } from '@/data/cards'
import { series } from '@/data/series';
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
                src="/fundo-filmes.jpg"
            />
            <div className={styles.overlay_image}></div>
            <div className={styles.search_area_content}>
                <h2>Não achou o que procura?</h2>
                <p>Busque entre centenas de filmes e series a partir do nosso catálogo!</p>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(inputSearch) }} className={styles.input_area}>
                    <input
                        type="text"
                        placeholder="buscar Filme ou Série..."
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <CiSearch size={35} color="#242424" onClick={() => handleSearch(inputSearch)} />
                </form>
                <p className={styles.quantidades}>Atualmente temos {cards.length} filmes e {series.length} séries</p>
            </div>
        </div>
    )
}