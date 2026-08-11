import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { EmailStep } from '@/components/ui/Pagamentos/EmailStep'
import { PlanStep } from '@/components/ui/Pagamentos/PlanStep'
import { PaymentMethodStep } from '@/components/ui/Pagamentos/PaymentMethodStep'
import { CheckoutHeader } from '@/components/ui/Pagamentos/CheckoutHeader'
import { CheckoutSteps } from '@/components/ui/Pagamentos/CheckoutSteps'
import { OrderSummary } from '@/components/ui/Pagamentos/OrderSummary'
import { PersonalDataStep } from '@/components/ui/Pagamentos/PersonalDataStep'
import { ConfirmationStep } from '@/components/ui/Pagamentos/ConfirmationStep'
import { GetServerSideProps } from 'next'
import axios, { AxiosError } from 'axios'
import { debug } from '@/classes/DebugLogger'
import { PlanProps } from '@/@types/payment'
import valid from 'card-validator'
import { checkoutStepMap, creditTest, paymentMethodMap } from '@/utils/Variaveis'
import { toast } from '@/components/ui/Notifications'
import PaymentLoader from '@/components/ui/PaymentLoader'
import { PlansProps } from '@/@types/plans'
import { useRouter } from 'next/router'
import { CheckoutTrackField, CheckoutTrackPayload } from '@/@types/checkoutEvents/types'
import { getDeviceType } from '@/utils/UtilitiesFunctions'
import EfiPay from 'payment-token-efi'

export type CheckoutStep = 'email' | 'plan' | 'payment' | 'personal-data' | 'confirmation'
/*| 'password'*/

export type PaymentMethod = 'pix' | 'credit-card' | 'billet'

export type PaymentStatus = 'idle' | 'processing' | 'pending' | 'confirmed' | 'failed'

export interface SelectedPlan {
  type: string
  name: string
  description: string
  features: string[]
}

export interface PersonalData {
  name: string
  cpf: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export interface CreditCardData {
  brand: string
  holderName: string
  holderDocument: string
  number: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export interface PaymentApiResponse {
  subscription: {
    code: number
    data: PaymentResponseData
  }
  user: {
    systemNotify: string
    user: {
      cpf: string
      email: string
      id: string
      name: string
      phone_number: string
    }
    userNotify: string
  }
}

export interface PaymentResponseData {
  subscription_id: number
  status: string

  barcode?: string

  pix?: {
    qrcode: string
    qrcode_image: string
  }

  link?: string
  billet_link?: string

  pdf?: {
    charge: string
  }

  expire_at?: string

  plan: {
    id: number
    interval: number
    repeats: number | null
  }

  charge: {
    id: number
    status: string
    parcel: number
    total: number
  }

  first_execution: string
  total: number

  payment: 'credit_card' | 'banking_billet'
}

interface Props {
  plans: PlanProps[]
}

const loadingEfiPay = async () => {
  if (typeof window !== 'undefined') {
    const EfiPay = (await import('payment-token-efi')).default
    return EfiPay
  }
  return null
}

export default function NewPaymentPage({ plans }: Props) {
  const router = useRouter()
  const [queryPlan, setQueryPlan] = useState<number | null>(null)

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('email')

  const [email, setEmail] = useState('')
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: '',
    cpf: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })
  const [creditCard, setCreditCard] = useState<CreditCardData>({
    brand: '',
    holderName: '',
    holderDocument: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
  const [selectedPlan, setSelectedPlan] = useState<PlanProps | null>(null)

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [paymentResult, setPaymentResult] = useState<PaymentApiResponse | null>(null)

  //==================================================================================================================
  //=====================================Tracking do Checkout=========================================================
  //==================================================================================================================

  const checkoutSessionIdRef = useRef<string | null>(null)
  const checkoutEventQueueRef = useRef<Promise<void>>(Promise.resolve())
  const checkoutCompletedRef = useRef(false)
  const abandonmentSentRef = useRef(false)
  const checkoutStartedTrackedRef = useRef(false)
  const lastViewedStepRef = useRef<CheckoutStep | null>(null)
  const currentStepRef = useRef<CheckoutStep>('email')
  const stepStartedAtRef = useRef<number>(Date.now())

  const getCheckoutSessionId = (): string => {
    if (checkoutSessionIdRef.current) {
      return checkoutSessionIdRef.current
    }

    const storageKey = 'flixnext-checkout-session'
    const storedSessionId = sessionStorage.getItem(storageKey)

    const sessionId = storedSessionId ?? crypto.randomUUID()

    if (!storedSessionId) {
      sessionStorage.setItem(storageKey, sessionId)
    }

    checkoutSessionIdRef.current = sessionId

    return sessionId
  }

  const trackCheckoutEvent = (payload: CheckoutTrackPayload): Promise<boolean> => {
    if (typeof window === 'undefined') return Promise.resolve(false)

    const event = {
      sessionId: getCheckoutSessionId(),
      ...payload,
      eventId: payload.eventId ?? crypto.randomUUID(),
    }

    const request = async (): Promise<boolean> => {
      const retryDelays = [0, 300, 900]

      for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
        if (retryDelays[attempt] > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, retryDelays[attempt]))
        }

        try {
          await axios.post('/api/events/checkout', event)
          return true
        } catch (error) {
          const shouldRetry =
            axios.isAxiosError(error) &&
            (!error.response || error.response.status === 429 || error.response.status >= 500)

          if (!shouldRetry || attempt === retryDelays.length - 1) {
            debug.error('Erro ao registrar evento do checkout', error)
            return false
          }
        }
      }

      return false
    }

    const queuedRequest = checkoutEventQueueRef.current.then(request, request)

    checkoutEventQueueRef.current = queuedRequest.then(() => undefined)

    return queuedRequest
  }

  useEffect(() => {
    if (!router.isReady || checkoutStartedTrackedRef.current) return

    checkoutStartedTrackedRef.current = true

    const params = new URLSearchParams(window.location.search)

    void trackCheckoutEvent({
      type: 'CHECKOUT_STARTED',
      step: 'EMAIL',

      source: params.get('utm_source') ?? undefined,
      medium: params.get('utm_medium') ?? undefined,
      campaign: params.get('utm_campaign') ?? undefined,
      content: params.get('utm_content') ?? undefined,

      referrer: document.referrer || undefined,
      landingPage: window.location.pathname,

      device: getDeviceType(),
      browser: navigator.userAgent,
    })
  }, [router.isReady])

  useEffect(() => {
    currentStepRef.current = currentStep
    stepStartedAtRef.current = Date.now()

    if (currentStep === 'confirmation' || lastViewedStepRef.current === currentStep) return

    lastViewedStepRef.current = currentStep

    void trackCheckoutEvent({
      type: 'STEP_VIEWED',
      step: checkoutStepMap[currentStep],
    })
  }, [currentStep])

  useEffect(() => {
    const handlePageHide = () => {
      if (
        checkoutCompletedRef.current ||
        abandonmentSentRef.current ||
        !checkoutSessionIdRef.current
      ) {
        return
      }

      abandonmentSentRef.current = true

      const payload = JSON.stringify({
        eventId: crypto.randomUUID(),
        sessionId: checkoutSessionIdRef.current,
        type: 'CHECKOUT_ABANDONED',
        step: checkoutStepMap[currentStepRef.current],
        durationMs: Date.now() - stepStartedAtRef.current,
      })

      navigator.sendBeacon(
        '/api/events/checkout',
        new Blob([payload], { type: 'application/json' }),
      )
      sessionStorage.removeItem('flixnext-checkout-session')
    }

    window.addEventListener('pagehide', handlePageHide)

    return () => window.removeEventListener('pagehide', handlePageHide)
  }, [])

  const goToStep = (nextStep: CheckoutStep, direction: 'continue' | 'back' = 'continue'): void => {
    const durationMs = Date.now() - stepStartedAtRef.current

    if (direction === 'continue' && currentStep === 'email' && normalizeEmail(email)) {
      void trackCheckoutEvent({
        type: 'FIELD_COMPLETED',
        step: 'EMAIL',
        field: 'email',
        email: normalizeEmail(email),
      })
    }

    if (direction === 'continue' && currentStep === 'plan' && selectedPlan) {
      void trackCheckoutEvent({
        type: 'FIELD_COMPLETED',
        step: 'PLAN',
        field: 'plan',
        planId: selectedPlan.planId,
      })
    }

    void trackCheckoutEvent({
      type: direction === 'continue' ? 'STEP_COMPLETED' : 'STEP_RETURNED',
      step: checkoutStepMap[currentStep],
      durationMs,
      email: currentStep === 'email' ? normalizeEmail(email) : undefined,
      planId: selectedPlan?.planId,
      paymentMethod: paymentMethodMap[paymentMethod],
    })

    setCurrentStep(nextStep)
    //goToStep(nextStep)
  }

  const trackCompletedFields = (): void => {
    const fields: CheckoutTrackField[] = []

    if (personalData.name.trim()) {
      fields.push('name')
    }

    if (onlyNumbers(personalData.cpf).length === 11) {
      fields.push('cpf')
    }

    if (onlyNumbers(personalData.phoneNumber)) {
      fields.push('phone')
    }

    if (personalData.password) {
      fields.push('password')
    }

    if (paymentMethod === 'credit-card') {
      if (onlyNumbers(creditCard.number)) {
        fields.push('card_number')
      }
      if (onlyNumbers(creditCard.holderDocument).length === 11) {
        fields.push('card_document')
      }

      if (creditCard.expiryMonth && creditCard.expiryYear) {
        fields.push('card_expiry')
      }

      if (creditCard.holderName.trim()) {
        fields.push('card_holder')
      }

      if (creditCard.cvv) {
        fields.push('card_cvv')
      }
    }

    fields.forEach((field) => {
      void trackCheckoutEvent({
        type: 'FIELD_COMPLETED',
        step: field.startsWith('card_') ? 'PAYMENT_DATA' : 'PERSONAL_DATA',
        field,
      })
    })
  }

  const trackValidationError = (
    errorCode: string,
    errorMessage: string,
    step: CheckoutTrackPayload['step'] = 'PERSONAL_DATA',
  ): void => {
    void trackCheckoutEvent({
      type: 'VALIDATION_ERROR',
      step,
      errorCode,
      errorMessage,
    })
  }
  //==================================================================================================================
  //==================================================================================================================
  //==================================================================================================================
  //==================================================================================================================
  //==================================================================================================================

  useEffect(() => {
    if (!router) return
    //debug.log("queries:", router.query)
    const planID = router.query.id
    //debug.log("planID", planID)
    //debug.log("planos: ", plans)
    if (!planID) {
      debug.log('id do plano não recebido')
      return
    }
    if (Array.isArray(planID)) {
      debug.log('mais de um id recebido')
      return
    }
    setQueryPlan(parseInt(planID as string))
  }, [router, router.query])

  useEffect(() => {
    if (plans && plans.length === 0) return
    if (queryPlan) {
      const plan = plans.find((plan) => plan.planId === queryPlan)
      setSelectedPlan(plan ?? plans[0])
      return
    }
    const plan = plans.find((plan) => plan.type === 'mensal')
    setSelectedPlan(plan ?? plans[0])
  }, [plans, queryPlan])

  useEffect(() => {
    const validate = valid.number(creditCard.number)
    setCreditCard((prev) => ({ ...prev, brand: validate.card?.type || '' }))
  }, [creditCard.number])

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <EmailStep email={email} onEmailChange={setEmail} onContinue={() => goToStep('plan')} />
        )

      case 'plan':
        return (
          <PlanStep
            plans={plans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            onBack={() => goToStep('email', 'back')}
            onContinue={() => goToStep('payment')}
          />
        )

      case 'payment':
        return (
          <PaymentMethodStep
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
            onBack={() => goToStep('plan', 'back')}
            onContinue={() => goToStep('personal-data')}
          />
        )
      case 'personal-data':
        return (
          <PersonalDataStep
            data={personalData}
            creditCard={creditCard}
            paymentMethod={paymentMethod}
            onDataChange={setPersonalData}
            onCreditCardChange={setCreditCard}
            onBack={() => goToStep('payment', 'back')}
            onContinue={processPayment}
            isProcessing={isProcessing}
            paymentError={paymentError}
          />
        )

      case 'confirmation':
        return (
          <ConfirmationStep
            email={email}
            paymentMethod={paymentMethod}
            paymentStatus={paymentStatus}
            paymentResult={paymentResult}
            onBack={() => setCurrentStep('personal-data')}
          />
        )

      /*case 'password':
                return (
                    <PasswordStep
                        email={email}
                        onBack={() =>
                            setCurrentStep('confirmation')
                        }
                        onFinish={(password) => {
                            console.log({
                                email,
                                password,
                            })
                        }}
                    />
                )*/

      default:
        return (
          <EmailStep email={email} onEmailChange={setEmail} onContinue={() => goToStep('plan')} />
        )
    }
  }

  //=====================================================================================================================
  //============================ Processamento da EFI ===================================================================
  //=====================================================================================================================

  const createEfiPaymentToken = async (): Promise<string> => {
    if (typeof window === 'undefined') {
      throw new Error('A tokenização do cartão precisa ser executada no navegador.')
    }

    const cardNumber = onlyNumbers(creditCard.number)

    const cardValidation = valid.number(cardNumber)

    if (!cardValidation.isValid || !cardValidation.card) {
      throw new Error('Número do cartão inválido.')
    }

    const cpf = onlyNumbers(creditCard.holderDocument)

    if (cpf.length !== 11) {
      throw new Error('CPF do titular inválido.')
    }

    const EfiPay = await loadingEfiPay()

    if (!EfiPay) {
      throw new Error('Não foi possível carregar o serviço de pagamento.')
    }

    const accountId = process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID

    const environment = process.env.NEXT_PUBLIC_EFI_ENV as 'production' | 'sandbox'

    if (!accountId || !environment) {
      throw new Error('A configuração da EFI está incompleta.')
    }

    //try {
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

    /* if ("payment_token" in result && "card_mask" in result) {



                 debug.log("payment_token", result.payment_token);
                 debug.log("card_mask", result.card_mask);
                 return result.payment_token
             }
         } catch (err: any) {
             debug.log(err);
             debug.log("Código: ", err.code);
             debug.log("Nome: ", err.error);
             debug.log("Mensagem: ", err.error_description);
         }*/
    //return ''

    if (!result || !('payment_token' in result) || typeof result.payment_token !== 'string') {
      throw new Error('A EFI não retornou o token do cartão.')
    }
    return result.payment_token
  }

  const buildPaymentPayload = (paymentToken?: string) => {
    if (!selectedPlan) {
      toast.warning('Selecione um plano antes de continuar.')
      return
    }

    const method = getApiPaymentMethod(paymentMethod)

    return {
      planId: selectedPlan.planId,
      method,

      customer: {
        name: personalData.name.trim(),
        email: normalizeEmail(email),

        cpf: onlyNumbers(personalData.cpf),

        phone_number: onlyNumbers(personalData.phoneNumber),

        password: personalData.password,

        ...(paymentToken
          ? {
              payment_token: paymentToken,
            }
          : {}),
      },
    }
  }
  //===============================================================
  //===============================================================

  const onlyNumbers = (value: string): string => {
    return value.replace(/\D/g, '')
  }

  const normalizeEmail = (value: string): string => {
    return value.trim().toLowerCase()
  }

  const validatePassword = (): boolean => {
    const password = personalData.password

    const confirmation = personalData.confirmPassword

    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      password === confirmation
    )
  }

  const getApiPaymentMethod = (method: PaymentMethod): 'credit' | 'billet' => {
    switch (method) {
      case 'credit-card':
        return 'credit'

      case 'billet':
        return 'billet'

      case 'pix':
        throw new Error('O pagamento por Pix ainda não está disponível nesta rota.')

      default:
        throw new Error('Forma de pagamento inválida.')
    }
  }

  //==================================================================================================================
  //====================================Processamento de Pagamento ===================================================
  //==================================================================================================================

  const processPayment = async () => {
    if (isProcessing) return

    setPaymentError(null)
    setPaymentResult(null)

    trackCompletedFields()

    if (!selectedPlan) {
      const message = 'Selecione um plano antes de continuar.'

      setPaymentError(message)

      trackValidationError('PLAN_NOT_SELECTED', message, 'PLAN')
      return
    }

    if (!validatePassword()) {
      const message = 'A senha não atende aos requisitos informados.'

      setPaymentError(message)

      trackValidationError('INVALID_PASSWORD', message)
      return
    }

    const phoneNumber = onlyNumbers(personalData.phoneNumber)

    if (!/^[1-9]{2}9\d{8}$/.test(phoneNumber)) {
      const message = 'Informe um número de celular válido com DDD.'

      setPaymentError(message)

      trackValidationError('INVALID_PHONE', message)
      return
    }

    try {
      setIsProcessing(true)
      setPaymentStatus('processing')

      let paymentToken: string | undefined

      if (paymentMethod === 'credit-card') {
        paymentToken = await createEfiPaymentToken()
      }

      const payload = buildPaymentPayload(paymentToken)

      if (!payload) {
        throw new Error('Não foi possível montar os dados do pagamento.')
      }
      void trackCheckoutEvent({
        type: 'PAYMENT_ATTEMPTED',
        step: 'PAYMENT_DATA',
        planId: selectedPlan.planId,
        paymentMethod: paymentMethodMap[paymentMethod],
      })

      const response = await axios.post<PaymentApiResponse>('/api/payment', payload, {
        headers: { 'Content-Type': 'application/json' },
      })
      debug.log('resultado da chamada a api/payment', response.data)

      setPaymentResult(response.data)

      const subscription = response.data.subscription.data

      const paymentType = subscription.payment

      if (paymentType === 'credit_card') {
        setPaymentStatus('pending')
      } else if (paymentType === 'banking_billet') {
        setPaymentStatus('pending')
      } else {
        throw new Error('A API retornou uma forma de pagamento desconhecida.')
      }

      await trackCheckoutEvent({
        type: 'CHECKOUT_COMPLETED',
        step: 'COMPLETED',
        subscriptionId: String(subscription.subscription_id),
        paymentId: String(subscription.charge.id),
        planId: selectedPlan.planId,
        paymentMethod: paymentMethodMap[paymentMethod],
      })

      checkoutCompletedRef.current = true
      sessionStorage.removeItem('flixnext-checkout-session')

      setCurrentStep('confirmation')
    } catch (error: unknown) {
      setPaymentStatus('failed')

      let message = 'Não foi possível processar o pagamento.'

      let errorCode = 'PAYMENT_PROCESSING_ERROR'

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>

        message = axiosError.response?.data?.message ?? axiosError.response?.data?.error ?? message

        debug.error('Erro retornado pela rota /api/payment', {
          status: axiosError.response?.status,
          message,
        })

        errorCode = error.response?.status
          ? `HTTP_${error.response.status}`
          : 'PAYMENT_API_UNAVAILABLE'
      } else if (error instanceof Error) {
        message = error.message

        debug.error('Erro durante o pagamento', error.message)
      }

      void trackCheckoutEvent({
        type: 'PAYMENT_FAILED',
        step: 'PAYMENT_DATA',
        planId: selectedPlan?.planId,
        paymentMethod: paymentMethodMap[paymentMethod],
        errorCode,
        errorMessage: message,
      })

      setPaymentError(message)
    } finally {
      setIsProcessing(false)
    }
  }

  //===============================================================
  //===============================================================

  return (
    <>
      <Head>
        <title>Assine a FlixNext</title>
        <meta name="description" content="Escolha seu plano e conclua sua assinatura." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <CheckoutHeader />
        <section className={styles.checkout}>
          <CheckoutSteps currentStep={currentStep} />

          <div className={styles.content}>
            <section className={styles.formArea}>{renderCurrentStep()}</section>

            {paymentResult ? null : (
              <aside className={styles.summaryArea}>
                <OrderSummary plan={selectedPlan} email={email} />
              </aside>
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Pagamento protegido e processado em ambiente seguro.</p>

          <span>Ao continuar, você concorda com os termos de uso e a política de privacidade.</span>
        </footer>
      </main>

      {isProcessing && <PaymentLoader />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_LINK
  try {
    const plans = await axios.get<PlansProps[]>(`${baseUrl}/api/plan/list`)

    return {
      props: {
        plans: plans.data,
      },
    }
  } catch (err) {
    debug.error('Erro ao buscar dados dos planos', err)
    return {
      props: {
        plans: [],
      },
    }
  }
}
