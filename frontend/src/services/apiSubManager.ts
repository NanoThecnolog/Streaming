import { debug } from '@/classes/DebugLogger'
import axios from 'axios'

const isServer = typeof window === 'undefined'
const url = isServer ? process.env.NEXT_PUBLIC_SUBMANAGER_URL : '/api/subscription'
const apiKey = isServer ? process.env.API_KEY : undefined

if (isServer && !url) {
  debug.error('URL do gerenciador de assinaturas não configurada.')
}

if (isServer && !apiKey) {
  debug.error('API_KEY do gerenciador de assinaturas não configurada.')
}

//debug.log('url', url)
export const apiSub = axios.create({
  baseURL: url,
})

apiSub.interceptors.request.use(
  async (config) => {
    if (!isServer) return config

    if (!apiKey) {
      return Promise.reject(
        new Error('API_KEY do gerenciador de assinaturas não configurada.'),
      )
    }

    config.headers = config.headers ?? {}
    config.headers['key'] = apiKey

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
