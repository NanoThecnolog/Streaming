import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import { QrCode } from "lucide-react";
import Qrcode from "@/components/Qrcode";

export default function Donate(status: { status: string }) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    async function qrCode() {
        try {
            const response = await api.get('/pix');
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
            <Header status={status} />
            <section className={styles.container}>
                <div className={styles.donateContainer}>
                    <div className={styles.title}>
                        <h1>Faça uma doação ao Projeto</h1>
                        <p>O <strong className={styles.brand}><span className={styles.red}>FLIX</span><span className={styles.white}>NEXT</span></strong> é um projeto sem fins lucrativos, mas, como tudo na vida, manter o site no ar tem seus custos.</p>
                        <p>Se você curtiu a experiência de assistir seu filme favorito gratuitamente ou simplesmente quer apoiar o projeto, sinta-se à vontade para contribuir usando um dos métodos abaixo!</p>
                        <p>Ao doar, Você também receberá um <strong>*emblema de doador</strong> em sua conta, para exibir com orgulho.</p>
                    </div>
                    <div className={styles.donate}>
                        <div className={styles.qrcodeContainer}>
                            <Qrcode />
                            <div>
                                <p>Pix qrcode no valor de R$10,00</p>
                            </div>
                        </div>
                        <div className={styles.keyContainer}>
                            <p>
                                Se preferir doar um valor diferente ou tiver problemas com o QRcode, utilize a seguinte chave pix:
                            </p>
                            <p className={styles.key}>69d28ddb-5447-44ec-997a-71be04038409</p>
                        </div>

                    </div>
                    <div>
                        <h4>*Após fazer sua doação, envie o comprovante e o e-mail utilizado para criar sua conta em nossa plataforma para dev@ericssongomes.com, e assim receber seu emblema.</h4>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    async function fetchServerStatus() {
        const status = await serverStatus();
        return status
    }
    const status = await fetchServerStatus()
    return {
        props: {
            status
        }
    }
}