import Link from 'next/link'
import styles from './styles.module.scss'
import { FaChevronCircleUp } from 'react-icons/fa'

interface ButtonProps {
    visible: boolean,
    link: string
}

export default function BackTopButton({ visible, link }: ButtonProps) {
    return (
        <Link href={link} className={`${styles.backTopButton} ${visible ? styles.visible : ''}`}>
            <div className={styles.upIcon}>
                <FaChevronCircleUp size={40} />
            </div>
        </Link>
    )
}