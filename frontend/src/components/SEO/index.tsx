import Head from 'next/head'

interface SEOProps {
    title: string,
    description: string,
    image?: string,
    url?: string

}
export default function SEO({ title, description, image, url }: SEOProps) {
    const website = 'https://flixnext.com.br'
    const websiteImage = 'https://flixnext.com.br/burImage.png'
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url ?? website} />
            <meta property="og:image" content={image ?? websiteImage} />

            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:url" content={url ?? website} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image ?? websiteImage} />

            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}