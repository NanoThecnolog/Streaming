import { debug } from '@/classes/DebugLogger'
import axios, { AxiosInstance } from 'axios'
import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

const isServer = typeof window === 'undefined'
const url = isServer ? process.env.NEXT_PUBLIC_RENDER : '/api/backend'
if (!url) debug.error('variável de ambiente não configurada.')

export class SetupAPIClient {
  private token: string
  public api: AxiosInstance

  constructor(ctx?: Pick<NextPageContext, 'req'>) {
    const cookies = isServer ? parseCookies(ctx) : {}
    this.token = cookies['flix-token'] ?? ''

    const headerProfileId = isServer
      ? ctx?.req?.headers['x-profile-id']
      : undefined
    const normalizedProfileId = Array.isArray(headerProfileId)
      ? headerProfileId[0]
      : (headerProfileId as string | undefined)

    // Em SSR (getServerSideProps) o header não chega do navegador,
    // então o perfil ativo é lido do cookie flix-active-profile.
    const profileId = normalizedProfileId ?? cookies['flix-active-profile']

    //debug.log('token dentro de setupApiClient', this.token)

    this.api = axios.create({
      baseURL: url,
      headers: {
        ...(this.token && {
          Authorization: `Bearer ${this.token}`,
        }),
        ...(profileId && {
          'x-profile-id': profileId,
        }),
      },
    })
    //debug.log('token:', this.token)
    //debug.log('headers:', this.api.defaults.headers.common)

    /*this.api.interceptors.request.use((config) => {
            debug.log('autorização', config.headers.Authorization)

            return config
        })*/
  }
}
