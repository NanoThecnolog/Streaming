export function deleteCookies(cookieName: string) {
    document.cookie = `${cookieName}=; path=/; expires=Thu, 01 jan 1970 00:00:00 UTC;`
}