import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
import { formatedDate } from '@/utils/UtilitiesFunctions'

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

export default function SubscriptionPage({
    subscription,
}: SubscriptionPageProps) {
    const router = useRouter()

    const [assinatura, setAssinatura] =
        useState<SubDataEFIReponse | null>(
            subscription.data ?? null,
        )

    const [showCancelModal, setShowCancelModal] =
        useState<boolean>(false)

    const [changeMethodModal, setChangeMethodModal] =
        useState<boolean>(false)

    const [chargeModalOpen, setChargeModalOpen] =
        useState<boolean>(false)

    const [chargeDetails, setChargeDetails] =
        useState<ChargeDetailResponse | null>(null)

    const [loadingCharge, setLoadingCharge] =
        useState<boolean>(false)

    const [cancelling, setCancelling] =
        useState<boolean>(false)

    const openChargeModal = async (
        chargeId: number,
    ): Promise<void> => {
        setChargeModalOpen(true)
        setLoadingCharge(true)
        setChargeDetails(null)

        try {
            const response =
                await userMethod.getChargeDetails(chargeId)

            setChargeDetails(response)
        } catch (error) {
            debug.log(
                'Erro ao buscar detalhes da cobrança',
                error,
            )

            toast.error(
                'Não foi possível carregar os detalhes da cobrança.',
            )

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

        const response =
            await userMethod.getSubscriptionDetails(
                assinatura.subscription_id,
            )

        if (!response?.data) return

        setAssinatura(response.data)
    }

    const handleConfirmCancel = async (): Promise<void> => {
        if (!assinatura || cancelling) return

        setCancelling(true)

        try {
            await apiSub.delete(
                `/subscription/${assinatura.subscription_id}`,
            )

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

    const active = isSubscriptionActive(
        assinatura.status,
    )

    const subscriptionStatus =
        Normalize.subscriptionStatus(
            assinatura.status,
        )

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
                        </div>
                    </section>

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
















/*import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import { userMethod } from '@/classes/userMethods'
import { SubDataEFIReponse, SubDetailsResponseProps } from '@/@types/subscriptions/subDetails'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, CreditCard, FileDown, Info, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiSub } from '@/services/apiSubManager'
import { debug } from '@/classes/DebugLogger'
import CancelSubModal from '@/components/ui/CancelSubModal'
import { useRouter } from 'next/navigation'
import { formatedDate } from '@/utils/UtilitiesFunctions'
import { ChargeDetailResponse } from '@/@types/efi/chargeEfi'
import ChargeModal from '@/components/ui/ChargeModal'
import { IoIosArrowBack } from 'react-icons/io'
import { Normalize } from '@/classes/Normalize'
import { FaExchangeAlt } from 'react-icons/fa'
import ChangeMethodModal from '@/components/ui/ChangeMethodModal'

interface SubscriptionPageProps {
    subscription: SubDetailsResponseProps
}

export default function SubscriptionPage({ subscription }: SubscriptionPageProps) {
    const router = useRouter()

    const [showCancelModal, setShowCancelModal] = useState<boolean>(false)

    const [chargeModalOpen, setChargeModalOpen] = useState<boolean>(false)
    const [chargeDetails, setChargeDetails] = useState<ChargeDetailResponse | null>(null)
    const [loadingCharge, setLoadingCharge] = useState<boolean>(false)
    const [cancelling, setCancelling] = useState<boolean>(false)
    const [changeMethodModal, setChangeMethodModal] = useState<boolean>(false)

    const [assinatura, setAssinatura] = useState<SubDataEFIReponse | null>(null)

    useEffect(() => {
        if (!subscription.data) return
        const data = subscription.data
        setAssinatura(data)
    }, [subscription])

    const openChargeModal = async (chargeId: number) => {
        setChargeModalOpen(true)
        setLoadingCharge(true)

        try {
            const response = await userMethod.getChargeDetails(chargeId)
            setChargeDetails(response)

        } catch (err) {
            console.log("Erro ao buscar detalhes da cobrança", err)
        } finally {
            setLoadingCharge(false)
        }
    }
    const closeChargeModal = () => {
        setChargeModalOpen(false)
        setChargeDetails(null)
    }

    const handleShowCancelModal = () => {
        setShowCancelModal(!showCancelModal)
    }

    const handleConfirmCancel = async () => {
        if (cancelling) return
        setCancelling(true)
        try {
            const cancelar = await apiSub.delete(`/subscription/${assinatura?.subscription_id}`)
            toast.success("Assinatura cancelada!")
            debug.log("Assinatura cancelada", cancelar.data)
            //router.refresh()
            const refreshData = await userMethod.getSubscriptionDetails(assinatura?.subscription_id ?? 0)
            if (!refreshData) return
            setAssinatura(refreshData.data)

        } catch (err) {
            toast.error("Ocorreu um erro ao cancelar sua assinatura. Tente novamente mais tarde, ou entre em contato!")
            debug.log("Erro ao cancelar assinatura", err)
        } finally {
            setCancelling(false)
            setShowCancelModal(false)
            //router.refresh()
        }
    }

    const changePayment = () => {
        setChangeMethodModal(true)
        try {

            //toast.success("Metodo alterado com sucesso")
        } catch (err) {
            debug.log("Erro ao alterar metodo de pagamento.", err)
            toast.error("Erro ao alterar método de pagamento. Tente novamente mais tarde ou entre me contato com o suporte.")
        } finally {
            //setChangeMethodModal(false)
        }
    }

    return (
        <>
            <Head>
                <title>Gerencie sua Assinatura</title>
                <meta name='description' content='Pagina de gerenciamento de assinatura' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            <main className={styles.container}>
                {assinatura ?
                    <div className={styles.card}>
                        <h1 className={styles.title}>
                            <IoIosArrowBack size={35} onClick={() => router.push('/me')} />
                            Detalhes da Assinatura
                        </h1>

                        <div className={styles.actions}>
                            {
                                assinatura.status === "active" || "new_charge" ?
                                    <>
                                        {
                                            /*
                                            <button className={styles.actionPrimary}>
                                            <CreditCard size={18} />
                                            Atualizar Plano
                                        </button>

                                        <button className={styles.actionSecondary}>
                                            <FileDown size={18} />
                                            Baixar Último Boleto
                                        </button>
                                            
                                        }

                                        <button className={styles.actionDanger} onClick={handleShowCancelModal}>
                                            <XCircle size={18} />
                                            Cancelar Assinatura
                                        </button>
                                    </>
                                    : <>
                                        <button className={styles.actionPrimary} onClick={() => router.push('/me/escolher-plano')}>
                                            <CreditCard size={18} />
                                            Reativar Assinatura
                                        </button>
                                    </>
                            }
                        </div>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Informações gerais</h2>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span>Valor</span>
                                    <strong>R$ {(assinatura.value / 100).toFixed(2)}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Status</span>
                                    <strong>{Normalize.subscriptionStatus(assinatura.status)}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Método de Pagamento <FaExchangeAlt onClick={changePayment} title="Alterar método de pagamento" /></span>
                                    <strong>{assinatura.payment_method === "banking_billet" ? "Boleto Bancário" : "Cartão de Crédito"}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Próximo Vencimento</span>
                                    <strong>{formatedDate(assinatura.next_expire_at ?? "")}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Plano</span>
                                    <strong>{assinatura.plan.name}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Criado em</span>
                                    <strong>{formatedDate(assinatura.created_at)}</strong>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Histórico</h2>

                            <ul className={styles.historyList}>
                                {assinatura.history.map((item, index) => {
                                    const status = Normalize.billetStatus(item.status)
                                    return (
                                        <li
                                            key={index}
                                            className={styles.historyItem}
                                            onClick={() => openChargeModal(item.charge_id)}
                                        >
                                            <div>
                                                <p className={styles.historyLabel}>Cobrança</p>
                                                <p className={styles.historyValue}>{item.charge_id}</p>
                                            </div>
                                            <div>
                                                <p className={styles.historyLabel}>Status</p>
                                                <p className={styles.historyValue}>{status}</p>
                                            </div>
                                            <div>
                                                <p className={styles.historyLabel}>Data de Emissão</p>
                                                <p className={styles.historyValue}>{formatedDate(item.created_at)}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                        {showCancelModal && <CancelSubModal handleConfirmCancel={handleConfirmCancel} handleShowCancelModal={handleShowCancelModal} cancelling={cancelling} />}
                        {chargeModalOpen && <ChargeModal chargeDetails={chargeDetails} method={assinatura.payment_method} closeChargeModal={closeChargeModal} loadingCharge={loadingCharge} />}
                    </div>
                    : <div>Carregando...</div>
                }
                {changeMethodModal && <ChangeMethodModal closeModal={() => setChangeMethodModal(false)} before={assinatura?.payment_method === 'banking_billet' ? 'billet' : 'credit'} setNewMethod={() => { }} />}
            </main>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    const subscription = await userMethod.getSubscriptionDetails(Number(id))
    return {
        props: {
            subscription
        }
    }
}*/