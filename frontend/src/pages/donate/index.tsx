import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './styles.module.scss'
import Qrcode from "@/components/Qrcode";
import SEO from "@/components/SEO";

export default function Donate() {
    return (
        <>
            <SEO title="Doações | FlixNext" description="Ajude a manter a plataforma! Doe qualquer valor e ganhe o emblema de doador na sua conta!" />
            <Header />
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