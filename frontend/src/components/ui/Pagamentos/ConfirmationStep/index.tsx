import {
    useEffect,
    useState,
} from 'react'
import Link from 'next/link'

import {
    PaymentApiResponse,
    PaymentMethod,
    PaymentResponseData,
    PaymentStatus,
} from '@/pages/payment'

import styles from './styles.module.scss'

interface ConfirmationStepProps {
    email: string
    paymentMethod: PaymentMethod
    paymentStatus: PaymentStatus
    paymentResult:
    | PaymentApiResponse
    | null
    onBack: () => void
}

export function ConfirmationStep({
    email,
    paymentMethod,
    paymentStatus,
    paymentResult,
    onBack,
}: ConfirmationStepProps) {
    if (
        paymentStatus === 'idle' ||
        paymentStatus === 'processing'
    ) {
        return <ProcessingContent />
    }

    if (
        paymentStatus === 'failed' ||
        !paymentResult
    ) {
        return (
            <FailedContent
                onBack={onBack}
            />
        )
    }

    const paymentData =
        paymentResult.subscription.data

    if (
        paymentData.payment ===
        'banking_billet'
    ) {
        return (
            <BilletContent
                email={email}
                data={paymentData}
            />
        )
    }

    if (
        paymentData.payment ===
        'credit_card'
    ) {
        return (
            <CreditCardConfirmedContent
                email={email}
                data={paymentData}
            />
        )
    }

    return (
        <FailedContent
            message="A forma de pagamento retornada não foi reconhecida."
            onBack={onBack}
        />
    )
}

function ProcessingContent() {
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Processamento
                </span>

                <h1>
                    Processando pagamento
                </h1>

                <p>
                    Os dados estão sendo enviados
                    para o processador de
                    pagamentos.
                </p>
            </header>

            <div
                className={
                    styles.processingContent
                }
                role="status"
                aria-live="polite"
            >
                <div className={styles.loader} />

                <strong>
                    Aguarde um momento
                </strong>

                <p>
                    Não feche nem atualize esta
                    página durante o processamento.
                </p>
            </div>
        </section>
    )
}

interface FailedContentProps {
    message?: string
    onBack: () => void
}

function FailedContent({
    message,
    onBack,
}: FailedContentProps) {
    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Pagamento
                </span>

                <h1>
                    Não foi possível concluir
                </h1>

                <p>
                    Revise os dados informados antes
                    de tentar novamente.
                </p>
            </header>

            <div className={styles.failedContent}>
                <div className={styles.failedIcon}>
                    !
                </div>

                <strong>
                    Pagamento não processado
                </strong>

                <p>
                    {message ??
                        'O processador não conseguiu concluir a operação.'}
                </p>

                <button
                    type="button"
                    className={styles.backButton}
                    onClick={onBack}
                >
                    Revisar dados
                </button>
            </div>
        </section>
    )
}

interface CreditCardConfirmedContentProps {
    email: string
    data: PaymentResponseData
}

function CreditCardConfirmedContent({
    email,
    data,
}: CreditCardConfirmedContentProps) {
    const formattedTotal =
        formatCurrency(data.total)

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Pagamento confirmado
                </span>

                <h1>
                    Assinatura criada com sucesso
                </h1>

                <p>
                    O pagamento por cartão foi
                    processado e sua assinatura foi
                    criada.
                </p>
            </header>

            <div
                className={
                    styles.confirmedContent
                }
            >
                <div
                    className={
                        styles.successIcon
                    }
                >
                    ✓
                </div>

                <div
                    className={
                        styles.confirmedMessage
                    }
                >
                    <strong>
                        Assinatura liberada
                    </strong>

                    <p>
                        Os dados da assinatura serão
                        enviados para:
                    </p>

                    <span>{email}</span>
                </div>

                <ul
                    className={
                        styles.statusList
                    }
                >
                    <li>
                        <span>✓</span>
                        Conta criada
                    </li>

                    <li>
                        <span>✓</span>
                        Pagamento processado
                    </li>

                    <li>
                        <span>✓</span>
                        Assinatura criada
                    </li>
                </ul>

                <div className={styles.paymentInfo}>
                    <PaymentInfoItem
                        label="Assinatura"
                        value={String(
                            data.subscription_id,
                        )}
                    />

                    <PaymentInfoItem
                        label="Cobrança"
                        value={String(
                            data.charge.id,
                        )}
                    />

                    <PaymentInfoItem
                        label="Valor"
                        value={formattedTotal}
                    />

                    <PaymentInfoItem
                        label="Parcelas"
                        value={String(
                            data.charge.parcel,
                        )}
                    />

                    <PaymentInfoItem
                        label="Primeira execução"
                        value={
                            data.first_execution
                        }
                    />
                </div>

                <div className={styles.actions}>
                    <Link
                        href="/login"
                        className={
                            styles.primaryAction
                        }
                        target='_blank'
                        rel='noopener noferrer'
                    >
                        Entrar na conta
                    </Link>

                    <Link
                        href="/suporte"
                        className={
                            styles.secondaryAction
                        }
                        target='_blank'
                        rel='noopener noferrer'
                    >
                        Preciso de ajuda
                    </Link>
                </div>
            </div>
        </section>
    )
}

interface BilletContentProps {
    email: string
    data: PaymentResponseData
}

function BilletContent({ email, data }: BilletContentProps) {
    const [copiedField, setCopiedField] = useState<'barcode' | 'pix' | null>(null)

    const barcode = data.barcode
    const pixCode = data.pix?.qrcode
    const pixImage =
        data.pix?.qrcode_image

    const pdfLink = data.pdf?.charge
    const billetLink =
        data.billet_link ?? data.link

    const formattedTotal =
        formatCurrency(data.total)

    const formattedExpiration =
        formatDate(data.expire_at)

    useEffect(() => {
        if (!copiedField) return

        const timeout = window.setTimeout(
            () => {
                setCopiedField(null)
            },
            3000,
        )

        return () => {
            window.clearTimeout(timeout)
        }
    }, [copiedField])

    const copyText = async (
        value: string,
        field: 'barcode' | 'pix',
    ) => {
        try {
            await navigator.clipboard.writeText(
                value,
            )

            setCopiedField(field)
        } catch {
            setCopiedField(null)
        }
    }

    return (
        <section className={styles.card}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>
                    Boleto gerado
                </span>

                <h1>
                    Sua assinatura foi criada
                </h1>

                <p>
                    Realize o pagamento para liberar
                    o acesso à assinatura.
                </p>
            </header>

            <div className={styles.billetContent}>
                <div className={styles.billetIntro}>
                    <div
                        className={
                            styles.documentIcon
                        }
                    >
                        ▤
                    </div>

                    <div>
                        <strong>
                            Aguardando pagamento
                        </strong>

                        <p>
                            As informações também
                            serão enviadas para:
                        </p>

                        <span>{email}</span>
                    </div>
                </div>

                <div className={styles.paymentInfo}>
                    <PaymentInfoItem
                        label="Valor"
                        value={formattedTotal}
                    />

                    <PaymentInfoItem
                        label="Vencimento"
                        value={
                            formattedExpiration
                        }
                    />

                    <PaymentInfoItem
                        label="Assinatura"
                        value={String(
                            data.subscription_id,
                        )}
                    />

                    <PaymentInfoItem
                        label="Cobrança"
                        value={String(
                            data.charge.id,
                        )}
                    />
                </div>

                {(pixImage || pdfLink) && (
                    <div
                        className={
                            styles.paymentOptions
                        }
                    >
                        {pixImage && (
                            <div
                                className={
                                    styles.paymentOption
                                }
                            >
                                <h2>
                                    Pagar com Pix
                                </h2>

                                <div
                                    className={
                                        styles.qrCodeContainer
                                    }
                                >
                                    <img
                                        src={pixImage}
                                        alt="QR Code Pix para pagamento do boleto"
                                        className={
                                            styles.qrCode
                                        }
                                    />
                                </div>

                                <p>
                                    Abra o aplicativo
                                    do banco e escaneie
                                    o QR Code.
                                </p>
                            </div>
                        )}

                        {pdfLink && (
                            <div
                                className={
                                    styles.paymentOption
                                }
                            >
                                <h2>
                                    Boleto em PDF
                                </h2>

                                <div
                                    className={
                                        styles.pdfIcon
                                    }
                                >
                                    PDF
                                </div>

                                <p>
                                    Abra o documento
                                    para visualizar,
                                    salvar ou imprimir.
                                </p>

                                <a
                                    href={pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={
                                        styles.pdfLink
                                    }
                                >
                                    Abrir boleto
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {pixCode && (
                    <CopyablePaymentCode
                        title="Pix copia e cola"
                        description="Copie o código e use a opção Pix copia e cola no aplicativo do seu banco."
                        value={pixCode}
                        copied={
                            copiedField === 'pix'
                        }
                        copyLabel="Copiar código Pix"
                        onCopy={() =>
                            copyText(
                                pixCode,
                                'pix',
                            )
                        }
                    />
                )}

                {barcode && (
                    <CopyablePaymentCode
                        title="Linha digitável"
                        description="Use este código para pagar o boleto pelo aplicativo ou internet banking."
                        value={barcode}
                        copied={
                            copiedField ===
                            'barcode'
                        }
                        copyLabel="Copiar linha digitável"
                        onCopy={() =>
                            copyText(
                                barcode,
                                'barcode',
                            )
                        }
                    />
                )}

                {billetLink && (
                    <a
                        href={billetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                            styles.openDocument
                        }
                    >
                        Visualizar boleto completo
                    </a>
                )}

                {!pixImage &&
                    !pixCode &&
                    !barcode &&
                    !pdfLink &&
                    !billetLink && (
                        <div
                            className={
                                styles.missingPaymentData
                            }
                            role="alert"
                        >
                            <strong>
                                Dados para pagamento
                                indisponíveis
                            </strong>

                            <p>
                                A assinatura foi criada,
                                mas não recebemos os
                                dados do boleto. Consulte
                                seu e-mail ou fale com o
                                suporte.
                            </p>
                        </div>
                    )}

                <div className={styles.billetNotice}>
                    <span>i</span>

                    <p>
                        A assinatura será liberada
                        depois que o banco confirmar o
                        pagamento. A compensação do
                        boleto pode levar até 3 dias úteis. Verifique seu email ou fale com o suporte.
                    </p>
                </div>

                <div className={styles.actions}>
                    <Link
                        href="/login"
                        className={
                            styles.secondaryAction
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Ir para o login
                    </Link>

                    <Link
                        href="/suporte"
                        className={
                            styles.secondaryAction
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Falar com o suporte
                    </Link>
                </div>
            </div>
        </section>
    )
}

interface PaymentInfoItemProps {
    label: string
    value: string
}

function PaymentInfoItem({
    label,
    value,
}: PaymentInfoItemProps) {
    return (
        <div className={styles.paymentInfoItem}>
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    )
}

interface CopyablePaymentCodeProps {
    title: string
    description: string
    value: string
    copied: boolean
    copyLabel: string
    onCopy: () => void
}

function CopyablePaymentCode({
    title,
    description,
    value,
    copied,
    copyLabel,
    onCopy,
}: CopyablePaymentCodeProps) {
    return (
        <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
                <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                </div>

                <button
                    type="button"
                    onClick={onCopy}
                    className={
                        styles.copyButton
                    }
                >
                    {copied
                        ? 'Código copiado'
                        : copyLabel}
                </button>
            </div>

            <p className={styles.codeText}>
                {value}
            </p>

            <span
                className={styles.copyFeedback}
                aria-live="polite"
            >
                {copied
                    ? 'Código copiado para a área de transferência.'
                    : ''}
            </span>
        </div>
    )
}

function formatCurrency(
    valueInCents: number,
): string {
    return new Intl.NumberFormat(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
        },
    ).format(valueInCents / 100)
}

function formatDate(
    value?: string,
): string {
    if (!value) {
        return 'Não informado'
    }

    const [year, month, day] =
        value.split('-')

    if (!year || !month || !day) {
        return value
    }

    return `${day}/${month}/${year}`
}