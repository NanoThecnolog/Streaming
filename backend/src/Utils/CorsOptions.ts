import { CorsOptions } from 'cors'

const configuredOrigins = (process.env.CORS_ORIGINS ?? process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean)

const allowedOrigins = new Set([
    'https://flixnext.com.br',
    'https://www.flixnext.com.br',
    'https://flixnext.netlify.app',
    ...configuredOrigins,
])

const isLocalDevelopmentOrigin = (origin: string): boolean => {
    try {
        const url = new URL(origin)
        return (
            ['http:', 'https:'].includes(url.protocol) &&
            ['localhost', '127.0.0.1'].includes(url.hostname)
        )
    } catch {
        return false
    }
}

export const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin.replace(/\/$/, '')) || isLocalDevelopmentOrigin(origin)) {
            callback(null, true)
            return
        }
        callback(new Error('Origem não permitida pelo CORS.'))
    },
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'key', 'Accept'],
    credentials: true,
    maxAge: 86400,
}
