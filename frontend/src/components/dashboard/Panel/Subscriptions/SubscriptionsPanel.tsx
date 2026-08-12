import { Search, Users, RefreshCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DashboardSubscription, InvoiceStatus } from '@/@types/Dashboard/dashboard'
import { dashboardService } from '@/classes/DashboardService'
import styles from './styles.module.scss'

const statusLabels: Record<string, string> = {
  active: 'Ativa',
  new_charge: 'Ativa',
  trial: 'Período trial',
  canceled: 'Cancelada',
  expired: 'Expirada',
  waiting: 'Aguardando pagamento',
  unpaid: 'Inadimplente',
}

const invoiceLabels: Record<InvoiceStatus, string> = {
  new: 'Nova',
  waiting: 'Aguardando',
  identified: 'Identificada',
  approved: 'Aprovada',
  paid: 'Paga',
  settled: 'Paga',
  unpaid: 'Não paga',
  refunded: 'Devolvida',
  contested: 'Contestada',
  canceled: 'Cancelada',
  expired: 'Expirada',
}

const date = (value: string | null) => (value ? new Date(value).toLocaleDateString('pt-BR') : '—')

const money = (value: number | null) =>
  value === null ? '—' : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const subscriptionState = (subscription: DashboardSubscription) => {
  const now = Date.now()
  if (subscription.status.toLowerCase() === 'canceled') return 'canceled'
  if (subscription.accessUntil && new Date(subscription.accessUntil).getTime() > now) {
    if (subscription.trialEndsAt && new Date(subscription.trialEndsAt).getTime() > now)
      return 'trial'
    return 'active'
  }
  return 'expired'
}

export const SubscriptionsPanel = () => {
  const [subscriptions, setSubscriptions] = useState<DashboardSubscription[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // A coleção base não deve ser filtrada pelo status. Os cards do resumo
      // precisam continuar representando o total real enquanto a tabela muda.
      setSubscriptions(await dashboardService.getSubscriptions({ search }))
    } catch {
      setError('Não foi possível carregar as assinaturas.')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    void load()
  }, [load])

  const summary = useMemo(
    () =>
      subscriptions.reduce(
        (result, item) => {
          const state = subscriptionState(item)
          result[state] = (result[state] ?? 0) + 1
          return result
        },
        {} as Record<string, number>,
      ),
    [subscriptions],
  )

  const visibleSubscriptions = useMemo(() => {
    if (status === 'all') return subscriptions

    return subscriptions.filter((item) => {
      const state = subscriptionState(item)
      if (status === 'inactive') return state === 'expired' || state === 'canceled'
      if (status === 'waiting' || status === 'unpaid') {
        return item.status.toLowerCase() === status
      }
      return state === status
    })
  }, [status, subscriptions])

  return (
    <div className={styles.content}>
      <section className={styles.pageHeading}>
        <div>
          <span className={styles.eyebrow}>GESTÃO DE ASSINATURAS</span>
          <h1>Assinaturas</h1>
          <p>Consulte planos, clientes, status e cobranças sem dados simulados.</p>
        </div>
        <button
          className={styles.refreshButton}
          type="button"
          onClick={() => void load()}
          disabled={loading}
        >
          <RefreshCcw size={16} className={loading ? styles.spinning : ''} /> Atualizar
        </button>
      </section>

      <section className={styles.subscriptionSummary} aria-label="Resumo das assinaturas">
        {[
          ['Todas', subscriptions.length, 'all'],
          ['Ativas', summary.active ?? 0, 'active'],
          ['Em trial', summary.trial ?? 0, 'trial'],
          ['Expiradas/canceladas', (summary.expired ?? 0) + (summary.canceled ?? 0), 'inactive'],
        ].map(([label, value, key]) => (
          <button
            type="button"
            key={key}
            className={status === key ? styles.subscriptionSummaryActive : ''}
            onClick={() => setStatus(String(key))}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </button>
        ))}
      </section>

      <section className={`${styles.panel} ${styles.subscriptionsPanel}`}>
        <div className={styles.subscriptionToolbar}>
          <label className={styles.subscriptionSearch}>
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') void load()
              }}
              placeholder="Buscar por nome, email ou subId..."
            />
          </label>
          <select
            aria-label="Filtrar assinaturas"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativas</option>
            <option value="trial">Em trial</option>
            <option value="waiting">Aguardando pagamento</option>
            <option value="unpaid">Inadimplentes</option>
            <option value="canceled">Canceladas</option>
            <option value="expired">Expiradas</option>
          </select>
        </div>
        {error && <p className={styles.requestError}>{error}</p>}
        {loading ? (
          <p className={styles.emptyState}>Carregando assinaturas...</p>
        ) : visibleSubscriptions.length === 0 ? (
          <p className={styles.emptyState}>
            <Users size={18} /> Nenhuma assinatura encontrada.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Plano</th>
                  <th>EFI</th>
                  <th>Status</th>
                  <th>Pagamento</th>
                  <th>Acesso até</th>
                </tr>
              </thead>
              <tbody>
                {visibleSubscriptions.map((item) => {
                  const state = subscriptionState(item)
                  const invoice = item.latestInvoice
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className={styles.customerAvatar}>
                          {item.customer.name.slice(0, 2).toUpperCase()}
                        </span>
                        <span>
                          <strong>{item.customer.name}</strong>
                          <small>{item.customer.email}</small>
                        </span>
                      </td>
                      <td>
                        <strong>{item.plan.name}</strong>
                        <small>
                          {money(item.plan.price)} · {date(item.startedAt)}
                        </small>
                      </td>
                      <td>#{item.subId}</td>
                      <td>
                        <span
                          className={`${styles.subscriptionBadge} ${styles[`subscription${state}`]}`}
                        >
                          {statusLabels[state] ?? item.status}
                        </span>
                      </td>
                      <td>
                        <span>{invoice?.paymentMethod ?? '—'}</span>
                        <small>
                          {invoice
                            ? `${invoiceLabels[invoice.current]} · ${money(invoice.value)}`
                            : 'Sem cobrança'}
                        </small>
                      </td>
                      <td>{date(item.accessUntil)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
