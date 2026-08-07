import { Activity, BadgeDollarSign, Bell, ChevronDown, CircleDollarSign, CreditCard, Film, Gauge, HelpCircle, Menu, RefreshCcw, Search, Settings, ShieldCheck, TrendingDown, TrendingUp, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { DashboardOverview, DashboardPeriod, RevenuePoint } from "@/@types/Dashboard/dashboard";
import { dashboardService } from "@/classes/DashboardService";
import { debug } from "@/classes/DebugLogger";
import { useTMDB } from "@/contexts/TMDBContext";
import { SeriesProps, TMDBSeries } from "@/@types/series";
import { CardsProps, MovieTMDB } from "@/@types/Cards";
import { useFlix } from "@/contexts/FlixContext";

const navigation = [
  { label: "Visão geral", icon: Gauge, active: true },
  { label: "Assinaturas", icon: CreditCard },
  { label: "Financeiro", icon: CircleDollarSign },
  { label: "Usuários", icon: Users },
  { label: "Catálogo", icon: Film },
  { label: "Atividade", icon: Activity },
];

const formatCurrencyShort = (value: number) => {
  if (value >= 1000) {
    const compactValue = (value / 1000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })

    return `R$ ${compactValue} mil`
  }

  const formattedValue = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `R$ ${formattedValue}`
}

const getRevenuePath = (points: RevenuePoint[]) => {
  const max = Math.max(...points.map((point) => point.revenue));
  const min = Math.min(...points.map((point) => point.revenue));
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = 32 + index * (656 / (points.length - 1));
      const y = 214 - ((point.revenue - min) / range) * 158;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

type RevenueItem = DashboardOverview['revenue'][number]

interface RevenueChartPoint extends RevenueItem {
  x: number
  y: number
}

const getRevenueCoordinates = (
  revenue: RevenueItem[],
): RevenueChartPoint[] => {
  if (revenue.length === 0) return []

  const values = revenue.map(point => Number(point.revenue) || 0)

  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min

  return revenue.map((point, index) => {
    const value = Number(point.revenue) || 0

    const x = revenue.length === 1
      ? 360
      : 32 + index * (656 / (revenue.length - 1))

    const y = range === 0
      ? 135
      : 214 - ((value - min) / range) * 158

    return {
      ...point,
      x,
      y,
    }
  })
}










interface Props {
  overview: DashboardOverview
}

export const Dashboard = ({ overview }: Props) => {
  const [period, setPeriod] = useState<DashboardPeriod>("30d");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [totalSubscriptions, setTotalsubscriptions] = useState<number>(0)
  const [popularContent, setPopularContent] = useState()

  //const { allData, serieData } = useTMDB()
  const { movies, series } = useFlix()

  //-------------------Carregamento inicial de dados-----------------------------------------
  useEffect(() => {
    if (!overview) return
    debug.log('Alimentando com primeiros dados', overview)
    setData(overview)
  }, [overview])

  //------------------------Carregando populares----------------------------
  /*  useEffect(() => {
      if (!data) return
      
      const popularMovies = 
    },[data, allData, serieData])*/

  //--------------------------Total de assinaturas--------------------------
  useEffect(() => {
    if (!data) return

    const totalSubscriptions = data.subscriptionStatus.reduce(
      (total, item) => total + item.value,
      0,
    );
    setTotalsubscriptions(totalSubscriptions || 0)

  }, [data])


  //--------------Atualização dos dados---------------------------
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRequestError(null);

    try {
      const overview = await dashboardService.getOverview(period);
      debug.log('Resultado dos dados', overview)
      setData(overview);
    } catch {
      setRequestError("Não foi possível atualizar os dados.");
    } finally {
      setIsRefreshing(false);
    }
  };






  /*const revenuePath = useMemo(() =>
    getRevenuePath(data?.revenue ?? []),
    [data?.revenue]
  )*/

  const revenueMetric = useMemo(
    () => data?.metrics.find(
      metric => metric.label === 'Receita recorrente',
    ) ?? null,
    [data?.metrics],
  )

  const revenueVariation = revenueMetric?.variation ?? 0

  const formattedRevenueVariation = `${revenueVariation > 0 ? '+' : ''}${revenueVariation.toFixed(1).replace('.', ',')}%`

  const revenuePoints = useMemo(
    () => getRevenueCoordinates(data?.revenue ?? []),
    [data?.revenue],
  )

  const revenuePath = useMemo(
    () => revenuePoints
      .map((point, index) => {
        const command = index === 0 ? 'M' : 'L'

        return `${command} ${point.x} ${point.y}`
      })
      .join(' '),
    [revenuePoints],
  )

  const firstRevenuePoint = revenuePoints[0]
  const lastRevenuePoint = revenuePoints[revenuePoints.length - 1]






















  return (
    <div className={styles.dashboard}>
      <button
        className={`${styles.overlay} ${menuIsOpen ? styles.overlayVisible : ""}`}
        aria-label="Fechar menu"
        onClick={() => setMenuIsOpen(false)}
      />

      <aside className={`${styles.sidebar} ${menuIsOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>F</span>
          <div>
            <strong>FLIXNEXT</strong>
            <span>Admin</span>
          </div>
          <button
            className={styles.closeMenu}
            aria-label="Fechar menu"
            onClick={() => setMenuIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.navigation} aria-label="Navegação principal">
          <span className={styles.navTitle}>MENU</span>
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
              type="button"
              onClick={() => setMenuIsOpen(false)}
            >
              <Icon size={19} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button type="button"><HelpCircle size={18} />Central de ajuda</button>
          <button type="button"><Settings size={18} />Configurações</button>
          <div className={styles.adminProfile}>
            <div className={styles.avatar}>NA</div>
            <div><strong>Nano</strong><span>Administrador</span></div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <button
            className={styles.menuButton}
            aria-label="Abrir menu"
            onClick={() => setMenuIsOpen(true)}
          >
            <Menu size={22} />
          </button>
          <label className={styles.search}>
            <Search size={18} />
            <input type="search" placeholder="Buscar usuário, cobrança ou conteúdo..." />
            <kbd>⌘ K</kbd>
          </label>
          <button className={styles.notification} aria-label="Notificações">
            <Bell size={20} />
            <span />
          </button>
        </header>

        {data &&
          <div className={styles.content}>
            <section className={styles.pageHeading}>
              <div>
                <span className={styles.eyebrow}>PAINEL ADMINISTRATIVO</span>
                <h1>Visão geral</h1>
                <p>Acompanhe o desempenho da plataforma em um só lugar.</p>
              </div>
              <div className={styles.actions}>
                <select
                  aria-label="Período"
                  value={period}
                  onChange={(event) => setPeriod(event.target.value as DashboardPeriod)}
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                  <option value="12m">Últimos 12 meses</option>
                </select>
                <button type="button" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCcw size={16} className={isRefreshing ? styles.spinning : ""} />
                  Atualizar
                </button>
              </div>
            </section>

            {requestError && <p className={styles.requestError}>{requestError}</p>}

            <section className={styles.metrics} aria-label="Indicadores principais">
              {data && data.metrics.map((metric, index) => {
                const TrendIcon = metric.variation >= 0 ? TrendingUp : TrendingDown;
                const isGoodVariation = metric.label === "Churn"
                  ? metric.variation < 0
                  : metric.variation >= 0;

                return (
                  <article className={styles.metricCard} key={metric.label}>
                    <div className={styles.metricTop}>
                      <span>{metric.label}</span>
                      <span className={styles.metricIcon}>
                        {index === 0 ? <BadgeDollarSign size={19} /> :
                          index === 1 ? <Users size={19} /> :
                            index === 2 ? <Activity size={19} /> : <TrendingDown size={19} />}
                      </span>
                    </div>
                    <strong>{metric.value}</strong>
                    <div className={styles.metricFooter}>
                      <span className={isGoodVariation ? styles.positive : styles.negative}>
                        <TrendIcon size={14} />
                        {Math.abs(metric.variation).toLocaleString("pt-BR")}%
                      </span>
                      <small>{metric.comparison}</small>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className={styles.overviewGrid}>
              <article className={`${styles.panel} ${styles.revenuePanel}`}>
                <div className={styles.panelHeading}>
                  <div>
                    <h2>Receita recorrente</h2>
                    <p>Evolução da receita no período</p>
                  </div>

                  <div className={styles.chartLegend}>
                    <span />Receita
                  </div>
                </div>

                <div className={styles.chartValue}>
                  <strong>{revenueMetric?.value ?? 'R$ 0'}</strong>
                  <span>{formattedRevenueVariation}</span>
                </div>

                <div className={styles.chart}>
                  <div className={styles.yAxis}>
                    <span>{formatCurrencyShort(1900)}</span>
                    <span>{formatCurrencyShort(1400)}</span>
                    <span>{formatCurrencyShort(900)}</span>
                    <span>R$ 0</span>
                  </div>
                  <svg
                    viewBox="0 0 720 250"
                    role="img"
                    aria-label="Crescimento da receita"
                  >
                    <defs>
                      <linearGradient
                        id="revenueArea"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ff2d67"
                          stopOpacity="0.32"
                        />

                        <stop
                          offset="100%"
                          stopColor="#ff2d67"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {[56, 108, 160, 212].map(y => (
                      <line
                        key={y}
                        x1="32"
                        x2="688"
                        y1={y}
                        y2={y}
                        className={styles.gridLine}
                      />
                    ))}

                    {revenuePoints.length > 1 && (
                      <>
                        <path
                          d={`
                    ${revenuePath}
                    L ${lastRevenuePoint.x} 226
                    L ${firstRevenuePoint.x} 226
                    Z
                `}
                          fill="url(#revenueArea)"
                        />

                        <path
                          d={revenuePath}
                          className={styles.chartLine}
                        />
                      </>
                    )}

                    {revenuePoints.map((point, index) => (
                      <circle
                        key={`${point.label}-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        className={styles.chartDot}
                      />
                    ))}
                  </svg>
                  <div className={styles.xAxis}>
                    {data.revenue.map((point) => <span key={point.label}>{point.label}</span>)}
                  </div>
                </div>
              </article>

              <article className={`${styles.panel} ${styles.statusPanel}`}>
                <div className={styles.panelHeading}>
                  <div><h2>Assinaturas</h2><p>Distribuição por status</p></div>
                  <button type="button">Ver todas</button>
                </div>
                <div className={styles.donutWrap}>
                  <div className={styles.donut}>
                    <div><strong>{totalSubscriptions}</strong><span>Total</span></div>
                  </div>
                </div>
                <div className={styles.statusList}>
                  {data.subscriptionStatus.map((item) => (
                    <div key={item.label}>
                      <span className={styles.statusLabel}>
                        <i style={{ backgroundColor: item.color }} />{item.label}
                      </span>
                      <strong>{item.value}</strong>
                      <small>{Math.round((item.value / totalSubscriptions) * 100)}%</small>
                    </div>
                  ))}
                </div>
              </article>
            </section>


            <section className={styles.secondaryGrid}>
              <article className={`${styles.panel} ${styles.funnelPanel}`}>
                <div className={styles.panelHeading}>
                  <div><h2>Funil do checkout</h2><p>Conversão entre as etapas</p></div>
                  <span className={styles.funnelResult}>18,4% concluído</span>
                </div>
                <div className={styles.funnelList}>
                  {data.checkoutFunnel.map((item) => (
                    <div className={styles.funnelRow} key={item.step}>
                      <span>{item.step}</span>
                      <div><i style={{ width: `${item.percentage}%` }} /></div>
                      <strong>{item.sessions}</strong>
                      <small>{item.percentage.toLocaleString("pt-BR")}%</small>
                    </div>
                  ))}
                </div>
              </article>



              <article className={`${styles.panel} ${styles.popularPanel}`}>
                <div className={styles.panelHeading}>
                  <div><h2>Mais assistidos</h2><p>Conteúdos com mais reproduções</p></div>
                  <button type="button">Ver catálogo</button>
                </div>
                <div className={styles.popularList}>



                  {data.popularContent.map((content, index) => {

                    const tmdbInfo: | CardsProps | SeriesProps | undefined =
                      content.type === 'Filme' ?
                        movies.find(movie => movie.tmdbId === content.tmdbId)
                        : series.find(serie => serie.tmdbID === content.tmdbId)
                        || undefined
                    const title = tmdbInfo ? tmdbInfo.title : content.title


                    return (
                      (
                        <div key={content.title ?? content.tmdbId}>
                          <span className={styles.rank}>{String(index + 1).padStart(2, "0")}</span>
                          <div className={styles.contentInfo}>
                            <strong>{title}</strong>
                            <span>{content.type} · {content.views} reproduções</span>
                          </div>

                          <div className={styles.completion}>
                            <span>{content.completion}%</span>
                            <div><i style={{ width: `${content.completion}%` }} /></div>
                          </div>
                        </div>
                      )
                    )
                  })}
                </div>
              </article>
            </section>

            <section className={styles.bottomGrid}>
              <article className={`${styles.panel} ${styles.invoicePanel}`}>
                <div className={styles.panelHeading}>
                  <div><h2>Cobranças recentes</h2><p>Últimas movimentações financeiras</p></div>
                  <button type="button">Ver financeiro</button>
                </div>
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr><th>Cliente</th><th>Plano</th><th>Pagamento</th><th>Valor</th><th>Status</th><th>Data</th></tr>
                    </thead>
                    <tbody>
                      {data.recentInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>
                            <span className={styles.customerAvatar}>{invoice.initials}</span>
                            <span><strong>{invoice.customer}</strong><small>{invoice.id}</small></span>
                          </td>
                          <td>{invoice.plan}</td>
                          <td>{invoice.paymentMethod}</td>
                          <td><strong>{invoice.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></td>
                          <td><span className={`${styles.invoiceStatus} ${styles[invoice.status]}`}>{invoice.status === "paid" ? "Pago" : invoice.status === "waiting" ? "Aguardando" : invoice.status === "unpaid" ? "Não pago" : "Reembolsado"}</span></td>
                          <td>{invoice.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <div className={styles.sideColumn}>
                <article className={`${styles.panel} ${styles.healthPanel}`}>
                  <div className={styles.panelHeading}>
                    <div><h2>Operação</h2><p>Status dos serviços</p></div>
                    <ShieldCheck size={18} />
                  </div>
                  <div className={styles.healthList}>
                    {data.operationalStatus.map((item) => (
                      <div key={item.label}>
                        <i className={styles[item.tone]} />
                        <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                        <b>{item.value}</b>
                      </div>
                    ))}
                  </div>
                </article>

                <article className={`${styles.panel} ${styles.issuePanel}`}>
                  <div className={styles.panelHeading}>
                    <div><h2>Problemas reportados</h2><p>Ocorrências que precisam de atenção</p></div>
                    <button type="button">Ver todos</button>
                  </div>
                  <div className={styles.issueList}>
                    {data.issues.map((issue) => (
                      <div key={`${issue.title}-${issue.reference}`}>
                        <i className={issue.status === "open" ? styles.issueOpen : styles.issueChecking} />
                        <span><strong>{issue.title}</strong><small>{issue.reference}</small></span>
                        <time>{issue.reportedAt}</time>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <footer className={styles.dashboardFooter}>
              <span>Dados atualizados em {data.updatedAt}</span>
              <span>Flixnext Admin · Ambiente de produção</span>
            </footer>
          </div>
        }
      </main>
    </div>
  );
};
