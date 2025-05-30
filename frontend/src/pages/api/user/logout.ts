import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end()
    setCookie({ res }, 'flix-token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: -1,
    })

    res.status(200).json({ message: 'Logout successful' })
}