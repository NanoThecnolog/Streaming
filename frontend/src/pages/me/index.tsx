import Header from "@/components/Header";
import styles from './styles.module.scss'
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { UserContext } from "@/@types/user";
import Image from "next/image";
import { BiSolidEditAlt } from "react-icons/bi";
import Qrcode from "@/components/Qrcode";
import Avatar from "@/components/modals/Avatar";
import EditarDados from "@/components/modals/EditarDados";
import { FaUserCircle } from "react-icons/fa";
import SEO from "@/components/SEO";
import Switch from "@/components/ui/Switch";
import { toast } from "react-toastify";
import { useFlix } from "@/contexts/FlixContext";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
import { cookieOptions } from "@/utils/Variaveis";
import SubConfig from "@/components/ui/SubConfig";
import { formatedDate } from "@/utils/UtilitiesFunctions";
import axios from "axios";

export default function Me() {
    //const [user, setUser] = useState<UserProps | null>(null)
    const router = useRouter()
    const { user, setUser, signOut } = useFlix()
    const [modalVisible, setModalVisible] = useState(false)
    const [editarDados, setEditarDados] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)
    //const client = new SetupAPIClient()

    useEffect(() => {
        if (!user) {

            const { 'flix-user': userCookie } = parseCookies()
            if (!userCookie) {
                router.push('/login')
                return
            }
            //setUser(JSON.parse(userCookie))
        }
    }, [])
    function handleOpenModal() {
        setModalVisible(true)
    }
    function handleCloseModal() {
        setModalVisible(false)
    }
    function openEditarDados() {
        setEditarDados(true)
    }
    async function closeEditarDados() {
        setEditarDados(false)
        if (!user) return router.push('/login')
    }

    function handleLogout() {
        signOut()
    }


    async function handleNews(newsletter: boolean) {
        if (loading) return
        try {
            setLoading(true)
            if (!user) {
                toast.error("Erro ao tentar atualizar newsLetter do usuario.")
                return
            }
            const userData = {
                news: newsletter
            }

            //const response = await client.api.put('/user', userData)
            const response = await axios.put('/api/user/update', userData)
            const data: UserContext = response.data.request;
            destroyCookie(null, 'flix-user')
            setCookie(null, 'flix-user', JSON.stringify(data), cookieOptions)
            setUser(data)
        } catch (err) {
            console.log("Erro ao alterar newsletter", err)
            toast.error("Erro ao configurar o recebimento de newsletters. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <SEO title="Minha Conta | FlixNext" description="Minha Conta. Altere seus dados e seu avatar!" />
            <Header />
            <article className={styles.container}>
                {
                    user ?
                        (<div className={styles.articleContainer}>
                            <aside className={styles.asideContainer}>
                                <div className={styles.avatar}>
                                    <div className={styles.imgContainer}>
                                        {user.avatar ? <Image src={user?.avatar} alt="Avatar" width={150} height={150} /> : <FaUserCircle size={150} />}
                                        <div className={styles.editAvatar}>
                                            <button type="button" title="Mudar Avatar" onClick={handleOpenModal}><BiSolidEditAlt size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.asideInfo}>
                                    <h2>Nome: {user.name}</h2>
                                    <h3>Email: {user.email}</h3>
                                    <h3>Aniversário: <span>{user?.birthday && formatedDate(user.birthday)}</span></h3>
                                </div>
                                <div className={styles.button}>
                                    <button type="button" onClick={openEditarDados}>Editar dados</button>
                                    <button type="button" onClick={handleLogout}>Sair</button>
                                </div>
                                {
                                    /*<div className={styles.donate}>
                                    <h3>Torne-se um doador!!</h3>
                                    <Qrcode />
                                </div>*/
                                }
                                <div className={styles.newsletter}>
                                    <Switch checked={user.news} onChange={handleNews} />
                                    <h3>Receber Newsletters</h3>
                                </div>
                            </aside>
                            <SubConfig />
                        </div>)
                        : "Carregando..."}
            </article>
            {modalVisible && <Avatar handleCloseModal={handleCloseModal} />
            }
            {editarDados && <EditarDados handleClose={closeEditarDados} />
            }
            <Footer />
        </>
    )
}
