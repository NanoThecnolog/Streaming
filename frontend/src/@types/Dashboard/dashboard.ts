export type DashboardPeriod = '7d' | '30d' | '90d' | '12m'

export interface DashboardMetric {
  label: string
  value: string
  variation: number
  comparison: string
}

export interface RevenuePoint {
  label: string
  revenue: number
  subscriptions: number
}

export interface SubscriptionStatusItem {
  label: string
  value: number
  color: string
}

export interface CheckoutFunnelItem {
  step: string
  sessions: number
  percentage: number
}

export type InvoiceStatus =
  | 'new'
  | 'waiting'
  | 'identified'
  | 'approved'
  | 'paid'
  | 'unpaid'
  | 'refunded'
  | 'contested'
  | 'canceled'
  | 'expired'
  | 'settled'

export interface RecentInvoice {
  id: string
  customer: string
  initials: string
  plan: string
  paymentMethod: string
  value: number | null
  status: InvoiceStatus
  date: string
}

export interface PopularContent {
  title: string
  tmdbId: number
  type: 'Filme' | 'Série'
  views: number
  completion: number
}

export interface PlatformIssue {
  title: string
  reference: string
  status: 'open' | 'checking'
  reportedAt: string
}

export interface OperationalStatus {
  label: string
  value: string
  detail: string
  tone: 'success' | 'warning' | 'danger'
}

export interface DashboardOverview {
  updatedAt: string
  metrics: DashboardMetric[]
  revenue: RevenuePoint[]
  subscriptionStatus: SubscriptionStatusItem[]
  checkoutFunnel: CheckoutFunnelItem[]
  recentInvoices: RecentInvoice[]
  popularContent: PopularContent[]
  issues: PlatformIssue[]
  operationalStatus: OperationalStatus[]
}

export interface DashboardSubscription {
  id: string
  subId: number
  customer: { name: string; email: string }
  plan: { name: string; type: string; price: number }
  status: string
  startedAt: string
  statusUpdatedAt: string | null
  trialEndsAt: string | null
  accessUntil: string | null
  updatedAt: string
  latestInvoice: {
    current: InvoiceStatus
    paymentMethod: string | null
    value: number | null
    updatedAt: string
  } | null
}
