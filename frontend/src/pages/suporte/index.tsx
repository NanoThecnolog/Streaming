import Header from '@/components/Header'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import { useEffect } from 'react'

const loadingEfiPay = async () => {
    if (typeof window !== 'undefined') {
        const EfiPay = (await import("payment-token-efi")).default
        return EfiPay
    }
    return null
}

async function testetoken(EfiPay: any) {
    if (typeof window === 'undefined') return
    try {
        const result = await EfiPay.CreditCard
            .setAccount("8c778309766503063ff66562194ea757")
            .setEnvironment("sandbox")
            .setCreditCardData({
                brand: "visa",
                number: "4485785674290087",
                cvv: "123",
                expirationMonth: "05",
                expirationYear: "2031",
                holderName: "Gorbadoc Oldbuck",
                holderDocument: "94271564656",
                reuse: false,
            })
            .getPaymentToken();
        if ("payment_token" in result && "card_mask" in result) {
            console.log(`token: ${result.payment_token}`)
            console.log(`mask: ${result.card_mask}`)
        }
    } catch (err) {
        console.log("Erro ao gerar token", err)
    }
}

export default function Suport() {

    useEffect(() => {
        loadingEfiPay().then((EfiPay) => {
            if (EfiPay) {
                return
                //testetoken(EfiPay)
            }
        })
    }, [])

    return (
        <>
            <SEO title='Suporte | FlixNext' description='Página do suporte FlixNext' />
            <Header />
            <section className={styles.container}>
                <div className={styles.suporteContainer}>
                    <div>
                        <h1>Suporte <span className={styles.brand}><span className={styles.red}>FLIX</span>NEXT</span></h1>
                    </div>
                    <div>
                        <h3>Está com problemas?</h3>
                        <p>Fale conosco através do email: contato@ericssongomes.com</p>
                        <p>Descreva o problema da melhor forma possível.</p>
                        <p>Estamos sempre buscando melhor atende-lo e seu email é muito importante para nós.</p>
                    </div>
                </div>
                <button type='button' onClick={testetoken}>gerar</button>
            </section>
            <Footer />
        </>
    )
}