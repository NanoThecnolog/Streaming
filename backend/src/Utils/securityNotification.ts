import { apiEmail } from './apiMessenger'

const formatDateTime = (): string =>
    new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo',
    }).format(new Date())

export const notifyAccountSecurityChange = async (
    user: { name: string; email: string },
    changeType: string,
): Promise<void> => {
    try {
        await apiEmail.post('/notification/security/account-changed', {
            name: user.name,
            email: user.email,
            changeType,
            changedAt: formatDateTime(),
        })
    } catch (error) {
        console.error('Alteração de conta concluída, mas o aviso de segurança não foi enviado.', error)
    }
}

export const notifyNewDeviceConnected = async (data: {
    name: string
    email: string
    deviceName: string
}): Promise<void> => {
    try {
        await apiEmail.post('/notification/security/device-connected', {
            ...data,
            accessedAt: formatDateTime(),
        })
    } catch (error) {
        console.error('Dispositivo conectado, mas o aviso de segurança não foi enviado.', error)
    }
}
