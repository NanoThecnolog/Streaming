import { proxyRequest } from '@/server/proxyRequest'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyRequest(req, res, {
    baseUrl: process.env.NEXT_PUBLIC_SUBMANAGER_URL,
    apiKey: process.env.API_KEY,
    requireAuth: true,
  })
}
