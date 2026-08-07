import { debug } from '@/classes/DebugLogger'
import Hls from 'hls.js'
import {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react'
import type { VideoHTMLAttributes } from 'react'

export interface TrailerHLSProps extends Omit<
    VideoHTMLAttributes<HTMLVideoElement>,
    'src' | 'onError'
> {
    src: string
    volume?: number
    onError?: (error: Error) => void
}

const HLS_MIME_TYPE = 'application/vnd.apple.mpegurl'
const MAX_RECOVERY_ATTEMPTS = 2

const TrailerHLS = forwardRef<
    HTMLVideoElement,
    TrailerHLSProps
>(({
    src,
    preload = 'metadata',
    crossOrigin = 'anonymous',
    playsInline = true,
    disablePictureInPicture = true,
    muted = true,
    volume = 0.5,
    onError,
    ...videoProps
}, forwardedRef) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const onErrorRef = useRef(onError)

    useImperativeHandle(
        forwardedRef,
        () => videoRef.current as HTMLVideoElement,
        [],
    )

    useEffect(() => {
        onErrorRef.current = onError
    }, [onError])

    useEffect(() => {
        const video = videoRef.current

        if (!video) return
        //debug.log('volume mudando', volume)
        //debug.log('video mutado?', muted)

        video.volume = Math.max(0, Math.min(1, volume))
        video.muted = muted
    }, [muted, volume])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        //debug.log('volume do vídeo', video.volume)
        //debug.log('volume do vídeo mutado?', video.muted)
    }, [videoRef])

    /*
    useEffect(() => {
        const video = videoRef.current

        if (!video) return

        const handleVolumeChange = () => {
            debug.log('Volume real do elemento:', video.volume)
            debug.log('Muted real do elemento:', video.muted)
        }

        video.addEventListener(
            'volumechange',
            handleVolumeChange,
        )

        handleVolumeChange()

        return () => {
            video.removeEventListener(
                'volumechange',
                handleVolumeChange,
            )
        }
    }, [])
     */

    useEffect(() => {
        const video = videoRef.current

        if (!video || !src || preload === 'none') return

        let networkRecoveryAttempts = 0
        let mediaRecoveryAttempts = 0
        let errorWasReported = false

        const reportError = (message: string) => {
            if (errorWasReported) return

            errorWasReported = true
            onErrorRef.current?.(new Error(message))
        }

        const clearVideo = () => {
            video.pause()
            video.removeAttribute('src')
            video.load()
        }

        /*debug.log('Suporte HLS:', {
            hlsJs: Hls.isSupported(),
            native: video.canPlayType(HLS_MIME_TYPE),
        })*/

        /*
         * Prioriza hls.js.
         * Chrome pode retornar "maybe" para HLS nativo,
         * mesmo sem oferecer suporte completo às faixas de áudio.
         */
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: false,
                backBufferLength: 30,
                //debug: true,
            })

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                //debug.log('HLS anexado ao elemento de vídeo')
                hls.loadSource(src)
            })

            hls.on(
                Hls.Events.AUDIO_TRACKS_UPDATED,
                (_, data) => {
                    /*debug.log(
                        'Faixas de áudio encontradas:',
                        data.audioTracks,
                    )*/

                    if (!data.audioTracks.length) return

                    const defaultTrackIndex =
                        data.audioTracks.findIndex(
                            track => track.default,
                        )

                    hls.audioTrack =
                        defaultTrackIndex >= 0
                            ? defaultTrackIndex
                            : 0

                    /*debug.log(
                        'Faixa de áudio selecionada:',
                        hls.audioTrack,
                    )*/
                },
            )

            /*hls.on(
                Hls.Events.AUDIO_TRACK_LOADING,
                (_, data) => {
                    debug.log(
                        'Carregando playlist de áudio:',
                        data,
                    )
                },
            )*/

            /*hls.on(
                Hls.Events.AUDIO_TRACK_LOADED,
                (_, data) => {
                    debug.log(
                        'Playlist de áudio carregada:',
                        data,
                    )
                },
            )*/

            /*hls.on(
                Hls.Events.AUDIO_TRACK_SWITCHED,
                (_, data) => {
                    debug.log(
                        'Faixa de áudio ativada:',
                        data.id,
                    )
                },
            )*/

            /*hls.on(Hls.Events.FRAG_LOADED, (_, data) => {
                if (data.frag.type !== 'audio') return

                debug.log(
                    'Segmento de áudio carregado:',
                    data.frag.url,
                )
            })*/

            hls.on(Hls.Events.ERROR, (_, data) => {
                debug.error('Erro HLS:', {
                    type: data.type,
                    details: data.details,
                    fatal: data.fatal,
                    url: data.url,
                    fragmentType: data.frag?.type,
                })

                if (!data.fatal) return

                if (
                    data.type ===
                    Hls.ErrorTypes.NETWORK_ERROR &&
                    networkRecoveryAttempts <
                    MAX_RECOVERY_ATTEMPTS
                ) {
                    networkRecoveryAttempts += 1
                    hls.startLoad()
                    return
                }

                if (
                    data.type ===
                    Hls.ErrorTypes.MEDIA_ERROR &&
                    mediaRecoveryAttempts <
                    MAX_RECOVERY_ATTEMPTS
                ) {
                    mediaRecoveryAttempts += 1
                    hls.recoverMediaError()
                    return
                }

                reportError(
                    `Erro fatal no trailer HLS: ${data.details}`,
                )
            })

            hls.attachMedia(video)

            return () => {
                hls.destroy()
                clearVideo()
            }
        }

        /*
         * Fallback para Safari/iOS ou navegadores
         * sem suporte ao MediaSource.
         */
        if (video.canPlayType(HLS_MIME_TYPE)) {
            const handleNativeError = () => {
                reportError(
                    'Não foi possível carregar o trailer HLS.',
                )
            }

            //debug.log('Utilizando HLS nativo')

            video.addEventListener(
                'error',
                handleNativeError,
            )

            video.src = src
            video.load()

            return () => {
                video.removeEventListener(
                    'error',
                    handleNativeError,
                )

                clearVideo()
            }
        }

        reportError(
            'Este navegador não possui suporte a HLS.',
        )
    }, [preload, src])

    return (
        <video
            {...videoProps}
            ref={videoRef}
            preload={preload}
            crossOrigin={crossOrigin}
            playsInline={playsInline}
            disablePictureInPicture={
                disablePictureInPicture
            }
            muted={muted}
        />
    )
})

TrailerHLS.displayName = 'TrailerHLS'

export default memo(TrailerHLS)