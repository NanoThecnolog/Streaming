import styles from './styles.module.scss'

interface TitleProps {
    title: string,
    subtitle?: string
    color?: string
}

export default function Title({ title, subtitle, color }: TitleProps) {
    return (
        <div className={styles.titleContainer}>
            <h1 style={color ? { color } : {}} className={`${title.toLowerCase() === 'harry potter' && styles.harryFont}`}>{title}</h1>
            <h3 style={color ? { color } : {}} className={`${title.toLowerCase() === 'harry potter' && styles.subHarryFont}`}>{subtitle != '' && `${subtitle}`}</h3>
        </div>
    )
}