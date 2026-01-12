export const GA_TRACKING_ID = 'G-D659P91ZPF'

export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}
