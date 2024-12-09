import { FaRegFlag } from 'react-icons/fa';
import styles from './styles.module.scss'

interface HelpProps {
    modalVisible: () => void
}

export default function HelpFlag({ modalVisible }: HelpProps) {
    return (
        <>
            <FaRegFlag size={30} className={styles.flagIcon} onClick={modalVisible} />
        </>
    )
}