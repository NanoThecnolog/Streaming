import { PlanProps } from '@/@types/payment'
import styles from './styles.module.scss'
import { calculateDiscount, formatPrice } from '@/utils/UtilitiesFunctions'
import { desconto } from '@/utils/Variaveis'
interface PlanCardProps {
    plan: PlanProps
    method: string | null

}
export default function PlanCard({ plan, method }: PlanCardProps) {
    const periodo = plan.type === 'trimestral' ? 'Cobrado a cada 3 meses' : plan.type === 'semestral' ? 'Cobrado a cada 6 meses' : plan.type === 'anual' ? 'Cobrado a cada 12 meses' : 'Cobrado mensalmente';
    const periodNumber = plan.type === 'trimestral' ? 3 : plan.type === 'semestral' ? 6 : plan.type === 'anual' ? 12 : 1;
    return (
        <div className={styles.planCard}>
            <div className={styles.brand}>
                <h1><span>FLiX</span>Next</h1>
            </div>
            <div>
                <h3>Assinar {plan.name} por apenas</h3>
            </div>
            <div className={styles.price}>
                <h4>{formatPrice(plan.price)}</h4>
                <p>{formatPrice(plan.price / periodNumber)} cada mês</p>
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
                {<div className={styles.subtotalContainer}>
                    <div className={styles.subtotal}>
                        <p>Subtotal</p>
                        <p>{formatPrice(plan.price)}</p>
                    </div>
                    {
                        /*   desconto[plan.type] > 0 &&
                           <div className={styles.subDiscount}>
                               <p>Desconto {desconto[plan.type] > 0 && <span className={styles.discount}>- {desconto[plan.type]}% OFF</span>}</p>
                               <p>{formatPrice(calculateDiscount(plan.price, desconto[plan.type]) - plan.price)}</p>
                           </div>*/
                    }
                </div>}
                {
                    method &&
                    <div className={styles.method}>
                        <p>Forma de Pagamento</p>
                        <p>{method === 'billet' ? 'boleto' : method === 'credit' && '1x crédito à vista'}</p>
                    </div>
                }
                <div className={styles.totalContainer}>
                    <p>Total</p>
                    <p>{formatPrice(plan.price)}</p>
                </div>
            </div>
        </div>
    )
}