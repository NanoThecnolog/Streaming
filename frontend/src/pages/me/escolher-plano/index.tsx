import Head from 'next/head'
import axios from 'axios'
import valid from 'card-validator'
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PaymentLoader from '@/components/ui/PaymentLoader'
import { PlanStep } from '@/components/ui/Pagamentos/PlanStep'
import { PaymentMethodStep } from '@/components/ui/Pagamentos/PaymentMethodStep'
import { PersonalDataStep } from '@/components/ui/Pagamentos/PersonalDataStep'
import { OrderSummary } from '@/components/ui/Pagamentos/OrderSummary'

import {
  CreditCardData,
  PaymentMethod,
  PaymentStatus,
  PersonalData,
  PlanProps,
} from '@/@types/payment'
import { useFlix } from '@/contexts/FlixContext'
import { debug } from '@/classes/DebugLogger'

import styles from './styles.module.scss'
import { useSubscriptionPayment } from '@/hooks/usePayment'
import { ConfirmationStep } from '@/components/ui/Pagamentos/ConfirmationStep'
import { PaymentApiResponse } from '@/pages/payment'

type ReactivationStep = 'plan' | 'payment' | 'personal-data' | 'confirmation'

interface PageProps {
  plans: PlanProps[]
}

interface UpdatedSubscriptionResponse {
  planId: number
}

type ReactivationPaymentResponse = PaymentApiResponse | UpdatedSubscriptionResponse

const initialPersonalData: PersonalData = {
  name: '',
  cpf: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
}

const initialCreditCard: CreditCardData = {
  brand: '',
  holderName: '',
  holderDocument: '',
  number: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
}

const isPaymentApiResponse = (
  response: ReactivationPaymentResponse,
): response is PaymentApiResponse => {
  return 'subscription' in response
}

export default function ChoosePlanPage({ plans }: PageProps) {
  const router = useRouter()
  const { user } = useFlix()

  const initializedUser = useRef(false)

  const [currentStep, setCurrentStep] = useState<ReactivationStep>('plan')

  const [selectedPlan, setSelectedPlan] = useState<PlanProps | null>(null)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
  const [paymentResult, setPaymentResult] = useState<PaymentApiResponse | null>(null)
  const [creditCard, setCreditCard] = useState<CreditCardData>(initialCreditCard)

  const [personalData, setPersonalData] = useState<PersonalData>(initialPersonalData)

  const { processPayment, isProcessing, paymentError } = useSubscriptionPayment()

  useEffect(() => {
    if (!plans.length) return

    const queryPlanId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id

    const planId = Number(queryPlanId)

    const planFromQuery = Number.isFinite(planId)
      ? plans.find((plan) => plan.planId === planId)
      : null

    const defaultPlan = plans.find((plan) => plan.type === 'mensal') ?? plans[0]

    setSelectedPlan(planFromQuery ?? defaultPlan)
  }, [plans, router.query.id])

  useEffect(() => {
    if (!user || initializedUser.current) return

    setPersonalData((previous) => ({
      ...previous,
      name: user.name ?? '',
      cpf: user.cpf ?? '',
      phoneNumber: user.phone_number ?? '',
    }))

    initializedUser.current = true
  }, [user])

  useEffect(() => {
    const validation = valid.number(creditCard.number)

    setCreditCard((previous) => ({
      ...previous,
      brand: validation.card?.type ?? '',
    }))
  }, [creditCard.number])

  const handlePayment = async () => {
    if (!user || !selectedPlan) {
      toast.warning('Não foi possível identificar o usuário ou plano.')
      return
    }

    setPaymentStatus('processing')

    const result = await processPayment<ReactivationPaymentResponse>({
      endpoint: '/api/user/payment',
      planId: selectedPlan.planId,
      email: user.email,
      paymentMethod,
      personalData,
      creditCard,
      includePassword: false,
    })

    if (!result.success) {
      setPaymentStatus('failed')
      return
    }

    if (!isPaymentApiResponse(result.data)) {
      toast.success('Assinatura reativada com sucesso!')

      await router.replace('/me')
      return
    }

    setPaymentResult(result.data)

    setPaymentStatus('pending')

    setCurrentStep('confirmation')
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'plan':
        return (
          <PlanStep
            plans={plans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            onBack={() => router.push('/me')}
            onContinue={() => setCurrentStep('payment')}
          />
        )

      case 'payment':
        return (
          <PaymentMethodStep
            selectedMethod={paymentMethod}
            allowedMethods={['credit-card', 'billet']}
            onSelectMethod={setPaymentMethod}
            onBack={() => setCurrentStep('plan')}
            onContinue={() => setCurrentStep('personal-data')}
          />
        )

      case 'personal-data':
        return (
          <PersonalDataStep
            data={personalData}
            creditCard={creditCard}
            paymentMethod={paymentMethod}
            requirePassword={false}
            onDataChange={setPersonalData}
            onCreditCardChange={setCreditCard}
            onBack={() => setCurrentStep('payment')}
            onContinue={handlePayment}
            isProcessing={isProcessing}
            paymentError={paymentError}
          />
        )

      case 'confirmation':
        if (!paymentResult) return null

        return (
          <ConfirmationStep
            email={user?.email ?? ''}
            paymentMethod={paymentMethod}
            paymentStatus={paymentStatus}
            paymentResult={paymentResult}
            onBack={() => setCurrentStep('personal-data')}
            mode="reactivation"
          />
        )
    }
  }

  return (
    <>
      <Head>
        <title>Reativar assinatura | FlixNext</title>

        <meta name="description" content="Escolha um plano e reative sua assinatura." />
      </Head>

      <Header />

      <main
        className={[
          styles.container,
          currentStep === 'confirmation' ? styles.singleColumn : '',
          currentStep === 'confirmation' ? styles.confirmationPage : '',
        ].join(' ')}
      >
        <section className={styles.content}>
          <header
            className={[
              styles.userInfo,
              currentStep === 'confirmation' ? styles.confirmationHeader : '',
              currentStep === 'confirmation' && paymentStatus === 'pending'
                ? styles.pendingHeader
                : '',
            ].join(' ')}
          >
            <span className={styles.status}>
              {currentStep === 'confirmation'
                ? paymentMethod === 'credit-card'
                  ? 'Pagamento em processamento'
                  : 'Pagamento pendente'
                : 'Assinatura inativa'}
            </span>

            <h1>
              {currentStep === 'confirmation'
                ? paymentMethod === 'credit-card'
                  ? 'Estamos processando seu pagamento'
                  : 'Conclua o pagamento'
                : 'Reative sua assinatura'}
            </h1>

            <p>
              {currentStep === 'confirmation'
                ? paymentMethod === 'credit-card'
                  ? 'Sua solicitação foi recebida. Acompanhe a confirmação na página da sua assinatura.'
                  : 'Sua solicitação foi registrada. O acesso será liberado após a confirmação do pagamento.'
                : 'Escolha um plano e uma forma de pagamento para continuar.'}
            </p>
          </header>

          <section
            className={`${styles.formArea} ${
              currentStep === 'confirmation' ? styles.confirmationArea : ''
            }`}
          >
            {renderCurrentStep()}
          </section>
        </section>

        {!paymentResult && (
          <aside className={styles.summaryArea}>
            <OrderSummary plan={selectedPlan} email={user?.email ?? ''} />
          </aside>
        )}
      </main>

      <Footer />

      {isProcessing && <PaymentLoader />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req }) => {
  const token = req.cookies['flix-token']

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_LINK

    const response = await axios.get<PlanProps[]>(`${baseUrl}/api/plan/list`)

    return {
      props: {
        plans: response.data,
      },
    }
  } catch (error) {
    debug.error('Erro ao buscar planos', error)

    return {
      props: {
        plans: [],
      },
    }
  }
}
