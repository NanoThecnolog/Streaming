import { useEffect, useState } from 'react'
import styles from '../PlayerHLS/styles.module.scss'
import Thumbnail from '../TimelineThumbnail'
import { debug } from '@/classes/DebugLogger'
import { getThumbnailUrl, hasThumb } from '@/utils/UtilitiesFunctions'

interface Props {
    duration: number
    containerRef: React.RefObject<HTMLDivElement | null>
    masterUrl?: string
}

export default function TimelineTooltip({ duration, masterUrl }: Props) {
    const [visible, setVisible] = useState<boolean>(false)
    const [position, setPosition] = useState<number>(0)
    const [time, setTime] = useState<number>(0)
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('')

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

    useEffect(() => {
        debug.log("master URL", masterUrl)

        if (!masterUrl) return

        const thumbnailUrl = getThumbnailUrl(masterUrl)
        debug.log("thumbnailUrl", thumbnailUrl)

        if (!hasThumb(thumbnailUrl)) return debug.warn("hasThumb deu false")

        setThumbnailUrl(thumbnailUrl)


    }, [masterUrl])

    useEffect(() => {
        debug.log("url da thumb sendo alterada", thumbnailUrl)
    }, [thumbnailUrl])

    return (
        <div
            className={styles.timelineTooltipArea}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={handleMouseMove}
        >
            {
                thumbnailUrl && (
                    <Thumbnail
                        visible={visible}
                        time={time}
                        positionX={position}
                        vttUrl={thumbnailUrl}
                    />
                )
            }
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