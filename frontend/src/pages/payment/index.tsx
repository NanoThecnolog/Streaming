import Head from 'next/head'
import { useEffect, useState } from 'react'
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
import { creditTest } from '@/utils/Variaveis'
import { toast } from 'react-toastify'
import PaymentLoader from '@/components/ui/PaymentLoader'
import { PlansProps } from '@/@types/plans'

export type CheckoutStep =
    | 'email'
    | 'plan'
    | 'payment'
    | 'personal-data'
    | 'confirmation'
/*| 'password'*/

export type PaymentMethod =
    | 'pix'
    | 'credit-card'
    | 'billet'

export type PaymentStatus =
    | 'idle'
    | 'processing'
    | 'pending'
    | 'confirmed'
    | 'failed'

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
        systemNotify: string,
        user: {
            cpf: string,
            email: string,
            id: string,
            name: string,
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

    payment:
    | 'credit_card'
    | 'banking_billet'
}

interface Props {
    plans: PlanProps[]
}

const loadingEfiPay = async () => {
    if (typeof window !== 'undefined') {
        const EfiPay = (await import("payment-token-efi")).default
        return EfiPay
    }
    return null
}

export default function NewPaymentPage({ plans }: Props) {
    //debug.log("planos recebidos na pagina", plans)

    //const [token, setToken] = useState<string>('')
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('email')

    const [email, setEmail] = useState('')
    const [personalData, setPersonalData] = useState<PersonalData>(
        {
            name: '', cpf: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        }
    )
    const [creditCard, setCreditCard] = useState<CreditCardData>(
        {
            brand: creditTest.brand ?? '',
            holderName: creditTest.holderName ?? '',
            number: creditTest.number ?? '',
            expiryMonth: creditTest.expiryMonth ?? '',
            expiryYear: creditTest.expiryYear ?? '',
            cvv: creditTest.cvv ?? ''
        })

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
    const [selectedPlan, setSelectedPlan] = useState<PlanProps | null>(null)

    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentError, setPaymentError] = useState<string | null>(null)
    const [paymentResult, setPaymentResult] = useState<PaymentApiResponse | null>(null)

    useEffect(() => {
        if (plans.length === 0) return
        const plan = plans.find(plan => plan.type === 'mensal')
        setSelectedPlan(plan ?? plans[0])
    }, [plans])

    useEffect(() => {
        const validate = valid.number(creditCard.number)
        setCreditCard(prev => ({ ...prev, brand: validate.card?.type || "" }))
    }, [creditCard.number])


    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'email':
                return (
                    <EmailStep
                        email={email}
                        onEmailChange={setEmail}
                        onContinue={() => setCurrentStep('plan')}
                    />
                )

            case 'plan':
                return (
                    <PlanStep
                        plans={plans}
                        selectedPlan={selectedPlan}
                        onSelectPlan={setSelectedPlan}
                        onBack={() => setCurrentStep('email')}
                        onContinue={() => setCurrentStep('payment')}
                    />
                )

            case 'payment':
                return (
                    <PaymentMethodStep
                        selectedMethod={paymentMethod}
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
                        onDataChange={setPersonalData}
                        onCreditCardChange={setCreditCard}
                        onBack={() =>
                            setCurrentStep('payment')
                        }
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
                        paymentResult={
                            paymentResult
                        }
                        onBack={() =>
                            setCurrentStep('personal-data')
                        }
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
                    <EmailStep
                        email={email}
                        onEmailChange={setEmail}
                        onContinue={() => setCurrentStep('plan')}
                    />
                )
        }
    }

    //=====================================================================================================================
    //============================ Processamento da EFI ===================================================================
    //=====================================================================================================================

    const createEfiPaymentToken =
        async (): Promise<string> => {
            if (typeof window === 'undefined') {
                throw new Error(
                    'A tokenização do cartão precisa ser executada no navegador.',
                )
            }

            const cardNumber = onlyNumbers(
                creditCard.number,
            )

            const cardValidation =
                valid.number(cardNumber)

            if (!cardValidation.isValid ||
                !cardValidation.card) {
                throw new Error(
                    'Número do cartão inválido.',
                )
            }

            const cpf = onlyNumbers(
                personalData.cpf,
            )

            if (cpf.length !== 11) {
                throw new Error(
                    'CPF do titular inválido.',
                )
            }

            const EfiPay = await loadingEfiPay()

            if (!EfiPay) {
                throw new Error(
                    'Não foi possível carregar o serviço de pagamento.',
                )
            }

            const accountId = process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID

            const environment = process.env.NEXT_PUBLIC_EFI_ENV as 'production' | 'sandbox'

            if (!accountId || !environment) {
                throw new Error(
                    'A configuração da EFI está incompleta.',
                )
            }

            const result =
                await EfiPay.CreditCard
                    .setAccount(accountId)
                    .setEnvironment(environment)
                    .setCreditCardData({
                        brand:
                            cardValidation.card.type,
                        number: cardNumber,
                        cvv: onlyNumbers(
                            creditCard.cvv,
                        ),
                        expirationMonth:
                            creditCard.expiryMonth,
                        expirationYear:
                            creditCard.expiryYear,
                        holderName:
                            creditCard.holderName
                                .trim(),
                        holderDocument: cpf,
                        reuse: false,
                    })
                    .getPaymentToken()

            if (
                !result ||
                !('payment_token' in result) ||
                typeof result.payment_token !==
                'string'
            ) {
                throw new Error(
                    'A EFI não retornou o token do cartão.',
                )
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

                cpf: onlyNumbers(
                    personalData.cpf,
                ),

                phone_number: onlyNumbers(
                    personalData.phoneNumber,
                ),

                password:
                    personalData.password,

                ...(paymentToken
                    ? {
                        payment_token:
                            paymentToken,
                    }
                    : {}),
            },
        }
    }

    /*useEffect(() => {
        loadingEFI()
    }, [])

    const loadingEFI = () => {
        let token
        loadingEfiPay().then((EfiPay) => {
            if (EfiPay) {
                token = getToken(EfiPay) // ta gerando token
            }
        })
    }

    const getToken = async (EfiPay: any) => {
        if (typeof window === 'undefined') return
        let brand
        const validation = valid.number(creditTest.number)
        if (validation.card) brand = validation.card.type
        else brand = null

        //if (!credit || !credit?.expiration || credit.expiration.length !== 4) return

        //const expirationMonth = expirationSlicer(credit.expiration).month
        //const expirationYear = expirationSlicer(credit.expiration).year

        try {
            const result = await EfiPay.CreditCard
                .setAccount(process.env.NEXT_PUBLIC_EFI_ACCOUNT_ID)
                .setEnvironment(process.env.NEXT_PUBLIC_EFI_ENV)
                .setCreditCardData({
                    brand,
                    number: creditCard.number,
                    cvv: creditCard.cvv,
                    expirationMonth: creditCard.expiryMonth,
                    expirationYear: creditCard.expiryYear,
                    holderName: creditCard.holderName,
                    holderDocument: personalData.cpf,
                    reuse: true,
                })
                .getPaymentToken();

            if ("payment_token" in result && "card_mask" in result) {
                debug.log(`token: ${result.payment_token}`)
                debug.log(`mask: ${result.card_mask}`)
                //setToken(result.payment_token)
            }

            debug.log('até aqui ok')
        } catch (err) {
            debug.log("Erro ao gerar token", err)
        }
    }*/
    //===============================================================
    //===============================================================

    const onlyNumbers = (value: string): string => {
        return value.replace(/\D/g, '')
    }

    const normalizeEmail = (value: string): string => {
        return value.trim().toLowerCase()
    }

    const validatePassword = (): boolean => {
        const password =
            personalData.password

        const confirmation =
            personalData.confirmPassword

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
                throw new Error(
                    'O pagamento por Pix ainda não está disponível nesta rota.',
                )

            default:
                throw new Error(
                    'Forma de pagamento inválida.',
                )
        }
    }

    //==================================================================================================================
    //====================================Processamento de Pagamento ===================================================
    //==================================================================================================================

    const processPayment = async () => {
        if (isProcessing) return

        setPaymentError(null)
        setPaymentResult(null)

        if (!selectedPlan) {
            setPaymentError(
                'Selecione um plano antes de continuar.',
            )
            return
        }

        if (!validatePassword()) {
            setPaymentError(
                'A senha não atende aos requisitos informados.',
            )
            return
        }

        const phoneNumber = onlyNumbers(
            personalData.phoneNumber,
        )

        if (!/^[1-9]{2}9\d{8}$/.test(phoneNumber)) {
            setPaymentError(
                'Informe um número de celular válido com DDD.',
            )
            return
        }

        try {
            setIsProcessing(true)
            setPaymentStatus('processing')

            let paymentToken:
                | string
                | undefined

            if (paymentMethod === 'credit-card') {
                paymentToken = await createEfiPaymentToken()
            }

            const payload = buildPaymentPayload(paymentToken)

            const response = await axios.post<PaymentApiResponse>('/api/payment',
                payload,
                {
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                },
            )
            debug.log("resultado da chamada a api/payment", response.data)

            setPaymentResult(response.data)


            const paymentType =
                response.data.subscription.data.payment

            if (paymentType === 'credit_card') {
                setPaymentStatus('confirmed')
            } else if (
                paymentType === 'banking_billet'
            ) {
                setPaymentStatus('pending')
            } else {
                throw new Error(
                    'A API retornou uma forma de pagamento desconhecida.',
                )
            }

            setCurrentStep('confirmation')
        } catch (error: unknown) {
            setPaymentStatus('failed')

            let message =
                'Não foi possível processar o pagamento.'

            if (axios.isAxiosError(error)) {
                const axiosError =
                    error as AxiosError<{
                        message?: string
                        error?: string
                    }>

                message =
                    axiosError.response?.data
                        ?.message ??
                    axiosError.response?.data
                        ?.error ??
                    message

                debug.error(
                    'Erro retornado pela rota /api/payment',
                    {
                        status:
                            axiosError.response
                                ?.status,
                        message,
                    },
                )
            } else if (error instanceof Error) {
                message = error.message

                debug.error(
                    'Erro durante o pagamento',
                    error.message,
                )
            }

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
                <meta
                    name="description"
                    content="Escolha seu plano e conclua sua assinatura."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main className={styles.container}>
                <CheckoutHeader />
                <section className={styles.checkout}>
                    <CheckoutSteps currentStep={currentStep} />

                    <div className={styles.content}>
                        <section className={styles.formArea}>
                            {renderCurrentStep()}
                        </section>

                        {
                            paymentResult ? null : <aside className={styles.summaryArea}>
                                <OrderSummary
                                    plan={selectedPlan}
                                    email={email}
                                />
                            </aside>
                        }
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p>
                        Pagamento protegido e processado em ambiente
                        seguro.
                    </p>

                    <span>
                        Ao continuar, você concorda com os termos de uso e
                        a política de privacidade.
                    </span>
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
                plans: plans.data
            }
        }

    } catch (err) {
        debug.error('Erro ao buscar dados dos planos', err)
        return {
            props: {}
        }
    }
}