import styles from './styles.module.scss'

export default function PaymentStage() {
    return (
        <section className={styles.container}>
            <h2>Pagamento com Cartão de Crédito</h2>
            <form>
                <div className={styles.input}>
                    <label htmlFor="card-number">Número do Cartão</label>
                    <input type="text" id="card-number" maxLength={19} placeholder="1234 5678 9101 1121" required />
                </div>
                <div className={styles.input}>
                    <label htmlFor="card-holder">Nome no Cartão</label>
                    <input type="text" id="card-holder" placeholder="Nome Completo" required />
                </div>
                <div className={styles.row}>
                    <div className={styles.input}>
                        <label htmlFor="expiry-date">Validade</label>
                        <input type="text" id="expiry-date" maxLength={5} placeholder="MM/AA" required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" maxLength={3} placeholder="123" required />
                    </div>
                </div>
                <button type="submit">Pagar</button>
            </form>
        </section>
    )
}