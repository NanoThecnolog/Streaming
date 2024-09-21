import Header from "@/components/Header";
import styles from './styles.module.scss'
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { donate } from "../api/donate";
import { getCookieClient } from "@/services/cookieClient";
import Router from "next/router";
import { UserProps } from "@/@types/user";

export default function Me() {

    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<UserProps | null>(null)
    const avatares = [
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.woueb.net%2Fimages%2Fmanga%2Fromain-manga.jpg&f=1&nofb=1&ipt=44ff213852ef9a7bbcf72a0c9e624c3e2a880f7e2c5852e751ff6a047b5d561e&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftecnologiaviral.com%2Fwp-content%2Fuploads%2F2023%2F01%2FCrea-tus-propios-avatares-y-dibujos-de-manga-para-chats.jpg&f=1&nofb=1&ipt=cdb72a8e87acc7648ecbafcd489aa3566fc63c202aa66c4727d15d2c8a07cc1a&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ik64bZYvKVs%2FTqmIccMI0gI%2FAAAAAAAAAgk%2FKhs8LaJTzPg%2Fs1600%2Favatar3.PNG&f=1&nofb=1&ipt=bdf3f948941d1dcc7ff7df54560175d3a814fe3f015e2fcfdfcca9ec8cb08888&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F94%2Ff6%2Fa6%2F94f6a63dd9704cae40c3675fe8e7409f.png&f=1&nofb=1&ipt=0d9db133e6d1e4636668e15cc5f409567d72cf9d7099647434e9fe9f582198e7&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcodigoworpress.com%2Fwp-content%2Fuploads%2F2021%2F04%2F1619444573_Cree-avatares-personalizados-y-dibujos-manga-para-chats-sitios-blogs.jpg&f=1&nofb=1&ipt=d8cd5a4a8775a8946479597a29939fc7ad6bbdcc4b8990119b27b74d09947305&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_X0x5Kbc6cU4%2FSD62SRkO0mI%2FAAAAAAAAAHM%2FWMKHvjyRlzU%2Fs200%2Fmetalozaru%2540gmail.com_20080529_75244834.jpg&f=1&nofb=1&ipt=ee67735d2f8e8e471fd3e5c6cff4ec4abbbf39701762e9d6ac216c99c1b46430&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.giardiniblog.it%2Fwp-content%2Fuploads%2F2009%2F02%2Fmangavatar.jpg&f=1&nofb=1&ipt=c75632be0173882a8ecf16fd1985f61c7b33c55adf3c39b89d4b50947fd6e879&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-3sSGU0Zkaqs%2FTenH0sC3YZI%2FAAAAAAAAAFg%2FK-NBKWorVXE%2Fs1600%2FAVATAR%2BSILVIA.jpg&f=1&nofb=1&ipt=0c92d97c1a82b264fbd78ef56dc567541e95c5d8e3e6b089c82cd6ebe8830b7e&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthypix.com%2Fwp-content%2Fuploads%2F2021%2F10%2Fmanga-profile-picture-92-150x150.jpg&f=1&nofb=1&ipt=f23e792a0b68556d2a391bb33d9e80fa7dc8297aa087d42c89e7ce139f7acd8e&ipo=images",
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.polymerclaydaily.com%2Fimages%2Ftinapple_manga.jpg&f=1&nofb=1&ipt=c269e6060e950e008a2c0e2631ed18779fc93f95efab9092debd744757ae8907&ipo=images",

    ]

    useEffect(() => {
        const user = getCookieClient();
        if (!user) {
            Router.push('/login')
            return
        }
        setUsuario(user)
    }, [])


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
            <Header userAvatar={usuario?.avatar} />
            <section className={styles.container}>
                <h1>Editar perfil</h1>
                <div className={styles.infoContainer}>
                    <div>
                        <div className={styles.avatarContainer}>
                            <h2>Avatar</h2>
                            <div className={styles.avatars}>
                                {avatares.map((img, index) => (
                                    <img src={img} key={index} width={100} height={100} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2>Informações</h2>
                        </div>
                        <div>
                            <h3>Nome do usuario</h3>
                        </div>
                        <div>
                            <h3>email@email.com</h3>
                        </div>
                        <div>
                            <h3>data de nascimento</h3>
                        </div>
                        <div>
                            <h3>cpf</h3>
                        </div>
                    </div>

                </div>
                <div>



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
            </section>
            <Footer />
        </>

    )
}