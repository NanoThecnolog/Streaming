import { NextRequest, NextResponse } from 'next/server'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export function middleware(request: NextRequest) {
  if (SAFE_METHODS.has(request.method)) return NextResponse.next()

  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return NextResponse.json({ message: 'Origem da requisição não permitida.' }, { status: 403 })
  }

  const origin = request.headers.get('origin')
  if (!origin) return NextResponse.next()

  const forwardedHost = request.headers.get('x-forwarded-host')
  const expectedHost = forwardedHost?.split(',')[0]?.trim() || request.headers.get('host')

  try {
    if (!expectedHost || new URL(origin).host !== expectedHost) {
      return NextResponse.json({ message: 'Origem da requisição não permitida.' }, { status: 403 })
    }
  } catch {
    return NextResponse.json({ message: 'Origem da requisição não permitida.' }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
