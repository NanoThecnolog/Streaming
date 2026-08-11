import { createHash } from 'node:crypto'
import {
    CheckoutDevice,
    CheckoutEventType,
    CheckoutPaymentMethod,
    CheckoutStatus,
    CheckoutStep,
    Prisma,
} from '@prisma/client'
import prismaClient from '../../prisma'
import { CheckoutField } from '../../@types/checkoutEvents/CheckoutField'
import { CheckoutEventUpdate } from '../../@types/checkoutEvents/CheckoutEventUpdate'
import { CheckoutEventRequest } from '../../@types/checkoutEvents/CheckoutEventRequest'
import { ResolveEventUpdateRequest } from '../../@types/checkoutEvents/ResolveEventUpdateRequest'


const stepOrder: Record<CheckoutStep, number> = {
    EMAIL: 1,
    PLAN: 2,
    PAYMENT_METHOD: 3,
    PERSONAL_DATA: 4,
    PAYMENT_DATA: 5,
    CONFIRMATION: 6,
    PASSWORD: 7,
    COMPLETED: 8,
}

const fieldUpdateMap: Record<
    CheckoutField,
    CheckoutEventUpdate
> = {
    email: {
        emailFilled: true,
    },
    plan: {
        planSelected: true,
    },
    name: {
        nameFilled: true,
    },
    cpf: {
        cpfFilled: true,
    },
    phone: {
        phoneFilled: true,
    },
    password: {
        passwordCreated: true,
    },
    card_number: {
        cardNumberFilled: true,
    },
    card_expiry: {
        cardExpiryFilled: true,
    },
    card_holder: {
        cardHolderFilled: true,
    },
    card_cvv: {
        cardCvvFilled: true,
    },
    card_document: {
        cardDocumentFilled: true,
    },
}

const createEmailHash = (email: string): string => {
    return createHash('sha256')
        .update(email.trim().toLowerCase())
        .digest('hex')
}

export class CheckoutEventService {
    public async execute(request: CheckoutEventRequest) {
        const maxAttempts = 3

        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
            try {
                return await this.persistEvent(request)
            } catch (error) {
                const shouldRetry =
                    error instanceof Prisma.PrismaClientKnownRequestError &&
                    (error.code === 'P2034' ||
                        (error.code === 'P2002' && Boolean(request.eventId))) &&
                    attempt < maxAttempts

                if (!shouldRetry) {
                    throw error
                }
            }
        }

        throw new Error('Não foi possível registrar o evento do checkout.')
    }

    private async persistEvent({
        eventId,
        sessionId,
        type,
        step,
        email,
        userId,
        planId,
        paymentMethod,
        field,
        durationMs,
        errorCode,
        errorMessage,
        subscriptionId,
        paymentId,
        source,
        medium,
        campaign,
        content,
        referrer,
        landingPage,
        device,
        browser,
        os,
        metadata,
    }: CheckoutEventRequest) {
        const normalizedSessionId = sessionId.trim()

        if (!normalizedSessionId) {
            throw new Error(
                'Session ID do checkout não informado.',
            )
        }

        if (durationMs !== undefined && durationMs < 0) {
            throw new Error(
                'A duração do evento não pode ser negativa.',
            )
        }

        const now = new Date()
        const emailHash = email
            ? createEmailHash(email)
            : undefined

        const incomingEventUpdate = this.resolveEventUpdate({
            type,
            step,
            field,
            errorCode,
            errorMessage,
            subscriptionId,
            paymentId,
            now,
        })

        return prismaClient.$transaction(
            async (transaction) => {
                if (eventId) {
                    const existingEvent = await transaction.checkoutTrackEvent.findUnique({
                        where: { eventId },
                        include: { checkout: true },
                    })

                    if (existingEvent) {
                        if (existingEvent.checkout.sessionId !== normalizedSessionId) {
                            throw new Error('O ID do evento já pertence a outra sessão de checkout.')
                        }

                        const { checkout, ...event } = existingEvent

                        return {
                            checkout,
                            event,
                            duplicate: true,
                        }
                    }
                }

                const checkout =
                    await transaction.checkoutTrack.upsert({
                        where: {
                            sessionId: normalizedSessionId,
                        },
                        create: {
                            sessionId: normalizedSessionId,
                            userId,
                            emailHash,
                            planId,
                            paymentMethod,
                            currentStep: step,
                            highestStep: step,
                            status: this.resolveStatus(type),
                            source,
                            medium,
                            campaign,
                            content,
                            referrer,
                            landingPage,
                            device,
                            browser,
                            os,
                            lastEventAt: now,
                            emailFilled: Boolean(email),
                            planSelected: planId !== undefined,
                            ...incomingEventUpdate,
                        },
                        update: {},
                    })

                const highestStep =
                    this.resolveHighestStep(
                        checkout.highestStep,
                        step,
                    )

                const isCompleted = checkout.status === CheckoutStatus.COMPLETED
                const isAbandoned = checkout.status === CheckoutStatus.ABANDONED
                const isCompleting = type === CheckoutEventType.CHECKOUT_COMPLETED
                const canUpdateProgress = !isCompleted && (!isAbandoned || isCompleting)

                const eventUpdate = canUpdateProgress
                    ? incomingEventUpdate
                    : {}

                const currentStep = canUpdateProgress
                    ? this.resolveCurrentStep(checkout.currentStep, step, type)
                    : checkout.currentStep

                const updatedCheckout =
                    await transaction.checkoutTrack.update({
                        where: {
                            id: checkout.id,
                        },
                        data: {
                            userId,
                            emailHash,
                            planId,
                            paymentMethod,
                            currentStep,
                            highestStep,
                            status: this.resolveStatus(
                                type,
                                checkout.status,
                            ),
                            source,
                            medium,
                            campaign,
                            content,
                            referrer,
                            landingPage,
                            device,
                            browser,
                            os,
                            lastEventAt: now,
                            ...(email ? { emailFilled: true } : {}),
                            ...(planId !== undefined ? { planSelected: true } : {}),
                            ...eventUpdate,
                        },
                    })

                const event =
                    await transaction.checkoutTrackEvent.create({
                        data: {
                            eventId,
                            checkoutId: checkout.id,
                            type,
                            step,
                            field,
                            durationMs,
                            errorCode,
                            errorMessage,
                            metadata,
                        },
                    })

                return {
                    checkout: updatedCheckout,
                    event,
                    duplicate: false,
                }
            },
            {
                isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
            },
        )
    }

    private resolveCurrentStep(
        currentStep: CheckoutStep,
        incomingStep: CheckoutStep,
        eventType: CheckoutEventType,
    ): CheckoutStep {
        if (eventType === CheckoutEventType.CHECKOUT_COMPLETED) {
            return CheckoutStep.COMPLETED
        }

        if (eventType === CheckoutEventType.CHECKOUT_STARTED && stepOrder[currentStep] > stepOrder[CheckoutStep.EMAIL]) {
            return currentStep
        }

        return incomingStep
    }

    private resolveHighestStep(
        currentStep: CheckoutStep,
        incomingStep: CheckoutStep,
    ): CheckoutStep {
        const currentStepOrder = stepOrder[currentStep]
        const incomingStepOrder = stepOrder[incomingStep]

        return incomingStepOrder > currentStepOrder
            ? incomingStep
            : currentStep
    }

    private resolveStatus(
        eventType: CheckoutEventType,
        currentStatus: CheckoutStatus = CheckoutStatus.STARTED,
    ): CheckoutStatus {
        if (currentStatus === CheckoutStatus.COMPLETED) {
            return CheckoutStatus.COMPLETED
        }

        if (eventType === CheckoutEventType.CHECKOUT_COMPLETED) {
            return CheckoutStatus.COMPLETED
        }

        if (currentStatus === CheckoutStatus.ABANDONED) {
            return CheckoutStatus.ABANDONED
        }

        if (eventType === CheckoutEventType.CHECKOUT_STARTED && currentStatus !== CheckoutStatus.STARTED) {
            return currentStatus
        }

        const statusByEvent: Partial<
            Record<CheckoutEventType, CheckoutStatus>
        > = {
            CHECKOUT_STARTED: CheckoutStatus.STARTED,
            STEP_VIEWED: CheckoutStatus.IN_PROGRESS,
            FIELD_COMPLETED: CheckoutStatus.IN_PROGRESS,
            STEP_COMPLETED: CheckoutStatus.IN_PROGRESS,
            STEP_RETURNED: CheckoutStatus.IN_PROGRESS,
            VALIDATION_ERROR: CheckoutStatus.IN_PROGRESS,
            PAYMENT_ATTEMPTED:
                CheckoutStatus.PAYMENT_PENDING,
            PAYMENT_FAILED: CheckoutStatus.FAILED,
            CHECKOUT_ABANDONED:
                CheckoutStatus.ABANDONED,
        }

        return statusByEvent[eventType] ?? currentStatus
    }

    private resolveEventUpdate({
        type,
        step,
        field,
        errorCode,
        errorMessage,
        subscriptionId,
        paymentId,
        now,
    }: ResolveEventUpdateRequest): CheckoutEventUpdate {
        const update: CheckoutEventUpdate = {}

        if (
            type === CheckoutEventType.FIELD_COMPLETED &&
            field
        ) {
            Object.assign(update, fieldUpdateMap[field])
        }

        if (
            type === CheckoutEventType.PAYMENT_ATTEMPTED
        ) {
            update.paymentAttempted = true
        }

        if (
            type === CheckoutEventType.PAYMENT_APPROVED
        ) {
            update.paymentAttempted = true
            update.paymentApproved = true
            update.paymentId = paymentId
            update.errorCode = null
            update.errorMessage = null
            update.failedStep = null
        }

        if (type === CheckoutEventType.PAYMENT_FAILED) {
            update.paymentAttempted = true
            update.paymentApproved = false
            update.failedStep = step
            update.errorCode = errorCode
            update.errorMessage = errorMessage
        }

        if (
            type === CheckoutEventType.VALIDATION_ERROR
        ) {
            update.failedStep = step
            update.errorCode = errorCode
            update.errorMessage = errorMessage
        }

        if (
            type === CheckoutEventType.CHECKOUT_COMPLETED
        ) {
            update.completedAt = now
            update.subscriptionId = subscriptionId
            update.paymentId = paymentId
            update.errorCode = null
            update.errorMessage = null
            update.failedStep = null
        }

        if (
            type === CheckoutEventType.CHECKOUT_ABANDONED
        ) {
            update.abandonedAt = now
        }

        return update
    }
}
