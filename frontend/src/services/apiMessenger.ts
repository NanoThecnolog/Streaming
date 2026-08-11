import { debug } from '@/classes/DebugLogger'
import axios from 'axios'

const isServer = typeof window === 'undefined'
const url = isServer ? process.env.NEXT_PUBLIC_MENSAGERIA : '/api/messaging'
const apiKey = isServer ? process.env.API_KEY : undefined

if (isServer && !url) {
  debug.error('URL da mensageria não configurada.')
}

if (isServer && !apiKey) {
  debug.error('API_KEY da mensageria não configurada.')
}

//debug.log('url', url)
export const apiEmail = axios.create({
  baseURL: url,
})

apiEmail.interceptors.request.use(
  async (config) => {
    if (!isServer) return config

    if (!apiKey) {
      return Promise.reject(new Error('API_KEY da mensageria não configurada.'))
    }

    config.headers = config.headers ?? {}
    config.headers['key'] = apiKey

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
