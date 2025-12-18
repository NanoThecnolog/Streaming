const { config } = require('googleapis/build/src/apis/config');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://flixnext.com.br',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', allow: '/series' },
            { userAgent: '*', allow: '/movies' },
            { userAgent: '*', allow: '/movie/*' },
            { userAgent: '*', allow: '/series/serie/*' },
            { userAgent: '*', allow: '/signup' },
            { userAgent: '*', allow: '/login' },
            { userAgent: '*', allow: '/sobre' },
            { userAgent: '*', disallow: '/planos' },
            { userAgent: '*', disallow: '/watch', },
            { userAgent: '*', disallow: '/recover', },
            { userAgent: '*', disallow: '/dashboard/*' },
            { userAgent: '*', disallow: '/teste' }
        ],
    },
    transform: async (config, path) => {
        if (path.startsWith('/watch') ||
            path.startsWith('/recover') ||
            path.startsWith('/dashboard') ||
            path.startsWith('/teste')
        ) return null
        let priority = config.priority

        if (path === '/') {
            priority = 1.0
        }
        if (path === '/signup') {
            priority = 0.9
        }
        if (path === '/login') {
            priority = 0.8
        }

        return {
            loc: path,
            changefreq: config.changefreq,
            priority,
            lastmod: new Date().toISOString()
        }
    }
};
