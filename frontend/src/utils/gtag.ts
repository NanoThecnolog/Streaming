export const GA_TRACKING_ID = 'G-D659P91ZPF'

export const pageview = (url: string) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
        event: 'page_view',
        page_path: url,
    })
}