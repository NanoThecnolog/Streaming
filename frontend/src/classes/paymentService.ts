import axios from 'axios'
import valid from 'card-validator'

import { CreditCardData, PaymentMethod, PersonalData } from '@/@types/payment'
import { Validate } from '@/classes/validator'

interface SubscriptionPaymentInput {
  endpoint: string
  planId: number
  email: string
  paymentMethod: PaymentMethod
  personalData: PersonalData
  creditCard: CreditCardData
  includePassword: boolean
}

const onlyNumbers = (value: string): string => {
  return value.replace(/\D/g, '')
}

const normalizeEmail = (value: string): string => {
  return value.trim().toLowerCase()
}

const getApiPaymentMethod = (method: PaymentMethod): 'credit' | 'billet' => {
  if (method === 'credit-card') {
    return 'credit'
  }

  if (method === 'billet') {
    return 'billet'
  }

  throw new Error('O pagamento por Pix não está disponível nesta rota.')
}

export class SubscriptionPaymentService {
  private validatePassword = (password: string, confirmation: string): boolean => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      password === confirmation
    )
  }

  private validateInput = (input: SubscriptionPaymentInput): void => {
    const { personalData, includePassword, paymentMethod, creditCard } = input

    if (!Validate.fullName(personalData.name)) {
      throw new Error('Informe seu nome e sobrenome.')
    }

    if (!Validate.cpf(personalData.cpf)) {
      throw new Error('Informe um CPF válido.')
    }

    if (!Validate.phone(personalData.phoneNumber)) {
      throw new Error('Informe um celular válido com DDD.')
    }

    if (
      includePassword &&
      !this.validatePassword(personalData.password, personalData.confirmPassword)
    ) {
      throw new Error('A senha não atende aos requisitos informados.')
    }
    if (paymentMethod === 'credit-card') {
      if (!Validate.cardHolderName(creditCard.holderName)) {
        throw new Error('Informe o nome do titular do cartão.')
      }

      if (!Validate.cardHolderDocument(creditCard.holderDocument)) {
        throw new Error('Informe um CPF válido para o titular do cartão.')
      }

      if (!Validate.creditCardNumber(creditCard.number)) {
        throw new Error('Informe um número de cartão válido.')
      }

      if (!Validate.cardExpiry(creditCard.expiryMonth, creditCard.expiryYear)) {
        throw new Error('Informe uma validade de cartão válida.')
      }

      if (!Validate.cvv(creditCard.cvv)) {
        throw new Error('Informe um código de segurança válido.')
      }
    }
  }

  private loadEfiPay = async () => {
    if (typeof window === 'undefined') {
      throw new Error('A tokenização do cartão precisa ser executada no navegador.')
    }

    return (await import('payment-token-efi')).default
  }

  private createEfiPaymentToken = async (
    creditCard: CreditCardData,
    holderDocument: string,
  ): Promise<string> => {
    const cardNumber = onlyNumbers(creditCard.number)
    const cardValidation = valid.number(cardNumber)

    if (!cardValidation.isValid || !cardValidation.card) {
      throw new Error('Número do cartão inválido.')
    }

    const cpf = onlyNumbers(holderDocument)

    if (cpf.length !== 11) {
      throw new Error('CPF do titular inválido.')
    }

    const accountId = process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID

    const environment = process.env.NEXT_PUBLIC_EFI_ENV

    if (!accountId || (environment !== 'production' && environment !== 'sandbox')) {
      throw new Error('A configuração da Efí está incompleta.')
    }

    const EfiPay = await this.loadEfiPay()

    const result = await EfiPay.CreditCard.setAccount(accountId)
      .setEnvironment(environment)
      .setCreditCardData({
        brand: cardValidation.card.type,
        number: cardNumber,
        cvv: onlyNumbers(creditCard.cvv),
        expirationMonth: creditCard.expiryMonth,
        expirationYear: creditCard.expiryYear,
        holderName: creditCard.holderName.trim(),
        holderDocument: cpf,
        reuse: true,
      })
      .getPaymentToken()

    if (!result || !('payment_token' in result) || typeof result.payment_token !== 'string') {
      throw new Error('A Efí não retornou o token do cartão.')
    }

    return result.payment_token
  }

  public process = async <TResponse>(input: SubscriptionPaymentInput): Promise<TResponse> => {
    this.validateInput(input)

    const { endpoint, planId, email, paymentMethod, personalData, creditCard, includePassword } =
      input

    const paymentToken =
      paymentMethod === 'credit-card'
        ? await this.createEfiPaymentToken(creditCard, creditCard.holderDocument)
        : undefined

    const payload = {
      planId,
      method: getApiPaymentMethod(paymentMethod),

      customer: {
        name: personalData.name.trim(),
        email: normalizeEmail(email),
        cpf: onlyNumbers(personalData.cpf),
        phone_number: onlyNumbers(personalData.phoneNumber),

        ...(includePassword
          ? {
              password: personalData.password,
            }
          : {}),

        ...(paymentToken
          ? {
              payment_token: paymentToken,
            }
          : {}),
      },
    }

    const response = await axios.post<TResponse>(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  }
}

export const subscriptionPaymentService = new SubscriptionPaymentService()
