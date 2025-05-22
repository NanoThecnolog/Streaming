import Link from 'next/link'
import styles from './styles.module.scss'
import { FaChevronCircleUp } from 'react-icons/fa'

interface ButtonProps {
    visible: boolean,
}

export default function BackTopButton({ visible }: ButtonProps) {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <button disabled={!visible} onClick={handleScrollTop} className={`${styles.backTopButton} ${visible ? styles.visible : styles.hidden}`}>
            <div className={styles.upIcon}>
                <FaChevronCircleUp size={40} />
            </div>
        </button>
    )
}