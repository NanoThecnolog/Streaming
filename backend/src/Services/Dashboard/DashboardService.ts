import prismaClient from '../../prisma'

export type DashboardPeriod = '7d' | '30d' | '90d' | '12m'

interface CheckoutSnapshot {
    status: string
    planId: number | null
    paymentMethod: string | null
    planSelected: boolean
    nameFilled: boolean
    cpfFilled: boolean
    phoneFilled: boolean
    paymentAttempted: boolean
    completedAt: Date | null
}

interface RevenueInvoice {
    value: number | null
    updatedAt: Date
}

interface StartedSubscription {
    startedAt: Date
}

const VALID_PERIODS: DashboardPeriod[] = ['7d', '30d', '90d', '12m']
const TIME_ZONE = 'America/Sao_Paulo'
const REVENUE_BUCKETS = 8

export class DashboardService {
    async listSubscriptions(searchValue?: string, statusValue?: string) {
        const search = searchValue?.trim()
        const status = statusValue?.trim().toLowerCase()
        const now = new Date()
        const statusWhere = status === 'trial'
            ? { trialEndsAt: { gt: now } }
            : status === 'active'
                ? { accessUntil: { gt: now }, OR: [{ trialEndsAt: null }, { trialEndsAt: { lte: now } }] }
                : status === 'expired'
                    ? { OR: [{ accessUntil: null }, { accessUntil: { lte: now } }] }
                    : status && status !== 'all'
                        ? { status }
                        : {}
        const subscriptions = await prismaClient.subscription.findMany({
            where: {
                ...statusWhere,
                ...(search
                    ? {
                        OR: [
                            { user: { name: { contains: search, mode: 'insensitive' } } },
                            { user: { email: { contains: search, mode: 'insensitive' } } },
                            ...(Number.isInteger(Number(search))
                                ? [{ subId: Number(search) }]
                                : []),
                        ],
                    }
                    : {}),
            },
            orderBy: { updatedAt: 'desc' },
            take: 100,
            include: {
                user: { select: { name: true, email: true } },
                plan: { select: { name: true, price: true, type: true } },
                invoice: {
                    orderBy: { updatedAt: 'desc' },
                    take: 1,
                    select: {
                        current: true,
                        paymentMethod: true,
                        value: true,
                        updatedAt: true,
                    },
                },
            },
        })

        return subscriptions.map(subscription => ({
            id: subscription.id,
            subId: subscription.subId,
            customer: subscription.user,
            plan: {
                name: subscription.plan.name,
                type: subscription.plan.type,
                price: this.centsToReais(subscription.plan.price),
            },
            status: subscription.status,
            startedAt: subscription.startedAt,
            statusUpdatedAt: subscription.statusUpdatedAt,
            trialEndsAt: subscription.trialEndsAt,
            accessUntil: subscription.accessUntil,
            updatedAt: subscription.updatedAt,
            latestInvoice: subscription.invoice[0]
                ? {
                    ...subscription.invoice[0],
                    value: subscription.invoice[0].value === null
                        ? null
                        : this.centsToReais(subscription.invoice[0].value),
                }
                : null,
        }))
    }

    async execute(periodValue: string = '30d') {
        const period = this.normalizePeriod(periodValue)
        const now = new Date()

        const { start, previousStart } = this.getPeriodRange(period, now)

        const [currentRevenueInvoices, previousRevenueInvoices, subscriptions, currentStartedSubscriptions, previousStartedSubscriptions, currentSubscriptionChanges, previousSubscriptionChanges, currentCheckouts, previousCheckouts, recentInvoices, watchedGroups, recentIssues, openedProblemsCount, checkingProblemsCount, notificationGroups] =
            await Promise.all([
                prismaClient.invoice.findMany({
                    where: {
                        current: {
                            in: ['paid', 'settled'],
                        },
                        updatedAt: {
                            gte: start,
                            lte: now,
                        },
                    },
                    select: {
                        value: true,
                        updatedAt: true,
                    },
                }),

                prismaClient.invoice.findMany({
                    where: {
                        current: {
                            in: ['paid', 'settled'],
                        },
                        updatedAt: {
                            gte: previousStart,
                            lt: start,
                        },
                    },
                    select: {
                        value: true,
                        updatedAt: true,
                    },
                }),

                prismaClient.subscription.findMany({
                    select: {
                        status: true,
                        trialEndsAt: true,
                        accessUntil: true,
                    },
                }),

                prismaClient.subscription.findMany({
                    where: {
                        startedAt: {
                            gte: start,
                            lte: now,
                        },
                    },
                    select: {
                        startedAt: true,
                    },
                }),

                prismaClient.subscription.findMany({
                    where: {
                        startedAt: {
                            gte: previousStart,
                            lt: start,
                        },
                    },
                    select: {
                        startedAt: true,
                    },
                }),

                prismaClient.subscriptionHistory.findMany({
                    where: {
                        changedAt: {
                            gte: start,
                            lte: now,
                        },
                    },
                    select: {
                        subscriptionId: true,
                        toStatus: true,
                    },
                }),

                prismaClient.subscriptionHistory.findMany({
                    where: {
                        changedAt: {
                            gte: previousStart,
                            lt: start,
                        },
                    },
                    select: {
                        subscriptionId: true,
                        toStatus: true,
                    },
                }),

                prismaClient.checkoutTrack.findMany({
                    where: {
                        createdAt: {
                            gte: start,
                            lte: now,
                        },
                    },
                    select: {
                        status: true,
                        planId: true,
                        paymentMethod: true,
                        planSelected: true,
                        nameFilled: true,
                        cpfFilled: true,
                        phoneFilled: true,
                        paymentAttempted: true,
                        completedAt: true,
                    },
                }),

                prismaClient.checkoutTrack.findMany({
                    where: {
                        createdAt: {
                            gte: previousStart,
                            lt: start,
                        },
                    },
                    select: {
                        status: true,
                        planId: true,
                        paymentMethod: true,
                        planSelected: true,
                        nameFilled: true,
                        cpfFilled: true,
                        phoneFilled: true,
                        paymentAttempted: true,
                        completedAt: true,
                    },
                }),

                prismaClient.invoice.findMany({
                    orderBy: [
                        { updatedAt: 'desc' },
                        { createdAt: 'desc' },
                    ],
                    take: 10,
                    include: {
                        subscription: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                    },
                                },
                                plan: {
                                    select: {
                                        name: true,
                                        price: true,
                                    },
                                },
                            },
                        },
                    },
                }),

                prismaClient.watched.groupBy({
                    by: ['tmdbID', 'mediaType', 'completed'],
                    where: {
                        lastWatched: {
                            gte: start,
                            lte: now,
                        },
                    },
                    _count: {
                        _all: true,
                    },
                }),

                prismaClient.problem.findMany({
                    where: {
                        status: {
                            notIn: [
                                'resolved',
                                'closed',
                                'RESOLVED',
                                'CLOSED',
                            ],
                        },
                    },
                    orderBy: {
                        created_at: 'desc',
                    },
                    take: 3,
                }),

                prismaClient.problem.count({
                    where: {
                        status: {
                            notIn: [
                                'resolved',
                                'closed',
                                'RESOLVED',
                                'CLOSED',
                            ],
                        },
                    },
                }),

                prismaClient.problem.count({
                    where: {
                        status: {
                            in: [
                                'checking',
                                'CHECKING',
                                'IN_PROGRESS',
                            ],
                        },
                    },
                }),

                prismaClient.efiNotification.groupBy({
                    by: ['status'],
                    where: {
                        updatedAt: {
                            gte: start,
                            lte: now,
                        },
                    },
                    _count: {
                        _all: true,
                    },
                }),
            ])

        const currentRevenue = this.sumRevenue(currentRevenueInvoices)
        const previousRevenue = this.sumRevenue(previousRevenueInvoices)

        const subscriptionGroups = this.buildCurrentSubscriptionGroups(
            subscriptions,
            now,
        )

        const activeSubscriptions = subscriptions.filter((subscription) =>
            subscription.accessUntil !== null && subscription.accessUntil > now,
        ).length

        const currentLostSubscriptions = this.getChangedSubscriptionIds(
            currentSubscriptionChanges,
            ['canceled', 'cancelled', 'inactive', 'expired'],
        )

        const previousLostSubscriptions = this.getChangedSubscriptionIds(
            previousSubscriptionChanges,
            ['canceled', 'cancelled', 'inactive', 'expired'],
        )

        const currentCanceledSubscriptions = this.getChangedSubscriptionIds(
            currentSubscriptionChanges,
            ['canceled', 'cancelled'],
        )

        const previousCanceledSubscriptions = this.getChangedSubscriptionIds(
            previousSubscriptionChanges,
            ['canceled', 'cancelled'],
        )

        const activeAtPeriodStart = Math.max(
            activeSubscriptions -
            currentStartedSubscriptions.length +
            currentLostSubscriptions.size,
            0,
        )

        const activeAtPreviousPeriodStart = Math.max(
            activeAtPeriodStart -
            previousStartedSubscriptions.length +
            previousLostSubscriptions.size,
            0,
        )

        const currentCheckoutFunnel = this.buildCheckoutFunnel(
            currentCheckouts,
        )

        const previousCheckoutFunnel = this.buildCheckoutFunnel(
            previousCheckouts,
        )

        const currentConversion =
            currentCheckoutFunnel[currentCheckoutFunnel.length - 1]
                ?.percentage ?? 0

        const previousConversion =
            previousCheckoutFunnel[previousCheckoutFunnel.length - 1]
                ?.percentage ?? 0

        const currentChurn = this.calculatePercentage(
            currentCanceledSubscriptions.size,
            activeAtPeriodStart,
        )

        const previousChurn = this.calculatePercentage(
            previousCanceledSubscriptions.size,
            activeAtPreviousPeriodStart,
        )

        const popularContent = await this.buildPopularContent(watchedGroups)

        const processedNotifications = this.countNotificationStatus(
            notificationGroups,
            'PROCESSED',
        )

        const failedNotifications = this.countNotificationStatus(
            notificationGroups,
            'FAILED',
        )

        const pendingNotifications =
            this.countNotificationStatus(notificationGroups, 'PENDING') +
            this.countNotificationStatus(notificationGroups, 'PROCESSING')

        const totalNotifications = notificationGroups.reduce(
            (total, group) => total + group._count._all,
            0,
        )

        const processedPercentage = totalNotifications > 0
            ? this.calculatePercentage(
                processedNotifications,
                totalNotifications,
            )
            : 100

        return {
            updatedAt: this.formatUpdatedAt(now),

            metrics: [
                {
                    label: 'Receita recorrente',
                    value: this.formatCurrency(currentRevenue),
                    variation: this.calculateVariation(
                        currentRevenue,
                        previousRevenue,
                    ),
                    comparison: 'vs. período anterior',
                },
                {
                    label: 'Assinaturas ativas',
                    value: activeSubscriptions.toLocaleString('pt-BR'),
                    variation: this.calculateVariation(
                        activeSubscriptions,
                        activeAtPeriodStart,
                    ),
                    comparison: `${currentStartedSubscriptions.length} novas assinaturas`,
                },
                {
                    label: 'Conversão do checkout',
                    value: `${this.formatDecimal(currentConversion)}%`,
                    variation: this.round(
                        currentConversion - previousConversion,
                    ),
                    comparison: `${currentCheckouts.length} sessões iniciadas`,
                },
                {
                    label: 'Churn',
                    value: `${this.formatDecimal(currentChurn)}%`,
                    variation: this.round(currentChurn - previousChurn),
                    comparison: `${currentCanceledSubscriptions.size} cancelamentos`,
                },
            ],

            revenue: this.buildRevenuePoints(
                currentRevenueInvoices,
                currentStartedSubscriptions,
                start,
                now,
                period,
            ),

            subscriptionStatus: this.buildSubscriptionStatus(subscriptionGroups),

            checkoutFunnel: currentCheckoutFunnel,

            recentInvoices: recentInvoices.map(invoice => {
                const customer =
                    invoice.subscription?.user.name ?? 'Usuário removido'

                return {
                    id: `#${invoice.chargeId}`,
                    customer,
                    initials: this.getInitials(customer),
                    plan: invoice.subscription?.plan.name ?? 'Sem plano',
                    paymentMethod: this.formatPaymentMethod(
                        invoice.paymentMethod,
                    ),
                    value: invoice.value === null
                        ? null
                        : this.centsToReais(invoice.value),
                    status: this.formatInvoiceStatus(invoice.current),
                    date: this.formatRelativeDate(invoice.updatedAt, now),
                }
            }),

            popularContent,

            issues: recentIssues.map(issue => ({
                title: issue.title,
                reference: this.formatIssueReference(
                    issue.tmdbId,
                    issue.season,
                    issue.episode,
                ),
                status: this.isCheckingStatus(issue.status)
                    ? 'checking' as const
                    : 'open' as const,
                reportedAt: this.formatElapsedTime(
                    issue.created_at,
                    now,
                ),
            })),

            operationalStatus: [
                {
                    label: 'Notificações Efí',
                    value: `${this.formatDecimal(processedPercentage)}%`,
                    detail: totalNotifications > 0
                        ? `${processedNotifications} processadas`
                        : 'nenhuma notificação no período',
                    tone: processedPercentage >= 99
                        ? 'success' as const
                        : processedPercentage >= 95
                            ? 'warning' as const
                            : 'danger' as const,
                },
                {
                    label: 'Falhas pendentes',
                    value: String(failedNotifications),
                    detail: pendingNotifications > 0
                        ? `${pendingNotifications} aguardando processamento`
                        : 'fila de processamento vazia',
                    tone: failedNotifications === 0
                        ? 'success' as const
                        : failedNotifications <= 3
                            ? 'warning' as const
                            : 'danger' as const,
                },
                {
                    label: 'Problemas abertos',
                    value: String(openedProblemsCount),
                    detail: `${checkingProblemsCount} em verificação`,
                    tone: openedProblemsCount === 0
                        ? 'success' as const
                        : 'danger' as const,
                },
            ],
        }
    }

    private normalizePeriod(period: string): DashboardPeriod {
        return VALID_PERIODS.includes(period as DashboardPeriod)
            ? period as DashboardPeriod
            : '30d'
    }

    private getPeriodRange(period: DashboardPeriod, now: Date) {
        const subtractPeriod = (date: Date) => {
            const result = new Date(date)

            if (period === '12m') {
                result.setUTCMonth(result.getUTCMonth() - 12)
                return result
            }

            const days = {
                '7d': 7,
                '30d': 30,
                '90d': 90,
            }[period]

            result.setUTCDate(result.getUTCDate() - days)

            return result
        }

        const start = subtractPeriod(now)
        const previousStart = subtractPeriod(start)

        return {
            start,
            previousStart,
        }
    }

    private sumRevenue(invoices: Array<{ value: number | null }>) {
        const totalInCents = invoices.reduce(
            (total, invoice) => total + (invoice.value ?? 0),
            0,
        )

        return this.centsToReais(totalInCents)
    }

    private centsToReais(value: number) {
        return this.round(value / 100, 2)
    }

    private buildRevenuePoints(invoices: RevenueInvoice[], subscriptions: StartedSubscription[], start: Date, end: Date, period: DashboardPeriod) {
        const revenueBuckets = Array<number>(REVENUE_BUCKETS).fill(0)
        const subscriptionBuckets = Array<number>(REVENUE_BUCKETS).fill(0)

        const startTime = start.getTime()
        const duration = Math.max(end.getTime() - startTime, 1)
        const bucketDuration = duration / REVENUE_BUCKETS

        invoices.forEach(invoice => {
            const index = this.getBucketIndex(
                invoice.updatedAt,
                startTime,
                bucketDuration,
            )

            revenueBuckets[index] += this.centsToReais(
                invoice.value ?? 0,
            )
        })

        subscriptions.forEach(subscription => {
            const index = this.getBucketIndex(
                subscription.startedAt,
                startTime,
                bucketDuration,
            )

            subscriptionBuckets[index] += 1
        })

        let accumulatedRevenue = 0
        let accumulatedSubscriptions = 0

        return revenueBuckets.map((revenue, index) => {
            accumulatedRevenue += revenue
            accumulatedSubscriptions += subscriptionBuckets[index]

            const bucketDate = new Date(
                startTime + bucketDuration * (index + 1),
            )

            return {
                label: this.formatChartDate(bucketDate, period),
                revenue: this.round(accumulatedRevenue, 2),
                subscriptions: accumulatedSubscriptions,
            }
        })
    }

    private getBucketIndex(
        date: Date,
        startTime: number,
        bucketDuration: number,
    ) {
        return Math.min(
            REVENUE_BUCKETS - 1,
            Math.max(
                0,
                Math.floor(
                    (date.getTime() - startTime) / bucketDuration,
                ),
            ),
        )
    }

    private buildSubscriptionStatus(
        groups: Array<{
            status: string
            _count: { _all: number }
        }>,
    ) {
        const active = this.countSubscriptionStatuses(groups, ['active', 'new_charge'])
        const trial = this.countSubscriptionStatuses(groups, ['trial'])

        const canceled = this.countSubscriptionStatuses(
            groups,
            ['canceled', 'cancelled'],
        )

        const total = groups.reduce(
            (sum, group) => sum + group._count._all,
            0,
        )

        const inactive = Math.max(
            total - active - trial - canceled,
            0,
        )

        return [
            {
                label: 'Ativas',
                value: active,
                color: '#ff2d67',
            },
            {
                label: 'Em teste',
                value: trial,
                color: '#8b5cf6',
            },
            {
                label: 'Inativas',
                value: inactive,
                color: '#f59e0b',
            },
            {
                label: 'Canceladas',
                value: canceled,
                color: '#3f4350',
            },
        ]
    }

    private buildCurrentSubscriptionGroups(
        subscriptions: Array<{
            status: string
            trialEndsAt: Date | null
            accessUntil: Date | null
        }>,
        now: Date,
    ) {
        const counts = new Map<string, number>([
            ['active', 0],
            ['trial', 0],
            ['inactive', 0],
            ['canceled', 0],
        ])

        subscriptions.forEach((subscription) => {
            const status = subscription.status.toLowerCase()
            const hasAccess = Boolean(
                subscription.accessUntil && subscription.accessUntil > now,
            )
            const inTrial = Boolean(
                subscription.trialEndsAt && subscription.trialEndsAt > now,
            ) && ['new', 'active', 'new_charge'].includes(status)

            const category = status === 'canceled' || status === 'cancelled'
                ? 'canceled'
                : inTrial
                    ? 'trial'
                    : hasAccess
                        ? 'active'
                        : 'inactive'

            counts.set(category, (counts.get(category) ?? 0) + 1)
        })

        return Array.from(counts, ([status, count]) => ({
            status,
            _count: { _all: count },
        }))
    }

    private countSubscriptionStatuses(
        groups: Array<{
            status: string
            _count: { _all: number }
        }>,
        statuses: string[],
    ) {
        const normalizedStatuses = new Set(
            statuses.map(status => status.toLowerCase()),
        )

        return groups.reduce((total, group) => {
            const status = group.status.toLowerCase()

            return normalizedStatuses.has(status)
                ? total + group._count._all
                : total
        }, 0)
    }

    private getChangedSubscriptionIds(
        changes: Array<{
            subscriptionId: string
            toStatus: string
        }>,
        statuses: string[],
    ) {
        const normalizedStatuses = new Set(
            statuses.map(status => status.toLowerCase()),
        )

        return new Set(
            changes
                .filter(change =>
                    normalizedStatuses.has(
                        change.toStatus.toLowerCase(),
                    ),
                )
                .map(change => change.subscriptionId),
        )
    }

    private buildCheckoutFunnel(checkouts: CheckoutSnapshot[]) {
        const total = checkouts.length

        const stages = [
            {
                step: 'E-mail',
                sessions: total,
            },
            {
                step: 'Plano',
                sessions: checkouts.filter(checkout =>
                    checkout.planSelected || checkout.planId !== null,
                ).length,
            },
            {
                step: 'Método',
                sessions: checkouts.filter(checkout =>
                    checkout.paymentMethod !== null,
                ).length,
            },
            {
                step: 'Dados pessoais',
                sessions: checkouts.filter(checkout =>
                    checkout.nameFilled &&
                    checkout.cpfFilled &&
                    checkout.phoneFilled,
                ).length,
            },
            {
                step: 'Pagamento',
                sessions: checkouts.filter(checkout =>
                    checkout.paymentAttempted,
                ).length,
            },
            {
                step: 'Concluído',
                sessions: checkouts.filter(checkout =>
                    checkout.status === 'COMPLETED' ||
                    checkout.completedAt !== null,
                ).length,
            },
        ]

        return stages.map(stage => ({
            ...stage,
            percentage: this.calculatePercentage(
                stage.sessions,
                total,
            ),
        }))
    }

    private async buildPopularContent(
        groups: Array<{
            tmdbID: number
            mediaType: string
            completed: boolean
            _count: { _all: number }
        }>,
    ) {
        const groupedContent = new Map<string, {
            tmdbID: number
            mediaType: string
            views: number
            completed: number
        }>()

        groups.forEach(group => {
            const key = `${group.mediaType}:${group.tmdbID}`

            const content = groupedContent.get(key) ?? {
                tmdbID: group.tmdbID,
                mediaType: group.mediaType,
                views: 0,
                completed: 0,
            }

            content.views += group._count._all

            if (group.completed) {
                content.completed += group._count._all
            }

            groupedContent.set(key, content)
        })

        const contents = Array.from(groupedContent.values())
            .sort((first, second) => second.views - first.views)
            .slice(0, 5)

        const tmdbIds = Array.from(
            new Set(contents.map(content => content.tmdbID)),
        )

        if (tmdbIds.length === 0) {
            return []
        }

        const [watchLaterTitles, favoriteTitles] = await Promise.all([
            prismaClient.watchLater.findMany({
                where: {
                    tmdbid: {
                        in: tmdbIds,
                    },
                },
                distinct: ['tmdbid'],
                select: {
                    tmdbid: true,
                    title: true,
                },
            }),

            prismaClient.favorito.findMany({
                where: {
                    tmdbid: {
                        in: tmdbIds,
                    },
                },
                distinct: ['tmdbid'],
                select: {
                    tmdbid: true,
                    title: true,
                },
            }),
        ])

        const titles = new Map<number, string>()

        favoriteTitles.forEach(content => {
            titles.set(content.tmdbid, content.title)
        })

        watchLaterTitles.forEach(content => {
            titles.set(content.tmdbid, content.title)
        })

        return contents.map(content => ({
            title: titles.get(content.tmdbID) ?? `TMDB ${content.tmdbID}`,
            tmdbId: content.tmdbID,
            type: content.mediaType === 'tv'
                ? 'Série' as const
                : 'Filme' as const,
            views: content.views,
            completion: this.calculatePercentage(
                content.completed,
                content.views,
            ),
        }))
    }

    private countNotificationStatus(
        groups: Array<{
            status: string
            _count: { _all: number }
        }>,
        status: string,
    ) {
        return groups.find(group => group.status === status)
            ?._count._all ?? 0
    }

    private calculateVariation(current: number, previous: number) {
        if (previous === 0) {
            return current > 0 ? 100 : 0
        }

        return this.round(
            ((current - previous) / previous) * 100,
        )
    }

    private calculatePercentage(value: number, total: number) {
        if (total === 0) {
            return 0
        }

        return this.round((value / total) * 100)
    }

    private round(value: number, precision = 1) {
        const multiplier = 10 ** precision

        return Math.round(value * multiplier) / multiplier
    }

    private formatCurrency(value: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
            .format(value)
            .replace(/\u00a0/g, ' ')
    }

    private formatDecimal(value: number) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }).format(value)
    }

    private formatChartDate(
        date: Date,
        period: DashboardPeriod,
    ) {
        if (period === '12m') {
            return new Intl.DateTimeFormat('pt-BR', {
                month: 'short',
                year: '2-digit',
                timeZone: TIME_ZONE,
            }).format(date)
        }

        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            timeZone: TIME_ZONE,
        }).format(date)
    }

    private formatUpdatedAt(date: Date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: TIME_ZONE,
        }).format(date)
    }

    private formatRelativeDate(date: Date, now: Date) {
        const dateKey = this.getDateKey(date)
        const todayKey = this.getDateKey(now)

        const yesterday = new Date(now)
        yesterday.setUTCDate(yesterday.getUTCDate() - 1)

        const time = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: TIME_ZONE,
        }).format(date)

        if (dateKey === todayKey) {
            return `Hoje, ${time}`
        }

        if (dateKey === this.getDateKey(yesterday)) {
            return `Ontem, ${time}`
        }

        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: TIME_ZONE,
        }).format(date)
    }

    private getDateKey(date: Date) {
        const parts = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: TIME_ZONE,
        }).formatToParts(date)

        const getPart = (type: Intl.DateTimeFormatPartTypes) =>
            parts.find(part => part.type === type)?.value ?? ''

        return [
            getPart('year'),
            getPart('month'),
            getPart('day'),
        ].join('-')
    }

    private formatElapsedTime(date: Date, now: Date) {
        const differenceInMinutes = Math.max(
            Math.floor((now.getTime() - date.getTime()) / 60000),
            0,
        )

        if (differenceInMinutes < 1) {
            return 'agora'
        }

        if (differenceInMinutes < 60) {
            return `há ${differenceInMinutes} min`
        }

        const differenceInHours = Math.floor(
            differenceInMinutes / 60,
        )

        if (differenceInHours < 24) {
            return `há ${differenceInHours} h`
        }

        const differenceInDays = Math.floor(
            differenceInHours / 24,
        )

        return `há ${differenceInDays} d`
    }

    private getInitials(name: string) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join('')
    }

    private formatPaymentMethod(paymentMethod: string | null) {
        const methods: Record<string, string> = {
            credit_card: 'Cartão',
            credit: 'Cartão',
            pix: 'Pix',
            banking_billet: 'Boleto',
            billet: 'Boleto',
        }

        return paymentMethod
            ? methods[paymentMethod.toLowerCase()] ?? paymentMethod
            : 'Não informado'
    }

    private formatInvoiceStatus(status: string) {
        const statuses = new Set([
            'new',
            'waiting',
            'identified',
            'approved',
            'paid',
            'unpaid',
            'refunded',
            'contested',
            'canceled',
            'expired',
            'settled',
        ])

        return statuses.has(status) ? status : 'unpaid'
    }

    private formatIssueReference(
        tmdbId: number,
        season: number | null,
        episode: number | null,
    ) {
        if (season !== null && episode !== null) {
            return `TMDB ${tmdbId} · T${season} E${episode}`
        }

        if (season !== null) {
            return `TMDB ${tmdbId} · T${season}`
        }

        return `TMDB ${tmdbId} · Filme`
    }

    private isCheckingStatus(status: string) {
        return [
            'checking',
            'in_progress',
            'CHECKING',
            'IN_PROGRESS',
        ].includes(status)
    }
}
