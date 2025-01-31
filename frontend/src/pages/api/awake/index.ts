import { NextApiRequest, NextApiResponse } from "next";
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.status(200).json({ code: 200, message: "Tô acordado, tô acordado!" })
    } catch (err: any) {
        res.status(err.status).json({ code: err.status, message: "Sonin, qué não.... zzz", erro: err })
    }
}