import { CheckoutEventType, CheckoutStep } from "@prisma/client"
import { CheckoutField } from "./CheckoutField"

export interface ResolveEventUpdateRequest {
    type: CheckoutEventType
    step: CheckoutStep
    field?: CheckoutField
    errorCode?: string
    errorMessage?: string
    subscriptionId?: string
    paymentId?: string
    now: Date
}