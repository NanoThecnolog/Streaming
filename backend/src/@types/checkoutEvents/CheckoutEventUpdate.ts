import { CheckoutStep } from "@prisma/client"

export interface CheckoutEventUpdate {
    paymentAttempted?: boolean
    paymentApproved?: boolean

    paymentId?: string
    subscriptionId?: string

    failedStep?: CheckoutStep | null
    errorCode?: string | null
    errorMessage?: string | null

    completedAt?: Date
    abandonedAt?: Date

    emailFilled?: boolean
    planSelected?: boolean
    nameFilled?: boolean
    cpfFilled?: boolean
    phoneFilled?: boolean
    passwordCreated?: boolean

    cardNumberFilled?: boolean
    cardExpiryFilled?: boolean
    cardHolderFilled?: boolean
    cardCvvFilled?: boolean
}