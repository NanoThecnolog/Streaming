import { useRef, useState } from 'react'
import axios from 'axios'

import { CreditCardData, PaymentMethod, PersonalData } from '@/@types/payment'
import { subscriptionPaymentService } from '@/classes/paymentService'

interface ProcessPaymentInput {
  endpoint: string
  planId: number
  email: string
  paymentMethod: PaymentMethod
  personalData: PersonalData
  creditCard: CreditCardData
  includePassword: boolean
}

type PaymentExecutionResult<TResponse> =
  | {
      success: true
      data: TResponse
    }
  | {
      success: false
      error: string
    }

interface ApiError {
  message?: string
  error?: string
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      'Não foi possível processar o pagamento.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Não foi possível processar o pagamento.'
}

export const useSubscriptionPayment = () => {
  const processingRef = useRef(false)

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const processPayment = async <TResponse>(
    input: ProcessPaymentInput,
  ): Promise<PaymentExecutionResult<TResponse>> => {
    if (processingRef.current) {
      return {
        success: false,
        error: 'O pagamento já está sendo processado.',
      }
    }

    processingRef.current = true
    setIsProcessing(true)
    setPaymentError(null)

    try {
      const data = await subscriptionPaymentService.process<TResponse>(input)

      return {
        success: true,
        data,
      }
    } catch (error) {
      const message = getErrorMessage(error)

      setPaymentError(message)

      return {
        success: false,
        error: message,
      }
    } finally {
      processingRef.current = false
      setIsProcessing(false)
    }
  }

  const clearPaymentError = () => {
    setPaymentError(null)
  }

  return {
    processPayment,
    isProcessing,
    paymentError,
    clearPaymentError,
  }
}
