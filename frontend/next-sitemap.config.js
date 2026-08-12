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
          '/movies/*',
          '/series/*',
          '/login',
          '/sobre',
          '/privacidade',
          '/termos-de-uso',
          '/catalogo',
          '/planos',
        ],
        disallow: [
          '/payment',
          '/watch',
          '/recover',
          '/dashboard',
          '/teste',
          '/success',
          '/me',
          '/request',
          '/watchlater',
        ],
      },
      /*{ userAgent: '*', allow: '/' },
            { userAgent: '*', allow: '/series' },
            { userAgent: '*', allow: '/movies' },
            { userAgent: '*', allow: '/movies/movie/*' },
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
    if (
      path.startsWith('/watch') ||
      path.startsWith('/recover') ||
      path.startsWith('/dashboard') ||
      path.startsWith('/teste') ||
      path.startsWith('/payment') ||
      path.startsWith('/success') ||
      path.startsWith('/request') ||
      path.startsWith('/me') ||
      path.startsWith('/watchlater')
    )
      return null

    let priority = config.priority

    if (path === '/planos') priority = 1
    if (path === '/') priority = 0.9
    if (path === '/login') priority = 0.8

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
  additionalPaths: async (config) => {
    /*const baseUrl = process.env.NODE_ENV === 'production'
            ? 'https://flixnext.com.br'
            : 'http://localhost:3000'*/
    const baseUrl = 'https://flixnext.com.br'

    console.log('url base utilizada', baseUrl)
    const res = await fetch(`${baseUrl}/api/seo`)

    if (!res.ok) throw new Error(`[sitemap] erro ao buscar /api/seo: ${res.status}`)

    const json = await res.json()

    const m = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : []

    if (!Array.isArray(m)) throw new Error('[sitemap] resposta inválida da api /api/seo')

    return m.map((movie) => ({
      loc: `/movies/movie/${movie.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }))
  },
}
