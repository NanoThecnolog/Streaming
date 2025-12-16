import Head from 'next/head'
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import { userMethod } from '@/classes/userMethods'
import { SubDetailsResponseProps } from '@/@types/subscriptions/subDetails'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, CreditCard, FileDown, Info, XCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { apiSub } from '@/services/apiSubManager'
import { debug } from '@/classes/DebugLogger'
import CancelSubModal from '@/components/ui/CancelSubModal'
import { useRouter } from 'next/navigation'
import { formatedDate } from '@/utils/UtilitiesFunctions'
import { ChargeDetailResponse } from '@/@types/efi/chargeEfi'
import ChargeModal from '@/components/ui/ChargeModal'
import { IoIosArrowBack } from 'react-icons/io'

interface SubscriptionPageProps {
    subscription: SubDetailsResponseProps
}

export default function SubscriptionPage({ subscription }: SubscriptionPageProps) {
    const router = useRouter()
    const data = subscription.data

    const [showCancelModal, setShowCancelModal] = useState(false)
    const [chargeModalOpen, setChargeModalOpen] = useState(false)
    const [chargeDetails, setChargeDetails] = useState<ChargeDetailResponse | null>(null)
    const [loadingCharge, setLoadingCharge] = useState(false)

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
        try {
            const cancelar = await apiSub.delete(`/subscription/${data.subscription_id}`)
            toast.success("Assinatura cancelada! Atualize a página ou faça login novamente.")
            debug.log("Assinatura cancelada", cancelar.data)
            router.refresh()
        } catch (err) {
            //toast.error("Ocorreu um erro ao cancelar sua assinatura. Tente novamente mais tarde, ou entre em contato!")
            debug.log("Erro ao cancelar assinatura", err)
        } finally {
            setShowCancelModal(false)
            router.refresh()
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
                {data ?
                    <div className={styles.card}>
                        <h1 className={styles.title}>
                            <IoIosArrowBack size={35} onClick={() => router.push('/me')} />
                            Detalhes da Assinatura
                        </h1>

                        <div className={styles.actions}>
                            {
                                data.status === "active" ?
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
                                            */
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
                                    <strong>R$ {(data.value / 100).toFixed(2)}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Status</span>
                                    <strong>{data.status === 'active' ? 'Ativa' : data.status === 'canceled' ? 'Cancelada' : 'Inativa'}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Método de Pagamento</span>
                                    <strong>{data.payment_method === "banking_billet" ? "Boleto Bancário" : "Cartão de Crédito"}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Próximo Vencimento</span>
                                    <strong>{formatedDate(data.next_expire_at ?? "")}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Plano</span>
                                    <strong>{data.plan.name}</strong>
                                </div>

                                <div className={styles.infoItem}>
                                    <span>Criado em</span>
                                    <strong>{formatedDate(data.created_at)}</strong>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Histórico</h2>

                            <ul className={styles.historyList}>
                                {data.history.map((item, index) => {
                                    const status = item.status === "paid" ? "Boleto Pago" : item.status === 'waiting' ? 'Aguardando Pagamento' : item.status
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
                                                <p className={styles.historyLabel}>Data</p>
                                                <p className={styles.historyValue}>{formatedDate(item.created_at)}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                        {showCancelModal && <CancelSubModal handleConfirmCancel={handleConfirmCancel} handleShowCancelModal={handleShowCancelModal} />}
                        {chargeModalOpen && <ChargeModal chargeDetails={chargeDetails} closeChargeModal={closeChargeModal} loadingCharge={loadingCharge} />}
                    </div>
                    : <div>Carregando...</div>
                }
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
}