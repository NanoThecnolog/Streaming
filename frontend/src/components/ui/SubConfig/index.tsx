import { FaChevronRight } from 'react-icons/fa6'
import styles from './styles.module.scss'
import { parseCookies } from 'nookies'
import { formatedDate } from '@/utils/UtilitiesFunctions'
import { useFlix } from '@/contexts/FlixContext'
import { debug } from '@/classes/DebugLogger'
import { Divide } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiSub } from '@/services/apiSubManager'
import { SubDetailsResponseProps } from '@/@types/subscriptions/subDetails'
import { useRouter } from 'next/navigation'

export default function SubConfig() {
    const router = useRouter()
    const { user, subscription } = useFlix()

    const [subEFI, setSubEFI] = useState<SubDetailsResponseProps | null>(null)

    const { 'flix-user': userCookies } = parseCookies()
    const userData = userCookies
    debug.log(userData)

    const getSubEFIDetails = async () => {
        if (!subscription) return
        try {
            const sub = await apiSub.get<SubDetailsResponseProps>(`/subscription/${subscription.subId}`)
            if (sub.data.data.status !== 'active') setSubEFI(null)
            setSubEFI(sub.data)
        } catch (err) {
            debug.error("Erro ao buscar dados da assinatura na EFI", err)
        }
    }

    useEffect(() => {
        getSubEFIDetails()
    }, [subscription])



    return (
        <section className={styles.sectionContainer}>
            {subEFI && (
                <div className={styles.accountContainer}>
                    <div className={styles.headContainer}>
                        <h1>Conta</h1>
                        <p>Detalhes da assinatura</p>
                    </div>

                    <div className={styles.subscriptionContainer}>
                        <div className={styles.subSince}>
                            <p>Assinante desde {formatedDate(subEFI.data.created_at)}</p>
                        </div>

                        <div className={styles.subInfo}>
                            <h2>{subEFI.data.plan.name}</h2>
                            {
                                subEFI.data.status === 'active' ?
                                    <>
                                        <h4>
                                            Próximo pagamento:{' '}
                                            {formatedDate(subEFI.data.next_expire_at ?? '')}
                                        </h4>
                                        <p>
                                            Método de pagamento:{' '}
                                            {subEFI.data.payment_method === 'banking_billet'
                                                ? 'Boleto Bancário'
                                                : 'Cartão de Crédito'}
                                        </p>
                                    </>
                                    : <>
                                        <h4>
                                            Assinatura Cancelada.
                                        </h4>
                                    </>
                            }
                        </div>

                        <div
                            className={styles.subConfig}
                            onClick={() =>
                                router.push(
                                    `/me/assinatura/${subEFI.data.subscription_id}`
                                )
                            }
                        >
                            <p>Gerenciar assinatura</p>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            )}

            {!subEFI && user && (
                <div className={styles.accountContainer}>
                    <div className={styles.headContainer}>
                        <h1>Conta</h1>
                        <p>Detalhes da assinatura</p>
                    </div>

                    <div className={styles.subscriptionContainer}>
                        <div className={styles.subSince}>
                            <p>Cadastrado desde {formatedDate(user.createdAt)}</p>
                        </div>

                        <div className={styles.subInfo}>
                            <h2>
                                {user.donator ? 'Plano Premium' : 'Plano não definido'}
                            </h2>
                        </div>

                        {user.donator ? (
                            <p>
                                Você tem um plano premium vitalício por acreditar em mim.
                                Obrigado!
                            </p>
                        ) : (
                            <div
                                className={styles.subConfig}
                                onClick={() =>
                                    router.push('/me/escolher-plano')
                                }
                            >
                                <p>Adquirir uma assinatura</p>
                                <FaChevronRight />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}