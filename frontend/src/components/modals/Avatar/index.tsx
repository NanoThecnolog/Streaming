import axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'
import { X } from 'lucide-react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { toast } from '@/components/ui/Notifications'

import { UserContext, ProfileProps } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import { cookieOptions } from '@/utils/Variaveis'
import AvatarEditor from '@/components/AvatarEditor'

import styles from './styles.module.scss'

interface AvatarProps {
  handleCloseModal: () => void
}

export default function Avatar({ handleCloseModal }: AvatarProps) {
  const { user, setUser, activeProfile, setActiveProfile, profiles, setProfiles } = useFlix()
  const [previewUrl, setPreviewUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const updateUserCookie = (updatedUser: UserContext): void => {
    destroyCookie(null, 'flix-user')
    setCookie(
      null,
      'flix-user',
      JSON.stringify({
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        verified: updatedUser.verified,
        news: updatedUser.news,
        createdAt: updatedUser.createdAt,
        subscription: updatedUser.subscription,
        donator: updatedUser.donator,
      }),
      cookieOptions,
    )
  }

  const saveAvatar = async (): Promise<void> => {
    const targetAvatar = activeProfile?.avatar ?? user?.avatar
    if (saving || previewUrl === targetAvatar) return

    const { 'flix-user': userCookie } = parseCookies()
    if (!userCookie) {
      await Router.push('/login')
      return
    }

    try {
      setSaving(true)

      if (activeProfile) {
        const { data: updatedProfile } = await axios.put<ProfileProps>(
          `/api/user/profiles/${activeProfile.id}`,
          { avatar: previewUrl },
        )
        setActiveProfile(updatedProfile)
        setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)))
      } else {
        await axios.put('/api/user/update', { avatar: previewUrl })

        const { data: updatedUser } = await axios.get<UserContext>('/api/user')
        setUser(updatedUser)
        updateUserCookie(updatedUser)
      }

      toast.success('Avatar alterado!')
      handleCloseModal()
    } catch (error) {
      console.error('Erro ao tentar atualizar o avatar:', error)
      toast.error('Erro ao alterar o avatar. Tente novamente mais tarde.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) handleCloseModal()
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-title"
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Personalização</span>
            <h1 id="avatar-title">Crie seu avatar</h1>
            <p>Escolha um estilo e personalize os detalhes antes de salvar.</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fechar editor de avatar"
            disabled={saving}
            onClick={handleCloseModal}
          >
            <X size={24} />
          </button>
        </header>

        <AvatarEditor
          value={activeProfile?.avatar ?? user?.avatar}
          onChange={setPreviewUrl}
          disabled={saving}
          onSave={() => void saveAvatar()}
          saving={saving}
        />

        <footer className={styles.attribution}>
          Avatares gerados por{' '}
          <a href="https://www.dicebear.com" target="_blank" rel="noreferrer">
            DiceBear
          </a>
          . Adventurer por Lisa Wischofsky, sob licença{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
            CC BY 4.0
          </a>
          .
        </footer>
      </section>
    </div>
  )
}