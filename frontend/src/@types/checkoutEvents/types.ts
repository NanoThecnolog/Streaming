export type CheckoutTrackStep =
    | 'EMAIL'
    | 'PLAN'
    | 'PAYMENT_METHOD'
    | 'PERSONAL_DATA'
    | 'PAYMENT_DATA'
    | 'CONFIRMATION'
    | 'PASSWORD'
    | 'COMPLETED'

export type CheckoutTrackEvent =
    | 'CHECKOUT_STARTED'
    | 'STEP_VIEWED'
    | 'FIELD_COMPLETED'
    | 'STEP_COMPLETED'
    | 'STEP_RETURNED'
    | 'VALIDATION_ERROR'
    | 'PAYMENT_ATTEMPTED'
    | 'PAYMENT_FAILED'
    | 'PAYMENT_APPROVED'
    | 'CHECKOUT_COMPLETED'
    | 'CHECKOUT_ABANDONED'

export type CheckoutTrackField =
    | 'email'
    | 'plan'
    | 'name'
    | 'cpf'
    | 'phone'
    | 'password'
    | 'card_number'
    | 'card_expiry'
    | 'card_holder'
    | 'card_cvv'

export interface CheckoutTrackPayload {
    type: CheckoutTrackEvent
    step: CheckoutTrackStep

    field?: CheckoutTrackField
    email?: string
    planId?: number
    paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'BILLET'

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

    device?: 'MOBILE' | 'TABLET' | 'DESKTOP' | 'UNKNOWN'
    browser?: string
    os?: string

    metadata?: Record<string, string | number | boolean | null>
}