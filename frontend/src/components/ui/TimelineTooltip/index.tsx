import { useState } from 'react'
import styles from '../PlayerHLS/styles.module.scss'

interface Props {
    duration: number
    containerRef: React.RefObject<HTMLDivElement | null>
}

export default function TimelineTooltip({ duration, containerRef }: Props) {
    const [visible, setVisible] = useState<boolean>(false)
    const [position, setPosition] = useState<number>(0)
    const [time, setTime] = useState<number>(0)

    const formatTime = (sec: number) => {
        const h = Math.floor(sec / 3600)
        const m = Math.floor((sec % 3600) / 60)
        const s = Math.floor(sec % 60)

        if (h > 0)
            return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`

        return `${m}:${String(s).padStart(2, "0")}`
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()

        const x = e.clientX - rect.left

        const percent = Math.min(
            Math.max(x / rect.width, 0),
            1
        )
        setPosition(x)
        setTime(percent * duration)
    }

    return (
        <div
            className={styles.timelineTooltipArea}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={handleMouseMove}
        >
            {visible && (
                <div
                    className={styles.timeTooltip}
                    style={{ left: position }}
                >
                    {formatTime(time)}
                </div>
            )}
        </div>
    )
}