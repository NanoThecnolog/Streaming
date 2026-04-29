import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Spinner from '../Loading/spinner'
import NoFile from '../NoFile'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { debug } from '@/classes/DebugLogger'
import { IoMdVolumeHigh } from 'react-icons/io'
import { divide } from 'lodash'

interface MoviePlayerProps {
    loading: boolean
    shared: boolean | null
    src: string
    title: string
}

function Player({ loading, shared, src, title }: MoviePlayerProps) {

    //verificação se vem do drive ou do b2
    const isDrive = useMemo(() => {
        try {
            return !new URL(src).hostname.includes('backblazeb2.com')
        } catch {
            return null
        }
    }, [src])


    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const playButtonTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const [showPlayButton, setShowPlayButton] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [volume, setVolume] = useState(1)

    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const [videoError, setVideoError] = useState(false)

    useEffect(() => {
        setVideoError(false)
    }, [src])

    const handleVideoError = () => {
        setVideoError(true)
        setIsVideoLoading(false)
    }


    //const player = new VPlayer(videoRef)

    useEffect(() => {
        debug.log("video carregando?", isVideoLoading)
    }, [isVideoLoading])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        setProgress(0)
        setIsPlaying(false)
        setDuration(0)
        setIsVideoLoading(true)

        video.pause()
        video.load()
    }, [src])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const interval = setInterval(() => {
            if (video.duration && Number.isFinite(video.duration)) {
                setDuration(video.duration)
                clearInterval(interval)
            }
        }, 300)

        return () => clearInterval(interval)
    }, [src])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const log = () => {
            debug.log({
                readyState: video.readyState,
                networkState: video.networkState,
                duration: video.duration
            })
        }

        video.addEventListener('loadedmetadata', log)
        video.addEventListener('canplay', log)
        video.addEventListener('loadeddata', log)

        return () => {
            video.removeEventListener('loadedmetadata', log)
            video.removeEventListener('canplay', log)
            video.removeEventListener('loadeddata', log)
        }
    }, [src])


    const togglePlay = () => {
        const video = videoRef.current
        if (!video /**|| isDrive */) return

        handleBigPlayButton()

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }

    }

    const handleBigPlayButton = () => {
        debug.log("chamando handleBigPlayButton")
        setShowPlayButton(true)

        const video = videoRef.current
        if (!video) return

        if (playButtonTimeout.current) {
            clearTimeout(playButtonTimeout.current)
        }

        playButtonTimeout.current = setTimeout(() => {
            if (video.paused) return
            setShowPlayButton(false)
        }, 500)
    }

    const handleCanPlay = () => {
        setIsVideoLoading(false)
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

    const handleLoadedData = () => {
        setIsVideoLoading(false)
    }

    const handleLoadedMetaData = () => {
        const video = videoRef.current
        if (!video /**|| isDrive */) return

        setDuration(video.duration || 0)
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
        setShowPlayButton(true)

        const video = videoRef.current
        if (!video) return

        if (hideTimeout.current) clearTimeout(hideTimeout.current)
        if (playButtonTimeout.current) clearTimeout(playButtonTimeout.current)

        hideTimeout.current = setTimeout(() => {
            if (!video.paused) setShowControls(false)
        }, 2000)
        playButtonTimeout.current = setTimeout(() => {
            if (!video.paused) setShowPlayButton(false)
        }, 500)
    }
    useEffect(() => {
        return () => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
            if (playButtonTimeout.current) clearTimeout(playButtonTimeout.current)
        }
    }, [])

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



    //fallbacks
    if (loading)
        return <Spinner />

    if (isDrive === null)
        return <Spinner />

    if (isDrive === true && shared === null)
        return <Spinner />

    if (
        (isDrive === true && shared === false) ||
        (isDrive === false && videoError)
    ) {
        debug.log(`apresentando noFile. isDrive: ${isDrive}, shared: ${shared}, videoError: ${videoError}`)
        return <NoFile type="movie" />
    }

    return (

        <>
            {isDrive === true && <iframe
                title={title}
                src={src}
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-presentation"
                width="100%"
                height="100%"
                className={styles.player}
            />}
            {isDrive === false &&
                <div
                    ref={containerRef}
                    className={styles.container}
                    onMouseMove={handleMouseMove}
                    onClick={togglePlay}
                >
                    {isVideoLoading &&
                        <div className={styles.loadingOverlay}>
                            <Spinner />
                        </div>
                    }
                    {
                        isDrive === false && src &&
                        <>
                            <video
                                ref={videoRef}
                                className={styles.player}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetaData}
                                onCanPlay={handleCanPlay}
                                onLoadedData={handleLoadedData}
                                onError={handleVideoError}
                                preload='metadata'//auto para priozar UX
                            >
                                <source src={src} type="video/mp4" />
                                Seu navegador não suporta vídeo no formato mp4.

                                {
                                    //adicionando legenda
                                    //<track src="URL_SUB_PT" kind="subtitles" srcLang="pt" label="Português" />
                                    //<track src="URL_SUB_EN" kind="subtitles" srcLang="en" label="English" />
                                }
                            </video>

                            <div className={`${styles.videoPlayButton} ${showPlayButton ? styles.visible : styles.hidden}`}>
                                <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                            </div>

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
                                        <div className={styles.playContainer}>
                                            <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>{isPlaying ? <FaPause /> : <FaPlay />}</button>

                                            <span>{formatTime((progress / 100) * duration)}{' '} / {formatTime(duration)}</span>
                                        </div>

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
                        </>
                    }
                </div>
            }
        </>
    )
}

export const MoviePlayer = memo(Player)