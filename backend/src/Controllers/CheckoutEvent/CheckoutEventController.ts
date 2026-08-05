import { CheckoutDevice, CheckoutEventType, CheckoutPaymentMethod, CheckoutStep, Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { CheckoutField } from '../../@types/checkoutEvents/CheckoutField'
import { CheckoutEventService } from '../../Services/CheckoutEvent/CheckoutEventService'
import { CheckoutEventRequest } from '../../@types/checkoutEvents/CheckoutEventRequest'


interface CheckoutEventBody {
    sessionId?: unknown
    type?: unknown
    step?: unknown

    email?: unknown
    userId?: unknown
    planId?: unknown
    paymentMethod?: unknown
    field?: unknown

    durationMs?: unknown
    errorCode?: unknown
    errorMessage?: unknown

    subscriptionId?: unknown
    paymentId?: unknown

    source?: unknown
    medium?: unknown
    campaign?: unknown
    content?: unknown
    referrer?: unknown
    landingPage?: unknown

    device?: unknown
    browser?: unknown
    os?: unknown

    metadata?: unknown
}

const checkoutFields: CheckoutField[] = [
    'email',
    'plan',
    'name',
    'cpf',
    'phone',
    'password',
    'card_number',
    'card_expiry',
    'card_holder',
    'card_cvv',
]

const isEnumValue = <T extends Record<string, string>>(enumObject: T, value: unknown): value is T[keyof T] => {
    return (
        typeof value === 'string' &&
        Object.values(enumObject).includes(value)
    )
}

const isCheckoutField = (value: unknown): value is CheckoutField => {
    return (
        typeof value === 'string' &&
        checkoutFields.includes(value as CheckoutField)
    )
}

const optionalString = (value: unknown, fieldName: string): string | undefined => {
    if (value === undefined || value === null) {
        return undefined
    }

    if (typeof value !== 'string') {
        throw new Error(
            `O campo "${fieldName}" deve ser uma string.`,
        )
    }

    const normalizedValue = value.trim()

    return normalizedValue || undefined
}

export class CheckoutEventController {
    handle = async (req: Request<Record<string, never>, unknown, CheckoutEventBody>, res: Response): Promise<Response> => {
        try {
            const data = this.validateRequest(req.body)

            const checkoutEventService = new CheckoutEventService()

            const result = await checkoutEventService.execute(data)

            return res.status(201).json({
                message: 'Evento do checkout registrado.',
                result,
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({
                    error: err.message,
                })
            }

            return res.status(500).json({
                error: 'Erro ao registrar evento do checkout.',
            })
        }
    }

    private validateRequest(body: CheckoutEventBody): CheckoutEventRequest {
        if (typeof body.sessionId !== 'string' || !body.sessionId.trim()) {
            throw new Error(
                'Session ID do checkout não informado.',
            )
        }

        if (!isEnumValue(CheckoutEventType, body.type)) {
            throw new Error(
                'Tipo de evento do checkout inválido.',
            )
        }

        if (!isEnumValue(CheckoutStep, body.step)) {
            throw new Error(
                'Etapa do checkout inválida.',
            )
        }

        if (body.planId !== undefined && (!Number.isInteger(body.planId) || Number(body.planId) <= 0)) {
            throw new Error('ID do plano inválido.')
        }

        if (body.durationMs !== undefined && (typeof body.durationMs !== 'number' || !Number.isFinite(body.durationMs) || body.durationMs < 0)) {
            throw new Error(
                'Duração do evento inválida.',
            )
        }

        if (body.paymentMethod !== undefined && !isEnumValue(CheckoutPaymentMethod, body.paymentMethod)
        ) {
            throw new Error(
                'Método de pagamento inválido.',
            )
        }

        if (body.device !== undefined && !isEnumValue(CheckoutDevice, body.device)) {
            throw new Error('Dispositivo inválido.')
        }

        if (body.field !== undefined && !isCheckoutField(body.field)) {
            throw new Error(
                'Campo do checkout inválido.',
            )
        }

        if (body.type === CheckoutEventType.FIELD_COMPLETED && !body.field) {
            throw new Error(
                'O campo é obrigatório para eventos FIELD_COMPLETED.',
            )
        }

        if (body.type === CheckoutEventType.PAYMENT_APPROVED && typeof body.paymentId !== 'string') {
            throw new Error(
                'O ID do pagamento é obrigatório para pagamentos aprovados.',
            )
        }

        if (body.type === CheckoutEventType.CHECKOUT_COMPLETED && typeof body.subscriptionId !== 'string') {
            throw new Error(
                'O ID da assinatura é obrigatório para concluir o checkout.',
            )
        }

        return {
            sessionId: body.sessionId.trim(),
            type: body.type,
            step: body.step,

            email: optionalString(body.email, 'email'),
            userId: optionalString(body.userId, 'userId'),

            planId:
                typeof body.planId === 'number'
                    ? body.planId
                    : undefined,

            paymentMethod: isEnumValue(
                CheckoutPaymentMethod,
                body.paymentMethod,
            )
                ? body.paymentMethod
                : undefined,

            field: isCheckoutField(body.field)
                ? body.field
                : undefined,

            durationMs:
                typeof body.durationMs === 'number'
                    ? body.durationMs
                    : undefined,

            errorCode: optionalString(
                body.errorCode,
                'errorCode',
            ),

            errorMessage: optionalString(
                body.errorMessage,
                'errorMessage',
            ),

            subscriptionId: optionalString(
                body.subscriptionId,
                'subscriptionId',
            ),

            paymentId: optionalString(
                body.paymentId,
                'paymentId',
            ),

            source: optionalString(body.source, 'source'),
            medium: optionalString(body.medium, 'medium'),
            campaign: optionalString(
                body.campaign,
                'campaign',
            ),
            content: optionalString(
                body.content,
                'content',
            ),
            referrer: optionalString(
                body.referrer,
                'referrer',
            ),
            landingPage: optionalString(
                body.landingPage,
                'landingPage',
            ),

            device: isEnumValue(
                CheckoutDevice,
                body.device,
            )
                ? body.device
                : undefined,

            browser: optionalString(
                body.browser,
                'browser',
            ),

            os: optionalString(body.os, 'os'),

            metadata:
                body.metadata as
                | Prisma.InputJsonValue
                | undefined,
        }
    }
}