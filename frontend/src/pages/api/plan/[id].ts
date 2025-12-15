import { apiSub } from '@/services/apiSubManager';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { id } = req.query

    try {
        const plan = await apiSub.get(`/plans/${id}`)
        return res.status(200).json(plan)
    } catch (err: any) {
        res.status(err.status).json({ code: err.status, message: "Erro ao tentar buscar dados do plano", erro: err })
    }
}