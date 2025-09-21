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
            { userAgent: '*', allow: '/planos' },
            { userAgent: '*', allow: '/movie/*' },
            { userAgent: '*', allow: '/series/serie/*' },
            { userAgent: '*', allow: '/signup' },
            { userAgent: '*', allow: '/login' },
            { userAgent: '*', disallow: '/watch', },
            { userAgent: '*', disallow: '/recover', },
        ],
    },
    transform: async (config, path) => {
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
