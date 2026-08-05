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
}

const createEmailHash = (email: string): string => {
    return createHash('sha256')
        .update(email.trim().toLowerCase())
        .digest('hex')
}

export class CheckoutEventService {
    public async execute({
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

        const eventUpdate = this.resolveEventUpdate({
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
                            ...eventUpdate,
                        },
                        update: {},
                    })

                const highestStep =
                    this.resolveHighestStep(
                        checkout.highestStep,
                        step,
                    )

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
                            currentStep: step,
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
                            ...eventUpdate,
                        },
                    })

                const event =
                    await transaction.checkoutTrackEvent.create({
                        data: {
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
                }
            },
        )
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
            CHECKOUT_COMPLETED: CheckoutStatus.COMPLETED,
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