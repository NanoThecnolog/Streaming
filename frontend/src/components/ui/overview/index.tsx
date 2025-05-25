import styles from './styles.module.scss'
interface OverviewProps {
    text: string
}
export default function Overview({ text }: OverviewProps) {
    return (
        <div className={styles.descriptionContainer}>
            <p>{text}</p>
        </div>
    )
}