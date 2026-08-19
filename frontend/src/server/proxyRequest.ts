import axios, { AxiosError, Method } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface ProxyOptions {
  baseUrl?: string
  apiKey?: string
  forwardAuthCookie?: boolean
  requireAuth?: boolean
  blockedPaths?: string[]
  forwardAuthorizationHeader?: boolean
  headers?: Record<string, string>
}

const buildTargetUrl = (req: NextApiRequest, baseUrl: string): string => {
  const path = Array.isArray(req.query.path) ? req.query.path : []
  const target = new URL(path.map(encodeURIComponent).join('/'), `${baseUrl.replace(/\/$/, '')}/`)

  Object.entries(req.query).forEach(([key, value]) => {
    if (key === 'path' || value === undefined) return
    const values = Array.isArray(value) ? value : [value]
    values.forEach((item) => target.searchParams.append(key, item))
  })

  return target.toString()
}

const isCrossSiteMutation = (req: NextApiRequest): boolean => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method ?? '')) return false

  const fetchSite = req.headers['sec-fetch-site']
  if (fetchSite === 'cross-site') return true

  const origin = req.headers.origin
  if (!origin) return false

  const forwardedHost = req.headers['x-forwarded-host']
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) ?? req.headers.host
  if (!host) return true

  try {
    return new URL(origin).host !== host
  } catch {
    return true
  }
}

export const proxyRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  options: ProxyOptions,
): Promise<void> => {
  if (isCrossSiteMutation(req)) {
    res.status(403).json({ message: 'Origem da requisição não permitida.' })
    return
  }

  if (!options.baseUrl) {
    res.status(500).json({ message: 'Serviço interno não configurado.' })
    return
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : ''
  if (options.blockedPaths?.includes(path)) {
    res.status(404).json({ message: 'Rota não encontrada.' })
    return
  }

  const headers: Record<string, string> = { ...options.headers }
  const contentType = req.headers['content-type']
  const contentLength = req.headers['content-length']
  const userAgent = req.headers['user-agent']
  const profileId = req.headers['x-profile-id']

  if (contentType) headers['content-type'] = contentType
  if (contentLength) headers['content-length'] = contentLength
  if (userAgent) {
    headers['user-agent'] = userAgent
    headers['x-client-user-agent'] = userAgent
  }
  if (profileId && typeof profileId === 'string') {
    headers['x-profile-id'] = profileId
  }
  if (options.apiKey) headers.key = options.apiKey

  const token = req.cookies['flix-token']
  if (options.requireAuth) {
    const backendUrl = process.env.NEXT_PUBLIC_RENDER
    if (!token || !backendUrl) {
      res.status(401).json({ message: 'Usuário não autenticado.' })
      return
    }

    try {
      await axios.get(`${backendUrl.replace(/\/$/, '')}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      const status = error instanceof AxiosError ? (error.response?.status ?? 502) : 500
      res.status(status).json({ message: 'Sessão inválida ou expirada.' })
      return
    }
  }

  if (options.forwardAuthCookie) {
    if (token) headers.authorization = `Bearer ${token}`
  }

  if (options.forwardAuthorizationHeader) {
    const authorization = req.headers.authorization
    if (authorization) headers.authorization = authorization
  }

  try {
    const response = await axios.request<ArrayBuffer>({
      url: buildTargetUrl(req, options.baseUrl),
      method: req.method as Method,
      headers,
      data: ['GET', 'HEAD'].includes(req.method ?? '') ? undefined : req,
      responseType: 'arraybuffer',
      validateStatus: () => true,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    })

    const responseContentType = response.headers['content-type']
    if (responseContentType) res.setHeader('Content-Type', responseContentType)
    res.status(response.status).send(Buffer.from(response.data))
  } catch (error) {
    const message =
      error instanceof AxiosError ? error.message : 'Falha ao acessar serviço interno.'
    res.status(502).json({ message })
  }
}
