export type DashboardPeriod = "7d" | "30d" | "90d" | "12m";

export interface DashboardMetric {
  label: string;
  value: string;
  variation: number;
  comparison: string;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
  subscriptions: number;
}

export interface SubscriptionStatusItem {
  label: string;
  value: number;
  color: string;
}

export interface CheckoutFunnelItem {
  step: string;
  sessions: number;
  percentage: number;
}

export type InvoiceStatus = "paid" | "waiting" | "unpaid" | "refunded";

export interface RecentInvoice {
  id: string;
  customer: string;
  initials: string;
  plan: string;
  paymentMethod: string;
  value: number;
  status: InvoiceStatus;
  date: string;
}

export interface PopularContent {
  title: string;
  tmdbId: number,
  type: "Filme" | "Série";
  views: number;
  completion: number;
}

export interface PlatformIssue {
  title: string;
  reference: string;
  status: "open" | "checking";
  reportedAt: string;
}

export interface OperationalStatus {
  label: string;
  value: string;
  detail: string;
  tone: "success" | "warning" | "danger";
}

export interface DashboardOverview {
  updatedAt: string;
  metrics: DashboardMetric[];
  revenue: RevenuePoint[];
  subscriptionStatus: SubscriptionStatusItem[];
  checkoutFunnel: CheckoutFunnelItem[];
  recentInvoices: RecentInvoice[];
  popularContent: PopularContent[];
  issues: PlatformIssue[];
  operationalStatus: OperationalStatus[];
}
