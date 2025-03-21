import { PlanProps } from '@/pages/payment'
import styles from './styles.module.scss'
import { calculateDiscount, formatPrice } from '@/utils/UtilitiesFunctions'
import { desconto } from '@/utils/Variaveis'
interface PlanCardProps {
    plan: PlanProps

}
export default function PlanCard({ plan }: PlanCardProps) {
    const periodo = plan.type === 'trimestral' ? 'Período de 3 meses' : plan.type === 'semestral' ? 'Período de 6 meses' : plan.type === 'anual' ? 'Período de 12 meses' : 'Cobrado mensalmente';
    return (
        <div className={styles.planCard}>
            <div className={styles.brand}>
                <h1><span>FLiX</span>Next</h1>
            </div>
            <div>
                <h3>Assinar {plan.name} por apenas</h3>
            </div>
            <div>
                <h4>{formatPrice(calculateDiscount(plan.price, desconto[plan.type]))}{desconto[plan.type] > 0 && <p className={styles.discount}>{desconto[plan.type]}% OFF</p>}</h4>
            </div>
            <div className={styles.resume}>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <div className={styles.itemPlan}>
                            <p>{plan.name}</p>
                            <p>{formatPrice(plan.price)}</p>
                        </div>
                        <div className={styles.periodPlan}>
                            <p>{periodo}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.subtotalContainer}>
                    <div className={styles.subtotal}>
                        <p>Subtotal</p>
                        <p>{formatPrice(plan.price)}</p>
                    </div>
                    {
                        desconto[plan.type] > 0 &&
                        <div className={styles.subDiscount}>
                            <p>Desconto</p>
                            <p>{formatPrice(calculateDiscount(plan.price, desconto[plan.type]) - plan.price)}</p>
                        </div>
                    }
                </div>
                <div className={styles.totalContainer}>
                    <p>Total</p>
                    <p>{formatPrice(calculateDiscount(plan.price, desconto[plan.type]))}</p>
                </div>
            </div>
        </div>
    )
}