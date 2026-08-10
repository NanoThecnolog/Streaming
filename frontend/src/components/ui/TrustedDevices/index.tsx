import axios from 'axios'
import { Laptop, Loader2, LogOut, MonitorSmartphone, Smartphone } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from '@/components/ui/Notifications'
import { useFlix } from '@/contexts/FlixContext'
import styles from './styles.module.scss'

interface TrustedDevice {
  id: string
  name: string
  createdAt: string
  lastSeenAt: string
  current: boolean
  activeSessions: number
}

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

const DeviceIcon = ({ name }: { name: string }) => {
  if (/Android|iOS/.test(name)) return <Smartphone size={22} />
  if (/Windows|macOS|Linux/.test(name)) return <Laptop size={22} />
  return <MonitorSmartphone size={22} />
}

export default function TrustedDevices() {
  const { signOut } = useFlix()
  const [devices, setDevices] = useState<TrustedDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const loadDevices = useCallback(async () => {
    try {
      const { data } = await axios.get<{ devices: TrustedDevice[] }>('/api/backend/devices')
      setDevices(data.devices)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await signOut('revoked')
        return
      }
      toast.error('Não foi possível carregar os dispositivos conectados.')
    } finally {
      setLoading(false)
    }
  }, [signOut])

  useEffect(() => {
    void loadDevices()
  }, [loadDevices])

  const hasOtherDevices = useMemo(() => devices.some((device) => !device.current), [devices])

  const revokeDevice = async (device: TrustedDevice) => {
    if (removingId) return
    setRemovingId(device.id)

    if (device.current) {
      await signOut('manual', async () => {
        await axios.delete(`/api/backend/devices/${device.id}`)
      })
      return
    }

    try {
      await axios.delete(`/api/backend/devices/${device.id}`)
      setDevices((current) => current.filter((item) => item.id !== device.id))
      toast.success('Dispositivo desconectado.')
    } catch {
      toast.error('Não foi possível desconectar o dispositivo.')
    } finally {
      setRemovingId(null)
    }
  }

  const revokeOthers = async () => {
    if (removingId) return
    setRemovingId('others')

    try {
      await axios.delete('/api/backend/devices')
      setDevices((current) => current.filter((device) => device.current))
      toast.success('Outros dispositivos foram desconectados.')
    } catch {
      toast.error('Não foi possível desconectar os outros dispositivos.')
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <section className={styles.card}>
      <header className={styles.heading}>
        <div>
          <span>Segurança</span>
          <h2>Dispositivos conectados</h2>
          <p>Confira onde sua conta está conectada e encerre acessos desconhecidos.</p>
        </div>

        {hasOtherDevices && (
          <button type="button" onClick={revokeOthers} disabled={Boolean(removingId)}>
            {removingId === 'others' ? (
              <Loader2 size={17} className={styles.spinner} />
            ) : (
              <LogOut size={17} />
            )}
            Desconectar outros
          </button>
        )}
      </header>

      {loading ? (
        <div className={styles.feedback}>
          <Loader2 size={26} className={styles.spinner} />
          <span>Carregando dispositivos...</span>
        </div>
      ) : devices.length ? (
        <div className={styles.list}>
          {devices.map((device) => (
            <article className={styles.device} key={device.id}>
              <div className={styles.icon}>
                <DeviceIcon name={device.name} />
              </div>

              <div className={styles.details}>
                <div className={styles.nameRow}>
                  <strong>{device.name}</strong>
                  {device.current && <span>Este dispositivo</span>}
                </div>
                <p>Última atividade: {formatDate(device.lastSeenAt)}</p>
                <small>
                  Primeiro acesso: {formatDate(device.createdAt)} · {device.activeSessions}{' '}
                  {device.activeSessions === 1 ? 'sessão ativa' : 'sessões ativas'}
                </small>
              </div>

              <button
                type="button"
                className={styles.disconnect}
                onClick={() => revokeDevice(device)}
                disabled={Boolean(removingId)}
                aria-label={`Desconectar ${device.name}`}
              >
                {removingId === device.id ? (
                  <Loader2 size={18} className={styles.spinner} />
                ) : (
                  <LogOut size={18} />
                )}
                <span>Desconectar</span>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.feedback}>Nenhum dispositivo ativo foi encontrado.</div>
      )}
    </section>
  )
}
