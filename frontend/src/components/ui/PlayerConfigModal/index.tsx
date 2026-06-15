import { AudioTrack, SubtitleTrack } from '@/@types/player'
import styles from './styles.module.scss'
import { normalizeLanguage } from '@/utils/UtilitiesFunctions'

import { HiMiniSpeakerWave } from 'react-icons/hi2'
import { MdSubtitles, MdSubtitlesOff, MdCheck } from 'react-icons/md'
import { normalizeAudioTrack } from '@/utils/Variaveis'

interface Props {
    audioTracks: AudioTrack[]
    subtitleTracks: SubtitleTrack[]

    selectedAudio: number
    selectedSubtitle: number | null
    subEnabled: boolean

    onClose: (e: any) => void
    changeAudioTrack: (index: number) => void
    selectSubtitleTrack: (id: number | null) => void
    disableAllSubtitles: () => void
}

export default function PlayerConfigModal({
    audioTracks: audio,
    subtitleTracks: sub,

    selectedAudio,
    selectedSubtitle,
    subEnabled,

    onClose,
    changeAudioTrack,
    selectSubtitleTrack,
    disableAllSubtitles }: Props) {

    return (
        <section
            className={styles.container}
            onClick={onClose}
        >
            <div
                className={styles.configContainer}
                onClick={(e) => e.stopPropagation()}
            >

                <div className={styles.column}>
                    <div className={styles.title}>
                        <HiMiniSpeakerWave size={20} />
                        <span>Áudio</span>
                    </div>

                    <div className={styles.list}>
                        {
                            audio.map((track, i) => (
                                <button
                                    key={track.id}
                                    className={`${styles.item} ${selectedAudio === i ? styles.active : ''}`}
                                    onClick={() => changeAudioTrack(i)}
                                >
                                    <span>
                                        {normalizeLanguage(track.lang)}
                                    </span>

                                    {
                                        selectedAudio === i && (
                                            <MdCheck size={20} />
                                        )
                                    }
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.column}>
                    <div className={styles.title}>
                        <MdSubtitles size={20} />
                        {
                            /*subEnabled
                                ? <MdSubtitles size={20} />
                                : <MdSubtitlesOff size={20} />*/
                        }

                        <span>Legendas</span>
                    </div>

                    <div className={styles.list}>

                        <button
                            className={`${styles.item} ${selectedSubtitle === null ? styles.active : ''}`}
                            onClick={() => selectSubtitleTrack(null)}
                        >
                            <span>Desativadas</span>

                            {
                                selectedSubtitle === null && (
                                    <MdCheck size={20} />
                                )
                            }
                        </button>

                        {
                            sub.map((track) => (
                                <button
                                    key={track.id}
                                    className={`${styles.item} ${selectedSubtitle === track.id ? styles.active : ''}`}
                                    onClick={() => selectSubtitleTrack(track.id)}
                                >
                                    <span>
                                        {normalizeLanguage(track.language)}
                                        {' • '}
                                        {normalizeLanguage(track.type)}
                                    </span>

                                    {
                                        selectedSubtitle === track.id && (
                                            <MdCheck size={20} />
                                        )
                                    }
                                </button>
                            ))
                        }
                    </div>
                </div>

            </div>
        </section>
    )
}