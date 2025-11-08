//import { debug } from "@/classes/DebugLogger";
import { NextRequest, NextResponse } from "next/server";
//import geoip from 'geoip-lite'

export async function middleware(req: NextRequest) {
    /*const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0'

    const geo = geoip.lookup(ip)

    if (!geo || geo.country !== 'BR') return NextResponse.json({ error: 'Access Denied' }, { status: 403 })

    const userAgent = req.headers.get('user-agent') || 'desconhecido'
    const url = req.nextUrl.pathname

    debug.log(`dados de acesso. ip: ${ip}; userAgent: ${userAgent}; url: ${url}`)*/

    return NextResponse.next()

}
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};