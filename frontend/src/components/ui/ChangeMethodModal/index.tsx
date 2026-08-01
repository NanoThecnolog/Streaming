import { debug } from '@/classes/DebugLogger'
import styles from './styles.module.scss'
import { useState } from 'react'
import { expirationSlicer } from '@/utils/UtilitiesFunctions'
import PaymentCredit from '@/components/PaymentSteps/paymentCredit'
import { CreditPayment } from '@/@types/payment'
import { useFlix } from '@/contexts/FlixContext'

interface ModalProps {
    closeModal: () => void
    before: 'billet' | 'credit'
    setNewMethod: () => void
}
export default function ChangeMethodModal({ closeModal, before, setNewMethod }: ModalProps) {
    const [credit, setCredit] = useState<CreditPayment | null>(null)
    const { user } = useFlix()
    const loadingEfiPay = async () => {
        if (typeof window !== 'undefined') {
            const EfiPay = (await import("payment-token-efi")).default
            return EfiPay
        }
        return null
    }


    const getToken = async (EfiPay: any) => {
        if (typeof window === 'undefined') return

        if (!credit || !credit?.expiration || credit.expiration.length !== 4) return
        const expirationMonth = expirationSlicer(credit.expiration).month
        const expirationYear = expirationSlicer(credit.expiration).year



        try {
            const result = await EfiPay.CreditCard
                .setAccount(process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID)
                .setEnvironment(process.env.NEXT_PUBLIC_EFI_ENV)
                .setCreditCardData({
                    brand: credit?.brand,
                    number: credit?.number,
                    cvv: credit?.cvv,
                    expirationMonth,
                    expirationYear,
                    holderName: credit.holderName,
                    holderDocument: user?.cpf,//,
                    reuse: true,
                })
                .getPaymentToken();
            if ("payment_token" in result && "card_mask" in result) {
                debug.log(`token: ${result.payment_token}`)
                debug.log(`mask: ${result.card_mask}`)
            }
            return result
        } catch (err) {
            debug.log("Erro ao gerar token", err)
        }
    }

    const changeMethod = (method: 'billet' | 'credit') => {
        if (method === 'credit') {
            let token
            loadingEfiPay().then((EfiPay) => {
                if (EfiPay) {
                    token = getToken(EfiPay)
                }
            })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div>
                    {
                        before === 'billet' &&
                        <div>
                            <PaymentCredit credit={credit} setCredit={setCredit} />
                            Alterar para cartão de crédito
                        </div>
                    }
                    {
                        before === 'credit' &&
                        <div>

                            Alterar para boleto bancário

                        </div>
                    }
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.cancel} onClick={closeModal}>Cancelar</button>
                    <button className={styles.confirm} onClick={() => changeMethod('credit')}>Alterar</button>
                </div>
            </div>
        </div>
    )
}