import { FaChevronRight } from 'react-icons/fa6'
import styles from './styles.module.scss'
import { parseCookies } from 'nookies'
import { debuglog, formatedDate } from '@/utils/UtilitiesFunctions'
import { useFlix } from '@/contexts/FlixContext'

export default function SubConfig() {
    const { user } = useFlix()

    const { 'flix-user': userCookies } = parseCookies()
    debuglog(JSON.parse(userCookies))
    console.log(JSON.parse(userCookies))
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.accountContainer}>
                <div className={styles.headContainer}>
                    <h1>Conta</h1>
                    <p>Detalhes da assinatura</p>
                </div>
                <div className={styles.subscriptionContainer}>
                    <div className={styles.subSince}>
                        <p>Assinante desde {user?.createdAt && formatedDate(user.createdAt)}</p>
                    </div>
                    <div className={styles.subInfo}>
                        <h2>Plano Free</h2>
                        <h4>Próximo pagamento: -</h4>
                        <p>-Tipo de pagamento (cartão ou boleto)-</p>
                    </div>
                    <div className={styles.subConfig}>
                        <p>Gerenciar assinatura</p>
                        <FaChevronRight />
                    </div>
                </div>
            </div>
        </section>
    )
}