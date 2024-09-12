import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Router from "next/router";
import styles from './styles.module.scss'
import { useState } from "react";

interface HeaderProps {
    handleSearching?: (movie: string) => void;
}

export default function Header({ handleSearching }: HeaderProps) {
    const [searchInput, setSearchInput] = useState<string>('')

    function handleSearch(input: string) {
        const search = new URLSearchParams({ input: input });
        if (handleSearching) {
            handleSearching(input)
        }
        Router.push(`/search?${search.toString()}`);
    }
    function handleUserClick() {
        Router.push('/me');

    }
    return (
        <div className={styles.header}>
            <div className={styles.brand} onClick={() => Router.push('/')}>
                <h1 className={styles.red}>FLiX</h1>
                <h1 className={styles.white}>NEXT</h1>
            </div>
            <div className={styles.main_nav}>
                <Link href="/" className={styles.button_container}>
                    <h2>INÍCIO</h2>
                </Link>
                <Link href="#ação" className={styles.button_container}>
                    <h2>FILMES</h2>
                </Link>

                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Procure aqui seu filme"
                    className={styles.searchInput}
                />

                <div className={styles.button_container} onClick={() => handleSearch(searchInput)}>
                    <h2><CiSearch size={35} color="#fff" /></h2>
                </div>
            </div>
            <div className={styles.right_nav}>
                <div className={styles.button_container} onClick={handleUserClick}>
                    <FaUserCircle size={35} className={styles.loginIcon} />
                </div>
            </div>
        </div>
    )
}