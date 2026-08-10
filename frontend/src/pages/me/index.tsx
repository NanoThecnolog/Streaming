import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import SubConfig from '@/components/ui/SubConfig'
import Switch from '@/components/ui/Switch'
import Avatar from '@/components/modals/Avatar'
import EditarDados from '@/components/modals/EditarDados'
import TrustedDevices from '@/components/ui/TrustedDevices'
import ActiveSessions from '@/components/ui/ActiveSessions'

import styles from './styles.module.scss'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Bell,
  ChevronRight,
  Edit3,
  LogOut,
  Mail,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { FaUserCircle } from 'react-icons/fa'

import { toast } from '@/components/ui/Notifications'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import axios from 'axios'

import { UserContext } from '@/@types/user'
import { useFlix } from '@/contexts/FlixContext'
import { cookieOptions } from '@/utils/Variaveis'

export default function Me() {
  const router = useRouter()

  const { user, setUser, signOut } = useFlix()

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [editarDados, setEditarDados] = useState<boolean>(false)

  const [loadingNewsletter, setLoadingNewsletter] = useState<boolean>(false)

  useEffect(() => {
    if (user) return

    const { 'flix-user': userCookie } = parseCookies()

    if (!userCookie) {
      router.replace('/login')
    }
  }, [router, user])

  const handleOpenAvatarModal = (): void => {
    setModalVisible(true)
  }

  const handleCloseAvatarModal = (): void => {
    setModalVisible(false)
  }

  const handleOpenEditModal = (): void => {
    setEditarDados(true)
  }

  const handleCloseEditModal = (): void => {
    setEditarDados(false)
  }

  const handleLogout = (): void => {
    signOut()
  }

  const handleNews = async (newsletter: boolean): Promise<void> => {
    if (loadingNewsletter || !user) return

    setLoadingNewsletter(true)

    try {
      const response = await axios.put('/api/user/update', {
        news: newsletter,
      })

      const data: UserContext = response.data.request

      destroyCookie(null, 'flix-user', {
        path: '/',
      })

      setCookie(null, 'flix-user', JSON.stringify(data), cookieOptions)

      setUser(data)

      toast.success(newsletter ? 'Newsletters ativadas.' : 'Newsletters desativadas.')
    } catch (error) {
      console.error('Erro ao alterar newsletter', error)

      toast.error('Não foi possível atualizar sua preferência de newsletters.')
    } finally {
      setLoadingNewsletter(false)
    }
  }

  return (
    <>
      <SEO
        title="Minha Conta | FlixNext"
        description="Gerencie seus dados, avatar, preferências e assinatura."
      />

      <Header />

      <main className={styles.container}>
        {!user ? (
          <div className={styles.loadingCard}>
            <div className={styles.loadingSpinner} />

            <strong>Carregando sua conta</strong>

            <span>Buscando suas informações...</span>
          </div>
        ) : (
          <div className={styles.accountLayout}>
            <section className={styles.profileCard}>
              <div className={styles.profileBackground} />

              <div className={styles.profileHeader}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarContainer}>
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={`Avatar de ${user.name}`}
                        width={150}
                        height={150}
                        priority
                      />
                    ) : (
                      <FaUserCircle size={150} />
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.editAvatarButton}
                    onClick={handleOpenAvatarModal}
                    aria-label="Alterar avatar"
                    title="Alterar avatar"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>

                <div className={styles.profileIdentity}>
                  <span>Minha conta</span>

                  <h1>{user.name}</h1>

                  <p>{user.email}</p>
                </div>

                <div className={styles.profileStatus}>
                  <ShieldCheck size={18} />

                  <span>Conta ativa</span>
                </div>
              </div>

              <div className={styles.profileActions}>
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={handleOpenEditModal}
                >
                  <Edit3 size={18} />

                  <div>
                    <strong>Editar dados</strong>

                    <span>Atualize suas informações</span>
                  </div>

                  <ChevronRight size={18} />
                </button>

                <button type="button" className={styles.logoutAction} onClick={handleLogout}>
                  <LogOut size={18} />

                  <div>
                    <strong>Sair da conta</strong>

                    <span>Encerrar sessão</span>
                  </div>

                  <ChevronRight size={18} />
                </button>
              </div>
            </section>

            <section className={styles.detailsCard}>
              <div className={styles.sectionHeading}>
                <div>
                  <span>Informações</span>

                  <h2>Dados pessoais</h2>
                </div>

                <UserRound size={22} />
              </div>

              <div className={styles.infoGrid}>
                <article className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <UserRound size={19} />
                  </div>

                  <div>
                    <span>Nome</span>
                    <strong>{user.name}</strong>
                  </div>
                </article>

                <article className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Mail size={19} />
                  </div>

                  <div>
                    <span>E-mail</span>
                    <strong>{user.email}</strong>
                  </div>
                </article>
              </div>
            </section>

            <section className={styles.preferencesCard}>
              <div className={styles.sectionHeading}>
                <div>
                  <span>Preferências</span>

                  <h2>Comunicação</h2>
                </div>

                <Settings size={22} />
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceIcon}>
                  <Bell size={20} />
                </div>

                <div className={styles.preferenceText}>
                  <strong>Receber newsletters</strong>

                  <span>Receba novidades, lançamentos e atualizações da plataforma.</span>
                </div>

                <Switch checked={user.news} onChange={handleNews} disabled={loadingNewsletter} />
              </div>
            </section>

            <section className={styles.subscriptionCard}>
              <div className={styles.sectionHeading}>
                <div>
                  <span>Assinatura</span>

                  <h2>Plano atual</h2>
                </div>

                <ShieldCheck size={22} />
              </div>

              <SubConfig />
            </section>

            <TrustedDevices />

            <ActiveSessions />
          </div>
        )}
      </main>

      {modalVisible && <Avatar handleCloseModal={handleCloseAvatarModal} />}

      {editarDados && <EditarDados handleClose={handleCloseEditModal} />}

      <Footer />
    </>
  )
}
