import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Spinner from '../Loading/spinner'
import NoFile from '../NoFile'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { debug } from '@/classes/DebugLogger'
import { IoMdVolumeHigh } from 'react-icons/io'

interface MoviePlayerProps {
    loading: boolean
    shared: boolean
    src: string
    title: string
}

function Player({ loading, shared, src, title }: MoviePlayerProps) {

    //verificação se vem do drive ou do b2
    const isDrive = useMemo(() => {
        try {
            return !new URL(src).hostname.includes('backblazeb2.com')
        } catch {
            return true
        }
    }, [src])


    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const hideTimeout = useRef<NodeJS.Timeout | null>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [volume, setVolume] = useState(1)

    const [isFullscreen, setIsFullscreen] = useState(false)


    //const player = new VPlayer(videoRef)


    useEffect(() => {
        setProgress(0)
        setIsPlaying(false)
        setDuration(0)
    }, [src])


    const togglePlay = () => {
        const video = videoRef.current
        if (!video /**|| isDrive */) return

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    const handleVolumeChange = (value: number) => {
        debug.log("Volume", value)
        const video = videoRef.current
        if (!video) return

        const v = Math.max(0, Math.min(1, value))

        video.volume = v
        setVolume(v)
    }
    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return

        if (video.volume > 0) {
            video.volume = 0
            setVolume(0)
        } else {
            video.volume = 1
            setVolume(1)
        }
    }

    const handleTimeUpdate = () => {
        const video = videoRef.current
        if (!video || !video.duration /**|| isDrive */) return

        setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetaData = () => {
        const video = videoRef.current
        if (!video /**|| isDrive */) return

        setDuration(video.duration)
    }

    const handleSeek = (clientX: number) => {
        const video = videoRef.current
        const timeline = timelineRef.current
        if (!video || !timeline /**|| isDrive */) return

        const rect = timeline.getBoundingClientRect()

        let percent = (clientX - rect.left) / rect.width

        percent = Math.max(0, Math.min(1, percent))

        video.currentTime = percent * video.duration
        //setProgress(percent * 100)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        //if (isDrive) return
        e.stopPropagation()
        setIsDragging(true)
        handleSeek(e.clientX)
    }
    const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isDragging /**|| isDrive */) return
        handleSeek(e.clientX)
    }, [isDragging])

    const handleMouseUp = () => {
        //if (isDrive) return
        setIsDragging(false)
    }

    useEffect(() => {
        //if (isDrive) return
        window.addEventListener('mousemove', handleMouseMoveGlobal)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    const handleMouseMove = () => {
        //if (isDrive) return
        setShowControls(true)

        if (hideTimeout.current)
            clearTimeout(hideTimeout.current)

        hideTimeout.current = setTimeout(() => {
            setShowControls(false)
        }, 3000)
    }

    const toggleFullScreen = () => {
        const container = containerRef.current
        if (!container /*|| isDrive*/) return

        if (!document.fullscreenElement) {
            container.requestFullscreen()
            setIsFullscreen(true)
        }

        else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const formatTime = (time: number): string => {
        //if (isDrive) return ''
        if (!Number.isFinite(time)) return '00:00'

        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)
        const seconds = Math.floor(time % 60)

        const hh = hours.toString().padStart(2, '0')
        const mm = minutes.toString().padStart(2, '0')
        const ss = seconds.toString().padStart(2, '0')

        return hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const video = videoRef.current
            if (!video) return

            switch (e.code) {
                case 'Space':
                    e.preventDefault()
                    togglePlay()
                    break

                case 'ArrowRight':
                    video.currentTime = Math.min(
                        video.duration,
                        video.currentTime + 10
                    )
                    break

                case 'ArrowLeft':
                    video.currentTime = Math.max(
                        0,
                        video.currentTime - 10
                    )
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [togglePlay])

    if (loading) {
        return <Spinner />
    }

    if (!shared) {
        return <NoFile type="movie" />
    }

    return (

        <>
            {isDrive && <iframe
                title={title}
                src={src}
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-presentation"
                width="100%"
                height="100%"
                className={styles.player}
            />}
            {!isDrive &&
                <div
                    ref={containerRef}
                    className={styles.container}
                    onMouseMove={handleMouseMove}
                    onClick={togglePlay}
                >
                    <video
                        ref={videoRef}
                        className={styles.player}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetaData}
                    >
                        <source src={src} type="video/mp4" />
                        Seu navegador não suporta vídeo no formato mp4.

                        {
                            //adicionando legenda
                            //<track src="URL_SUB_PT" kind="subtitles" srcLang="pt" label="Português" />
                            //<track src="URL_SUB_EN" kind="subtitles" srcLang="en" label="English" />
                        }
                    </video>

                    <div className={`${styles.controls} ${showControls ? styles.visible : styles.hidden}`}>
                        <div className={styles.bottom}>
                            <div
                                ref={timelineRef}
                                className={styles.timeline}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleSeek(e.clientX)
                                    debug.log('clique')
                                }}
                            >
                                <div className={styles.track} />
                                <div className={styles.progress} style={{ width: `${progress}%` }} />
                                <div className={styles.thumb} style={{ left: `${progress}%` }} onMouseDown={handleMouseDown} />
                            </div>
                            <div className={styles.actions}>
                                <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>{isPlaying ? <FaPause /> : <FaPlay />}</button>

                                <span>{formatTime((progress / 100) * duration)}{' '} / {formatTime(duration)}</span>

                                <div className={styles.volumeContainer}>

                                    <div className={styles.volumeSlider}>
                                        <IoMdVolumeHigh size={30} />
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={volume}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                        />
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(), toggleFullScreen() }}>
                                        {isFullscreen ? <MdFullscreenExit size={30} /> : <MdFullscreen size={30} />}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export const MoviePlayer = memo(Player)