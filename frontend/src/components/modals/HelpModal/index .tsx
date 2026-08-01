import {
    MouseEvent,
    useEffect,
    useState,
} from 'react'
import {
    AlertTriangle,
    AudioLines,
    Captions,
    CaptionsOff,
    CircleHelp,
    Clapperboard,
    FileWarning,
    ImageOff,
    Languages,
    LoaderCircle,
    MonitorX,
    Play,
    RotateCcw,
    VolumeX,
    X,
} from 'lucide-react'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

import { SeriesProps } from '@/@types/series'
import { debug } from '@/classes/DebugLogger'
import { apiEmail } from '@/services/apiMessenger'

import styles from './styles.module.scss'

interface HelpProps {
    handleHelpModal: () => void
    email?: string
    tmdbId: number
    serie?: SeriesProps | null
    season?: number
    episode?: number
}

interface ProblemOption {
    id: string
    title: string
    description: string
    icon: typeof Play
}

interface ProblemErrorResponse {
    error?: string
    message?: string
}

const problemOptions: ProblemOption[] = [
    {
        id: 'playback-error',
        title: 'Vídeo não reproduz',
        description:
            'O player apresenta um erro ou não inicia a reprodução.',
        icon: Play,
    },
    {
        id: 'buffering-problem',
        title: 'Travamentos frequentes',
        description:
            'O vídeo pausa repetidamente para carregar.',
        icon: LoaderCircle,
    },
    {
        id: 'playback-limit',
        title: 'Limite de reproduções',
        description:
            'O player informa que o limite de reproduções foi excedido.',
        icon: RotateCcw,
    },
    {
        id: 'audio-missing',
        title: 'Áudio ausente',
        description:
            'O vídeo reproduz, mas nenhum som está disponível.',
        icon: VolumeX,
    },
    {
        id: 'audio-sync',
        title: 'Áudio dessincronizado',
        description:
            'O som está adiantado ou atrasado em relação à imagem.',
        icon: AudioLines,
    },
    {
        id: 'audio-language',
        title: 'Idioma de áudio incorreto',
        description:
            'O idioma selecionado não corresponde ao áudio reproduzido.',
        icon: Languages,
    },
    {
        id: 'image-problem',
        title: 'Problema com a imagem',
        description:
            'A imagem não aparece, está distorcida ou apresenta falhas.',
        icon: ImageOff,
    },
    {
        id: 'low-quality',
        title: 'Qualidade muito baixa',
        description:
            'A imagem permanece em baixa qualidade durante a reprodução.',
        icon: MonitorX,
    },
    {
        id: 'subtitle-missing',
        title: 'Legenda ausente',
        description:
            'A opção de legenda esperada não está disponível.',
        icon: CaptionsOff,
    },
    {
        id: 'subtitle-sync',
        title: 'Legenda dessincronizada',
        description:
            'A legenda aparece adiantada ou atrasada.',
        icon: Captions,
    },
    {
        id: 'subtitle-content',
        title: 'Legenda incorreta',
        description:
            'O idioma ou o conteúdo da legenda está incorreto.',
        icon: Languages,
    },
    {
        id: 'wrong-content',
        title: 'Conteúdo incorreto',
        description:
            'O filme ou episódio reproduzido não corresponde ao selecionado.',
        icon: Clapperboard,
    },
    {
        id: 'incomplete-video',
        title: 'Vídeo incompleto',
        description:
            'A reprodução começa ou termina em um ponto incorreto.',
        icon: FileWarning,
    },
    {
        id: 'unknown-problem',
        title: 'Outro problema',
        description:
            'O problema encontrado não está entre as opções disponíveis.',
        icon: CircleHelp,
    },
]

export default function HelpModal({
    handleHelpModal,
    email,
    tmdbId,
    serie,
    season,
    episode,
}: HelpProps) {
    const [selectedProblemId, setSelectedProblemId] =
        useState<string | null>(null)

    const loading = selectedProblemId !== null

    useEffect(() => {
        const handleKeyDown = (
            event: globalThis.KeyboardEvent,
        ): void => {
            if (event.key === 'Escape' && !loading) {
                handleHelpModal()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleHelpModal, loading])

    const handleOverlayClick = (
        event: MouseEvent<HTMLDivElement>,
    ): void => {
        if (
            event.target === event.currentTarget &&
            !loading
        ) {
            handleHelpModal()
        }
    }

    const handleReport = async (
        problem: ProblemOption,
    ): Promise<void> => {
        if (loading) return

        setSelectedProblemId(problem.id)

        try {
            const contentTmdbId =
                serie?.tmdbID ?? tmdbId

            const response = await apiEmail.post(
                '/notification/problem',
                {
                    problemId: problem.id,
                    title: problem.title,
                    description: problem.description,
                    email: email ?? 'Indefinido',
                    tmdbId: contentTmdbId,
                    season: season ?? 0,
                    episode: episode ?? 0,
                },
            )

            debug.log(response.data)

            toast.success(
                'Relatório enviado. Obrigado por nos avisar!',
            )

            handleHelpModal()
        } catch (error: unknown) {
            console.error(
                'Erro ao enviar relatório do vídeo:',
                error,
            )

            if (isAxiosError<ProblemErrorResponse>(error)) {
                const message =
                    error.response?.data?.message ??
                    error.response?.data?.error

                toast.error(
                    message ??
                    'Não foi possível enviar o relatório.',
                )

                return
            }

            toast.error(
                'Não foi possível enviar o relatório. Tente novamente.',
            )
        } finally {
            setSelectedProblemId(null)
        }
    }

    return (
        <div
            className={styles.overlay}
            role="presentation"
            onMouseDown={handleOverlayClick}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="help-modal-title"
                aria-describedby="help-modal-description"
                aria-busy={loading}
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    aria-label="Fechar relatório de problema"
                    disabled={loading}
                    onClick={handleHelpModal}
                >
                    <X size={20} aria-hidden="true" />
                </button>

                <header className={styles.header}>
                    <div className={styles.headerIcon}>
                        <AlertTriangle
                            size={28}
                            aria-hidden="true"
                        />
                    </div>

                    <span className={styles.eyebrow}>
                        Ajuda com a reprodução
                    </span>

                    <h2 id="help-modal-title">
                        Qual problema você encontrou?
                    </h2>

                    <p id="help-modal-description">
                        Selecione a opção que melhor descreve o
                        problema apresentado neste vídeo.
                    </p>
                </header>

                <div className={styles.problemList}>
                    {problemOptions.map(problem => {
                        const Icon = problem.icon

                        const isSending =
                            selectedProblemId === problem.id

                        return (
                            <button
                                type="button"
                                key={problem.id}
                                className={styles.problem}
                                disabled={loading}
                                onClick={() =>
                                    handleReport(problem)
                                }
                            >
                                <span
                                    className={styles.problemIcon}
                                >
                                    {isSending ? (
                                        <LoaderCircle
                                            className={
                                                styles.spinner
                                            }
                                            size={22}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Icon
                                            size={22}
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>

                                <span
                                    className={
                                        styles.problemContent
                                    }
                                >
                                    <strong>
                                        {isSending
                                            ? 'Enviando relatório...'
                                            : problem.title}
                                    </strong>

                                    <span>
                                        {problem.description}
                                    </span>
                                </span>
                            </button>
                        )
                    })}
                </div>

                <footer className={styles.footer}>
                    O relatório será associado ao conteúdo que você
                    está assistindo.
                </footer>
            </section>
        </div>
    )
}