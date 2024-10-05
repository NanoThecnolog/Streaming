import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import { donate } from "../../services/donate";
import Head from "next/head";

export default function Donate() {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    async function qrCode() {
        try {
            const response = await donate.get('/pix');
            const data = response.data;
            setQrCodeUrl(data);
        } catch (err) {
            return { error: "Erro ao gerar qrCode" }
        }
    }
    useEffect(() => {
        qrCode();
    }, []);
    return (
        <>
            <Head>
                <title>Doações | FlixNext</title>
                <meta name="description" content="Página de Doações. Ajude a manter a plataforma! Doe qualquer valor e ganhe o emblema de doador na sua conta!" />
            </Head>
            <Header />
            <section className={styles.container}>
                <div className={styles.donateContainer}>
                    <div className={styles.title}>
                        <h1>Faça uma doação ao Projeto</h1>
                        <p>O projeto FlixNext é sem fins lucrativos. Porém, como nada no mundo é de graça, manter o site no ar também não é kkkkk</p>
                        <p>Se você gostou da experiência de assistir seu filme favorito sem pagar nada por isso, ou só se sentiu com vontade de fazer uma caridade, sinta-se livre para utilizar um dos meios abaixo para nos abençoar!</p>
                    </div>
                    <div className={styles.donate}>
                        <div className={styles.qrcodeContainer}>
                            <div>
                                {qrCodeUrl ? <img src={qrCodeUrl} alt="qrcodePix" /> : <p>Carregando qrCode...</p>}
                            </div>
                            <div>
                                <p>Pix qrcode no valor de R$10,00</p>
                            </div>
                        </div>
                        <div className={styles.keyContainer}>
                            <p>
                                Caso queira doar qualquer outro valor, ou tiver problemas com o qrcode, pode utilizar essa chave pix:
                            </p>
                            <p className={styles.key}>69d28ddb-5447-44ec-997a-71be04038409</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}