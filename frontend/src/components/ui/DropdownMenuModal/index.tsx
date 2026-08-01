import { UserContext } from '@/@types/user'
import styles from './styles.module.scss'
import Link from 'next/link'
import {
    FaListUl,
    FaSignInAlt,
    FaUserCircle,
} from 'react-icons/fa'
import { LogOut } from 'lucide-react'
import { IoCreate } from 'react-icons/io5'

interface Props {
    user: UserContext | null | undefined
    signOut: () => void
}

const DropdownMenuModal = ({ user, signOut }: Props) => {
    const userInitial =
        user?.name?.trim().charAt(0).toUpperCase() || 'U'

    return (
        <div
            className={styles.dropdownModal}
            role="menu"
            aria-label="Menu da conta"
        >
            {user && (
                <div className={styles.userInfo}>
                    <div className={styles.userInitial}>
                        {userInitial}
                    </div>

                    <div className={styles.userDetails}>
                        <strong>{user.name || 'Minha conta'}</strong>

                        {user.email && (
                            <span>{user.email}</span>
                        )}
                    </div>
                </div>
            )}

            <ul className={styles.menuList}>
                {user ? (
                    <>
                        <li>
                            <Link
                                href="/me"
                                className={styles.menuItem}
                                role="menuitem"
                            >
                                <span className={styles.icon}>
                                    <FaUserCircle size={18} />
                                </span>

                                <span>Minha conta</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/watchlater"
                                className={styles.menuItem}
                                role="menuitem"
                            >
                                <span className={styles.icon}>
                                    <FaListUl size={18} />
                                </span>

                                <span>Minha lista</span>
                            </Link>
                        </li>

                        <li className={styles.separator} />

                        <li>
                            <button
                                type="button"
                                className={`${styles.menuItem} ${styles.logout}`}
                                role="menuitem"
                                onClick={signOut}
                            >
                                <span className={styles.icon}>
                                    <LogOut size={18} />
                                </span>

                                <span>Sair</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                href="/login"
                                className={styles.menuItem}
                                role="menuitem"
                            >
                                <span className={styles.icon}>
                                    <FaSignInAlt size={18} />
                                </span>

                                <span>Entrar</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/planos"
                                className={`${styles.menuItem} ${styles.subscribe}`}
                                role="menuitem"
                            >
                                <span className={styles.icon}>
                                    <IoCreate size={19} />
                                </span>

                                <span>Assinar</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default DropdownMenuModal