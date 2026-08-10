export type StatusMessageTone = 'info' | 'success' | 'warning'

export interface StatusMessage {
  id: string
  title: string
  description: string
  publishedAt: string
  tone: StatusMessageTone
  active: boolean
}

export interface PlatformFeature extends StatusMessage {
  highlights?: string[]
}

export const statusMessages: StatusMessage[] = [
  {
    id: 'catalog-monitoring',
    title: 'Acompanhamento do catálogo',
    description:
      'Estamos acompanhando continuamente a disponibilidade de filmes e séries para manter a experiência estável.',
    publishedAt: '2026-08-09',
    tone: 'info',
    active: true,
  },
]

export const platformFeatures: PlatformFeature[] = [
  {
    id: 'credit-card-payments',
    title: 'Pagamento com cartão de crédito',
    description:
      'Agora você também pode escolher cartão de crédito ao contratar ou reativar sua assinatura.',
    publishedAt: '2026-08-09',
    tone: 'success',
    active: true,
  },
  {
    id: 'enhanced-player',
    title: 'Nova experiência de reprodução',
    description:
      'Atualizamos nossa tecnologia de reprodução para oferecer melhor qualidade de imagem e áudio.',
    publishedAt: '2026-08-09',
    tone: 'success',
    active: true,
    highlights: [
      'Qualidade adaptável durante a reprodução',
      'Continuação a partir do ponto assistido',
      'Seleção de áudio e legendas quando disponíveis',
    ],
  },
]
