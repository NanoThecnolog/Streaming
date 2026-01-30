const { config } = require('googleapis/build/src/apis/config');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://flixnext.com.br',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/series',
                    '/movies',
                    '/movie/*',
                    '/series/*',
                    '/login',
                    '/sobre',
                    '/privacidade',
                    '/termos-de-uso',
                    '/catalogo'

                ],
                disallow: [
                    '/planos',
                    '/payment',
                    '/watch',
                    '/recover',
                    '/dashboard',
                    '/teste',
                    '/success',
                    '/me',
                    '/request',
                    '/watchlater',
                    '/ativando-conta',
                ]
            },
            /*{ userAgent: '*', allow: '/' },
            { userAgent: '*', allow: '/series' },
            { userAgent: '*', allow: '/movies' },
            { userAgent: '*', allow: '/movie/*' },
            { userAgent: '*', allow: '/series/serie/*' },
            { userAgent: '*', allow: '/signup' },
            { userAgent: '*', allow: '/login' },
            { userAgent: '*', allow: '/sobre' },
            { userAgent: '*', disallow: '/planos' },
            { userAgent: '*', disallow: '/payment' },
            { userAgent: '*', disallow: '/watch', },
            { userAgent: '*', disallow: '/recover', },
            { userAgent: '*', disallow: '/dashboard/*' },
            { userAgent: '*', disallow: '/teste' }*/
        ],
    },
    transform: async (config, path) => {
        if (path.startsWith('/watch') ||
            path.startsWith('/recover') ||
            path.startsWith('/dashboard') ||
            path.startsWith('/teste') ||
            path.startsWith('/payment') ||
            path.startsWith('/planos') ||
            path.startsWith('/success') ||
            path.startsWith('/request') ||
            path.startsWith('/me') ||
            path.startsWith('/watchlater') ||
            path.startsWith('/ativando-conta')

        ) return null

        let priority = config.priority

        if (path === '/') priority = 1.0
        if (path === '/signup') priority = 0.9
        if (path === '/login') priority = 0.8

        return {
            loc: path,
            changefreq: config.changefreq,
            priority,
            lastmod: new Date().toISOString()
        }
    },
    additionalPaths: async (config) => {
        /*const baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://flixnext.com.br'
            : 'http://localhost:3000'*/
        const baseUrl = 'https://flixnext.com.br'

        console.log("url base utilizada", baseUrl)
        const res = await fetch(`${baseUrl}/api/seo`)

        if (!res.ok) throw new Error(`[sitemap] erro ao buscar /api/seo: ${res.status}`)

        const json = await res.json()

        const m = Array.isArray(json)
            ? json
            : Array.isArray(json.data)
                ? json.data
                : []

        if (!Array.isArray(m)) throw new Error('[sitemap] resposta inválida da api /api/seo')

        return m.map((movie) => ({
            loc: `/movie/${movie.id}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString()
        }))
    }
};
