import Head from 'next/head'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface SuccessPageProps {
    data: {
        pdf: string,
        pix: string,
        barcode: string,
    }
}
export default function SuccessPage() {
    const router = useRouter()
    const { pdf, pix, barcode } = router.query
    //console.log(barcode)
    return (
        <>
            <Head>
                <title>Pagamento | FlixNext</title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.card}>

                    <h1 className={styles.title}>Pagamento Gerado</h1>

                    <p className={styles.thanks}>
                        Obrigado pela sua assinatura!
                    </p>

                    <p className={styles.info}>
                        Você receberá dois e-mails:
                        <br />• Um com o link para ativar sua conta, caso ainda não esteja ativa.
                        <br />• Outro com as informações de pagamento e detalhes da assinatura.
                    </p>

                    <h3>Você pode realizar o pagamento por pix, baixando o boleto ou copiando o código de barras</h3>
                    <div className={styles.pixPdfContainer}>

                        {pix && (
                            <div className={styles.section}>
                                <h2>QRCode PIX</h2>
                                <img src={pix as string} alt="QR Code" className={styles.qrcode} />
                            </div>
                        )}

                        {pdf && (
                            <div className={`${styles.section} ${styles.sectionPDF}`}>
                                <h2>Boleto (PDF)</h2>
                                <a href={pdf as string} download className={styles.pdfLink}>
                                    Baixar boleto em PDF
                                </a>
                            </div>
                        )}
                    </div>

                    {barcode && (
                        <div className={styles.section}>
                            <h2>Código de barras</h2>

                            <button
                                className={styles.copyButton}
                                onClick={() => navigator.clipboard.writeText(barcode as string)}
                            >
                                Copiar código de barras
                            </button>

                            <p className={styles.barcodeText}>{barcode}</p>
                        </div>
                    )}

                    <div className={styles.links}>
                        <Link href="/login">Entrar</Link>
                        <Link href="/termos-de-uso">Termos de uso</Link>
                        <Link href="/privacidade">Política de privacidade</Link>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}