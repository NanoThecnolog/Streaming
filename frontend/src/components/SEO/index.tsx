import Head from 'next/head'

interface SEOProps {
    title: string,
    description: string,

}
export default function SEO({ title, description }: SEOProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}