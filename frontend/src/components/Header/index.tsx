import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Router from "next/router";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Image from "next/image";
import { AlignJustify, Search } from "lucide-react";
import { serverStatus } from "@/services/verifyStatusServer";
import { GetServerSideProps } from "next";
import { api } from "@/services/api";
import { Trykker } from "next/font/google";

interface HeaderProps {
    userAvatar?: string | undefined;
    status: { status: string }
}

export default function Header({ userAvatar, status }: HeaderProps) {
    const [searchInput, setSearchInput] = useState<string>('')
    const [menuvisible, setMenuVisible] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>('')
    const [searchMobileVisible, setSearchMobileVisible] = useState<boolean>(false)
    const [serverWake, setServerWake] = useState<boolean>(false)


    useEffect(() => {
        if (!userAvatar) return;
        setAvatar(userAvatar)
    }, [userAvatar])

    useEffect(() => {
        async function wakeUpServer() {
            try {
                const acordar = await api.get('/acordar');
                //console.log(acordar.data.status)
                setServerWake(true)
                return acordar
            } catch (err) {
                //console.log(err)
                setServerWake(false)
                return err
            }
        }
        wakeUpServer()
        const manterAcordado = setInterval(() => {
            wakeUpServer()
        }, 40000)
        return () => clearInterval(manterAcordado)
    }, [])

    function handleSearch(input: string) {
        const search = new URLSearchParams({ input: input });
        Router.push(`/search?${search.toString()}`);
    }
    function handleUserClick() {
        Router.push('/me');
    }
    function handleClickHome(id: number) {
        if (id === 1) {
            setMenuVisible(!menuvisible)
        }
        if (id === 2) {
            setSearchMobileVisible(!searchMobileVisible)
        }
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
                <Link href="/#ação" className={styles.button_container}>
                    <h2>FILMES</h2>
                </Link>
                <Link href="/series" className={styles.button_container}>
                    <h2>SERIES</h2>
                </Link>
                <form className={styles.formContainer} onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput); }}>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="buscar filme ou série"
                        className={styles.searchInput}
                    />

                    <div className={styles.button_container} onClick={() => handleSearch(searchInput)}>
                        <h2><CiSearch size={35} color="#fff" /></h2>
                    </div>
                </form>
            </div>
            <div className={styles.right_nav}>
                <div className={styles.status}>
                    <div
                        className={styles.bolinha}
                        style={{ backgroundColor: serverWake ? '#007714' : '#d42c2c' }}
                    ></div>
                    <p>status</p>
                </div>
                {avatar !== '' ? (
                    <div className={styles.avatarImage} title="Meu Perfil">
                        <Image src={avatar} alt="avatar" width={45} height={45} onClick={handleUserClick} />
                    </div>
                ) : <FaUserCircle size={35} color="#fff" className={styles.loginIcon} onClick={handleUserClick} />}
            </div>
            <div className={styles.dropdown}>
                <div className={styles.dropdownIcon} onClick={() => handleClickHome(1)}>
                    <AlignJustify />
                    {menuvisible &&
                        <div className={styles.dropdownMenu}>
                            <button type="button" onClick={() => Router.push('/#ação')}>filmes</button>
                            <div className={styles.divider}></div>
                            <button type="button" onClick={() => Router.push('/series')}>series</button>
                        </div>
                    }
                </div>
                <div className={styles.divider}></div>
                <div className={styles.dropdownIcon}>
                    <Search onClick={() => handleClickHome(2)} />
                    {searchMobileVisible &&
                        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput) }} className={styles.searchInputModal}>
                            <div>
                                <input
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Procure seu filme"
                                    className={styles.searchInput}
                                />
                            </div>
                            <div>
                                <Search onClick={() => handleSearch(searchInput)} />
                            </div>
                        </form>
                    }
                </div>
                <div className={styles.divider}></div>
                <div className={styles.dropdownIcon}>
                    {avatar !== '' ? (
                        <div className={styles.dropdownAvatarImage} title="Meu Perfil">
                            <Image src={avatar} alt="avatar" width={45} height={45} />
                        </div>
                    ) : <FaUserCircle size={35} className={styles.loginIcon} />}
                </div>
            </div>
        </div>
    )
}


