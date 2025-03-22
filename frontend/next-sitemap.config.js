/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://flixnext.netlify.app', // URL base
    generateRobotsTxt: true, // Geração automática do robots.txt
    changefreq: 'daily', // Frequência de rastreamento
    priority: 0.7, // Prioridade padrão para as páginas
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', allow: '/series' },
            { userAgent: '*', allow: '/planos' },
            { userAgent: '*', disallow: '/watch', },
            { userAgent: '*', disallow: '/recover', },
        ],
    },
};
