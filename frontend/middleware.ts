// middleware.ts
import { UserProps } from '@/@types/user'
import { getCookie } from 'cookies-next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    //const token = request.cookies.get('meuapp.token')?.value
    const userCookie = await getCookie('flix-user')

    if (!userCookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    const userData: UserProps = JSON.parse(userCookie as string)
    if (!userData.access) return NextResponse.redirect(new URL('/', request.url))

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/teste/:path*'],
}