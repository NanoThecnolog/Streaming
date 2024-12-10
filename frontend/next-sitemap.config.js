/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://flixnext.vercel.app', // URL base do seu site
    generateRobotsTxt: true, // Gera automaticamente o robots.txt
    changefreq: 'daily', // Frequência sugerida para rastreamento
    priority: 0.7, // Prioridade padrão para as páginas
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' }, // Permite o acesso a todas as páginas
            { userAgent: '*', disallow: '/watch', }, // Bloqueia páginas específicas
            { userAgent: '*', disallow: '/recover', }, // Bloqueia páginas específicas
        ],
    },
};
