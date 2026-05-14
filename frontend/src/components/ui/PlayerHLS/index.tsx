import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Spinner from '../Loading/spinner'
import NoFile from '../NoFile'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdFullscreen, MdFullscreenExit, MdSubtitles, MdSubtitlesOff } from 'react-icons/md'
import { debug } from '@/classes/DebugLogger'
import { IoMdVolumeHigh } from 'react-icons/io'
import { formatTime, getClientX } from '@/utils/UtilitiesFunctions'
import Hls from 'hls.js'
import { normalizeAudioTrack } from '@/utils/Variaveis'

interface MoviePlayerProps {
    //loading: boolean
    src: string
}

function PlayerHLS({ src }: MoviePlayerProps) {


    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const playButtonTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    const lastTapRef = useRef<number>(0)
    const lastTapSideRef = useRef<'left' | 'right' | 'center' | null>(null)
    const doubleTapDelay = 300

    const isTouchRef = useRef<boolean>(false)

    const hlsRef = useRef<Hls | null>(null)
    const [audioTracks, setAudioTracks] = useState<{ id: number; name: string; lang: string }[]>([])

    const [selectedAudio, setSelectedAudio] = useState(0)

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

    const [subEnabled, setSubEnabled] = useState(false)

    const [tapFeedback, setTapFeedback] = useState<{
        visible: boolean
        side: 'left' | 'right' | null
    }>({
        visible: false,
        side: null
    })

    const tapFeedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)



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

    //Ativa/desativa legenda

    const toggleSubtitle = () => {
        const video = videoRef.current

        if (!video) return

        setSubEnabled((prev) => {
            const next = !prev

            const tracks = video.textTracks

            for (let i = 0; i < tracks.length; i++) {
                tracks[i].mode = next
                    ? 'showing'
                    : 'disabled'
            }
            return next
        })
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

    //Troca de audio

    const changeAudioTrack = (index: number) => {
        if (!hlsRef.current) return

        debug.log("Alterando faixa de audio", index)

        hlsRef.current.audioTrack = index
        //setSelectedAudio(index)
    }


    // ==================================
    // Funções de handler de eventos
    // ==================================

    // handler de Erro

    /*const handleVideoError = () => {
        setVideoError(true)
        setIsVideoLoading(false)
    }*/

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
            zone === lastTapSideRef.current &&
            lastTapRef.current !== 0

        if (isDoubleTap) {
            if (zone === 'left') {
                video.currentTime = Math.max(0, video.currentTime - 10)
                triggerTapFeedback('left')//feedback do recuo da duração
            } else if (zone === 'right') {
                video.currentTime = Math.min(video.duration, video.currentTime + 10)
                triggerTapFeedback('right')// feedback do avanço da duração
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
            triggerTapFeedback('left')
            handleBigPlayButton()
            return
        }
        if (x > rightZone) {
            video.currentTime = Math.min(video.duration, video.currentTime + 10)
            triggerTapFeedback('right')
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
    /*useEffect(() => {
        debug.log("video carregando?", isVideoLoading)
    }, [isVideoLoading])*/

    // Inicialização de States e eventos do HLS

    useEffect(() => {
        const video = videoRef.current
        if (!video || !src) return

        debug.log("iniciando o useEffect de states e eventos do HLS")

        const isSafari = /Safari/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent)

        setProgress(0)
        setDuration(0)
        setIsPlaying(false)
        setVideoError(false)
        setIsVideoLoading(true)

        if (hlsRef.current) {
            debug.log("ref hls aplicando .destroy()")
            hlsRef.current.destroy()
            hlsRef.current = null
        }

        // Safari nativo
        if (isSafari && video.canPlayType('application/vnd.apple.mpegurl')) {
            debug.log("video nativo no safari")
            video.src = src
            video.load()

            setIsVideoLoading(false)
            return
        }

        // hls.js
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 90
            })

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                debug.log('MEDIA_ATTACHED')
            })

            hls.on(Hls.Events.MANIFEST_LOADING, (_, data) => {
                debug.log('MANIFEST_LOADING', data)
            })

            hls.on(Hls.Events.MANIFEST_LOADED, (_, data) => {
                debug.log('MANIFEST_LOADED', data)
            })

            hlsRef.current = hls



            hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_, data) => {
                debug.log('Audio tracks updated', data.audioTracks)

                const tracks = data.audioTracks.map((track, index) => ({
                    id: index,
                    name: track.name || track.lang || `Audio ${index}`,
                    lang: track.lang || 'unknown'
                }))

                setAudioTracks(tracks)
                debug.log("faixa atual", hls.audioTrack)

                setSelectedAudio(hls.audioTrack)
            })

            hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_, data) => {
                debug.log("faixa de audio alterada", data)

                setSelectedAudio(data.id)
            })

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                debug.log("Manifest_parsed")
                setIsVideoLoading(false)
            })

            hls.on(Hls.Events.ERROR, (_, data) => {
                debug.error('HLS ERROR', data)

                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            hls.startLoad()
                            break

                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError()
                            break

                        default:
                            setVideoError(true)
                            break
                    }
                }
            })

            hls.on(Hls.Events.LEVEL_LOADED, () => {
                setIsVideoLoading(false)
            })

            hls.on(Hls.Events.BUFFER_APPENDED, () => {
                setIsVideoLoading(false)
            })



            hls.loadSource(src)
            hls.attachMedia(video)
        }


        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy()
                hlsRef.current = null
            }
        }

    }, [src])

    useEffect(() => {
        debug.log("isVideoLoading mudando", isVideoLoading)
    }, [isVideoLoading])

    // Ajuste de renderização da duração de video

    /*useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const interval = setInterval(() => {
            if (video.duration && Number.isFinite(video.duration)) {
                setDuration(video.duration)
                clearInterval(interval)
            }
        }, 300)

        return () => clearInterval(interval)
    }, [src])*/

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
        video.addEventListener('error', () => {
            debug.log("Erro no listener do vídeo", video.error)
        })

        return () => {
            video.removeEventListener('loadedmetadata', log)
            video.removeEventListener('canplay', log)
            video.removeEventListener('loadeddata', log)
            video.removeEventListener('error', () => { })
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



    useEffect(() => {
        debug.log("Player HLS carregado", src)
    }, [src])



    // ===============
    // Fallbacks
    // ===============

    const triggerTapFeedback = (side: 'left' | 'right') => {
        setTapFeedback({ visible: true, side })

        if (tapFeedbackTimeout.current) {
            clearTimeout(tapFeedbackTimeout.current)
        }
        tapFeedbackTimeout.current = setTimeout(() => {
            setTapFeedback({ visible: false, side: null })
        }, 600)
    }

    /*if (loading) {
        debug.log("esperando loading", loading)
        return <Spinner />
    }*/




    if (videoError) {
        debug.log(`apresentando noFile, videoError: ${videoError}`)
        return <NoFile type="movie" />
    }

    return (

        <>

            <div
                ref={containerRef}
                className={styles.container}
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}

                onTouchStart={(e) => {
                    isTouchRef.current = true
                    handleTouchInteraction(getClientX(e))
                }}
                onClick={(e) => {
                    if (isTouchRef.current) {
                        isTouchRef.current = false
                        return
                    }
                    handleContainerInteracton(e.clientX)
                }}
            >
                {
                    isVideoLoading &&
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
                            //onCanPlay={handleCanPlay}
                            //onLoadedData={handleLoadedData}
                            //onError={handleVideoError}
                            preload='auto'//auto para priozar UX
                            crossOrigin='anonymous'
                        >
                        </video>

                        {tapFeedback.visible && tapFeedback.side &&
                            <div className={`${styles.tapFeedback} ${styles[tapFeedback.side]}`}>
                                <div className={styles.content}>
                                    <span>
                                        {tapFeedback.side === 'left' ? '-10s' : '+10s'}
                                    </span>
                                </div>
                            </div>
                        }

                        {
                            !isVideoLoading &&
                            <>
                                <div className={`${styles.videoPlayButton} ${showPlayButton ? styles.visible : styles.hidden}`}>
                                    <button onClick={(e) => { e.stopPropagation(), togglePlay() }}>
                                        {!isVideoLoading && isPlaying
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

                                                {
                                                    audioTracks.length > 0 && (
                                                        <select
                                                            name=""
                                                            id=""
                                                            value={selectedAudio}
                                                            onChange={(e) => changeAudioTrack(Number(e.target.value))}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className={styles.audioTrack}
                                                        >
                                                            {
                                                                audioTracks.map((track, i) =>
                                                                    <option
                                                                        value={i}
                                                                        key={track.id}
                                                                    >
                                                                        {normalizeAudioTrack[track.lang]}
                                                                    </option>
                                                                )
                                                            }
                                                        </select>
                                                    )
                                                }


                                                <div className={styles.subtitleButton}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            toggleSubtitle()
                                                        }}
                                                    >
                                                        {subEnabled
                                                            ? <MdSubtitles size={20} />
                                                            : <MdSubtitlesOff size={20} />
                                                        }
                                                    </button>
                                                </div>


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
                    </>
                }
            </div>
        </>
    )
}

export const MoviePlayerHLS = memo(PlayerHLS)