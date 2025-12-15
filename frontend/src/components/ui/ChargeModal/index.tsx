import { Loader2 } from 'lucide-react'
import styles from './styles.module.scss'
import { ChargeDetailResponse } from '@/@types/efi/chargeEfi'
import { formatedDate } from '@/utils/UtilitiesFunctions'

interface ChargeModalProps {
    loadingCharge: boolean,
    chargeDetails: ChargeDetailResponse | null,
    closeChargeModal: () => void

}

export default function ChargeModal({ loadingCharge, chargeDetails, closeChargeModal }: ChargeModalProps) {
    const paymentMessage = chargeDetails?.data.history.find(item => /pagamento de.*efetuado/i.test(item.message))?.message
    const status = chargeDetails?.data.status === "paid" ? "Boleto Pago" : chargeDetails?.data.status === "waiting" ? "Aguardando Pagamento" : chargeDetails?.data.status
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalLarge}>

                {loadingCharge && (
                    <div className={styles.loadingArea}>
                        <Loader2 className={styles.loadingIcon} size={36} />
                        <p>Carregando detalhes da cobrança...</p>
                    </div>
                )}

                {!loadingCharge && chargeDetails && (
                    <>
                        <h2>Detalhes da Cobrança #{chargeDetails.data.charge_id}</h2>

                        <div className={styles.section}>
                            <h3>Informações Gerais</h3>

                            <div className={styles.infoGrid}>
                                <div>
                                    <span>Total</span>
                                    <strong>R$ {(chargeDetails.data.total / 100).toFixed(2)}</strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong>{status}</strong>
                                </div>

                                <div>
                                    <span>Criado em</span>
                                    <strong>{formatedDate(chargeDetails.data.created_at)}</strong>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3>Pagamento</h3>
                            <div className={styles.paymentBox}>
                                <p>Método: <strong>{chargeDetails.data.payment.method === "banking_billet" ? "Boleto Bancário" : "Cartão de Crédito"}</strong></p>
                                <p>Vencimento: <strong>{formatedDate(chargeDetails.data.payment.banking_billet.expire_at)}</strong></p>

                                {
                                    chargeDetails.data.status !== 'paid' ? <>
                                        <a
                                            href={chargeDetails.data.payment.banking_billet.billet_link}
                                            target="_blank"
                                            className={styles.primaryLink}
                                        >
                                            Abrir Boleto
                                        </a>

                                        <a
                                            href={chargeDetails.data.payment.banking_billet.pdf.charge}
                                            target="_blank"
                                            className={styles.secondaryLink}
                                        >
                                            PDF
                                        </a>
                                    </>
                                        : <p>{paymentMessage ?? paymentMessage}</p>
                                }
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3>Cliente</h3>

                            <div className={styles.infoGrid}>
                                <div>
                                    <span>Nome</span>
                                    <strong>{chargeDetails.data.customer.name}</strong>
                                </div>
                                <div>
                                    <span>CPF</span>
                                    <strong>{chargeDetails.data.customer.cpf}</strong>
                                </div>
                                <div className={styles.infoEmail}>
                                    <span>Email</span>
                                    <strong>{chargeDetails.data.customer.email}</strong>
                                </div>
                                <div>
                                    <span>Telefone</span>
                                    <strong>{chargeDetails.data.customer.phone_number}</strong>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3>Itens</h3>
                            <ul className={styles.itemsList}>
                                {chargeDetails.data.items.map((item, i) => (
                                    <li key={i}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.modalCancel} onClick={closeChargeModal}>
                                Fechar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}