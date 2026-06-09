import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { debug } from '@/classes/DebugLogger'

interface ThumbnailCue {
    start: number
    end: number
    image: string
    x: number
    y: number
    width: number
    height: number
}

interface Props {
    visible: boolean,
    time: number,
    positionX: number,
    vttUrl: string
}
const timeToSeconds = (time: string) => {
    const [h, m, s] = time.split(":")
    return Number(h) * 3600 + Number(m) * 60 + Number(s)
}

const parseVtt = (vtt: string, baseUrl: string): ThumbnailCue[] => {
    const blocks = vtt.split(/\n\n+/)

    return blocks
        .map((block) => {
            const lines = block.trim().split("\n")

            if (lines.length < 2 || lines[0] === "WEBVTT") return null

            const [startRaw, endRaw] = lines[0].split(" --> ")
            const imageRaw = lines[1]

            const match = imageRaw.match(/(.+)#xywh=(\d+),(\d+),(\d+),(\d+)/)

            if (!match) return null

            return {
                start: timeToSeconds(startRaw),
                end: timeToSeconds(endRaw),
                image: new URL(match[1], baseUrl).toString(),
                x: Number(match[2]),
                y: Number(match[3]),
                width: Number(match[4]),
                height: Number(match[5])
            }
        })
        .filter(Boolean) as ThumbnailCue[]
}


export default function Thumbnail({ visible, time, positionX, vttUrl }: Props) {

    const [cues, setCues] = useState<ThumbnailCue[]>([])

    useEffect(() => {
        if (!vttUrl) return debug.log("sem vttUrl")
        debug.log("vttUrl", vttUrl)

        const loadVtt = async () => {
            try {
                const response = await fetch(vttUrl)
                const text = await response.text()

                setCues(parseVtt(text, vttUrl))
            } catch (err) {
                debug.warn("Erro ao fazer fetch de vttUrl", vttUrl, err)
                return
            }
        }
        loadVtt()
    }, [vttUrl])

    const cue = cues.find((item) => time >= item.start && time < item.end)

    //debug.log("cue", cue, "visible", visible)

    if (!visible || !cue) return null

    return (
        <div
            className={styles.thumbnail}
            style={{
                left: `${positionX}px`,
                width: `${cue.width}px`,
                height: `${cue.height}px`,
                backgroundImage: `url(${cue.image})`,
                backgroundPosition: `-${cue.x}px -${cue.y}px`
            }}
        >

        </div>
    )
}