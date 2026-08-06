import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    CreditCard,
    History,
    RefreshCw,
    ReceiptText,
    ShieldCheck,
    XCircle,
    Hourglass,
} from 'lucide-react'

import styles from './styles.module.scss'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CancelSubModal from '@/components/ui/CancelSubModal'
import ChargeModal from '@/components/ui/ChargeModal'
import ChangeMethodModal from '@/components/ui/ChangeMethodModal'

import {
    SubDataEFIReponse,
    SubDetailsResponseProps,
} from '@/@types/subscriptions/subDetails'

import { ChargeDetailResponse } from '@/@types/efi/chargeEfi'

import { userMethod } from '@/classes/userMethods'
import { Normalize } from '@/classes/Normalize'
import { debug } from '@/classes/DebugLogger'

import { apiSub } from '@/services/apiSubManager'
import { formatedDate, getTrialInfo, TrialInfo } from '@/utils/UtilitiesFunctions'

import { toast } from 'react-toastify'

interface SubscriptionPageProps {
    subscription: SubDetailsResponseProps
}

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

const getSubscriptionStatusClass = (
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

const isSubscriptionActive = (status: string): boolean => {
    return ['active', 'new_charge'].includes(status)
}

export default function SubscriptionPage({ subscription }: SubscriptionPageProps) {
    const router = useRouter()

    const [assinatura, setAssinatura] = useState<SubDataEFIReponse | null>(subscription.data ?? null,)

    const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
    const [changeMethodModal, setChangeMethodModal] = useState<boolean>(false)

    const [chargeModalOpen, setChargeModalOpen] = useState<boolean>(false)
    const [chargeDetails, setChargeDetails] = useState<ChargeDetailResponse | null>(null)

    const [loadingCharge, setLoadingCharge] = useState<boolean>(false)
    const [cancelling, setCancelling] = useState<boolean>(false)

    const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null)

    useEffect(() => {
        if (!assinatura) return
        const trialInfo = getTrialInfo(assinatura)
        setTrialInfo(trialInfo)
    }, [assinatura])

    const openChargeModal = async (chargeId: number,): Promise<void> => {
        setChargeModalOpen(true)
        setLoadingCharge(true)
        setChargeDetails(null)

        try {
            const response = await userMethod.getChargeDetails(chargeId)

            setChargeDetails(response)
        } catch (error) {
            debug.log('Erro ao buscar detalhes da cobrança', error,)

            toast.error('Não foi possível carregar os detalhes da cobrança.',)

            setChargeModalOpen(false)
        } finally {
            setLoadingCharge(false)
        }
    }

    const closeChargeModal = (): void => {
        setChargeModalOpen(false)
        setChargeDetails(null)
    }

    const refreshSubscription = async (): Promise<void> => {
        if (!assinatura) return

        const response = await userMethod.getSubscriptionDetails(assinatura.subscription_id)

        if (!response?.data) return

        setAssinatura(response.data)



    }

    const handleConfirmCancel = async (): Promise<void> => {
        if (!assinatura || cancelling) return

        setCancelling(true)

        try {
            await apiSub.delete(`/subscription/${assinatura.subscription_id}`,)

            await refreshSubscription()

            toast.success('Assinatura cancelada.')
        } catch (error) {
            debug.log(
                'Erro ao cancelar assinatura',
                error,
            )

            toast.error(
                'Não foi possível cancelar sua assinatura. Tente novamente mais tarde.',
            )
        } finally {
            setCancelling(false)
            setShowCancelModal(false)
        }
    }

    if (!assinatura) {
        return (
            <>
                <Head>
                    <title>Gerencie sua assinatura</title>
                </Head>

                <Header />

                <main className={styles.container}>
                    <div className={styles.loadingCard}>
                        <RefreshCw
                            size={34}
                            className={styles.loadingIcon}
                        />

                        <strong>Carregando assinatura</strong>

                        <span>
                            Buscando os dados do seu plano...
                        </span>
                    </div>
                </main>

                <Footer />
            </>
        )
    }

    const active = isSubscriptionActive(assinatura.status,)

    const subscriptionStatus =
        Normalize.subscriptionStatus(assinatura.status,)

    return (
        <>
            <Head>
                <title>Gerencie sua assinatura</title>

                <meta
                    name="description"
                    content="Gerencie os dados, pagamentos e cobranças da sua assinatura."
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <header className={styles.pageHeader}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => router.push('/me')}
                            aria-label="Voltar para minha conta"
                        >
                            <ArrowLeft size={21} />
                        </button>

                        <div className={styles.headerText}>
                            <span>Minha conta</span>

                            <h1>Detalhes da assinatura</h1>

                            <p>
                                Gerencie seu plano, forma de
                                pagamento e cobranças.
                            </p>
                        </div>

                        <span
                            className={`
                                ${styles.statusBadge}
                                ${getSubscriptionStatusClass(
                                assinatura.status,
                            )}
                            `}
                        >
                            {subscriptionStatus}
                        </span>
                    </header>

                    <section className={styles.subscriptionHero}>
                        <div className={styles.planInfo}>
                            <div className={styles.planIcon}>
                                <ShieldCheck size={28} />
                            </div>

                            <div>
                                <span>Plano atual</span>

                                <h2>{assinatura.plan.name}</h2>

                                <p>
                                    Assinatura #
                                    {assinatura.subscription_id}
                                </p>
                            </div>
                        </div>

                        <div className={styles.planPrice}>
                            <span>Valor da assinatura</span>

                            <strong>
                                {formatCurrency(
                                    assinatura.value,
                                )}
                            </strong>

                            <small>por ciclo de cobrança</small>
                        </div>
                    </section>
                    {trialInfo && (
                        <section className={styles.trialNotice}>
                            <div className={styles.trialIcon}>
                                <Hourglass size={22} />
                            </div>

                            <div className={styles.trialContent}>
                                <span>Período gratuito ativo</span>

                                <strong>
                                    {trialInfo.remainingDays === 1
                                        ? '1 dia de teste restante'
                                        : `${trialInfo.remainingDays} dias de teste restantes`}
                                </strong>

                                <p>
                                    Seu período gratuito termina em{' '}
                                    {formatedDate(trialInfo.endsAt)}.
                                </p>
                            </div>
                        </section>
                    )}

                    <section className={styles.summaryGrid}>
                        <article className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>
                                <CreditCard size={21} />
                            </div>

                            <div>
                                <span>Forma de pagamento</span>

                                <strong>
                                    {getPaymentMethodLabel(
                                        assinatura.payment_method || '',
                                    )}
                                </strong>
                            </div>
                        </article>




                        {
                            active ?
                                <article className={styles.summaryCard}>
                                    <div className={styles.summaryIcon}>
                                        <CalendarDays size={21} />
                                    </div>

                                    <div>
                                        <span>Próximo vencimento</span>

                                        <strong>
                                            {assinatura.next_expire_at
                                                ? formatedDate(
                                                    assinatura.next_expire_at,
                                                )
                                                : 'Não definido'}
                                        </strong>
                                    </div>
                                </article>
                                : <></>
                        }


                        <article className={styles.summaryCard}>
                            <div className={styles.summaryIcon}>
                                <Clock3 size={21} />
                            </div>

                            <div>
                                <span>Assinatura criada em</span>

                                <strong>
                                    {formatedDate(
                                        assinatura.created_at,
                                    )}
                                </strong>
                            </div>
                        </article>
                    </section>

                    <section className={styles.actionsSection}>
                        <div className={styles.sectionHeading}>
                            <div>
                                <span>Gerenciamento</span>
                                <h2>Ações da assinatura</h2>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            {active ? (
                                <>
                                    <button
                                        type="button"
                                        className={
                                            styles.actionPrimary
                                        }
                                        onClick={() =>
                                            setChangeMethodModal(
                                                true,
                                            )
                                        }
                                    >
                                        <CreditCard size={18} />

                                        <div>
                                            <strong>
                                                Alterar pagamento
                                            </strong>

                                            <span>
                                                Escolha outro método
                                            </span>
                                        </div>

                                        <ChevronRight size={18} />
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            styles.actionDanger
                                        }
                                        onClick={() =>
                                            setShowCancelModal(
                                                true,
                                            )
                                        }
                                    >
                                        <XCircle size={18} />

                                        <div>
                                            <strong>
                                                Cancelar assinatura
                                            </strong>

                                            <span>
                                                Interromper renovação
                                            </span>
                                        </div>

                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className={
                                        styles.actionPrimary
                                    }
                                    onClick={() =>
                                        router.push(
                                            '/me/escolher-plano',
                                        )
                                    }
                                >
                                    <RefreshCw size={18} />

                                    <div>
                                        <strong>
                                            Reativar assinatura
                                        </strong>

                                        <span>
                                            Escolha um novo plano
                                        </span>
                                    </div>

                                    <ChevronRight size={18} />
                                </button>
                            )}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeading}>
                            <div>
                                <span>Detalhes</span>
                                <h2>Informações gerais</h2>
                            </div>

                            <ReceiptText size={22} />
                        </div>

                        <div className={styles.infoGrid}>
                            {active ?
                                <>
                                    <div className={styles.infoItem}>
                                        <span>Identificador</span>

                                        <strong>
                                            #
                                            {
                                                assinatura.subscription_id
                                            }
                                        </strong>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span>Status</span>

                                        <strong>
                                            {subscriptionStatus}
                                        </strong>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span>Plano contratado</span>

                                        <strong>
                                            {assinatura.plan.name}
                                        </strong>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span>Valor</span>

                                        <strong>
                                            {formatCurrency(
                                                assinatura.value,
                                            )}
                                        </strong>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span>Forma de pagamento</span>

                                        <strong>
                                            {getPaymentMethodLabel(
                                                assinatura.payment_method || '',
                                            )}
                                        </strong>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <span>Próximo vencimento</span>

                                        <strong>
                                            {assinatura.next_expire_at
                                                ? formatedDate(
                                                    assinatura.next_expire_at,
                                                )
                                                : 'Não definido'}
                                        </strong>
                                    </div>
                                </>
                                : <>
                                    <div className={styles.infoItem}>
                                        <span>Status</span>

                                        <strong>
                                            {subscriptionStatus}
                                        </strong>
                                    </div>
                                </>
                            }
                        </div>
                    </section>

                    {
                        active ? <>
                            <section className={styles.section}>
                                <div className={styles.sectionHeading}>
                                    <div>
                                        <span>Cobranças</span>
                                        <h2>Histórico de pagamentos</h2>
                                    </div>

                                    <History size={22} />
                                </div>

                                {assinatura.history.length > 0 ? (
                                    <div className={styles.historyList}>
                                        {assinatura.history.map(
                                            (item, index) => {
                                                const status =
                                                    Normalize.billetStatus(
                                                        item.status,
                                                    )

                                                return (
                                                    <button
                                                        type="button"
                                                        key={`${item.charge_id}-${index}`}
                                                        className={
                                                            styles.historyItem
                                                        }
                                                        onClick={() =>
                                                            openChargeModal(
                                                                item.charge_id,
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.chargeIcon
                                                            }
                                                        >
                                                            <CircleDollarSign
                                                                size={21}
                                                            />
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.chargeMain
                                                            }
                                                        >
                                                            <span>
                                                                Cobrança
                                                            </span>

                                                            <strong>
                                                                #
                                                                {
                                                                    item.charge_id
                                                                }
                                                            </strong>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.chargeDetail
                                                            }
                                                        >
                                                            <span>
                                                                Status
                                                            </span>

                                                            <strong>
                                                                {status}
                                                            </strong>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.chargeDetail
                                                            }
                                                        >
                                                            <span>
                                                                Emitida em
                                                            </span>

                                                            <strong>
                                                                {formatedDate(
                                                                    item.created_at,
                                                                )}
                                                            </strong>
                                                        </div>

                                                        <ChevronRight
                                                            size={20}
                                                            className={
                                                                styles.chargeArrow
                                                            }
                                                        />
                                                    </button>
                                                )
                                            },
                                        )}
                                    </div>
                                ) : (
                                    <div className={styles.emptyHistory}>
                                        <ReceiptText size={28} />

                                        <strong>
                                            Nenhuma cobrança encontrada
                                        </strong>

                                        <span>
                                            O histórico aparecerá quando
                                            uma cobrança for gerada.
                                        </span>
                                    </div>
                                )}
                            </section>
                        </> : <>
                        </>
                    }
                </div>

                {showCancelModal && (
                    <CancelSubModal
                        handleConfirmCancel={
                            handleConfirmCancel
                        }
                        handleShowCancelModal={() =>
                            setShowCancelModal(false)
                        }
                        cancelling={cancelling}
                    />
                )}

                {chargeModalOpen && (
                    <ChargeModal
                        chargeDetails={chargeDetails}
                        method={
                            assinatura.payment_method
                        }
                        closeChargeModal={
                            closeChargeModal
                        }
                        loadingCharge={loadingCharge}
                    />
                )}

                {changeMethodModal && (
                    <ChangeMethodModal
                        closeModal={() =>
                            setChangeMethodModal(false)
                        }
                        before={
                            assinatura.payment_method ===
                                'banking_billet'
                                ? 'billet'
                                : 'credit'
                        }
                        setNewMethod={async () => {
                            await refreshSubscription()
                            setChangeMethodModal(false)
                        }}
                    />
                )}
            </main>

            <Footer />
        </>
    )
}

export const getServerSideProps:
    GetServerSideProps<SubscriptionPageProps> = async (
        context,
    ) => {
        const { id } = context.params as {
            id: string
        }

        const parsedId = Number(id)

        if (
            !Number.isInteger(parsedId)
            || parsedId <= 0
        ) {
            return {
                notFound: true,
            }
        }

        try {
            const subscription =
                await userMethod.getSubscriptionDetails(
                    parsedId,
                )

            if (!subscription?.data) {
                return {
                    notFound: true,
                }
            }

            return {
                props: {
                    subscription,
                },
            }
        } catch (error) {
            return {
                notFound: true,
            }
        }
    }