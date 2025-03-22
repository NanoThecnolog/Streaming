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
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://flixnext.netlify.app/" />
            <meta property="og:image" content="https://flixnext.netlify.app/blurImage.png" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:url" content="https://flixnext.netlify.app/" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content="https://flixnext.netlify.app/blurImage.png" />

            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}