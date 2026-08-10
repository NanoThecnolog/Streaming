import axios from 'axios'
import { Clock3, Loader2, LogOut, MonitorSmartphone } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from '@/components/ui/Notifications'
import { useFlix } from '@/contexts/FlixContext'
import styles from './styles.module.scss'

interface ActiveSession {
  id: string
  createdAt: string
  lastSeenAt: string
  expiresAt: string
  current: boolean
  device: {
    id: string
    name: string
  } | null
}

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export default function ActiveSessions() {
  const { signOut } = useFlix()
  const [sessions, setSessions] = useState<ActiveSession[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const loadSessions = useCallback(async () => {
    try {
      const { data } = await axios.get<{ sessions: ActiveSession[] }>('/api/backend/sessions')
      setSessions(data.sessions)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await signOut('revoked')
        return
      }
      toast.error('Não foi possível carregar as sessões ativas.')
    } finally {
      setLoading(false)
    }
  }, [signOut])

  useEffect(() => {
    void loadSessions()
  }, [loadSessions])

  const hasOtherSessions = useMemo(() => sessions.some((session) => !session.current), [sessions])

  const revokeSession = async (session: ActiveSession) => {
    if (removingId) return
    setRemovingId(session.id)

    if (session.current) {
      await signOut()
      return
    }

    try {
      await axios.delete(`/api/backend/sessions/${session.id}`)
      setSessions((current) => current.filter((item) => item.id !== session.id))
      toast.success('Sessão encerrada.')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await signOut('revoked')
        return
      }
      toast.error('Não foi possível encerrar a sessão.')
    } finally {
      setRemovingId(null)
    }
  }

  const revokeOthers = async () => {
    if (removingId) return
    setRemovingId('others')

    try {
      await axios.delete('/api/backend/sessions')
      setSessions((current) => current.filter((session) => session.current))
      toast.success('Outras sessões foram encerradas.')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await signOut('revoked')
        return
      }
      toast.error('Não foi possível encerrar as outras sessões.')
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <section className={styles.card}>
      <header className={styles.heading}>
        <div>
          <span>Segurança</span>
          <h2>Sessões ativas</h2>
          <p>Veja os acessos ativos da sua conta e encerre sessões que não reconhecer.</p>
        </div>

        {hasOtherSessions && (
          <button type="button" onClick={revokeOthers} disabled={Boolean(removingId)}>
            {removingId === 'others' ? (
              <Loader2 size={17} className={styles.spinner} />
            ) : (
              <LogOut size={17} />
            )}
            Encerrar outras
          </button>
        )}
      </header>

      {loading ? (
        <div className={styles.feedback}>
          <Loader2 size={26} className={styles.spinner} />
          <span>Carregando sessões...</span>
        </div>
      ) : sessions.length ? (
        <div className={styles.list}>
          {sessions.map((session) => (
            <article className={styles.session} key={session.id}>
              <div className={styles.icon}>
                <MonitorSmartphone size={22} />
              </div>

              <div className={styles.details}>
                <div className={styles.nameRow}>
                  <strong>{session.device?.name ?? 'Dispositivo não identificado'}</strong>
                  {session.current && <span>Esta sessão</span>}
                </div>
                <p>Última atividade: {formatDate(session.lastSeenAt)}</p>
                <small>
                  <Clock3 size={13} />
                  Iniciada em {formatDate(session.createdAt)} · expira em{' '}
                  {formatDate(session.expiresAt)}
                </small>
              </div>

              <button
                type="button"
                className={styles.disconnect}
                onClick={() => revokeSession(session)}
                disabled={Boolean(removingId)}
                aria-label={`Encerrar sessão em ${session.device?.name ?? 'dispositivo não identificado'}`}
              >
                {removingId === session.id ? (
                  <Loader2 size={18} className={styles.spinner} />
                ) : (
                  <LogOut size={18} />
                )}
                <span>Encerrar</span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.feedback}>Nenhuma sessão ativa foi encontrada.</div>
      )}
    </section>
  )
}
