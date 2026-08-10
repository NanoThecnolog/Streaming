import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NotificationData, NotificationType, subscribeToNotifications } from './notification'
import styles from './styles.module.scss'

const DEFAULT_DURATION = 3500
const MAX_VISIBLE_NOTIFICATIONS = 5

const titles: Record<NotificationType, string> = {
  success: 'Tudo certo',
  error: 'Algo deu errado',
  warning: 'Atenção',
  info: 'Informação',
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

interface NotificationItemProps {
  notification: NotificationData
  onClose: (id: string) => void
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const duration = notification.autoClose === undefined ? DEFAULT_DURATION : notification.autoClose
  const [paused, setPaused] = useState(false)
  const remainingRef = useRef(duration === false ? 0 : duration)
  const startedAtRef = useRef(Date.now())

  useEffect(() => {
    if (duration === false || paused) return

    startedAtRef.current = Date.now()
    const timer = window.setTimeout(() => onClose(notification.id), remainingRef.current)

    return () => {
      window.clearTimeout(timer)
      remainingRef.current = Math.max(remainingRef.current - (Date.now() - startedAtRef.current), 0)
    }
  }, [duration, notification.id, onClose, paused])

  const Icon = icons[notification.type]
  const className = [styles.notification, styles[notification.type], notification.className]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      role={notification.type === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.icon} aria-hidden="true">
        <Icon size={21} />
      </div>

      <div className={styles.content}>
        <strong>{notification.title ?? titles[notification.type]}</strong>
        <p>{notification.message}</p>
      </div>

      {notification.closeButton !== false && (
        <button
          type="button"
          className={styles.close}
          onClick={() => onClose(notification.id)}
          aria-label="Fechar notificação"
        >
          <X size={17} />
        </button>
      )}

      {duration !== false && (
        <span
          className={`${styles.progress} ${paused ? styles.paused : ''}`}
          style={{ animationDuration: `${duration}ms` }}
          aria-hidden="true"
        />
      )}
    </article>
  )
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  useEffect(
    () =>
      subscribeToNotifications((notification) => {
        setNotifications((current) => [...current, notification].slice(-MAX_VISIBLE_NOTIFICATIONS))
      }),
    [],
  )

  const closeNotification = useMemo(
    () => (id: string) => {
      setNotifications((current) => current.filter((notification) => notification.id !== id))
    },
    [],
  )

  return (
    <aside className={styles.viewport} aria-label="Notificações" aria-live="polite">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={closeNotification}
        />
      ))}
    </aside>
  )
}

export { toast } from './notification'
export type { NotificationOptions, NotificationType } from './notification'
