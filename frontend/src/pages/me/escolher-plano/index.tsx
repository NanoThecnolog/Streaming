import Head from 'next/head'
import styles from './styles.module.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PlanProp } from '@/@types/plans'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import { useFlix } from '@/contexts/FlixContext'
import { debug } from '@/classes/DebugLogger'
import { Functions } from '@/classes/Functions'
import Link from 'next/link'
import { formatPrice } from '@/utils/UtilitiesFunctions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import PaymentLoader from '@/components/ui/PaymentLoader'
import { Validate } from '@/classes/validator'
import { Normalize } from '@/classes/Normalize'

interface PageProps {
    plans: PlanProp[] | null,
}

export interface DataUserPaymentProps {
    nome: string,
    cpf: string,
    telefone: string,
    birthday: string,
    address: {
        street: string,
        number: string,
        neighborhood: string,
        zipcode: string,
        city: string,
        complement: string | null,
        state: string
    }
}
export default function PaymentUserPage({ plans }: PageProps) {
    const router = useRouter()
    const { user, setSubscription } = useFlix()
    //const [selectedPlan, setSelectedPlan] = useState<PlanProp | null>(null)
    const [loading, setLoading] = useState(false)
    const [planIdSelected, setPlanIdSelected] = useState<number | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<PlanProp | null>(null)
    //const [method, setMethod] = useState<"credit" | "billet" | null>(null)
    const [checked, setChecked] = useState(false)
    const [dataUser, setDataUser] = useState<DataUserPaymentProps>(
        {
            nome: "",
            cpf: "",
            telefone: "",
            birthday: '',
            address: {
                street: "",
                number: "",
                neighborhood: "",
                zipcode: "",
                city: "",
                complement: "",
                state: "",
            },
        }
    )

    useEffect(() => {
        debug.log(planIdSelected)
    }, [planIdSelected])
    useEffect(() => {
        debug.log(dataUser)
    }, [dataUser])
    useEffect(() => {
        const getAddress = async () => {
            if (dataUser.address.zipcode.length !== 8) return
            const data = await Functions.getAddress(dataUser.address.zipcode)
            debug.log(data)
            if (!data || data.erro) {
                setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: "", street: "", city: "", state: "" } }))
                return
            }
            setDataUser((prev) => ({ ...prev, address: { ...prev.address, neighborhood: data.bairro, street: data.logradouro, city: data.localidade, state: data.estado } }))
        }
        getAddress()
    }, [dataUser.address.zipcode])


    useEffect(() => {
        if (!user) return

        setDataUser({
            nome: user.name,
            cpf: user.cpf ?? "",
            telefone: user.phone_number ?? "",
            birthday: String(user.birthday),
            address: {
                street: user.address?.street ?? "",
                number: user.address?.number ?? "",
                neighborhood: user.address?.neighborhood ?? "",
                zipcode: user.address?.zipcode ?? "",
                city: user.address?.city ?? "",
                complement: user.address?.complement ?? "",
                state: user.address?.state ?? "",
            },
        })
    }, [user])

    useEffect(() => {
        if (plans && plans.length > 0) {
            const selectedPlan = plans.find(p => p.planId === planIdSelected)
            if (!selectedPlan) return
            setSelectedPlan(selectedPlan)
        }
    }, [planIdSelected, plans])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!planIdSelected || !checked) return

        if (!user) return
        const validations = [
            {
                valid: Validate.fullName(dataUser.nome),
                message: 'Nome inválido! O nome precisa ter nome e sobrenome'
            },
            {
                valid: Validate.cpf(dataUser.cpf),
                message: 'CPF inválido. Tente novamente ou entre em contato conosco!'
            },
            {
                valid: Validate.phone(dataUser.telefone),
                message: 'Telefone precisa ser no formato DDD+Número (21991234567)'
            },
            {
                valid: Validate.cep(dataUser.address.zipcode),
                message: 'Cep inválido. Verifique e tente novamente!'
            },

        ]

        for (const { valid, message } of validations) {
            if (!valid) {
                toast.error(message)
                return
            }
        }

        const customer = {
            name: Normalize.names(dataUser.nome),
            email: user.email,
            cpf: Normalize.cpf(dataUser.cpf),
            phone_number: Normalize.phone(dataUser.telefone),
            birthday: dataUser.birthday,
            address: {
                street: dataUser.address.street,
                number: dataUser.address.number,
                neighborhood: dataUser.address.neighborhood,
                zipcode: Normalize.cep(dataUser.address.zipcode),
                city: dataUser.address.city,
                state: Normalize.state(dataUser.address.state),
                complement: dataUser.address.complement
            }
        }
        const payload = {
            planId: planIdSelected,
            customer,
        }

        setLoading(true)
        try {

            // TODO: chamada para criação da assinatura (boleto)
            const response = await axios.post('/api/user/payment', payload)

            if (response.data?.subscription) {
                debug.log("Assinatura criada com sucesso!")
                toast.success("Assinatura criada com sucesso!")
                const subData = response.data.subscription.data
                const params = {
                    pdf: subData.pdf.charge,
                    pix: subData.pix.qrcode_image,
                    barcode: subData.barcode
                }
                router.push(`/success?${new URLSearchParams(params).toString()}`)
            }
            if (response.data?.planId) {
                debug.log("Assinatura atualizada")
                toast.success("Assinatura atualizada com sucesso!")
                setSubscription(user.subscription)
                router.push('/me')
            }
        } catch (err) {
            toast.error("Erro ao criar assinatura! Tente novamente mais tarde ou entre em contato.")
            debug.log("Erro ao chamar rota de pagamento para usuários ativos", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>Pagina de pagamento do usuário</title>
                <meta name='description' content='' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            <main className={styles.container}>
                <section className={styles.content}>
                    <div className={styles.userInfo}>
                        <h2>Olá, {user?.name}</h2>
                        <p>Finalize sua assinatura para continuar usando a plataforma.</p>
                    </div>


                    <section className={styles.plans}>
                        <h3>Escolha seu plano</h3>

                        <div className={styles.planGrid}>
                            {plans && plans.map(plan => (
                                <button
                                    key={plan.planId}
                                    type="button"
                                    onClick={() => setPlanIdSelected(plan.planId)}
                                    className={`${styles.planCard} ${planIdSelected === plan.planId ? styles.active : ''}`}
                                >
                                    <strong>{plan.name}</strong>
                                    <span>{formatPrice(plan.price)}</span>
                                </button>
                            ))}
                        </div>
                    </section>


                    <section className={styles.userData}>
                        <h3>Dados obrigatórios</h3>

                        <div className={styles.field}>
                            <label htmlFor="nome">Nome completo</label>
                            <input
                                id="nome"
                                value={dataUser.nome}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, nome: e.target.value }))}
                                required
                                placeholder='Nome e Sobrenome'
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="cpf">CPF</label>
                            <input
                                id="cpf"
                                value={dataUser.cpf}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, cpf: e.target.value }))}
                                required
                                placeholder='Somente números - 11122233398'
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="telefone">Celular</label>
                            <input
                                id="telefone"
                                value={dataUser.telefone}
                                onChange={(e) => setDataUser((prev) => ({ ...prev, telefone: e.target.value }))}
                                required
                                placeholder='DDD+Número - 21991234567'
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="zipcode">CEP</label>
                            <input
                                id="zipcode"
                                value={dataUser.address.zipcode}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, zipcode: e.target.value.replace(/\D/g, '') },
                                    }))
                                }
                                required
                                placeholder='CEP sem traços'
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="street">Logradouro</label>
                            <input
                                id="street"
                                value={dataUser.address.street}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, street: e.target.value },
                                    }))
                                }
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="number">Número</label>
                            <input
                                id="number"
                                value={dataUser.address.number}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, number: e.target.value },
                                    }))
                                }
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="neighborhood">Bairro</label>
                            <input
                                id="neighborhood"
                                value={dataUser.address.neighborhood}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, neighborhood: e.target.value },
                                    }))
                                }
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="city">Cidade</label>
                            <input
                                id="city"
                                value={dataUser.address.city}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, city: e.target.value },
                                    }))
                                }
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="state">Estado</label>
                            <input
                                id="state"
                                value={dataUser.address.state}
                                onChange={(e) =>
                                    setDataUser((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, state: e.target.value },
                                    }))
                                }
                                required
                            />
                        </div>
                    </section>

                    <section className={styles.paymentMethod}>
                        <h3>Forma de pagamento</h3>

                        <div className={styles.billetBox}>
                            <strong>Boleto bancário</strong>
                            <p>O boleto será gerado após a confirmação.</p>
                        </div>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={e => setChecked(e.target.checked)}
                            />
                            Concordo com os Termos de Uso e Política de Privacidade.
                        </label>
                        <p className={styles.advice}>
                            Ao marcar a caixa de seleção acima, você concorda com nossos <strong><Link href="/termos-de-uso" target='_blank' rel='noopener noreferrer'>Termos de Uso</Link></strong> e com nossa <strong><Link href="/privacidade" target='_blank' rel='noopener noreferrer'>Declaração de Privacidade</Link></strong> e confirma ter mais de 18 anos. A FlixNext renovará automaticamente sua assinatura e cobrará o preço da assinatura escolhida da sua forma de pagamento até você cancelar. Você pode cancelar quando quiser para evitar cobranças futuras.
                        </p>
                    </section>
                </section>
                <aside className={styles.summary}>
                    <h3>Resumo da Assinatura</h3>
                    <div className={styles.asidePlanName}>
                        <strong>{selectedPlan?.name ?? '-'}</strong>
                    </div>
                    <div className={styles.asidePrice}>
                        <span>Valor mensal</span>
                        <strong>
                            {selectedPlan
                                ? formatPrice(selectedPlan.price)
                                : '-'}
                        </strong>
                    </div>

                    <button
                        form="form"
                        disabled={!checked || !planIdSelected || loading}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Processando...' : 'Finalizar assinatura'}
                    </button>
                </aside>
            </main>
            <Footer />
            {loading && <PaymentLoader />}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx

    const token = req.cookies['flix-token']


    if (!token) return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }

    try {

        const plans = await axios.get('https://flixnext.com.br/api/plan/list')



        return {
            props: {
                plans: plans.data
            }
        }

    } catch (err) {
        console.log('Erro durante getServerSideProps', err)
        return {
            props: {
                plans: null
            }
        }
    }
}


//terminar de criar a pagina para usuários com conta já ativa poderem contratar assinatura nova
//criar algo mais simples. permitir que complete os dados que faltam. Escolher o plano num select mais simples.