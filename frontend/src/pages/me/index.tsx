import Header from "@/components/Header";
import styles from './styles.module.scss'
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { donate } from "../api/donate";

export default function Me() {

    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    async function qrCode() {
        try {
            const response = await donate.get('/pix');
            const data = response.data;
            setQrCodeUrl(data);
        } catch (err) {
            if (err instanceof ErrorEvent) {
                //console.error(err.message)
                setError(err.message)
            }
            return { error: "Erro ao gerar qrCode" }
        }
    }
    useEffect(() => {
        qrCode();
    }, []);
    return (
        <>
            <Header />
            <div className={styles.container}>
                Página do usuário
                {
                    error ? (
                        <p>{error}</p>
                    ) : (
                        qrCodeUrl ? (
                            <img src={qrCodeUrl} alt="QrCode Pix" />
                        ) : (
                            <p>Carregando QrCode...</p>
                        )
                    )
                }
            </div>
            <Footer />
        </>

    )
}