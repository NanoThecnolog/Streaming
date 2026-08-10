export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationOptions {
  autoClose?: number | false
  title?: string
  className?: string
  closeButton?: boolean
}

export interface NotificationData extends NotificationOptions {
  id: string
  message: string
  type: NotificationType
  createdAt: number
}

type NotificationListener = (notification: NotificationData) => void

const listeners = new Set<NotificationListener>()
const pending: NotificationData[] = []
let sequence = 0

const emit = (
  type: NotificationType,
  message: string,
  options: NotificationOptions = {},
): string => {
  const notification: NotificationData = {
    id: `${Date.now()}-${sequence++}`,
    type,
    message: String(message),
    createdAt: Date.now(),
    ...options,
  }

  if (!listeners.size) pending.push(notification)
  listeners.forEach((listener) => listener(notification))

  return notification.id
}

export const subscribeToNotifications = (listener: NotificationListener): (() => void) => {
  listeners.add(listener)
  pending.splice(0).forEach(listener)
  return () => listeners.delete(listener)
}

export const toast = {
  success: (message: string, options?: NotificationOptions) => emit('success', message, options),
  error: (message: string, options?: NotificationOptions) => emit('error', message, options),
  warning: (message: string, options?: NotificationOptions) => emit('warning', message, options),
  warn: (message: string, options?: NotificationOptions) => emit('warning', message, options),
  info: (message: string, options?: NotificationOptions) => emit('info', message, options),
}
