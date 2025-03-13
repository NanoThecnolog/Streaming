import prismaClient from '../../prisma';
import { apiEmail } from '../../Utils/apiMessenger';
import { debugLog } from '../../Utils/DebugLog';

interface NotificationProps {
    title: string,
    description: string
    tmdbId: number
    season?: number
    episode?: number
    userId: string
}
export class ProblemNotificationService {
    async execute(data: NotificationProps) {
        try {

            const notificationExiste = await prismaClient.problem.findUnique({
                where: { tmdbId: data.tmdbId }
            })
            if (notificationExiste) return { code: 200, message: "Notificação de problema já relatada." }

            const newNotificaiton = await prismaClient.problem.create({
                data: {
                    title: data.title,
                    description: data.description,
                    tmdbId: data.tmdbId,
                    season: data.season,
                    episode: data.episode,
                    userId: data.userId,
                    status: 'pendente'
                }
            })
            try {
                await apiEmail.post('/system/problem', data)
            } catch (err) {
                debugLog('Erro ao enviar email', err)
                return {
                    code: 500,
                    message: "Erro ao enviar notificação por email",
                    error: err
                }
            }
            return {
                code: 200,
                message: "Notificação criada com sucesso",
                data: newNotificaiton
            }
        } catch (err) {
            debugLog("Erro ao criar notificação", err)
            return {
                code: 500,
                message: "Erro interno ao processar a notificação.",
                error: err
            }
        }
    }
}