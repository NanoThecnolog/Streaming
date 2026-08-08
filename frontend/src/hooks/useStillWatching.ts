import { useCallback, useEffect, useRef, useState } from 'react'

type StillWatchingReason = 'episodes' | 'time'

interface UseStillWatchingOptions {
    maxEpisodes?: number
    maxContinuousPlaybackMs?: number
}

const ONE_HOUR_IN_MS = 3 * 60 * 60 * 1000

export const useStillWatching = ({ maxEpisodes = 5, maxContinuousPlaybackMs = ONE_HOUR_IN_MS }: UseStillWatchingOptions = {}) => {
    const [showStillWatching, setShowStillWatching] = useState(false)



    const [triggerReason, setTriggerReason] = useState<StillWatchingReason | null>(null)

    const watchedEpisodesRef = useRef(0)
    const accumulatedPlaybackMsRef = useRef(0)
    const playbackStartedAtRef = useRef<number | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const timeLimitReachedRef = useRef(false)
    const modalIsOpenRef = useRef(false)

    const clearTimer = useCallback(() => {
        if (timerRef.current === null) {
            return
        }

        clearTimeout(timerRef.current)
        timerRef.current = null
    }, [])



    const openStillWatchingModal = useCallback((
        reason: StillWatchingReason,
    ) => {
        if (modalIsOpenRef.current) {
            return
        }

        modalIsOpenRef.current = true
        playbackStartedAtRef.current = null

        clearTimer()
        setTriggerReason(reason)
        setShowStillWatching(true)
    }, [clearTimer])

    const checkShouldOpenModal = useCallback((
        reason: StillWatchingReason,
    ) => {
        const episodesLimitReached =
            watchedEpisodesRef.current >= maxEpisodes

        const timeLimitReached =
            timeLimitReachedRef.current

        if (
            !episodesLimitReached ||
            !timeLimitReached
        ) {
            return false
        }

        openStillWatchingModal(reason)
        return true
    }, [
        maxEpisodes,
        openStillWatchingModal,
    ])

    const registerTimeLimitReached = useCallback(() => {
        timeLimitReachedRef.current = true

        checkShouldOpenModal('time')

    }, [checkShouldOpenModal])



    const schedulePlaybackTimer = useCallback(() => {
        clearTimer()

        if (modalIsOpenRef.current || playbackStartedAtRef.current === null || timeLimitReachedRef.current) {
            return
        }

        const currentPlaybackMs = accumulatedPlaybackMsRef.current + (Date.now() - playbackStartedAtRef.current)

        const remainingPlaybackMs = maxContinuousPlaybackMs - currentPlaybackMs

        if (remainingPlaybackMs <= 0) {
            //openStillWatchingModal('time')
            registerTimeLimitReached()
            return
        }

        timerRef.current = setTimeout(() => {
            //openStillWatchingModal('time')
            registerTimeLimitReached()
        }, remainingPlaybackMs)
    }, [
        clearTimer,
        maxContinuousPlaybackMs,
        //openStillWatchingModal,
        registerTimeLimitReached
    ])



    const registerUserInteraction = useCallback(() => {
        if (modalIsOpenRef.current) {
            return
        }
        //debug.log('resetando depois de uma interação')

        const playbackIsActive = playbackStartedAtRef.current !== null

        clearTimer()

        watchedEpisodesRef.current = 0
        accumulatedPlaybackMsRef.current = 0
        timeLimitReachedRef.current = false

        playbackStartedAtRef.current = playbackIsActive
            ? Date.now()
            : null

        if (playbackIsActive) {
            schedulePlaybackTimer()
        }
    }, [
        clearTimer,
        schedulePlaybackTimer,
    ])

    const registerPlaybackStarted = useCallback(() => {
        if (
            modalIsOpenRef.current ||
            playbackStartedAtRef.current !== null
        ) {
            return
        }

        playbackStartedAtRef.current = Date.now()
        schedulePlaybackTimer()
    }, [schedulePlaybackTimer])

    const accumulateCurrentPlayback = useCallback(() => {
        if (playbackStartedAtRef.current === null) {
            return
        }

        accumulatedPlaybackMsRef.current +=
            Date.now() - playbackStartedAtRef.current

        playbackStartedAtRef.current = null
    }, [])

    /**
     * Deve ser chamado apenas quando o usuário pausar manualmente.
     * A interação confirma que ele ainda está presente.
     */
    const registerUserPause = useCallback(() => {
        if (modalIsOpenRef.current) {
            return
        }

        clearTimer()

        watchedEpisodesRef.current = 0
        accumulatedPlaybackMsRef.current = 0
        playbackStartedAtRef.current = null
        timeLimitReachedRef.current = false
    }, [clearTimer])

    /**
     * Retorna true quando o próximo episódio não deve ser iniciado.
     */
    const registerEpisodeFinished = useCallback(() => {
        if (modalIsOpenRef.current) {
            return true
        }

        accumulateCurrentPlayback()
        clearTimer()

        watchedEpisodesRef.current += 1

        if (
            accumulatedPlaybackMsRef.current >=
            maxContinuousPlaybackMs
        ) {
            //openStillWatchingModal('time')
            //return true
            timeLimitReachedRef.current = true
        }




        /*if (watchedEpisodesRef.current >= maxEpisodes) {
            openStillWatchingModal('episodes')
            return true
        }*/

        //return false
        return checkShouldOpenModal('episodes')
    }, [
        accumulateCurrentPlayback,
        checkShouldOpenModal,
        clearTimer,
        maxContinuousPlaybackMs
    ])

    const confirmWatching = useCallback(() => {
        clearTimer()

        modalIsOpenRef.current = false
        watchedEpisodesRef.current = 0
        accumulatedPlaybackMsRef.current = 0
        playbackStartedAtRef.current = null
        timeLimitReachedRef.current = false

        setTriggerReason(null)
        setShowStillWatching(false)
    }, [clearTimer])

    const resetStillWatching = useCallback(() => {
        confirmWatching()
    }, [confirmWatching])

    useEffect(() => {
        return () => {
            clearTimer()
        }
    }, [clearTimer])

    return {
        showStillWatching,
        triggerReason,
        registerPlaybackStarted,
        registerUserPause,
        registerEpisodeFinished,
        registerUserInteraction,
        confirmWatching,
        resetStillWatching,

    }
}