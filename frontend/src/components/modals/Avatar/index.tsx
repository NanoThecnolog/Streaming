import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
import { useState } from 'react'
import { X } from 'lucide-react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { toast } from '@/components/ui/Notifications'

import { UserContext } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import { avatares, cookieOptions } from '@/utils/Variaveis'

import styles from './styles.module.scss'

interface AvatarProps {
  handleCloseModal: () => void
}

export default function Avatar({ handleCloseModal }: AvatarProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

  const { user, setUser } = useFlix()

  const updateUserCookie = (updatedUser: UserContext): void => {
    const userCookie = {
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      verified: updatedUser.verified,
      news: updatedUser.news,
      createdAt: updatedUser.createdAt,
      subscription: updatedUser.subscription,
      donator: updatedUser.donator,
    }

    destroyCookie(null, 'flix-user')

    setCookie(null, 'flix-user', JSON.stringify(userCookie), cookieOptions)
  }

  const handleChangeAvatar = async (avatarUrl: string): Promise<void> => {
    if (selectedAvatar) return
    if (avatarUrl === user?.avatar) return

    const { 'flix-user': userCookie } = parseCookies()

    if (!userCookie) {
      await Router.push('/login')
      return
    }

    try {
      setSelectedAvatar(avatarUrl)

      await axios.put('/api/user/update', {
        avatar: avatarUrl,
      })

      const { data: updatedUser } = await axios.get<UserContext>('/api/user')

      setUser(updatedUser)
      updateUserCookie(updatedUser)

      toast.success('Avatar alterado!')
      handleCloseModal()
    } catch (err) {
      console.error('Erro ao tentar atualizar o avatar:', err)

      toast.error('Erro ao alterar o avatar. Tente novamente mais tarde.')
    } finally {
      setSelectedAvatar(null)
    }
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget && !selectedAvatar) {
      handleCloseModal()
    }
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={handleOverlayClick}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-modal-title"
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Personalização</span>

            <h1 id="avatar-modal-title">Escolha seu novo avatar</h1>

            <p>Selecione uma imagem para representar seu perfil.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fechar seleção de avatar"
            disabled={Boolean(selectedAvatar)}
            onClick={handleCloseModal}
          >
            <X size={24} />
          </button>
        </header>

        <div className={styles.avatars}>
          {avatares.map((avatarUrl) => {
            const isCurrent = avatarUrl === user?.avatar
            const isLoading = avatarUrl === selectedAvatar
            const isDisabled = Boolean(selectedAvatar) || isCurrent

            return (
              <button
                key={avatarUrl}
                type="button"
                className={`${styles.avatarButton} ${isCurrent ? styles.current : ''}`}
                aria-label={isCurrent ? 'Avatar atual' : 'Selecionar avatar'}
                aria-pressed={isCurrent}
                disabled={isDisabled}
                onClick={() => handleChangeAvatar(avatarUrl)}
              >
                <span className={styles.imageWrapper}>
                  <Image src={avatarUrl} alt="" fill sizes="(max-width: 480px) 72px, 96px" />

                  {isLoading && <span className={styles.loader} aria-label="Alterando avatar" />}
                </span>

                {isCurrent && <span className={styles.currentLabel}>Atual</span>}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
