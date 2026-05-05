import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Spinner from '../Loading/spinner'
import NoFile from '../NoFile'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import { debug } from '@/classes/DebugLogger'
import { IoMdVolumeHigh } from 'react-icons/io'
import { divide } from 'lodash'
import { formatTime, getClientX } from '@/utils/UtilitiesFunctions'

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

    const lastTapRef = useRef<number>(0)
    const lastTapSideRef = useRef<'left' | 'right' | 'center' | null>(null)
    const doubleTapDelay = 300

    // ======================
    // Funções de ação
    // ======================

    // play e pause

    const togglePlay = useCallback(() => {
        const video = videoRef.current
        if (!video) return

        handleBigPlayButton()

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }

    }, [])

    // Mudança de volume

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

    // Navegação na timeline do vídeo

    const handleSeek = (clientX: number) => {
        const video = videoRef.current
        const timeline = timelineRef.current
        if (!video || !timeline || !video.duration) return

        const rect = timeline.getBoundingClientRect()
        let percent = (clientX - rect.left) / rect.width


        percent = Math.max(0, Math.min(1, percent))
        video.currentTime = percent * video.duration
    }

    //helper de double Tap pra mobile

    const getTapZone = (clientX: number): 'left' | 'center' | 'right' => {
        const container = containerRef.current
        if (!container) return 'center'

        const rect = container.getBoundingClientRect()
        const x = clientX - rect.left
        const width = rect.width

        if (x < width * .3) return 'left'
        if (x > width * .7) return 'right'
        return 'center'
    }

    // Entrar e saír da tela cheia

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

    // ==================================
    // Funções de handler de eventos
    // ==================================

    // handler de Erro

    const handleVideoError = () => {
        setVideoError(true)
        setIsVideoLoading(false)
    }

    useEffect(() => {
        setVideoError(false)
    }, [src])

    // handler de double tap pra mobile
    const handleTouchInteraction = (clientX: number) => {
        const video = videoRef.current
        if (!video || !video.duration) return

        const now = Date.now()
        const zone = getTapZone(clientX)

        const isDoubleTap =
            now - lastTapRef.current < doubleTapDelay &&
            zone === lastTapSideRef.current

        if (isDoubleTap) {
            if (zone === 'left') {
                video.currentTime = Math.max(0, video.currentTime - 10)
            } else if (zone === 'right') {
                video.currentTime = Math.min(video.duration, video.currentTime + 10)
            }

            handleBigPlayButton()
            lastTapRef.current = 0
            lastTapSideRef.current = null
            return
        }

        // single tap → só mostra UI
        handleMouseMove()

        lastTapRef.current = now
        lastTapSideRef.current = zone
    }

    // handler de Interação da tela de vídeo (recuar, play pause, avançar)

    const handleContainerInteracton = (clientX: number) => {
        const video = videoRef.current
        const container = containerRef.current

        if (!video || !container || !video.duration) return

        const rect = container.getBoundingClientRect()
        const x = clientX - rect.left
        const width = rect.width

        const leftZone = width * .3
        const rightZone = width * .7
        if (x < leftZone) {
            video.currentTime = Math.max(0, video.currentTime - 10)
            handleBigPlayButton()
            return
        }
        if (x > rightZone) {
            video.currentTime = Math.min(video.duration, video.currentTime + 10)
            handleBigPlayButton()
            return
        }
        togglePlay()
    }

    // Handler para efeito de mostrar/esconder botão de play/pause

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

    // Verificação de carregamento do vídeo
    const handleCanPlay = () => {
        setIsVideoLoading(false)
    }

    // Handler de atualização de progresso do video

    const handleTimeUpdate = () => {
        const video = videoRef.current
        if (!video || !video.duration) return

        setProgress((video.currentTime / video.duration) * 100)
    }

    // Handler de metadata

    const handleLoadedData = () => {
        setIsVideoLoading(false)
    }

    const handleLoadedMetaData = () => {
        const video = videoRef.current
        if (!video /**|| isDrive */) return

        setDuration(video.duration || 0)
    }

    // Handlers de interação do mouse

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDragging(true)
        handleSeek(e.clientX)
    }
    const handleMouseMoveGlobal = useCallback((e: MouseEvent) => {
        if (!isDragging) return
        handleSeek(e.clientX)
    }, [isDragging])

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = () => {
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


    // ===========================
    // UseEffects
    // ===========================

    // Verificação de carregamento de vídeo
    useEffect(() => {
        debug.log("video carregando?", isVideoLoading)
    }, [isVideoLoading])

    // Inicialização de States

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

    // Ajuste de renderização da duração de video

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

    //Listener de carregamento de Metadata do video

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

    //Listener do mouse

    useEffect(() => {
        //if (isDrive) return
        window.addEventListener('mousemove', handleMouseMoveGlobal)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveGlobal)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    //Clear de timeout

    useEffect(() => {
        return () => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
            if (playButtonTimeout.current) clearTimeout(playButtonTimeout.current)
        }
    }, [])

    // Listener de eventos do teclado

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


    // ===============
    // Fallbacks
    // ===============
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
                    onTouchMove={handleMouseMove}
                    onClick={(e) => handleContainerInteracton(e.clientX)}
                    onTouchStart={(e) => handleTouchInteraction(getClientX(e))}
                >
                    {isVideoLoading &&
                        <div className={styles.loadingOverlay}>
                            <Spinner />
                        </div>
                    }
                    {
                        src &&
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
                                <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>
                                    {isPlaying
                                        ? <FaPause />
                                        : <FaPlay />
                                    }
                                </button>
                            </div>

                            <div className={`${styles.controls} ${showControls ? styles.visible : styles.hidden}`}>
                                <div className={styles.bottom}>
                                    <div
                                        ref={timelineRef}
                                        className={styles.timeline}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleSeek(getClientX(e))
                                        }}
                                        onTouchStart={(e) => {
                                            e.stopPropagation()
                                            setIsDragging(true)
                                            handleSeek(getClientX(e))
                                        }}
                                        onTouchMove={(e) => {
                                            if (!isDragging) return
                                            handleSeek(getClientX(e))
                                        }}
                                        onTouchEnd={() => setIsDragging(false)}
                                    >
                                        <div className={styles.track} />
                                        <div className={styles.progress} style={{ width: `${progress}%` }} />
                                        <div className={styles.thumb} style={{ left: `${progress}%` }} onMouseDown={handleMouseDown} />
                                    </div>
                                    <div className={styles.actions}>
                                        <div className={styles.playContainer}>
                                            <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>
                                                {isPlaying
                                                    ? <FaPause />
                                                    : <FaPlay />
                                                }
                                            </button>

                                            <span>
                                                {formatTime((progress / 100) * duration)}{' '} / {formatTime(duration)}
                                            </span>
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