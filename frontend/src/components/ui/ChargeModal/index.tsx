import {
    CalendarDays,
    CircleDollarSign,
    Clock3,
    CreditCard,
    ExternalLink,
    FileText,
    Loader2,
    ReceiptText,
    UserRound,
    X,
} from 'lucide-react'

import styles from './styles.module.scss'

import {
    ChargeData,
    ChargeDetailResponse,
    History,
    Item,
} from '@/@types/efi/chargeEfi'

import { formatedDate } from '@/utils/UtilitiesFunctions'
import { Normalize } from '@/classes/Normalize'

interface ChargeModalProps {
    loadingCharge: boolean
    chargeDetails: ChargeDetailResponse | null
    method: 'banking_billet' | 'credit_card' | null
    closeChargeModal: () => void
}

type ChargeStatus =
    | 'paid'
    | 'waiting'
    | 'unpaid'
    | 'canceled'
    | 'refunded'
    | 'expired'
    | string

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value / 100)
}

const getPaymentMethodLabel = (
    method: ChargeData['payment']['method'],
): string => {
    const methods: Record<string, string> = {
        banking_billet: 'Boleto bancário',
        credit_card: 'Cartão de crédito',
        pix: 'Pix',
    }

    return methods[method] ?? method
}

const getStatusClassName = (status: ChargeStatus): string => {
    const statusClasses: Record<string, string> = {
        paid: styles.statusPaid,
        waiting: styles.statusPending,
        unpaid: styles.statusPending,
        canceled: styles.statusCanceled,
        refunded: styles.statusRefunded,
        expired: styles.statusExpired,
    }

    return statusClasses[status] ?? styles.statusDefault
}

const getItemTotal = (item: Item): number => {
    return item.value * item.amount
}

export default function ChargeModal({
    loadingCharge,
    chargeDetails,
    method,
    closeChargeModal,
}: ChargeModalProps) {
    const charge = chargeDetails?.data

    const paymentMessage = charge?.history.find(history => {
        return /pagamento de.*efetuado/i.test(history.message)
    })?.message

    const renderLoading = () => {
        return (
            <div className={styles.loadingArea}>
                <Loader2
                    className={styles.loadingIcon}
                    size={38}
                />

                <strong>Carregando cobrança</strong>
                <span>Buscando informações atualizadas...</span>
            </div>
        )
    }

    const renderPaymentActions = () => {
        if (!charge?.payment.banking_billet) return null

        const billet = charge.payment.banking_billet
        const canOpenBillet = !['paid', 'canceled'].includes(charge.status)

        if (!canOpenBillet) return null

        return (
            <div className={styles.paymentActions}>
                {billet.billet_link && (
                    <a
                        href={billet.billet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryLink}
                    >
                        <ExternalLink size={17} />
                        Abrir boleto
                    </a>
                )}

                {billet.pdf?.charge && (
                    <a
                        href={billet.pdf.charge}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryLink}
                    >
                        <FileText size={17} />
                        Visualizar PDF
                    </a>
                )}
            </div>
        )
    }

    const renderBankingBillet = () => {
        const billet = charge?.payment.banking_billet

        if (!billet) return null

        return (
            <div className={styles.paymentDetailsGrid}>
                <div className={styles.paymentDetail}>
                    <span>Vencimento</span>

                    <strong>
                        {formatedDate(billet.expire_at)}
                    </strong>
                </div>

                <div className={styles.paymentDetail}>
                    <span>Código de barras</span>

                    <strong className={styles.breakableValue}>
                        {billet.barcode || 'Não informado'}
                    </strong>
                </div>
            </div>
        )
    }

    const renderCreditCard = () => {
        const creditCard = charge?.payment.credit_card

        if (!creditCard) return null

        return (
            <div className={styles.paymentDetailsGrid}>
                <div className={styles.paymentDetail}>
                    <span>Cartão</span>
                    <strong>{creditCard.mask}</strong>
                </div>

                <div className={styles.paymentDetail}>
                    <span>Titular</span>
                    <strong>{creditCard.holder_name}</strong>
                </div>

                <div className={styles.paymentDetail}>
                    <span>Documento do titular</span>
                    <strong>{creditCard.holder_document}</strong>
                </div>

                <div className={styles.paymentDetail}>
                    <span>Parcelamento</span>

                    <strong>
                        {creditCard.installments}x de{' '}
                        {formatCurrency(creditCard.installment_value)}
                    </strong>
                </div>
            </div>
        )
    }

    const renderItems = () => {
        if (!charge?.items.length) {
            return (
                <p className={styles.emptyMessage}>
                    Nenhum item encontrado.
                </p>
            )
        }

        return (
            <div className={styles.itemsList}>
                {charge.items.map((item, index) => (
                    <div
                        className={styles.itemRow}
                        key={`${item.name}-${index}`}
                    >
                        <div className={styles.itemInfo}>
                            <strong>{item.name}</strong>

                            <span>
                                {item.amount} unidade
                                {item.amount !== 1 ? 's' : ''}
                                {' × '}
                                {formatCurrency(item.value)}
                            </span>
                        </div>

                        <strong className={styles.itemTotal}>
                            {formatCurrency(getItemTotal(item))}
                        </strong>
                    </div>
                ))}
            </div>
        )
    }

    const renderHistory = (history: History[]) => {
        if (!history.length) {
            return (
                <p className={styles.emptyMessage}>
                    Nenhum histórico disponível.
                </p>
            )
        }

        const orderedHistory = [...history].sort((first, second) => {
            return (
                new Date(second.created_at).getTime()
                - new Date(first.created_at).getTime()
            )
        })

        return (
            <div className={styles.timeline}>
                {orderedHistory.map((historyItem, index) => (
                    <div
                        className={styles.timelineItem}
                        key={`${historyItem.created_at}-${index}`}
                    >
                        <div className={styles.timelineMarker} />

                        <div className={styles.timelineContent}>
                            <strong>{historyItem.message}</strong>

                            <span>
                                {formatedDate(historyItem.created_at)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!loadingCharge && !charge) {
        return null
    }

    const normalizedStatus = Normalize.billetStatus(charge?.status)

    return (
        <div
            className={styles.modalOverlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="charge-modal-title"
        >
            <div className={styles.modalLarge}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={closeChargeModal}
                    aria-label="Fechar modal"
                >
                    <X size={22} />
                </button>

                {loadingCharge && renderLoading()}

                {!loadingCharge && charge && (
                    <>
                        <header className={styles.modalHeader}>
                            <div className={styles.headerIcon}>
                                <ReceiptText size={25} />
                            </div>

                            <div className={styles.headerContent}>
                                <span>Cobrança</span>

                                <h2 id="charge-modal-title">
                                    #{charge.charge_id}
                                </h2>

                                <p>
                                    Criada em {formatedDate(charge.created_at)}
                                </p>
                            </div>

                            <span
                                className={`
                                    ${styles.statusBadge}
                                    ${getStatusClassName(charge.status)}
                                `}
                            >
                                {normalizedStatus}
                            </span>
                        </header>

                        <section className={styles.summaryGrid}>
                            <article className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <CircleDollarSign size={21} />
                                </div>

                                <div>
                                    <span>Valor total</span>
                                    <strong>{formatCurrency(charge.total)}</strong>
                                </div>
                            </article>

                            <article className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <CreditCard size={21} />
                                </div>

                                <div>
                                    <span>Forma de pagamento</span>

                                    <strong>
                                        {getPaymentMethodLabel(
                                            charge.payment.method,
                                        )}
                                    </strong>
                                </div>
                            </article>

                            <article className={styles.summaryCard}>
                                <div className={styles.summaryIcon}>
                                    <CalendarDays size={21} />
                                </div>

                                <div>
                                    <span>Assinatura</span>

                                    <strong>
                                        #{charge.subscription.subscription_id}
                                    </strong>
                                </div>
                            </article>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionTitle}>
                                <CreditCard size={20} />
                                <h3>Pagamento</h3>
                            </div>

                            <div className={styles.paymentBox}>
                                <div className={styles.paymentHeader}>
                                    <div>
                                        <span>Método utilizado</span>

                                        <strong>
                                            {getPaymentMethodLabel(
                                                charge.payment.method,
                                            )}
                                        </strong>
                                    </div>

                                    <span className={styles.paymentDate}>
                                        {formatedDate(
                                            charge.payment.created_at,
                                        )}
                                    </span>
                                </div>

                                {method === 'banking_billet'
                                    && renderBankingBillet()}

                                {method === 'credit_card'
                                    && renderCreditCard()}

                                {paymentMessage && (
                                    <div className={styles.paymentMessage}>
                                        {paymentMessage}
                                    </div>
                                )}

                                {charge.payment.message && (
                                    <div className={styles.paymentMessage}>
                                        {charge.payment.message}
                                    </div>
                                )}

                                {renderPaymentActions()}
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionTitle}>
                                <UserRound size={20} />
                                <h3>Cliente</h3>
                            </div>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoCard}>
                                    <span>Nome</span>
                                    <strong>{charge.customer.name}</strong>
                                </div>

                                <div className={styles.infoCard}>
                                    <span>CPF</span>
                                    <strong>{charge.customer.cpf}</strong>
                                </div>

                                <div
                                    className={`
                                        ${styles.infoCard}
                                        ${styles.infoEmail}
                                    `}
                                >
                                    <span>E-mail</span>
                                    <strong>{charge.customer.email}</strong>
                                </div>

                                <div className={styles.infoCard}>
                                    <span>Telefone</span>

                                    <strong>
                                        {charge.customer.phone_number}
                                    </strong>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionTitle}>
                                <ReceiptText size={20} />
                                <h3>Itens da cobrança</h3>
                            </div>

                            {renderItems()}
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionTitle}>
                                <Clock3 size={20} />
                                <h3>Histórico</h3>
                            </div>

                            {renderHistory(charge.history)}
                        </section>

                        <footer className={styles.modalActions}>
                            <button
                                type="button"
                                className={styles.modalCancel}
                                onClick={closeChargeModal}
                            >
                                Fechar
                            </button>
                        </footer>
                    </>
                )}
            </div>
        </div>
    )
}