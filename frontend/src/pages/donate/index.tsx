import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverStatus } from "@/services/verifyStatusServer";
import Qrcode from "@/components/Qrcode";
import Router from "next/router";
import { UserProps } from "@/@types/user";
import { getUserCookieData } from "@/services/cookieClient";
import SEO from "@/components/SEO";

export default function Donate(status: string) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps | null>()

    useEffect(() => {
        const userData = async () => {
            const user = await getUserCookieData();
            if (!user) return Router.push('/login');
            setUser(user)
        }
        userData()
    }, [])

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
            <SEO title="Doações | FlixNext" description="Ajude a manter a plataforma! Doe qualquer valor e ganhe o emblema de doador na sua conta!" />
            <Header userAvatar={user?.avatar} status={status} />
            <section className={styles.container}>
                <div className={styles.donateContainer}>
                    <div className={styles.title}>
                        <h1>Faça uma doação ao Projeto</h1>
                        <p>A plataforma <strong className={styles.brand}><span className={styles.red}>FLIX</span><span className={styles.white}>NEXT</span></strong> é um projeto sem fins lucrativos, mas, como tudo na vida, manter o site no ar tem seus custos.</p>
                        <p>Se você curtiu a experiência de assistir seu filme ou série favorito gratuitamente ou simplesmente quer apoiar o projeto, sinta-se à vontade para contribuir usando um dos métodos abaixo!</p>
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
                        <h4>*Ao fazer sua doação, identifique-se enviando o email da sua conta na descrição do pix para assim receber seu emblema, ou entre em contato conosco!</h4>
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