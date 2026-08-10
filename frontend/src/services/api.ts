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

    //debug.log('token dentro de setupApiClient', this.token)

    this.api = axios.create({
      baseURL: url,
      headers: {
        ...(this.token && {
          Authorization: `Bearer ${this.token}`,
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
