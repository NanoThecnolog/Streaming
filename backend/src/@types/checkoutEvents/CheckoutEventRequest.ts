import { CheckoutDevice, CheckoutEventType, CheckoutPaymentMethod, CheckoutStep, Prisma } from "@prisma/client"
import { CheckoutField } from "./CheckoutField"

export interface CheckoutEventRequest {
    eventId?: string
    sessionId: string
    type: CheckoutEventType
    step: CheckoutStep

    email?: string
    userId?: string
    planId?: number
    paymentMethod?: CheckoutPaymentMethod
    field?: CheckoutField

    durationMs?: number
    errorCode?: string
    errorMessage?: string

    subscriptionId?: string
    paymentId?: string

    source?: string
    medium?: string
    campaign?: string
    content?: string
    referrer?: string
    landingPage?: string

    device?: CheckoutDevice
    browser?: string
    os?: string

    metadata?: Prisma.InputJsonValue
}
