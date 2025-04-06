import { NextResponse, NextRequest } from 'next/server'
import { parseCookies } from 'nookies'
import { debug } from './classes/DebugLogger'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('flix-user')?.value
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.url))

    }
    try {
        const user = JSON.parse(cookie)
        debug.log(user)
        if (!user.access) return NextResponse.redirect(new URL('/series', request.url))


        return NextResponse.next()
    } catch (err) {
        return NextResponse.redirect(new URL('/series', request.url))
    }
}

export const config = {
    matcher: ['/dashboard', '/teste']
}