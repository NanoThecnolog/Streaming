import { useRouter } from "next/router";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/components/ui/Loading/spinner";

export default function Active() {
    const router = useRouter()
    const { id } = router.query;
    const [user, setUser] = useState<{ id: string, name: string } | null>(null)
    const loginLink = `/login`
    const containerStyles = {
        backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F4321344.jpg&f=1&nofb=1&ipt=e561bcf964fd269c74214638aaa624daf5819fa9a9458a1033209e52c3d2ab80&ipo=images)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    useEffect(() => {
        if (id) activeAcess()
    }, [id])
    async function activeAcess() {
        if (!id) return console.error("ID não fornecido")
        try {
            const response = await axios.post(`/api/ativar/${id}`)
            setUser(response.data)
        } catch (err) {
            console.error("Erro ao ativar a conta: ", err)
        }
    }

    return (
        <>
            {user ?
                <div className={styles.container} style={containerStyles}>
                    <div className={styles.cardContainer}>
                        <div className={styles.contentContainer}>
                            <h2>Olá, {user?.name || "usuario"}! Sua conta foi ativada com sucesso!</h2>
                            <p>Obrigado por utilizar nossa plataforma!</p>
                            <div style={{ padding: 10 }}>
                                <Link href={loginLink}>
                                    <button type="button" className={styles.button}>Fazer Login</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className={styles.container} style={containerStyles}>
                    <div className={styles.cardContainer}>
                        <div className={styles.contentContainer}>
                            <Spinner />
                            <h2>Carregando...</h2>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}