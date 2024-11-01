import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import style from './styles.module.scss'

interface StarProps {
    average: number
}

export default function Stars({ average }: StarProps) {

    const getStars = () => {
        const newAverage = Math.min(Math.max(average / 2, 0), 5)
        const fullStars = Math.floor(newAverage)
        const hasHalfStar = newAverage % 1 >= 0.5
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} size={23} color="#d42c2c" />)
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" size={23} color="#d42c2c" />)
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} size={23} />)
        }
        return stars
    }
    return (
        <div className={style.stars}>
            {getStars()}
        </div>
    )
}