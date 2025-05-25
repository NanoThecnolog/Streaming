import styles from './styles.module.scss'

interface TitleProps {
    title: string,
    subtitle?: string
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <div className={styles.titleContainer}>
            <h1 className={`${title.toLowerCase() === 'harry potter' && styles.harryFont}`}>{title}</h1>
            <h3 className={`${title.toLowerCase() === 'harry potter' && styles.subHarryFont}`}>{subtitle != '' && `${subtitle}`}</h3>
        </div>
    )
}