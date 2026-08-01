import {
    CalendarDays,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    CreditCard,
    Crown,
    Gift,
    Loader2,
    ReceiptText,
    ShieldCheck,
} from 'lucide-react'

import styles from './styles.module.scss'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useFlix } from '@/contexts/FlixContext'
import { apiSub } from '@/services/apiSubManager'
import { debug } from '@/classes/DebugLogger'

import { formatedDate } from '@/utils/UtilitiesFunctions'
import { Normalize } from '@/classes/Normalize'

import {
    SubDataEFIReponse,
    SubDetailsResponseProps,
} from '@/@types/subscriptions/subDetails'

type SubscriptionStatus =
    | 'active'
    | 'new_charge'
    | 'canceled'
    | 'expired'
    | 'inactive'
    | string

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value / 100)
}

const getPaymentMethodLabel = (method: string): string => {
    const methods: Record<string, string> = {
        banking_billet: 'Boleto bancário',
        credit_card: 'Cartão de crédito',
        pix: 'Pix',
    }

    return methods[method] ?? method
}

const isSubscriptionActive = (status: string): boolean => {
    return ['active', 'new_charge'].includes(status)
}

const getStatusClassName = (
    status: SubscriptionStatus,
): string => {
    const classes: Record<string, string> = {
        active: styles.statusActive,
        new_charge: styles.statusPending,
        canceled: styles.statusCanceled,
        expired: styles.statusExpired,
        inactive: styles.statusInactive,
    }

    return classes[status] ?? styles.statusDefault
}

export default function SubConfig() {
    const router = useRouter()

    const {
        user,
        subscription,
    } = useFlix()

    const [subEFI, setSubEFI] =
        useState<SubDataEFIReponse | null>(null)

    const [isLoading, setIsLoading] =
        useState<boolean>(true)

    const [hasError, setHasError] =
        useState<boolean>(false)

    useEffect(() => {
        let componentMounted = true

        const getSubscriptionDetails = async (): Promise<void> => {
            if (!subscription?.subId) {
                if (componentMounted) {
                    setSubEFI(null)
                    setIsLoading(false)
                }

                return
            }

            setIsLoading(true)
            setHasError(false)

            try {
                const response =
                    await apiSub.get<SubDetailsResponseProps>(
                        `/subscription/${subscription.subId}`,
                    )

                if (!componentMounted) return

                setSubEFI(response.data.data)
            } catch (error) {
                debug.error(
                    'Erro ao buscar dados da assinatura na EFI',
                    error,
                )

                if (!componentMounted) return

                setSubEFI(null)
                setHasError(true)
            } finally {
                if (componentMounted) {
                    setIsLoading(false)
                }
            }
        }

        getSubscriptionDetails()

        return () => {
            componentMounted = false
        }
    }, [subscription?.subId])

    const handleManageSubscription = (): void => {
        if (!subEFI) return

        router.push(
            `/me/assinatura/${subEFI.subscription_id}`,
        )
    }

    const handleChoosePlan = (): void => {
        router.push('/me/escolher-plano')
    }

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Loader2
                    size={34}
                    className={styles.spinner}
                />

                <div>
                    <strong>
                        Carregando assinatura
                    </strong>

                    <span>
                        Buscando os dados do seu plano...
                    </span>
                </div>
            </div>
        )
    }

    if (hasError) {
        return (
            <div className={styles.feedbackContainer}>
                <ReceiptText size={28} />

                <strong>
                    Não foi possível carregar sua assinatura
                </strong>

                <span>
                    Tente atualizar a página ou acesse novamente
                    mais tarde.
                </span>
            </div>
        )
    }

    if (subEFI) {
        const active = isSubscriptionActive(
            subEFI.status,
        )

        const normalizedStatus =
            Normalize.subscriptionStatus(
                subEFI.status,
            )

        return (
            <div className={styles.subscriptionWrapper}>
                <header className={styles.subscriptionHeader}>
                    <div className={styles.planIdentity}>
                        <div className={styles.planIcon}>
                            <Crown size={24} />
                        </div>

                        <div>
                            <span>Plano atual</span>
                            <h3>{subEFI.plan.name}</h3>

                            <p>
                                Assinatura #{subEFI.subscription_id}
                            </p>
                        </div>
                    </div>

                    <span
                        className={`
                            ${styles.statusBadge}
                            ${getStatusClassName(subEFI.status)}
                        `}
                    >
                        {normalizedStatus}
                    </span>
                </header>

                <div className={styles.subscriptionSummary}>
                    <article className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <CircleDollarSign size={19} />
                        </div>

                        <div>
                            <span>Valor</span>

                            <strong>
                                {formatCurrency(subEFI.value)}
                            </strong>
                        </div>
                    </article>

                    <article className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <CreditCard size={19} />
                        </div>

                        <div>
                            <span>Pagamento</span>

                            <strong>
                                {getPaymentMethodLabel(
                                    subEFI.payment_method || '',
                                )}
                            </strong>
                        </div>
                    </article>

                    <article className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <CalendarDays size={19} />
                        </div>

                        <div>
                            <span>
                                {active
                                    ? 'Próximo vencimento'
                                    : 'Situação'}
                            </span>

                            <strong>
                                {active && subEFI.next_expire_at
                                    ? formatedDate(
                                        subEFI.next_expire_at,
                                    )
                                    : normalizedStatus}
                            </strong>
                        </div>
                    </article>

                    <article className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <Clock3 size={19} />
                        </div>

                        <div>
                            <span>Assinante desde</span>

                            <strong>
                                {formatedDate(
                                    subEFI.created_at,
                                )}
                            </strong>
                        </div>
                    </article>
                </div>

                <button
                    type="button"
                    className={styles.manageButton}
                    onClick={handleManageSubscription}
                >
                    <div className={styles.manageButtonIcon}>
                        <ShieldCheck size={20} />
                    </div>

                    <div className={styles.manageButtonText}>
                        <strong>
                            Gerenciar assinatura
                        </strong>

                        <span>
                            Consulte cobranças, altere o pagamento
                            ou cancele o plano.
                        </span>
                    </div>

                    <ChevronRight
                        size={20}
                        className={styles.manageArrow}
                    />
                </button>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (user.donator) {
        return (
            <div className={styles.lifetimeContainer}>
                <div className={styles.lifetimeIcon}>
                    <Gift size={27} />
                </div>

                <div className={styles.lifetimeContent}>
                    <span>Benefício especial</span>
                    <h3>Plano Premium vitalício</h3>

                    <p>
                        Seu acesso premium é permanente como
                        reconhecimento pelo apoio ao projeto.
                    </p>

                    <small>
                        Membro desde{' '}
                        {formatedDate(user.createdAt)}
                    </small>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.noSubscriptionContainer}>
            <div className={styles.noSubscriptionIcon}>
                <Crown size={28} />
            </div>

            <div className={styles.noSubscriptionContent}>
                <span>Sem assinatura ativa</span>

                <h3>Escolha um plano para continuar</h3>

                <p>
                    Tenha acesso ao catálogo e aos recursos
                    disponíveis para assinantes.
                </p>
            </div>

            <button
                type="button"
                className={styles.choosePlanButton}
                onClick={handleChoosePlan}
            >
                <span>Ver planos disponíveis</span>
                <ChevronRight size={19} />
            </button>
        </div>
    )
}