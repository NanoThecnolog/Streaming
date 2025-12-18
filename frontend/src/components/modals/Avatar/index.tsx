import { X } from 'lucide-react';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { SetupAPIClient } from '@/services/api';
import Router from 'next/router';
import Image from 'next/image';
import { avatares, cookieOptions } from '@/utils/Variaveis';
import { useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { UserContext } from '@/@types/user';
import { useFlix } from '@/contexts/FlixContext';
import axios from 'axios';
import { debug } from '@/classes/DebugLogger';

interface AvatarProps {
    handleCloseModal: () => void;
}

export default function Avatar({ handleCloseModal }: AvatarProps) {
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useFlix()
    const client = new SetupAPIClient()

    async function handleChangeAvatar(url: string) {
        if (loading) return
        const { 'flix-user': userCookie } = parseCookies()

        if (!userCookie) return Router.push('/login')
        const user = JSON.parse(userCookie)

        try {
            setLoading(true)
            const userData = { avatar: url }
            const response = await axios.put('/api/user/update', userData)
            //debug.log("Resposta da atualização", response.data)
            const user = await axios.get<UserContext>('/api/user')
            //debug.log("User buscado", user.data)
            setUser(user.data)
            const userCookie = {
                name: user.data.name,
                email: user.data.email,
                avatar: user.data.avatar,
                verified: user.data.verified,
                birthday: user.data.birthday,
                news: user.data.news,
                createdAt: user.data.createdAt,
                subscription: user.data.subscription,
                donator: user.data.donator,
            }
            destroyCookie(null, 'flix-user')
            setCookie(null, 'flix-user', JSON.stringify(userCookie), cookieOptions)
            toast.success("Avatar alterado!")
        } catch (err) {
            console.log("Erro ao tentar atualizar avatar. ", err)
            toast.error("Erro ao alterar o avatar. Tente novamente mais tarde.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <X size={30} className={styles.closeButton} onClick={handleCloseModal} />
                <h1>Escolha seu novo avatar</h1>
                <div className={styles.avatars}>
                    {avatares.map((img, index) => (
                        <Image src={img} alt="avatar" key={index} width={100} height={100} onClick={() => handleChangeAvatar(img)} />
                    ))}
                </div>
            </div>
        </div>
    )
}