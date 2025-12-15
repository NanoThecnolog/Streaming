import { useRouter } from "next/router";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/components/ui/Loading/spinner";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { debug } from "@/classes/DebugLogger";

interface ActiveProps {
    id: string
}

interface ReturnProps {
    id: string;
    email: string;
    addressId: string | null;
    name: string;
    birthday: Date;
    cpf: string | null;
    phone_number: string | null;
    password: string;
    donator: boolean;
    avatar: string | null;
    verified: boolean;
    news: boolean;
    access: boolean;
    resetToken: string | null;
    resetTokenExpire: Date | null;
    created_at: Date;
    updated_at: Date;
}

export default function Active({ id }: ActiveProps) {
    //const router = useRouter()
    //const { id } = router.query;
    const [user, setUser] = useState<{ id: string, name: string } | null>(null)
    const loginLink = `/login`
    const containerStyles = {
        backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F4321344.jpg&f=1&nofb=1&ipt=e561bcf964fd269c74214638aaa624daf5819fa9a9458a1033209e52c3d2ab80&ipo=images)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    useEffect(() => {
        if (!id) return debug.error("ID não fornecido")
        activeAccess()
    }, [id])

    async function activeAccess() {
        try {
            const response = await axios.post<ReturnProps>(`/api/ativar/${id}`)
            const data = response.data
            debug.log("conta ativada", data)
            setUser({ id: data.id, name: data.name })
        } catch (err) {
            console.error("Erro ao ativar a conta: ", err)
            //setUser({id: 'ID não recebido', name: 'Sem nome'})
        }
    }

    return (
        <>
            {user ?
                <div className={styles.container} style={containerStyles}>
                    <div className={styles.cardContainer}>
                        <div className={styles.contentContainer}>
                            <h2>Olá, {`${user?.name}!` || "usuario"} Sua conta foi ativada com sucesso!</h2>
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

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx.query?.id
    console.log(id)

    if (!id || typeof id !== 'string') {
        return {
            props: { id: 'id não recebido' }
        }
    }

    /*try {
        const response = await fetch(`https://flixnext.com.br/api/ativar/${id}`, {
            method: 'POST'
        })
        const data = await response.json()
        console.log(data)
        //return response.data
    } catch (err) {
        console.error("Erro ao ativar essa conta: ", err)
        //return { message: 'error', error: err }
    }

    /*async function activeAccess() {
        if (!id) return console.error("ID não fornecido")
        try {
            const response = await axios.post(`https://flixnext.com.br/api/ativar/${id}`)
            console.log(response.data)
            //return response.data
        } catch (err) {
            console.error("Erro ao ativar a conta: ", err)
            //return { message: 'error', error: err }
        }
    }
    //console.log(activeAccess())*/



    return {
        props: { id }
    }
}